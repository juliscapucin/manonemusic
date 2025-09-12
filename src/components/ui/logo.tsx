'use client';

import gsap from 'gsap';

import { animateSplitTextVertical } from '@/lib/animations';
import { useEffect, useRef } from 'react';
import { useWindowDimensions } from '@/hooks';

type LogoProps = {
    subtitle: string;
};

export default function Logo({ subtitle }: LogoProps) {
    const subtitleRef = useRef(null);
    const { width } = useWindowDimensions();
    const logoRef1 = useRef(null);
    const logoRef2 = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (
                !subtitleRef.current ||
                !animateSplitTextVertical ||
                !logoRef1.current ||
                !logoRef2.current
            )
                return;
            const tl = gsap.timeline();

            // Logo Animation
            tl.add(
                // Logo 1
                // (element, yTranslate, delay, duration, stagger)
                animateSplitTextVertical(
                    logoRef1.current,
                    undefined,
                    0.2,
                    0.3,
                    0.05
                )!
            )
                // Logo 2
                .add(
                    animateSplitTextVertical(
                        logoRef2.current,
                        undefined,
                        undefined,
                        0.3,
                        0.05
                    )!,
                    '>-=0.3'
                )
                // Subtitle
                .add(
                    animateSplitTextVertical(
                        subtitleRef.current!,
                        200,
                        undefined,
                        0.3,
                        0.02
                    )!,
                    '>-=0.4'
                );
        }, subtitleRef);

        return () => ctx.revert();
    }, [width]);

    return (
        <div className='gsap-section-title mt-16 overflow-y-clip lg:mt-0'>
            <div className='h-fit overflow-clip pb-1'>
                <h1
                    ref={logoRef1}
                    className='logo pointer-events-none text-faded-70'
                >
                    MAN/ONE
                </h1>
            </div>
            <div className='h-fit overflow-clip pb-1'>
                <h1
                    ref={logoRef2}
                    className='logo pointer-events-none text-faded-70'
                >
                    MUSIC
                </h1>
            </div>
            <h2
                ref={subtitleRef}
                className='mt-2 max-w-[60%] text-title-large text-nowrap lg:max-w-[400px]'
            >
                {subtitle}
            </h2>
        </div>
    );
}
