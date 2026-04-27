import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';

const fireworkPalette = [
  '#f97316',
  '#facc15',
  '#fb7185',
  '#38bdf8',
  '#a78bfa',
  '#34d399',
];

const fireworks = [
  { id: 'fw-1', left: '18%', top: '18%', delay: 0.05, scale: 1.05 },
  { id: 'fw-2', left: '50%', top: '10%', delay: 0.22, scale: 1.25 },
  { id: 'fw-3', left: '78%', top: '22%', delay: 0.4, scale: 1.1 },
];

const burstParticles = fireworks.flatMap((firework, fireworkIndex) =>
  Array.from({ length: 14 }, (_, particleIndex) => ({
    id: `${firework.id}-${particleIndex}`,
    left: firework.left,
    top: firework.top,
    delay: firework.delay + particleIndex * 0.015,
    duration: 0.95 + (particleIndex % 4) * 0.12,
    angle: (360 / 14) * particleIndex,
    distance: 68 + (particleIndex % 5) * 16 + fireworkIndex * 6,
    color: fireworkPalette[(particleIndex + fireworkIndex) % fireworkPalette.length],
    scale: firework.scale,
  }))
);

const sparkleRain = Array.from({ length: 26 }, (_, index) => ({
  id: index,
  left: `${2 + index * 3.8}%`,
  delay: 0.12 + index * 0.04,
  duration: 1.45 + (index % 5) * 0.16,
  color: fireworkPalette[index % fireworkPalette.length],
}));

const CheckoutSuccess = ({ order }) => {
  return (
    <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%),linear-gradient(180deg,color-mix(in_srgb,var(--accent)_10%,var(--bg-secondary))_0%,var(--bg-secondary)_100%)] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.22)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {fireworks.map((firework, index) => (
          <motion.span
            key={firework.id}
            className="absolute h-24 w-1 origin-bottom rounded-full blur-[1px]"
            style={{
              left: firework.left,
              top: firework.top,
              background: `linear-gradient(180deg, rgba(255,255,255,0), ${fireworkPalette[index * 2]})`,
            }}
            initial={{ scaleY: 0, opacity: 0, y: 42 }}
            animate={{ scaleY: [0, 1, 0.2], opacity: [0, 0.95, 0], y: [42, -6, -14] }}
            transition={{
              duration: 0.65,
              delay: firework.delay,
              repeat: Infinity,
              repeatDelay: 1.25,
              ease: 'easeOut',
            }}
          />
        ))}

        {burstParticles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute h-3.5 w-3.5 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
              background: particle.color,
              boxShadow: `0 0 18px ${particle.color}`,
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.2 }}
            animate={{
              x: [
                0,
                Math.cos((particle.angle * Math.PI) / 180) * particle.distance * particle.scale,
              ],
              y: [
                0,
                Math.sin((particle.angle * Math.PI) / 180) * particle.distance * particle.scale,
              ],
              opacity: [0, 1, 0],
              scale: [0.3, 1.15, 0.2],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatDelay: 1.15,
              ease: 'easeOut',
            }}
          />
        ))}

        {sparkleRain.map((piece) => (
          <motion.span
            key={piece.id}
            className="absolute top-0 h-4 w-2 rounded-full"
            style={{
              left: piece.left,
              background: piece.color,
              boxShadow: `0 0 12px ${piece.color}`,
            }}
            initial={{ y: -30, opacity: 0, rotate: 0, scale: 0.8 }}
            animate={{
              y: [0, 165, 325],
              x: [0, (piece.id % 2 === 0 ? 12 : -12), 0],
              opacity: [0, 1, 0],
              rotate: [0, 160, 320],
              scale: [0.8, 1, 0.6],
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              repeat: Infinity,
              repeatDelay: 0.35,
              ease: 'easeIn',
            }}
          />
        ))}

        <motion.div
          className="absolute inset-x-[18%] top-8 h-40 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22),transparent_60%)] blur-3xl"
          animate={{ opacity: [0.15, 0.5, 0.18], scale: [0.92, 1.08, 0.96] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-accent">
          <Sparkles size={14} />
          Payment Successful
        </div>

        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-serif md:text-5xl">Your artwork is on its way.</h1>
            <p className="mt-4 max-w-2xl text-base text-text-muted">
              The order is confirmed, the payment is captured, and our gallery team has started preparing the piece for insured delivery.
            </p>
          </div>
          <div className="flex h-18 w-18 items-center justify-center rounded-[1.75rem] bg-accent text-accent-foreground shadow-[0_20px_45px_rgba(0,0,0,0.18)]">
            <CheckCircle2 size={34} />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/8 bg-black/10 p-4">
            <p className="text-[10px] uppercase tracking-[0.28em] text-text-muted">Order ID</p>
            <p className="mt-2 text-lg font-semibold">{order.id}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/8 bg-black/10 p-4">
            <p className="text-[10px] uppercase tracking-[0.28em] text-text-muted">Payment Status</p>
            <p className="mt-2 text-lg font-semibold text-accent">Success</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/8 bg-black/10 p-4">
            <p className="text-[10px] uppercase tracking-[0.28em] text-text-muted">Delivery</p>
            <p className="mt-2 text-lg font-semibold">{order.deliveryLabel}</p>
          </div>
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-white/8 bg-black/10 p-5">
          <p className="text-[10px] uppercase tracking-[0.28em] text-text-muted">Delivering To</p>
          <p className="mt-3 text-base font-medium">{order.address.fullName}</p>
          <p className="mt-1 text-sm text-text-muted">{order.address.address}</p>
          <p className="mt-1 text-sm text-text-muted">
            {order.address.mobile} • {order.address.email}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/gallery" className="btn-primary rounded-full text-center">
            Continue Shopping
          </Link>
          <Link
            to="/checkout"
            className="rounded-full border border-white/10 px-8 py-3 text-center transition-colors hover:bg-white/5"
          >
            View Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
