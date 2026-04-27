import { create } from 'zustand';

const useGalleryStore = create((set) => ({
  filters: {
    category: 'All',
    priceRange: [0, 5000],
    size: 'All',
    orientation: 'All',
    color: 'All',
  },
  sortBy: 'New arrivals',
  searchQuery: '',
  
  setFilter: (name, value) => set((state) => ({
    filters: { ...state.filters, [name]: value }
  })),
  
  resetFilters: () => set({
    filters: {
      category: 'All',
      priceRange: [0, 5000],
      size: 'All',
      orientation: 'All',
      color: 'All',
    }
  }),
  
  setSortBy: (sortBy) => set({ sortBy }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useGalleryStore;
