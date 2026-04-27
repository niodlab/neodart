import React from 'react';
import { motion } from 'framer-motion';

const PaymentMethods = ({ methods, value, onChange }) => {
  return (
    <div className="grid gap-3">
      {methods.map((method) => {
        const Icon = method.icon;
        const isActive = value === method.id;

        return (
          <motion.button
            key={method.id}
            type="button"
            onClick={() => onChange(method.id)}
            whileTap={{ scale: 0.99 }}
            className={`relative flex items-center justify-between rounded-[1.5rem] border px-4 py-4 text-left transition-all ${
              isActive
                ? 'border-accent bg-[color-mix(in_srgb,var(--accent)_18%,transparent)]'
                : 'border-white/8 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  isActive ? 'bg-accent/90' : 'bg-white/6'
                }`}
                style={isActive ? { color: 'var(--accent-foreground)' } : undefined}
              >
                <Icon size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{method.label}</span>
                  {method.recommended && (
                    <span className="rounded-full border border-accent/40 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-text-muted">{method.helper}</p>
              </div>
            </div>
            <span
              className={`h-5 w-5 rounded-full border transition-all ${
                isActive ? 'border-accent bg-accent shadow-[0_0_0_4px_rgba(255,255,255,0.04)]' : 'border-white/20'
              }`}
            />
          </motion.button>
        );
      })}
    </div>
  );
};

export default PaymentMethods;
