import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // syncs up local storage
import { AddCartType } from '@/types/AddCartType';

type CartState = {
  cart: AddCartType[],
  isOpen: boolean,
  toggleCart: () => void,
  // clearCart: () => void,
  addProduct: (item: AddCartType) => void,
  removeProduct: (item: AddCartType) => void,
};

/** useCartStore
 *
 * A custom hook that creates and persists a zustand store
 * for managing the shopping cart state.
 *
 * @prop {AddCartType[]} cart - an array products in the cart
 * @prop {boolean} isOpen - indicates whether the cart panel is open or closed
 * @method toggleCart - toggles the isOpen value
 * @method addProduct - adds a product to the cart or increments its qty.
 * @method removeProduct - removes a product to the cart or decrements its qty.
 */

export const useCartStore = create<CartState>()(

  persist(
    (set) => ({ // set used to update data in state
      cart: [],
      isOpen: false,
      toggleCart: () => set((state) => ({ // state = cart store
        isOpen: !state.isOpen
      })),

      // add product --------------------------------------------

      addProduct: (item) => set((state) => {
        // check if item is in cart already
        const existingItem = state.cart.find((cartItem) => {
          return cartItem.id === item.id;
        });
        // if item already exists, increase quantity
        if (existingItem) {
          const updatedCart = state.cart.map((cartItem) => {
            if (cartItem.id === item.id) {
              return { ...cartItem, quantity: cartItem.quantity! + 1 };
            }
            return cartItem;
          });
          // return updated cart
          return { cart: updatedCart };
        } else {
          // if item doesn't exist, add it to cart
          const updatedCart = {
            cart: [...state.cart, { ...item, quantity: 1 }]
          };
          return updatedCart;
        }
      }),

      // remove product -----------------------------------------

      removeProduct: (item) => set((state) => {
        // check if item is in cart already with quantity > 1
        const existingItem = state.cart.find((cartItem) => {
          return cartItem.id === item.id;
        });
        // if so, increase decrease quantity by 1
        if (existingItem && existingItem.quantity! > 1) {
          const updatedCart = state.cart.map((cartItem) => {
            if (cartItem.id === item.id) {
              return { ...cartItem, quantity: cartItem.quantity! - 1 };
            }
            return cartItem;
          });
          // return updated cart
          return { cart: updatedCart };

          // else remove item from cart
        } else {
          const filteredCart = state.cart.filter((cartItem) => {
            return cartItem.id !== item.id;
          });
          return { cart: filteredCart };
        }
      }),

    }),
    { name: 'cart-store' }
  )
);