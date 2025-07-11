import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface InterestStore {
  sessionId: string;
  cartCount: number;
  setCartCount: (count: number) => void;
  incrementCartCount: () => void;
  decrementCartCount: () => void;
}

export const useCartStore = create<InterestStore>()(
  persist(
    (set) => ({
      sessionId: crypto.randomUUID(),
      cartCount: 0,
      setCartCount: (count) => set({ cartCount: count }),
      incrementCartCount: () => set((state) => ({ cartCount: state.cartCount + 1 })),
      decrementCartCount: () => set((state) => ({ cartCount: Math.max(0, state.cartCount - 1) })),
    }),
    {
      name: 'cart-storage',
    }
  )
);
