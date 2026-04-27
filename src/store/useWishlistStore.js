import { create } from 'zustand';

const useWishlistStore = create((set, get) => ({
  wishlist: [],
  isWishlistOpen: false,

  toggleWishlistPanel: () => set((state) => ({ isWishlistOpen: !state.isWishlistOpen })),
  openWishlist: () => set({ isWishlistOpen: true }),
  closeWishlist: () => set({ isWishlistOpen: false }),
  
  toggleWishlist: (artwork) => {
    const { wishlist } = get();
    const exists = wishlist.find(item => item.id === artwork.id);
    
    if (exists) {
      set({ wishlist: wishlist.filter(item => item.id !== artwork.id) });
    } else {
      set({ wishlist: [...wishlist, artwork], isWishlistOpen: true });
    }
  },

  removeFromWishlist: (id) => {
    set((state) => ({
      wishlist: state.wishlist.filter((item) => item.id !== id),
    }));
  },

  clearWishlist: () => set({ wishlist: [] }),
  
  isInWishlist: (id) => {
    return get().wishlist.some(item => item.id === id);
  },

  getTotalWishlistItems: () => {
    return get().wishlist.length;
  },
}));

export default useWishlistStore;
