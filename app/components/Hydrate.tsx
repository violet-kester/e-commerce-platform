'use client'; // zustand store only available client side

import { ReactNode, useEffect, useState } from 'react';

/** Hydrate({children})
 *
 * A custom component that waits for the Next.js hydration to complete
 * before rendering children components that use Zustand store.
 *
 * Avoids hydration issues that occur when
 * server-side and client-side states are inconsistent.
 *
 * Wrapping components with Hydrate ensures they are only rendered
 * after Next.js hydration is complete and Zustand store has the correct state.
 *
 * @param {ReactNode} children - React elements to be rendered after hydration.
 * @returns {JSX.Element} - JSX fragment that renders the children or a loading div.
 */

export default function Hydrate({ children }: { children: ReactNode; }) {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => { // wait till nextjs rehydration completes
        setIsHydrated(true);
    }, []);

    return (
        <>
            {isHydrated ? <>{children}</> : <div>Loading...</div>}
        </>
    );
}