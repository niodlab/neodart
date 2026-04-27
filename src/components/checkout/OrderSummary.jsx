import React from 'react';
import { Minus, Plus, Truck } from 'lucide-react';

const OrderSummary = ({
  items,
  subtotal,
  deliveryCharge,
  total,
  leadTime,
  source,
  onIncrease,
  onDecrease,
}) => {
  return (
    <aside className="space-y-5">
      <div className="sticky top-28 rounded-[2rem] border border-white/10 bg-[color-mix(in_srgb,var(--bg-secondary)_88%,transparent)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-accent">
              Order Summary
            </p>
            <h2 className="mt-2 text-2xl font-serif">Collected pieces</h2>
          </div>
          <div className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-text-muted">
            {items.length} item{items.length > 1 ? 's' : ''}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-[1.5rem] border border-white/8 bg-black/10 p-3">
              <div className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-24 w-20 rounded-[1rem] object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.24em] text-text-muted">
                        {item.medium}
                      </p>
                    </div>
                    <span className="whitespace-nowrap text-sm font-semibold text-accent">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xs text-text-muted">{item.size}</p>
                    <div className="flex items-center gap-2 rounded-full border border-white/10 px-2 py-1">
                      <button
                        type="button"
                        onClick={() => onDecrease(item.id, item.quantity)}
                        className="rounded-full p-1 hover:bg-white/5"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="min-w-6 text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onIncrease(item.id, item.quantity)}
                        className="rounded-full p-1 hover:bg-white/5"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3 border-t border-white/8 pt-5">
          <div className="flex items-center justify-between text-sm text-text-muted">
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-text-muted">
            <span>Delivery</span>
            <span>{deliveryCharge === 0 ? 'Free' : `$${deliveryCharge.toLocaleString()}`}</span>
          </div>
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Total</span>
            <span className="text-accent">${total.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-4 text-sm text-text-muted">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15 text-accent">
              <Truck size={18} />
            </div>
            <div>
              <p className="font-medium text-text-primary">{leadTime}</p>
              <p className="text-xs uppercase tracking-[0.22em]">
                {source === 'buy-now' ? 'Direct checkout' : 'From your cart'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default OrderSummary;
