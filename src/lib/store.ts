import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (productId) => set((state) => {
        const existing = state.items.find((i) => i.productId === productId);
        
        if (existing) {
          return {
            items: state.items.map((i) =>
              i.productId === productId 
                ? { ...i, quantity: i.quantity + 1 } 
                : i
            ),
          };
        }
        
        return { items: [...state.items, { productId, quantity: 1 }] };
      }),

      removeItem: (productId) => set((state) => ({
        items: state.items.filter((i) => i.productId !== productId),
      })),

      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map((i) =>
          i.productId === productId 
            ? { ...i, quantity: Math.max(1, quantity) } 
            : i
        ),
      })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);