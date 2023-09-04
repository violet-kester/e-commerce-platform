import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // syncs up local storage
import { AddCartType } from '@/types/AddCartType';

type CartState = {
  cart: AddCartType[],
  isOpen: boolean,
  toggleCart: () => void,
  // clearCart: () => void,
  addProduct: (item: AddCartType) => void,
  // removeProduct: (item: AddCartType) => void,

};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({ // set used to update data in state
      cart: [],
      isOpen: false,
      toggleCart: () => set((state) => ({ // state = cart store
        isOpen: !state.isOpen
      })),
      addProduct: (item) => set((state) => {
        // check for items already in cart
        const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
        // if item already exists, increase quantity
        if (existingItem) {
          const updatedCart = state.cart.map((cartItem) => {
            if (cartItem.id === item.id) {
              return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
          });
          // return updated cart
          return { cart: updatedCart };
        } else {
          // if item doesn't exist, add it to cart
          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }
      }),
    }),
    { name: 'cart-store' }
  )
);