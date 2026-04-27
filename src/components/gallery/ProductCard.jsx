import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, ShoppingCart, Heart } from 'lucide-react';
import useCartStore from '../../store/useCartStore';
import useWishlistStore from '../../store/useWishlistStore';

const ProductCard = ({ artwork, onOpenModal }) => {
  const { addToCart } = useCartStore();
  const { toggleWishlist, wishlist } = useWishlistStore();
  
  const isWishlisted = wishlist.some(item => item.id === artwork.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-bg-secondary canvas-frame border-0">
        <Link to={`/gallery/${artwork.id}`} className="block h-full">
          <img 
            src={artwork.image} 
            alt={artwork.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out grayscale-[20%] group-hover:grayscale-0"
          />
        </Link>
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          <button 
            onClick={() => onOpenModal(artwork)}
            className="p-3 bg-white text-black rounded-full hover:bg-accent transition-colors shadow-lg"
            title="Quick View"
          >
            <Eye size={20} />
          </button>
          <button 
            onClick={() => addToCart(artwork)}
            className="p-3 bg-accent rounded-full hover:bg-white transition-colors shadow-lg"
            style={{ color: 'var(--accent-foreground)' }}
            title="Add to Collection"
          >
            <ShoppingCart size={20} />
          </button>
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={() => toggleWishlist(artwork)}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md border border-white/10 transition-all ${isWishlisted ? 'bg-red-500 text-white' : 'bg-black/40 text-white hover:bg-white hover:text-black'}`}
        >
          <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-[10px] uppercase tracking-widest text-white border border-white/10">
            {artwork.category}
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex justify-between items-start">
          <Link
            to={`/gallery/${artwork.id}`}
            className="text-lg font-serif tracking-wide transition-colors group-hover:text-accent"
          >
            {artwork.title}
          </Link>
          <span className="text-accent font-semibold">${artwork.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-[10px] text-text-muted uppercase tracking-[0.2em]">
          <span>{artwork.medium}</span>
          <span>{artwork.size}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
