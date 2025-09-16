'use client';

import gsap from 'gsap';

import { animateSplitTextVertical } from '@/lib/animations';
import { useRef } from 'react';
import { useWindowDimensions } from '@/hooks';
import { useGSAP } from '@gsap/react';

export default function Logo() {
    const subtitleRef = useRef(null);
    const { width } = useWindowDimensions();
    const logoRef1 = useRef(null);
    const logoRef2 = useRef(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            if (
                !subtitleRef.current ||
                !animateSplitTextVertical ||
                !logoRef1.current ||
                !logoRef2.current
            )
                return;

            gsap.set(
                [logoRef1.current, logoRef2.current, subtitleRef.current],
                {
                    opacity: 1,
                }
            );

            const tl = gsap.timeline();

            // Logo Animation
            tl.add(
                // Logo 1
                // (element, yTranslate, delay, duration, stagger)
                animateSplitTextVertical(
                    logoRef1.current,
                    undefined,
                    1.5,
                    0.3,
                    0.07
                )!
            )
                .add(
                    animateSplitTextVertical(
                        logoRef2.current,
                        undefined,
                        1.8,
                        0.3,
                        0.07
                    )!
                )
                .add(
                    animateSplitTextVertical(
                        subtitleRef.current!,
                        200,
                        1.8,
                        0.3,
                        0.04
                    )!
                );
        }, subtitleRef);

        return () => ctx.revert();
    }, [width]);

    return (
        <div className='gsap-section-title mt-16 overflow-y-clip lg:mt-0'>
            <div className='h-fit overflow-clip pb-1'>
                <h1
                    ref={logoRef1}
                    className='logo pointer-events-none text-faded-90 opacity-0'
                >
                    MAN/ONE
                </h1>
            </div>
            <div className='h-fit overflow-clip pb-1'>
                <h1
                    ref={logoRef2}
                    className='logo pointer-events-none text-faded-90 opacity-0'
                >
                    MUSIC
                </h1>
            </div>
            <h2
                ref={subtitleRef}
                className='mt-2 overflow-clip text-title-large text-nowrap opacity-0'
            >
                Bespoke Audio & Music
            </h2>
        </div>
    );
}
