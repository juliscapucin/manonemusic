'use client';

import { animateSplitText } from '@/animations';
import { animateSplitTextVertical } from '@/lib/animations';
import { useEffect, useRef } from 'react';

type LogoProps = {
    subtitle?: string;
};

export default function Logo({ subtitle }: LogoProps) {
    const subtitleRef = useRef(null);

    useEffect(() => {
        if (!subtitleRef.current) return;

        animateSplitTextVertical(subtitleRef.current, 1.4, 0.6, 1, 0.03);
    }, []);

    return (
        <div className='gsap-section-title mt-16 overflow-y-clip lg:mt-0'>
            <h1 className='logo pointer-events-none text-faded-70'>MAN/ONE</h1>
            <h1 className='logo pointer-events-none text-faded-70'>MUSIC</h1>
            <h2
                ref={subtitleRef}
                className='mt-2 max-w-[60%] text-title-large text-nowrap lg:max-w-[400px]'
            >
                {subtitle}
            </h2>
        </div>
    );
}
