import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Share2, ZoomIn, ZoomOut, ShoppingCart, Expand } from 'lucide-react';
import useCartStore from '../../store/useCartStore';
import useCheckoutStore from '../../store/useCheckoutStore';
import useWishlistStore from '../../store/useWishlistStore';

const ProductModal = ({ artwork, isOpen, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const beginBuyNow = useCheckoutStore((state) => state.beginBuyNow);
  const { toggleWishlist, wishlist } = useWishlistStore();
  const [zoom, setZoom] = useState(1);

  if (!artwork) return null;
  
  const isWishlisted = wishlist.some(item => item.id === artwork.id);

  const handleBuyNow = () => {
    beginBuyNow(artwork);
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[80]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
          >
            <div className="bg-bg-secondary w-full max-w-6xl max-h-[90vh] overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl border border-white/5 relative group">
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-[100] p-3 glass rounded-full hover:bg-white hover:text-black transition-all"
              >
                <X size={20} />
              </button>

              {/* Left Side: Image Viewer */}
              <div className="relative h-[40vh] lg:h-full bg-black overflow-hidden flex items-center justify-center">
                <motion.div 
                  className="w-full h-full cursor-zoom-in"
                  whileTap={{ cursor: 'grabbing' }}
                >
                  <img 
                    src={artwork.image} 
                    alt={artwork.title}
                    className={`w-full h-full object-contain transition-transform duration-500`}
                    style={{ transform: `scale(${zoom})` }}
                  />
                </motion.div>
                
                {/* Image Controls */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-4 glass px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setZoom(z => Math.max(1, z - 0.5))} className="hover:text-accent transition-colors"><ZoomOut size={18} /></button>
                  <div className="w-[1px] h-4 bg-white/10" />
                  <button onClick={() => setZoom(1)} className="text-[10px] uppercase tracking-widest hover:text-accent transition-colors">Reset</button>
                  <div className="w-[1px] h-4 bg-white/10" />
                  <button onClick={() => setZoom(z => Math.min(3, z + 0.5))} className="hover:text-accent transition-colors"><ZoomIn size={18} /></button>
                </div>
              </div>

              {/* Right Side: Details */}
              <div className="p-8 lg:p-12 overflow-y-auto flex flex-col justify-between space-y-12">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-accent uppercase tracking-[0.3em] text-[10px] font-bold">
                      <span className="w-8 h-[1px] bg-accent" />
                      <span>{artwork.category} Collection</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-serif leading-tight">{artwork.title}</h2>
                    <p className="text-2xl text-accent font-semibold">${artwork.price.toLocaleString()}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-8 text-sm border-y border-white/5 py-8 uppercase tracking-widest font-medium">
                    <div className="space-y-2">
                       <p className="text-text-muted text-[10px] tracking-[0.2em] mb-1">Medium</p>
                       <p>{artwork.medium}</p>
                    </div>
                    <div className="space-y-2">
                       <p className="text-text-muted text-[10px] tracking-[0.2em] mb-1">Size</p>
                       <p>{artwork.size}</p>
                    </div>
                    <div className="space-y-2">
                       <p className="text-text-muted text-[10px] tracking-[0.2em] mb-1">Dimensions</p>
                       <p>{artwork.orientation === 'Vertical' ? '36" x 48"' : artwork.orientation === 'Horizontal' ? '48" x 36"' : '40" x 40"'}</p>
                    </div>
                    <div className="space-y-2">
                       <p className="text-text-muted text-[10px] tracking-[0.2em] mb-1">Authenticity</p>
                       <p>Certificate of Origin</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-accent">Artist's Vision</h4>
                    <p className="text-text-muted leading-relaxed italic text-sm">
                      "{artwork.description}"
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                    <button
                      onClick={handleBuyNow}
                      className="btn-primary flex items-center justify-center space-x-3"
                    >
                      <Expand size={18} />
                      <span>Buy Now</span>
                    </button>
                    <button 
                      onClick={() => addToCart(artwork)}
                      className="flex items-center justify-center space-x-3 rounded-full border border-white/10 px-4 py-3 transition-colors hover:bg-white/5"
                    >
                      <ShoppingCart size={20} />
                      <span>Add to Cart</span>
                    </button>
                    <button 
                      onClick={() => toggleWishlist(artwork)}
                      className={`p-4 border border-white/10 transition-all group ${isWishlisted ? 'bg-red-500 text-white border-red-500' : 'hover:bg-white/5 hover:text-red-400'}`}
                    >
                      <Heart size={20} className={`${isWishlisted ? 'fill-current' : 'group-active:scale-125'} transition-transform`} />
                    </button>
                    <button className="p-4 border border-white/10 hover:bg-white/5 transition-all">
                      <Share2 size={20} />
                    </button>
                  </div>
                  <Link
                    to={`/gallery/${artwork.id}`}
                    onClick={onClose}
                    className="block text-center text-[11px] uppercase tracking-[0.26em] text-text-muted transition-colors hover:text-accent"
                  >
                    View Full Product Detail
                  </Link>
                  <p className="text-[10px] text-center text-text-muted uppercase tracking-[0.2em]">
                    Estimated Delivery: 7-14 Business Days
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
