'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';

import { Logo, SectionWrapper } from '@/components/ui';

export default function IntroPage() {
    const maskRef = useRef(null);

    useEffect(() => {
        if (!maskRef.current) return;

        const tl = gsap.timeline();

        // Mask Reveal
        tl.to(maskRef.current, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            delay: 2,
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
                </div>
            </SectionWrapper>
        </div>
    );
}
