'use client';

import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import Cart from './Cart';
import { useCartStore } from '../store';
import { AiFillShopping } from 'react-icons/ai';

export default function Nav({ user }: Session) {
    const cartStore = useCartStore();

    return (
        <nav className='flex justify-between items-center py-12'>
            <Link href='/' className='flex items-center gap-4'>
                <Image src='/logo.png' alt='Logo' width={36} height={36} />
                <h1>E-commerce Platform</h1>
            </Link>
            <ul className='flex items-center gap-12'>
                {/* toggle cart */}
                <li onClick={() => cartStore.toggleCart()} className='flex items-center text-3xl relative cursor-pointer'>
                    <AiFillShopping />
                    <span className='bg-teal-700 text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center'>
                        {cartStore.cart.length}
                    </span>
                </li>
                {/* if user is not signed in */}
                {!user && (
                    <li className='bg-teal-600 text-white py-2 px-4 rounded-md'>
                        <button onClick={() => signIn()}>Sign in</button>
                    </li>
                )}
                {/* if user is signed in */}
                {user && (
                    <>
                        <li>
                            <Image
                                src={user?.image as string}
                                alt={user?.name as string}
                                width={36}
                                height={36}
                                className='rounded-full'
                            />
                        </li>
                        {/* <li>
                            Dashboard
                        </li> */}
                    </>
                )}
            </ul>
            {cartStore.isOpen && <Cart />}
        </nav >
    );
}