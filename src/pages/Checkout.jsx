import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bot, Building2, Check, ChevronDown, LockKeyhole } from 'lucide-react';
import CheckoutAssistant from '../components/checkout/CheckoutAssistant';
import CheckoutSuccess from '../components/checkout/CheckoutSuccess';
import OrderSummary from '../components/checkout/OrderSummary';
import PaymentMethods from '../components/checkout/PaymentMethods';
import {
  addressSuggestionsByRegion,
  createOrderId,
  getDeliveryCharge,
  getPreferredPaymentMethod,
  paymentMethodsByRegion,
  regionCopy,
} from '../data/checkoutConfig';
import { useTheme } from '../hooks/useTheme';
import useCartStore from '../store/useCartStore';
import useCheckoutStore from '../store/useCheckoutStore';
import useUserStore from '../store/useUserStore';

const checkoutSteps = [
  {
    id: 'delivery',
    label: 'Delivery',
    title: 'Where should we send the artwork?',
  },
  {
    id: 'payment',
    label: 'Payment',
    title: 'Choose the fastest way to pay',
  },
];

const initialTouched = {
  fullName: false,
  mobile: false,
  email: false,
  address: false,
};

const validateField = (field, value) => {
  if (!value.trim()) return 'Required';

  if (field === 'email') {
    return /\S+@\S+\.\S+/.test(value) ? '' : 'Enter a valid email';
  }

  if (field === 'mobile') {
    return /^[+()\-\d\s]{8,}$/.test(value) ? '' : 'Enter a valid mobile number';
  }

  if (field === 'address') {
    return value.trim().length >= 12 ? '' : 'Please add a fuller delivery address';
  }

  return '';
};

const Checkout = () => {
  const navigate = useNavigate();
  const { region, setRegion, REGIONS } = useTheme();

  const cart = useCartStore((state) => state.cart);
  const updateCartQuantity = useCartStore((state) => state.updateQuantity);
  const clearPurchasedItems = useCartStore((state) => state.clearPurchasedItems);

  const currentUser = useUserStore((state) => state.currentUser);
  const savedGuestAddress = useUserStore((state) => state.savedGuestAddress);
  const updateSavedAddress = useUserStore((state) => state.updateSavedAddress);
  const getPreferredAddress = useUserStore((state) => state.getPreferredAddress);

  const {
    source,
    items,
    address,
    paymentMethod,
    saveDetails,
    editingAddress,
    status,
    order,
    beginCartCheckout,
    syncItems,
    updateAddressField,
    setAddress,
    setPaymentMethod,
    setSaveDetails,
    setEditingAddress,
    setStatus,
    updateItemQuantity,
    completeOrder,
  } = useCheckoutStore();

  const [touched, setTouched] = useState(initialTouched);
  const [activeStep, setActiveStep] = useState('delivery');
  const [assistantOpen, setAssistantOpen] = useState(false);

  const isLoggedIn = Boolean(currentUser);
  const preferredAddress = getPreferredAddress();
  const paymentMethods = paymentMethodsByRegion[region] || paymentMethodsByRegion.US;
  const recommendedPaymentId = getPreferredPaymentMethod(region);
  const suggestions = addressSuggestionsByRegion[region] || [];
  const leadTime = regionCopy[region]?.leadTime || 'Delivers in 5-7 business days';
  const hasSavedAddressCard = isLoggedIn && preferredAddress?.fullName && !editingAddress;

  useEffect(() => {
    if (!paymentMethod && paymentMethods.length > 0) {
      setPaymentMethod(recommendedPaymentId);
    }
  }, [paymentMethod, paymentMethods, recommendedPaymentId, setPaymentMethod]);

  useEffect(() => {
    if (!address.fullName && preferredAddress?.fullName) {
      setAddress(preferredAddress);
      setEditingAddress(false);
    }
  }, [address.fullName, preferredAddress, setAddress, setEditingAddress]);

  useEffect(() => {
    if (source === 'cart') {
      const selectedItems = cart.filter((item) => item.selected);

      if (selectedItems.length > 0) {
        if (JSON.stringify(selectedItems) !== JSON.stringify(items)) {
          beginCartCheckout(selectedItems);
        }
      } else if (items.length > 0) {
        syncItems([]);
      }
    }
  }, [beginCartCheckout, cart, items, source, syncItems]);

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );
  const deliveryCharge = getDeliveryCharge(region, subtotal);
  const total = subtotal + deliveryCharge;
  const fieldErrors = {
    fullName: validateField('fullName', address.fullName),
    mobile: validateField('mobile', address.mobile),
    email: validateField('email', address.email),
    address: validateField('address', address.address),
  };
  const isFormValid = Object.values(fieldErrors).every((value) => !value);
  const isDeliveryReady = hasSavedAddressCard || isFormValid;
  const paymentLabel =
    paymentMethods.find((method) => method.id === paymentMethod)?.label || 'Select a payment method';

  const markDeliveryTouched = () => {
    setTouched({
      fullName: true,
      mobile: true,
      email: true,
      address: true,
    });
  };

  const goToPaymentStep = () => {
    markDeliveryTouched();
    if (!isDeliveryReady) return;
    setActiveStep('payment');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    markDeliveryTouched();

    if (!isFormValid || items.length === 0 || !paymentMethod) return;

    setStatus('processing');

    await new Promise((resolve) => window.setTimeout(resolve, 1300));

    const newOrder = {
      id: createOrderId(),
      address,
      items,
      total,
      paymentMethod,
      deliveryLabel: leadTime,
      placedAt: new Date().toISOString(),
    };

    if (saveDetails) {
      updateSavedAddress(address);
    }

    if (source === 'cart') {
      clearPurchasedItems(items.map((item) => item.id));
    }

    completeOrder(newOrder);
  };

  const fillSmartAddress = () => {
    const smartAddress =
      preferredAddress?.fullName
        ? preferredAddress
        : {
            fullName: 'Gallery Collector',
            mobile: region === 'India' ? '+91 98765 43210' : '+1 (415) 555-0162',
            email: region === 'India' ? 'collector@niodart.in' : 'collector@niodart.com',
            address: suggestions[0] || '',
          };

    setAddress(smartAddress);
    setTouched(initialTouched);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
    setPaymentMethod(getPreferredPaymentMethod(event.target.value));
  };

  const handleIncrease = (id, quantity) => {
    updateItemQuantity(id, quantity + 1);
    if (source === 'cart') {
      updateCartQuantity(id, quantity + 1);
    }
  };

  const handleDecrease = (id, quantity) => {
    if (quantity <= 1) return;
    updateItemQuantity(id, quantity - 1);
    if (source === 'cart') {
      updateCartQuantity(id, quantity - 1);
    }
  };

  if (status === 'success' && order) {
    return (
      <div className="container mx-auto px-6 py-8 md:py-12">
        <CheckoutSuccess order={order} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-2xl rounded-[2.25rem] border border-white/10 bg-[color-mix(in_srgb,var(--bg-secondary)_90%,transparent)] p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,0.18)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-accent">Checkout</p>
          <h1 className="mt-4 text-4xl font-serif">Your checkout is empty.</h1>
          <p className="mt-4 text-text-muted">
            Add a piece to your cart or tap Buy Now from any artwork to jump straight back here.
          </p>
          <Link to="/gallery" className="btn-primary mt-8 inline-block rounded-full">
            Return to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-6 md:px-6 md:py-10"
    >
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_400px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="rounded-[2rem] border border-white/10 bg-[color-mix(in_srgb,var(--bg-secondary)_88%,transparent)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-accent">Checkout Flow</p>
                <h2 className="mt-2 text-2xl font-serif">Delivery and payment in two clear steps</h2>
                <p className="mt-2 text-sm text-text-muted">
                  Move through delivery first, then confirm payment with the summary always visible beside you.
                </p>
              </div>

              <label className="relative inline-flex min-w-[190px] flex-col gap-2 text-sm">
                <span className="text-[10px] uppercase tracking-[0.24em] text-text-muted">Region</span>
                <div className="relative">
                  <select
                    value={region}
                    onChange={handleRegionChange}
                    className="w-full appearance-none rounded-full border border-white/10 bg-black/10 px-4 py-3 pr-10 outline-none transition-colors focus:border-accent"
                  >
                    {Object.entries(REGIONS).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                </div>
              </label>
            </div>

            <div className="mt-6 grid gap-3 lg:grid-cols-2">
              {checkoutSteps.map((step, index) => {
                const isActive = activeStep === step.id;
                const isComplete = step.id === 'delivery' ? isDeliveryReady && activeStep === 'payment' : false;
                const canOpen = step.id === 'delivery' || isDeliveryReady;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      if (canOpen) {
                        setActiveStep(step.id);
                      }
                    }}
                    className={`rounded-[1.5rem] border p-4 text-left transition-all ${
                      isActive
                        ? 'border-accent bg-[color-mix(in_srgb,var(--accent)_16%,transparent)]'
                        : 'border-white/8 bg-black/10 hover:border-white/16'
                    } ${!canOpen ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold ${
                          isActive || isComplete
                            ? 'border-accent bg-accent text-[var(--accent-foreground)]'
                            : 'border-white/12 text-text-muted'
                        }`}
                      >
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.24em] text-text-muted">{step.label}</p>
                        <p className="mt-1 font-medium text-text-primary">{step.title}</p>
                      </div>
                      {isComplete && <Check size={16} className="ml-auto text-accent" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {activeStep === 'delivery' ? (
              <div className="mt-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-accent">Delivery</p>
                  <h2 className="mt-2 text-2xl font-serif">Where should we send the artwork?</h2>
                  <p className="mt-2 text-sm text-text-muted">
                    {isLoggedIn
                      ? 'Your saved address is ready. You can keep it or edit it inline.'
                      : 'Guest checkout stays compact. Autofill and address suggestions are enabled.'}
                  </p>
                </div>

                {hasSavedAddressCard ? (
                  <div className="mt-6 rounded-[1.5rem] border border-white/8 bg-black/10 p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-text-muted">Saved Address</p>
                        <p className="mt-3 text-lg font-semibold">{preferredAddress.fullName}</p>
                        <p className="mt-1 text-text-muted">{preferredAddress.address}</p>
                        <p className="mt-1 text-sm text-text-muted">
                          {preferredAddress.mobile} • {preferredAddress.email}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingAddress(true)}
                        className="rounded-full border border-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/5"
                      >
                        Edit Address
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-text-muted">Full Name</span>
                      <input
                        type="text"
                        autoComplete="name"
                        value={address.fullName}
                        onBlur={() => setTouched((state) => ({ ...state, fullName: true }))}
                        onChange={(event) => updateAddressField('fullName', event.target.value)}
                        className={`w-full rounded-[1.2rem] border bg-black/10 px-4 py-3 outline-none transition-colors ${
                          touched.fullName && fieldErrors.fullName ? 'border-red-400/70' : 'border-white/10 focus:border-accent'
                        }`}
                      />
                      {touched.fullName && fieldErrors.fullName && (
                        <p className="mt-2 text-sm text-red-300">{fieldErrors.fullName}</p>
                      )}
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-text-muted">Mobile Number</span>
                      <input
                        type="tel"
                        autoComplete="tel"
                        value={address.mobile}
                        onBlur={() => setTouched((state) => ({ ...state, mobile: true }))}
                        onChange={(event) => updateAddressField('mobile', event.target.value)}
                        className={`w-full rounded-[1.2rem] border bg-black/10 px-4 py-3 outline-none transition-colors ${
                          touched.mobile && fieldErrors.mobile ? 'border-red-400/70' : 'border-white/10 focus:border-accent'
                        }`}
                      />
                      {touched.mobile && fieldErrors.mobile && (
                        <p className="mt-2 text-sm text-red-300">{fieldErrors.mobile}</p>
                      )}
                    </label>

                    <label className="block md:col-span-2">
                      <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-text-muted">Email ID</span>
                      <input
                        type="email"
                        autoComplete="email"
                        value={address.email}
                        onBlur={() => setTouched((state) => ({ ...state, email: true }))}
                        onChange={(event) => updateAddressField('email', event.target.value)}
                        className={`w-full rounded-[1.2rem] border bg-black/10 px-4 py-3 outline-none transition-colors ${
                          touched.email && fieldErrors.email ? 'border-red-400/70' : 'border-white/10 focus:border-accent'
                        }`}
                      />
                      {touched.email && fieldErrors.email && (
                        <p className="mt-2 text-sm text-red-300">{fieldErrors.email}</p>
                      )}
                    </label>

                    <label className="block md:col-span-2">
                      <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-text-muted">Delivery Address</span>
                      <input
                        type="text"
                        list="address-suggestions"
                        autoComplete="street-address"
                        value={address.address}
                        onBlur={() => setTouched((state) => ({ ...state, address: true }))}
                        onChange={(event) => updateAddressField('address', event.target.value)}
                        className={`w-full rounded-[1.2rem] border bg-black/10 px-4 py-3 outline-none transition-colors ${
                          touched.address && fieldErrors.address ? 'border-red-400/70' : 'border-white/10 focus:border-accent'
                        }`}
                      />
                      <datalist id="address-suggestions">
                        {suggestions.map((suggestion) => (
                          <option key={suggestion} value={suggestion} />
                        ))}
                      </datalist>
                      {touched.address && fieldErrors.address ? (
                        <p className="mt-2 text-sm text-red-300">{fieldErrors.address}</p>
                      ) : (
                        <p className="mt-2 text-sm text-text-muted">Pick from suggestions or paste the full delivery address.</p>
                      )}
                    </label>
                  </div>
                )}

                <label className="mt-5 flex items-center gap-3 rounded-[1.25rem] border border-white/8 bg-black/10 px-4 py-3 text-sm">
                  <input
                    type="checkbox"
                    checked={saveDetails}
                    onChange={(event) => setSaveDetails(event.target.checked)}
                    className="h-4 w-4 accent-[var(--accent)]"
                  />
                  <span>
                    Save these details for faster future checkout
                    {!isLoggedIn && savedGuestAddress?.email ? ' on this device' : ''}
                  </span>
                </label>

                <div className="mt-6 flex flex-col gap-3 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-text-muted">
                    Complete delivery details first so the right payment options stay matched to your region.
                  </p>
                  <button
                    type="button"
                    onClick={goToPaymentStep}
                    className="btn-primary rounded-full"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-accent">Payment</p>
                    <h2 className="mt-2 text-2xl font-serif">Choose the fastest way to pay</h2>
                    <p className="mt-2 text-sm text-text-muted">
                      Payment methods change automatically with your region and the recommended option stays highlighted.
                    </p>
                  </div>
                  <div className="rounded-[1.25rem] border border-white/8 bg-black/10 px-4 py-3 text-sm text-text-muted md:max-w-sm">
                    <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-text-muted">Delivery Summary</span>
                    <p className="font-medium text-text-primary">{address.fullName || preferredAddress?.fullName}</p>
                    <p className="mt-1">{address.address || preferredAddress?.address}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <PaymentMethods
                    methods={paymentMethods}
                    value={paymentMethod}
                    onChange={setPaymentMethod}
                  />
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveStep('delivery')}
                    className="rounded-full border border-white/10 px-5 py-3 text-sm transition-colors hover:bg-white/5"
                  >
                    Back to Delivery
                  </button>
                  <p className="text-sm text-text-muted">
                    Paying with <span className="text-text-primary">{paymentLabel}</span> for {REGIONS[region]?.name}.
                  </p>
                </div>
              </div>
            )}
          </section>

          <div className="sticky bottom-4 z-20 rounded-[1.75rem] border border-white/10 bg-[color-mix(in_srgb,var(--bg-primary)_80%,transparent)] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl xl:hidden">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-text-muted">Total</p>
                <p className="mt-1 text-xl font-semibold text-accent">${total.toLocaleString()}</p>
              </div>
              {activeStep === 'delivery' ? (
                <button
                  type="button"
                  onClick={goToPaymentStep}
                  className="btn-primary rounded-full"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={status === 'processing'}
                  className="btn-primary rounded-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'processing' ? 'Processing...' : 'Place Order & Pay'}
                </button>
              )}
            </div>
          </div>

          <div className="hidden xl:block">
            {activeStep === 'delivery' ? (
              <button
                type="button"
                onClick={goToPaymentStep}
                className="btn-primary rounded-full"
              >
                Continue to Payment
              </button>
            ) : (
              <button
                type="submit"
                disabled={status === 'processing'}
                className="btn-primary rounded-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'processing' ? 'Processing...' : 'Place Order & Pay'}
              </button>
            )}
          </div>
        </form>

        <OrderSummary
          items={items}
          subtotal={subtotal}
          deliveryCharge={deliveryCharge}
          total={total}
          leadTime={leadTime}
          source={source}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
      </div>

      <div className="mt-8 flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-black/10 px-4 py-3 text-sm text-text-muted">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/12 text-accent">
          <Building2 size={18} />
        </div>
        <p>
          Inline validation keeps the flow quiet and supportive. Nothing jumps to a new screen until the order is truly confirmed.
        </p>
        <Check size={16} className="ml-auto hidden text-accent sm:block" />
      </div>

      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
        <div className="pointer-events-none mr-1 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[color-mix(in_srgb,var(--bg-primary)_76%,transparent)] px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-text-muted shadow-[0_16px_36px_rgba(0,0,0,0.24)] backdrop-blur-xl">
          <LockKeyhole size={14} />
          Secure one-step checkout
        </div>

        {assistantOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="w-[min(92vw,24rem)] drop-shadow-[0_36px_80px_rgba(0,0,0,0.42)]"
          >
            <div className="rounded-[2rem] shadow-[0_34px_90px_rgba(0,0,0,0.44),0_10px_30px_rgba(0,0,0,0.22)]">
              <CheckoutAssistant
                isLoggedIn={isLoggedIn}
                onFillAddress={fillSmartAddress}
                onRecommendPayment={() => setPaymentMethod(recommendedPaymentId)}
                recommendedPaymentLabel={
                  paymentMethods.find((method) => method.id === recommendedPaymentId)?.label || 'recommended payment'
                }
                leadTime={leadTime}
                regionName={REGIONS[region]?.name || region}
                onClose={() => setAssistantOpen(false)}
              />
            </div>
          </motion.div>
        )}

        <button
          type="button"
          onClick={() => setAssistantOpen((open) => !open)}
          className="group flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-[color-mix(in_srgb,var(--accent)_86%,black)] text-[var(--accent-foreground)] shadow-[0_28px_60px_rgba(0,0,0,0.38),0_10px_24px_rgba(0,0,0,0.18)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
          aria-label={assistantOpen ? 'Hide checkout assistant' : 'Open checkout assistant'}
        >
          <Bot size={26} className="transition-transform group-hover:scale-110" />
        </button>
      </div>
    </motion.div>
  );
};

export default Checkout;
