import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import useCartStore from '../../store/useCartStore';
import useWishlistStore from '../../store/useWishlistStore';

const WishlistDrawer = () => {
  const { addToCart } = useCartStore();
  const {
    wishlist,
    isWishlistOpen,
    toggleWishlistPanel,
    removeFromWishlist,
  } = useWishlistStore();

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleWishlistPanel}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-bg-secondary z-[70] shadow-2xl border-l border-white/5 flex flex-col"
          >
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-bg-primary">
              <h2 className="text-xl font-serif">Your Wishlist</h2>
              <button
                onClick={toggleWishlistPanel}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-40">
                  <Heart size={48} strokeWidth={1} />
                  <p className="tracking-widest uppercase text-sm">Your wishlist is empty</p>
                  <button
                    onClick={toggleWishlistPanel}
                    className="text-accent underline underline-offset-4 hover:text-accent-hover"
                  >
                    Start browsing
                  </button>
                </div>
              ) : (
                wishlist.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex space-x-4 group"
                  >
                    <div className="w-24 h-24 overflow-hidden border border-white/5 bg-bg-primary flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <h3 className="text-sm font-medium tracking-wide uppercase">{item.title}</h3>
                          <p className="text-xs text-text-muted mt-1">{item.medium}</p>
                        </div>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-text-muted hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-3 gap-3">
                        <span className="text-sm font-semibold text-accent">${item.price.toLocaleString()}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="inline-flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-[0.15em] border border-white/10 hover:bg-white/5 transition-colors"
                        >
                          <ShoppingCart size={14} />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistDrawer;
