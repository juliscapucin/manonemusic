'use client';

import gsap from 'gsap';

import { animateSplitTextVertical } from '@/lib/animations';
import { useEffect, useRef } from 'react';
import { useWindowDimensions } from '@/hooks';

type LogoProps = {
    subtitle?: string;
};

export default function Logo({ subtitle }: LogoProps) {
    const subtitleRef = useRef(null);
    const { width } = useWindowDimensions();

    useEffect(() => {
        if (!subtitleRef.current) return;

        const ctx = gsap.context(() => {
            animateSplitTextVertical(subtitleRef.current!, 200, 0.5, 0.5, 0.05);
        }, subtitleRef);

        return () => ctx.revert();
    }, [width]);

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
