import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // syncs up local storage

type CartItem = {
  id: string,
  name: string,
  images?: string[],
  description?: string,
  unit_amount: number,
  quantity: number,
};

type CartState = {
  cart: CartItem[],
  isOpen: boolean,
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
    }),
    { name: 'cart-store' }
  )
);