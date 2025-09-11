'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Observer } from 'gsap/Observer';
gsap.registerPlugin(useGSAP, Observer);

import { IconChevron } from '@/components/icons';
import { usePathname } from 'next/navigation';

type Props = {
    variant: 'big' | 'small';
};

export default function MouseFollower({ variant }: Props) {
    const refCursor = useRef<HTMLDivElement | null>(null);

    const fadeOutAnimation = () =>
        gsap.to(refCursor.current, { opacity: 0, duration: 0.7 });

    // Scroll detection
    useGSAP(() => {
        Observer.create({
            type: 'wheel,touch,pointer',
            onMove: fadeOutAnimation,
            onChange: fadeOutAnimation,
            onStop: () => {
                gsap.to(refCursor.current, {
                    opacity: 1,
                    duration: 0.7,
                    delay: 5,
                });
            },
        });
    }, []);

    // Mouse follower movement
    useEffect(() => {
        const cursorDiv = refCursor.current;
        if (!cursorDiv || !cursorDiv.parentElement) return;

        gsap.set(cursorDiv, { xPercent: -50, yPercent: -50 });

        const moveCursor = (e: MouseEvent) => {
            const parentRect = cursorDiv.parentElement?.getBoundingClientRect();

            if (!parentRect) return;
            const relativeX = e.clientX - parentRect.left;

            gsap.to(cursorDiv, {
                x: relativeX,
                y: e.clientY,
                duration: 0.8,
            });
        };

        const parent = cursorDiv.parentElement;
        parent.addEventListener('mousemove', moveCursor);

        return () => {
            parent.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    return (
        <div
            ref={refCursor}
            className={`pointer-events-none fixed top-0 left-0 z-15 flex items-center justify-center rounded-full border ${variant === 'big' ? 'h-40 w-40 border-secondary bg-primary/30' : 'h-24 w-24 border-secondary bg-primary/30'}`}
        >
            <div className='flex items-center gap-8'>
                <IconChevron direction='back' />
                <span
                    className={`${
                        variant === 'big'
                            ? 'text-title-large font-extralight'
                            : 'text-label-large text-secondary'
                    }`}
                >
                    SCROLL
                </span>
                <IconChevron direction='forward' />
            </div>
        </div>
    );
}
