'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';

import { Logo, SectionWrapper } from '@/components/ui';
import { animateSplitTextVertical } from '@/lib/animations';

export default function IntroPage() {
    const logoRef1 = useRef(null);
    const logoRef2 = useRef(null);
    const maskRef = useRef(null);

    useEffect(() => {
        if (!logoRef1.current || !logoRef2.current || !maskRef.current) return;

        const tl = gsap.timeline();

        // Logo Animation
        tl.add(
            // (element, yTranslate, delay, duration, stagger)
            animateSplitTextVertical(
                logoRef1.current,
                undefined,
                0.2,
                0.3,
                0.05
            )!
        ).add(
            animateSplitTextVertical(
                logoRef2.current,
                undefined,
                undefined,
                0.3,
                0.05
            )!
        );

        // Mask Reveal
        tl.to(maskRef.current, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            delay: 0.6,
            duration: 1,
            ease: 'power4.out',
        });
    }, []);

    return (
        <div
            ref={maskRef}
            className='pointer-events-none fixed top-0 right-0 bottom-0 left-0 z-intro bg-primary px-4 lg:px-8'
            style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            }}
        >
            {/* Header spacer */}
            <div className='fixed top-0 right-0 left-0 z-header h-(--header-height-mobile) border-b border-faded bg-primary'></div>
            <SectionWrapper
                classes='h-[90svh] lg:pt-20 lg:pb-20'
                isIntro={true}
            >
                <div className='mx-4 flex h-full flex-col justify-between lg:mx-8'>
                    <Logo />
                    {/* <div className="gsap-section-title mt-2 lg:mt-0 overflow-y-clip">
                  <h1
                     ref={logoRef1}
                     className="logo pointer-events-none text-faded-70 overflow-y-clip"
                  >
                     MAN/ONE
                  </h1>
                  <h1
                     ref={logoRef2}
                     className="logo pointer-events-none text-faded-70 overflow-y-clip"
                  >
                     MUSIC
                  </h1>
               </div> */}
                </div>
            </SectionWrapper>
        </div>
    );
}
