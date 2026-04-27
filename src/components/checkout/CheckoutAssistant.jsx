import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wand2, X } from 'lucide-react';

const buildAssistantReply = ({
  query,
  isLoggedIn,
  leadTime,
  regionName,
  recommendedPaymentLabel,
}) => {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return 'Ask about delivery time, payment options, address editing, or how checkout works.';
  }

  if (
    normalized.includes('delivery') ||
    normalized.includes('arrive') ||
    normalized.includes('ship') ||
    normalized.includes('shipping') ||
    normalized.includes('when')
  ) {
    return `For ${regionName}, the current delivery estimate is ${leadTime}. The full timing updates before the order is confirmed.`;
  }

  if (
    normalized.includes('payment') ||
    normalized.includes('pay') ||
    normalized.includes('card') ||
    normalized.includes('upi') ||
    normalized.includes('paypal') ||
    normalized.includes('wallet')
  ) {
    return `${recommendedPaymentLabel} is the recommended option for ${regionName} right now, but you can still switch methods in the payment step before placing the order.`;
  }

  if (
    normalized.includes('address') ||
    normalized.includes('edit') ||
    normalized.includes('change') ||
    normalized.includes('update')
  ) {
    return isLoggedIn
      ? 'You can keep your saved address or tap Edit Address in the delivery step to change it before payment.'
      : 'Use Fill Smart Address for a quick starting point, then adjust the delivery fields before moving to payment.';
  }

  if (
    normalized.includes('safe') ||
    normalized.includes('secure') ||
    normalized.includes('trust')
  ) {
    return 'Checkout stays on one guided flow with inline validation, and nothing is finalized until you review payment and place the order.';
  }

  if (
    normalized.includes('summary') ||
    normalized.includes('total') ||
    normalized.includes('price') ||
    normalized.includes('cost')
  ) {
    return 'Your order summary on the right stays visible during checkout, including subtotal, delivery charge, and the final total.';
  }

  return 'I can help with delivery timing, payment choices, address changes, checkout steps, or understanding the order summary.';
};

const CheckoutAssistant = ({
  isLoggedIn,
  onFillAddress,
  onRecommendPayment,
  recommendedPaymentLabel,
  leadTime,
  regionName,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAsk = () => {
    setAnswer(
      buildAssistantReply({
        query,
        isLoggedIn,
        leadTime,
        regionName,
        recommendedPaymentLabel,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAsk();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-[2rem] border border-white/10 bg-[color-mix(in_srgb,var(--bg-secondary)_86%,transparent)] p-5 backdrop-blur-xl"
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/10 p-2 text-text-muted transition-colors hover:border-accent/40 hover:bg-white/5 hover:text-text-primary"
          aria-label="Close checkout assistant"
        >
          <X size={15} />
        </button>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.35em] text-accent">
            <Sparkles size={14} />
            Checkout Assistant
          </div>
          <p className="max-w-xl text-sm text-text-muted">
            {isLoggedIn
              ? 'Your saved profile is ready. I can refresh the address and keep the fastest payment option selected.'
              : 'I can prefill a polished delivery address and switch you to the quickest payment option for your region.'}
          </p>
        </div>
        <div className="hidden rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-text-muted md:block">
          AI Assist
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onFillAddress}
          className="flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm transition-all hover:border-accent hover:bg-white/5"
        >
          <Wand2 size={16} />
          Fill Smart Address
        </button>
        <button
          type="button"
          onClick={onRecommendPayment}
          className="flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold transition-transform active:scale-[0.98]"
          style={{ color: 'var(--accent-foreground)' }}
        >
          <Sparkles size={16} />
          Use {recommendedPaymentLabel}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <label className="block">
          <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-text-muted">
            Ask Checkout Assistant
          </span>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ask about delivery, payment, address, or totals"
              className="w-full rounded-[1.2rem] border border-white/10 bg-black/10 px-4 py-3 text-sm outline-none transition-colors placeholder:text-text-muted focus:border-accent"
            />
            <button
              type="submit"
              className="rounded-full border border-accent bg-white px-5 py-3 text-sm font-semibold text-accent transition-all hover:bg-accent/8 active:scale-[0.98]"
            >
              Ask
            </button>
          </div>
        </label>

        {answer && (
          <div className="rounded-[1.25rem] border border-white/10 bg-black/10 px-4 py-3 text-sm text-text-muted">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-accent">
              Assistant Reply
            </span>
            <p>{answer}</p>
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default CheckoutAssistant;
