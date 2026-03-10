'use client';

import { useRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { Logo, SectionWrapper } from '@/components/ui';
import useGenerateGrid from '@/hooks/useGenerateGrid';

export default function IntroPage() {
    const mainMaskRef = useRef(null);
    const gridMaskRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Get number of columns based on container width
    const columns = useGenerateGrid(containerRef.current);

    // Animate grid
    useGSAP(() => {
        if (!containerRef.current || !gridMaskRef.current) return;
        const fills = containerRef.current.children;

        if (!fills || fills.length === 0) return;

        // Reset initial state
        gsap.set(fills, { y: '100%', opacity: 0 });

        // Animate them in
        gsap.to(fills, {
            y: 'random([-50, 50])%',
            opacity: 1,
            duration: 0.6,
            stagger: 0.02,
            onComplete: () => {
                // Mask grid reveal
                gsap.to(gridMaskRef.current, {
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                    delay: 0.6,
                    duration: 0.6,
                    ease: 'power4.out',
                });
            },
        });
    }, [columns]);

    // Main Mask Reveal
    useGSAP(() => {
        if (!mainMaskRef.current) return;

        const tl = gsap.timeline();

        tl.to(mainMaskRef.current, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            delay: 1.6,
            duration: 0.7,
            ease: 'power4.out',
        });
    }, [columns]);

    return (
        <div
            ref={mainMaskRef}
            className='pointer-events-none fixed inset-0 z-100 bg-primary px-4 lg:px-8'
            style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            }}
        >
            {/* Header spacer */}
            <div className='fixed top-0 right-0 left-0 z-100 h-(--header-height-mobile) border-b border-faded bg-primary'></div>
            <SectionWrapper
                classes='h-[90svh] lg:pt-20 lg:pb-20'
                isIntro={true}
            >
                <div className='lg:mx-8'>
                    <Logo isIntro={true} />
                </div>

                {/* GRID */}
                <div
                    ref={gridMaskRef}
                    className='autogrid absolute inset-0 min-h-full min-w-full'
                    style={{
                        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    }}
                >
                    <div
                        ref={containerRef}
                        className='absolute top-8 flex h-[90svh] w-full border-y border-faded'
                    >
                        {Array.from({ length: columns }).map((_, i) => (
                            <div
                                key={i}
                                className={`group relative h-full flex-1 overflow-clip ${
                                    i !== columns - 1
                                        ? 'border-r border-faded'
                                        : ''
                                }`}
                            >
                                <div className='gsap-column-fill h-full bg-faded-70 mix-blend-plus-lighter'></div>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
