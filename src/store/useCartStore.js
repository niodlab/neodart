import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const normalizeCartItem = (artwork, quantity = 1) => ({
  ...artwork,
  quantity,
  selected: artwork.selected ?? true,
});

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      addToCart: (artwork, options = {}) => {
        const { cart } = get();
        const { openDrawer = true, quantity = 1 } = options;
        const existingItem = cart.find((item) => item.id === artwork.id);

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === artwork.id
                ? { ...item, quantity: item.quantity + quantity, selected: true }
                : item
            ),
            isCartOpen: openDrawer,
          });
          return;
        }

        set({
          cart: [...cart, normalizeCartItem(artwork, quantity)],
          isCartOpen: openDrawer,
        });
      },

      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      toggleItemSelection: (id) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, selected: !item.selected } : item
          ),
        }));
      },

      setAllSelections: (selected) => {
        set((state) => ({
          cart: state.cart.map((item) => ({ ...item, selected })),
        }));
      },

      clearPurchasedItems: (ids) => {
        set((state) => ({
          cart: state.cart.filter((item) => !ids.includes(item.id)),
        }));
      },

      clearCart: () => set({ cart: [] }),

      getSelectedItems: () => get().cart.filter((item) => item.selected),

      getTotalPrice: () =>
        get().cart.reduce((total, item) => total + item.price * item.quantity, 0),

      getSelectedTotalPrice: () =>
        get()
          .cart.filter((item) => item.selected)
          .reduce((total, item) => total + item.price * item.quantity, 0),

      getTotalItems: () =>
        get().cart.reduce((total, item) => total + item.quantity, 0),

      getSelectedItemsCount: () =>
        get()
          .cart.filter((item) => item.selected)
          .reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: 'nio-cart-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

export default useCartStore;
