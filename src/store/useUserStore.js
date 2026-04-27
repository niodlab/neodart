import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const emptyAddress = {
  fullName: '',
  mobile: '',
  email: '',
  address: '',
};

const useUserStore = create(
  persist(
    (set, get) => ({
      currentUser: null,
      savedGuestAddress: emptyAddress,

      setCurrentUser: (user) => set({ currentUser: user }),

      updateSavedAddress: (address) => {
        const { currentUser } = get();

        if (currentUser) {
          set({
            currentUser: {
              ...currentUser,
              savedAddress: address,
            },
          });
          return;
        }

        set({ savedGuestAddress: address });
      },

      getPreferredAddress: () => {
        const { currentUser, savedGuestAddress } = get();
        return currentUser?.savedAddress || savedGuestAddress || emptyAddress;
      },
    }),
    {
      name: 'nio-user-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
