import React, { useMemo } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, ShoppingBag, Sparkles, Truck } from 'lucide-react';
import artworks from '../data/artworks';
import useCartStore from '../store/useCartStore';
import useCheckoutStore from '../store/useCheckoutStore';
import useWishlistStore from '../store/useWishlistStore';

const ProductDetail = () => {
  const { artworkId } = useParams();
  const navigate = useNavigate();
  const artwork = useMemo(
    () => artworks.find((item) => String(item.id) === artworkId),
    [artworkId]
  );

  const addToCart = useCartStore((state) => state.addToCart);
  const beginBuyNow = useCheckoutStore((state) => state.beginBuyNow);
  const { toggleWishlist, wishlist } = useWishlistStore();

  if (!artwork) {
    return <Navigate to="/gallery" replace />;
  }

  const isWishlisted = wishlist.some((item) => item.id === artwork.id);

  const handleBuyNow = () => {
    beginBuyNow(artwork);
    navigate('/checkout');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-6 py-8 md:py-12"
    >
      <Link
        to="/gallery"
        className="mb-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={16} />
        Back to gallery
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="overflow-hidden rounded-[2.25rem] border border-white/8 bg-black/20 shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-accent">
            <Sparkles size={14} />
            Product Detail
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-text-muted">
              {artwork.category} Collection
            </p>
            <h1 className="mt-3 text-4xl font-serif md:text-5xl">{artwork.title}</h1>
            <p className="mt-4 text-3xl font-semibold text-accent">${artwork.price.toLocaleString()}</p>
          </div>

          <p className="max-w-xl text-base leading-7 text-text-muted">{artwork.description}</p>

          <div className="grid gap-4 rounded-[2rem] border border-white/8 bg-white/[0.03] p-5 sm:grid-cols-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-text-muted">Medium</p>
              <p className="mt-2 font-medium">{artwork.medium}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-text-muted">Size</p>
              <p className="mt-2 font-medium">{artwork.size}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-text-muted">Orientation</p>
              <p className="mt-2 font-medium">{artwork.orientation}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-text-muted">Authenticity</p>
              <p className="mt-2 font-medium">Certificate of Origin</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/12 text-accent">
                <Truck size={20} />
              </div>
              <div>
                <p className="font-medium">Insured, gallery-grade delivery</p>
                <p className="text-sm text-text-muted">Ships within 3 to 7 business days.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <button
              type="button"
              onClick={handleBuyNow}
              className="btn-primary rounded-full"
            >
              Buy Now
            </button>
            <button
              type="button"
              onClick={() => addToCart(artwork)}
              className="rounded-full border border-white/10 px-6 py-3 transition-colors hover:bg-white/5"
            >
              <span className="inline-flex items-center gap-2">
                <ShoppingBag size={16} />
                Add to Cart
              </span>
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(artwork)}
              className={`rounded-full border px-5 py-3 transition-colors ${
                isWishlisted ? 'border-red-400 bg-red-500/15 text-red-300' : 'border-white/10 hover:bg-white/5'
              }`}
            >
              <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
