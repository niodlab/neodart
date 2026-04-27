import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const emptyAddress = {
  fullName: '',
  mobile: '',
  email: '',
  address: '',
};

const useCheckoutStore = create(
  persist(
    (set, get) => ({
      source: null,
      items: [],
      address: emptyAddress,
      paymentMethod: '',
      saveDetails: true,
      editingAddress: false,
      status: 'idle',
      order: null,

      beginBuyNow: (artwork) =>
        set({
          source: 'buy-now',
          items: [{ ...artwork, quantity: 1 }],
          status: 'idle',
          order: null,
        }),

      beginCartCheckout: (items) =>
        set({
          source: 'cart',
          items,
          status: 'idle',
          order: null,
        }),

      syncItems: (items) => set({ items }),

      updateAddressField: (field, value) =>
        set((state) => ({
          address: {
            ...state.address,
            [field]: value,
          },
        })),

      setAddress: (address) => set({ address }),
      setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
      setSaveDetails: (saveDetails) => set({ saveDetails }),
      setEditingAddress: (editingAddress) => set({ editingAddress }),
      setStatus: (status) => set({ status }),

      updateItemQuantity: (id, quantity) => {
        if (quantity < 1) return;

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      completeOrder: (order) =>
        set({
          order,
          status: 'success',
        }),

      resetCheckout: () =>
        set({
          source: null,
          items: [],
          paymentMethod: '',
          status: 'idle',
          order: null,
        }),

      hasItems: () => get().items.length > 0,
    }),
    {
      name: 'nio-checkout-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCheckoutStore;
