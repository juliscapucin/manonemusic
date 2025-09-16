'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';

import { Logo, SectionWrapper } from '@/components/ui';
import useGenerateGrid from '@/hooks/useGenerateGrid';
import { useGSAP } from '@gsap/react';

export default function IntroPage() {
    const maskRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Get number of columns based on container width
    const columns = useGenerateGrid(containerRef.current);

    // Mask Reveal
    useEffect(() => {
        if (!maskRef.current) return;

        const tl = gsap.timeline();

        tl.to(maskRef.current, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            delay: 4,
            duration: 1,
            ease: 'power4.out',
        });
    }, []);

    // Animate grid
    useGSAP(() => {
        if (!containerRef.current) return;
        const fills =
            containerRef.current.querySelectorAll('.gsap-column-fill');

        // Reset initial state
        gsap.set(fills, { yPercent: 100, opacity: 0 });

        // Animate them in
        gsap.to(fills, {
            y: '-96.5%',
            opacity: 1,
            duration: 1,
            stagger: 0.05, // each column slightly after the previous
            delay: 0.3, // wait a bit after page load
        });
    }, [columns]);

    return (
        <div
            ref={maskRef}
            className='pointer-events-none fixed inset-0 z-intro bg-primary px-4 lg:px-8'
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
                <div className='lg:mx-8'>
                    <Logo />
                </div>

                {/* GRID */}
                <div className='autogrid absolute inset-0 min-h-full min-w-full'>
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
