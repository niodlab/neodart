import {
  BadgeCheck,
  Building2,
  CreditCard,
  Landmark,
  Sparkles,
  Wallet,
} from 'lucide-react';

export const paymentMethodsByRegion = {
  India: [
    {
      id: 'upi',
      label: 'UPI',
      helper: 'Fastest on mobile',
      icon: Sparkles,
      recommended: true,
    },
    {
      id: 'card',
      label: 'Cards',
      helper: 'Visa, Mastercard, Amex',
      icon: CreditCard,
      recommended: false,
    },
    {
      id: 'netbanking',
      label: 'Net Banking',
      helper: 'All major banks',
      icon: Landmark,
      recommended: false,
    },
  ],
  US: [
    {
      id: 'card',
      label: 'Cards',
      helper: 'Visa, Mastercard, Amex',
      icon: CreditCard,
      recommended: true,
    },
    {
      id: 'paypal',
      label: 'PayPal',
      helper: 'Buyer protection enabled',
      icon: BadgeCheck,
      recommended: false,
    },
  ],
  MiddleEast: [
    {
      id: 'card',
      label: 'Cards',
      helper: 'International and local cards',
      icon: CreditCard,
      recommended: false,
    },
    {
      id: 'wallet',
      label: 'Wallets',
      helper: 'Regional wallet checkout',
      icon: Wallet,
      recommended: true,
    },
  ],
};

export const addressSuggestionsByRegion = {
  India: [
    '14 Cathedral Road, Chennai, Tamil Nadu 600086',
    '221B Residency Road, Bengaluru, Karnataka 560025',
    '9 Kala Ghoda Lane, Mumbai, Maharashtra 400001',
  ],
  US: [
    '245 Greene Street, New York, NY 10003',
    '1801 Ocean Avenue, Santa Monica, CA 90401',
    '311 Gallery Row, Chicago, IL 60607',
  ],
  MiddleEast: [
    '18 Al Wasl Road, Jumeirah, Dubai',
    '72 Corniche Street, Abu Dhabi',
    '24 Pearl District, Doha',
  ],
};

export const getPreferredPaymentMethod = (region) =>
  paymentMethodsByRegion[region]?.find((method) => method.recommended)?.id ||
  paymentMethodsByRegion[region]?.[0]?.id ||
  '';

export const getDeliveryCharge = (region, subtotal) => {
  if (subtotal >= 1800) return 0;

  const regionCharges = {
    India: 12,
    US: 28,
    MiddleEast: 24,
  };

  return regionCharges[region] ?? 20;
};

export const createOrderId = () =>
  `NIO-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Date.now()
    .toString()
    .slice(-6)}`;

export const regionCopy = {
  India: {
    leadTime: 'Delivers in 3-5 business days',
    support: 'Best with UPI and mobile autofill',
  },
  US: {
    leadTime: 'Delivers in 5-7 business days',
    support: 'Card checkout is preselected for speed',
  },
  MiddleEast: {
    leadTime: 'Delivers in 4-6 business days',
    support: 'Wallets are highlighted for faster approval',
  },
};

export const regionIcons = {
  India: Building2,
  US: Building2,
  MiddleEast: Building2,
};
