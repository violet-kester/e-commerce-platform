'use client';

import Image from 'next/image';
import { useCartStore } from '../store';
import formatPrice from '@/util/PriceFormat';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';
import shoppingCart from '@/public/shopping-cart.png';
import { motion, AnimatePresence } from 'framer-motion';

/** Cart (component)
 *
 * A shopping cart panel with the products added by the user.
 * Displays cart details, product information, and a checkout button.
 *
 * - Uses the useCartStore hook to access and update the cart state.
 * - Allows the user to increment and decrement item quantity.
 * - Opened by clicking the shopping cart icon in the nav bar.
 * - Closed by clicking away from the cart panel.
 */

export default function Cart() {
    const cartStore = useCartStore();

    // total price
    const totalPrice = cartStore.cart.reduce((acc, item) => {
        return acc + item.unit_amount! * item.quantity!;
    }, 0);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => cartStore.toggleCart()} // closes cart when dimmed bg is clicked
            className='fixed w-full h-screen left-0 top-0 bg-black/25'
        >
            {/* shopping cart panel */}
            <motion.div
                layout
                onClick={(e) => e.stopPropagation()} // prevents cart from closing when panel is clicked
                className='bg-white absolute right-0 top-0 w-full md:w-2/5 h-screen p-12 overflow-y-scroll text-gray-700'>
                <button
                    onClick={() => cartStore.toggleCart()}
                    className='text-sm font-bold pb-12'>
                    Back to store
                </button>
                {cartStore.cart.map((item) => (
                    <motion.div layout key={item.id} className="flex py-4 gap-4">
                        <Image
                            className='rounded-md'
                            src={item.image}
                            alt={item.name}
                            width={120}
                            height={120} />
                        <motion.div layout>
                            <h2>{item.name}</h2>
                            <div className='flex gap-2'>
                                <h2>Quantity: {item.quantity}</h2>
                                <button onClick={() => cartStore.removeProduct({
                                    id: item.id,
                                    name: item.name,
                                    image: item.image,
                                    unit_amount: item.unit_amount,
                                    quantity: item.quantity,
                                })}>
                                    <IoRemoveCircle />
                                </button>
                                <button onClick={() => {
                                    cartStore.addProduct({
                                        id: item.id,
                                        name: item.name,
                                        image: item.image,
                                        unit_amount: item.unit_amount,
                                        quantity: item.quantity,
                                    });
                                }}>
                                    <IoAddCircle />
                                </button>
                            </div>
                            <p className="text-sm">
                                {item.unit_amount && formatPrice(item.unit_amount)}
                            </p>
                        </motion.div>
                    </motion.div>
                ))}

                {/* total and checkout button */}
                {cartStore.cart.length > 0 &&
                    <motion.div layout>
                        <p>Total: {formatPrice(totalPrice)}</p>
                        <button className='py-2 mt-4 bg-teal-700 w-full rounded-md text-white'>
                            Checkout
                        </button>
                    </motion.div>
                }

                {/* empty basket */}
                <AnimatePresence>
                    {!cartStore.cart.length &&
                        <motion.div
                            animate={{ scale: 1, rotateZ: 0, opacity: .75 }}
                            initial={{ scale: .5, rotateZ: -10, opacity: 0 }}
                            exit={{ scale: .5, rotateZ: -10, opacity: 0 }}
                            className='flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-50'>
                            <h1>Your shopping cart is empty.</h1>
                            <Image src={shoppingCart} alt='empty cart' width={200} height={200} />
                        </motion.div>
                    }
                </AnimatePresence>
            </motion.div>

        </motion.div>
    );
}