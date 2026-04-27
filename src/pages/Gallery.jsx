import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ChevronDown, LayoutGrid, List, Search, X } from 'lucide-react';
import artworks from '../data/artworks.json';
import ProductCard from '../components/gallery/ProductCard';
import ProductModal from '../components/gallery/ProductModal';
import Skeleton from '../components/gallery/Skeleton';
import useGalleryStore from '../store/useGalleryStore';

const Gallery = () => {
  const { filters, setFilter, sortBy, setSortBy, resetFilters, searchQuery, setSearchQuery } = useGalleryStore();
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredArtworks = useMemo(() => {
    return artworks
      .filter((art) => {
        const categoryMatch = filters.category === 'All' || art.category === filters.category;
        const sizeMatch = filters.size === 'All' || art.size === filters.size;
        const qMatch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      art.description.toLowerCase().includes(searchQuery.toLowerCase());
        return categoryMatch && sizeMatch && qMatch;
      })
      .sort((a, b) => {
        if (sortBy === 'Price: Low to High') return a.price - b.price;
        if (sortBy === 'Price: High to Low') return b.price - a.price;
        if (sortBy === 'Popularity') return b.popularity - a.popularity;
        return new Date(b.date) - new Date(a.date);
      });
  }, [filters, sortBy, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 py-12"
    >
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 space-y-8 md:space-y-0">
        <div className="space-y-4">
          <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold">The Collection</span>
          <h1 className="text-5xl md:text-6xl">Gallery <br /><span className="italic font-serif text-accent">{filters.category === 'All' ? 'Curated' : filters.category}</span></h1>
        </div>
        
        <div className="w-full md:w-96 flex flex-col space-y-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-accent transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH COLLECTION" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bg-secondary border border-white/5 py-4 pl-12 pr-4 text-xs tracking-widest focus:outline-none focus:border-accent group-hover:border-white/20 transition-all uppercase"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
             <span className="text-text-muted">{isLoading ? 'Scanning...' : `${filteredArtworks.length} Masterpieces Found`}</span>
             <button 
               onClick={() => setIsFilterOpen(!isFilterOpen)}
               className={`flex items-center space-x-2 px-6 py-3 transition-all ${isFilterOpen ? 'bg-accent' : 'border border-white/5 hover:bg-white/5'}`}
               style={isFilterOpen ? { color: 'var(--accent-foreground)' } : undefined}
             >
               <SlidersHorizontal size={14} />
               <span>{isFilterOpen ? 'Close' : 'Filter & Sort'}</span>
             </button>
          </div>
        </div>
      </div>

      {/* Filters Overlay */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-12 border-b border-white/5 bg-bg-secondary/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 p-8">
              {/* Category */}
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent">Category</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => {
                        setFilter('category', cat);
                        setIsLoading(true);
                        setTimeout(() => setIsLoading(false), 800);
                      }}
                      className={`px-4 py-2 text-[10px] uppercase tracking-widest transition-all ${filters.category === cat ? 'bg-white text-black' : 'hover:bg-white/5 text-text-muted border border-white/5'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent">Dimensions</h4>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => {
                        setFilter('size', size);
                        setIsLoading(true);
                        setTimeout(() => setIsLoading(false), 800);
                      }}
                      className={`px-4 py-2 text-[10px] uppercase tracking-widest transition-all ${filters.size === size ? 'bg-white text-black' : 'hover:bg-white/5 text-text-muted border border-white/5'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent">Sort Order</h4>
                <div className="space-y-2">
                  {sorts.map(sort => (
                    <button 
                      key={sort}
                      onClick={() => setSortBy(sort)}
                      className={`block w-full text-left py-1 text-[10px] uppercase tracking-widest transition-all ${sortBy === sort ? 'text-white pl-2 border-l-2 border-accent' : 'text-text-muted hover:text-white hover:pl-2'}`}
                    >
                      {sort}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              <div className="flex items-end justify-end">
                <button 
                  onClick={() => {
                    resetFilters();
                    setIsLoading(true);
                    setTimeout(() => setIsLoading(false), 800);
                  }}
                  className="text-[10px] uppercase tracking-[0.2em] underline underline-offset-8 text-text-muted hover:text-accent font-bold"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 lg:gap-16">
          {[...Array(8)].map((_, i) => <Skeleton key={i} />)}
        </div>
      ) : filteredArtworks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 lg:gap-16">
          {filteredArtworks.map((artwork) => (
            <ProductCard 
              key={artwork.id} 
              artwork={artwork} 
              onOpenModal={(art) => setSelectedArtwork(art)}
            />
          ))}
        </div>
      ) : (
        <div className="h-[40vh] flex flex-col items-center justify-center space-y-6 opacity-40">
          <Search size={48} strokeWidth={1} />
          <p className="text-sm uppercase tracking-widest">No masterpieces found for your criteria</p>
          <button onClick={resetFilters} className="text-accent underline underline-offset-4 font-bold">Show all artwork</button>
        </div>
      )}

      {/* Modal */}
      <ProductModal 
        artwork={selectedArtwork} 
        isOpen={!!selectedArtwork} 
        onClose={() => setSelectedArtwork(null)} 
      />
    </motion.div>
  );
};

const categories = ['All', 'Abstract', 'Landscape', 'Portrait'];
const sizes = ['All', 'Small', 'Medium', 'Large'];
const sorts = ['New arrivals', 'Price: Low to High', 'Price: High to Low', 'Popularity'];

export default Gallery;
