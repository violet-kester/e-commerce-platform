'use client';

import { useState } from 'react';
import { useCartStore } from '@/app/store';
import { AddCartType } from '@/types/AddCartType';

export default function AddCart({
    id,
    name,
    image,
    unit_amount,
    quantity
}: AddCartType) {
    const cartStore = useCartStore();
    // const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        cartStore.addProduct({ id, name, image, unit_amount, quantity });
        // setAdded(true);
        // setTimeout(() => {
        //     setAdded(false);
        // }, 500);
    };

    return (
        <>
            <button
                onClick={handleAddToCart}
                // disabled={added}
                className='my-12 py-2 px-6 text-white font-medium rounded-md bg-teal-700'>
                Add to cart
            </button>
        </>
    );
}