import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, Minus, Plus, ShoppingBag, Square, Trash2, X } from 'lucide-react';
import useCartStore from '../../store/useCartStore';
import useCheckoutStore from '../../store/useCheckoutStore';

const CartDrawer = () => {
  const navigate = useNavigate();
  const {
    cart,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    toggleItemSelection,
    setAllSelections,
    getSelectedItems,
    getSelectedTotalPrice,
  } = useCartStore();
  const beginCartCheckout = useCheckoutStore((state) => state.beginCartCheckout);
  const selectedItems = getSelectedItems();
  const allSelected = cart.length > 0 && selectedItems.length === cart.length;

  const handleCheckout = () => {
    if (selectedItems.length === 0) return;
    beginCartCheckout(selectedItems);
    toggleCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-bg-secondary z-[70] shadow-2xl border-l border-white/5 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-bg-primary">
              <h2 className="text-xl font-serif">Your Collection</h2>
              <button 
                onClick={toggleCart}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-40">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="tracking-widest uppercase text-sm">Your gallery is empty</p>
                  <button 
                    onClick={toggleCart}
                    className="text-accent underline underline-offset-4 hover:text-accent-hover"
                  >
                    Start browsing
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3">
                    <button
                      onClick={() => setAllSelections(!allSelected)}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-text-muted transition-colors hover:text-accent"
                    >
                      {allSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                      {allSelected ? 'Deselect all' : 'Select all'}
                    </button>
                    <span className="text-xs uppercase tracking-[0.22em] text-text-muted">
                      {selectedItems.length} selected
                    </span>
                  </div>

                  {cart.map((item) => (
                    <motion.div 
                      layout
                      key={item.id} 
                      className={`flex space-x-4 rounded-[1.5rem] border p-3 transition-colors group ${
                        item.selected ? 'border-accent/30 bg-white/[0.04]' : 'border-white/5 bg-transparent'
                      }`}
                    >
                      <button
                        onClick={() => toggleItemSelection(item.id)}
                        className="pt-1 text-text-muted hover:text-accent"
                        aria-label={`Select ${item.title}`}
                      >
                        {item.selected ? <CheckSquare size={18} /> : <Square size={18} />}
                      </button>
                      <div className="w-24 h-24 overflow-hidden border border-white/5 bg-bg-primary flex-shrink-0 rounded-2xl">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-sm font-medium tracking-wide uppercase">{item.title}</h3>
                            <p className="text-xs text-text-muted mt-1">{item.medium}</p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-text-muted hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-white/10 rounded-sm">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-white/5 transition-colors disabled:opacity-20"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-white/5 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="text-sm font-semibold">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-white/5 bg-bg-primary space-y-6">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-text-muted font-serif">Selected Total</span>
                  <span className="font-semibold text-accent">${getSelectedTotalPrice().toLocaleString()}</span>
                </div>
                <div className="space-y-3">
                  <button
                    className="w-full btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={selectedItems.length === 0}
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </button>
                  <p className="text-[10px] text-center text-text-muted uppercase tracking-[0.2em]">
                    Selected artworks move into checkout instantly
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
