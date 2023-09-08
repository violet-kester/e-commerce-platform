'use client';

import Image from 'next/image';
import { useCartStore } from '../store';
import formatPrice from '@/util/PriceFormat';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';
import shoppingCart from '@/public/shopping-cart.png';

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
    return (
        <div // dimmed bg
            onClick={() => cartStore.toggleCart()} // closes cart when dimmed bg is clicked
            className='fixed w-full h-screen left-0 top-0 bg-black/25'
        >
            <div // cart items panel
                onClick={(e) => e.stopPropagation()} // prevents cart from closing when panel is clicked
                className='bg-white absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-scroll text-gray-700'>
                <h1>Here's your shopping list.</h1>
                {cartStore.cart.map((item) => (
                    <div className="flex py-4 gap-4">
                        <Image
                            className='rounded-md'
                            src={item.image}
                            alt={item.name}
                            width={120}
                            height={120} />
                        <div>
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
                        </div>
                    </div>
                ))}
                {/* checkout button */}
                {cartStore.cart.length > 0 &&
                    <button className='py-2 mt-4 bg-teal-700 w-full rounded-md text-white'>
                        Checkout
                    </button>
                }
                {/* empty basket */}
                {!cartStore.cart.length &&
                    <div className='flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-50'>
                        <h1>Your shopping cart is empty.</h1>
                        <Image src={shoppingCart} alt='empty cart' width={200} height={200} />
                    </div>
                }
            </div>

        </div>
    );
}