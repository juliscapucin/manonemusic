'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Observer } from 'gsap/Observer';
gsap.registerPlugin(useGSAP, Observer);

import { IconChevron } from '@/components/icons';
import { usePathname } from 'next/navigation';

type Props = {
    variant: 'big' | 'small';
};

const fadeOutAnimation = (element: HTMLElement | null) => {
    if (element) return gsap.to(element, { opacity: 0, duration: 0.7 });
};

export default function MouseFollower({ variant }: Props) {
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const [isTopLevel, setIsTopLevel] = useState(false);
    const observerRef = useRef<Observer | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const segments = pathname.split('/').filter(Boolean);
        setIsTopLevel(pathname === '/' || segments.length === 1);
    }, [pathname]);

    // Scroll detection
    useGSAP(() => {
        if (!cursorRef.current || !isTopLevel) return;
        observerRef.current?.kill();
        observerRef.current = Observer.create({
            type:
                pathname === '/'
                    ? 'wheel,scroll'
                    : 'wheel, scroll, pointer, touch',
            onMove: () => fadeOutAnimation(cursorRef.current),
            onChange: () => fadeOutAnimation(cursorRef.current),
            onStop: () => {
                gsap.to(cursorRef.current, {
                    opacity: 1,
                    duration: 0.7,
                });
            },
            onStopDelay: 5, // time (in seconds) after which onStop should be called
            tolerance: 10, // the minimum distance (in pixels) necessary to trigger one of the callbacks
        });

        return () => {
            observerRef.current?.kill();
        };
    }, [{ dependencies: [isTopLevel, pathname], scope: cursorRef }]);

    // Mouse follower movement
    useLayoutEffect(() => {
        const cursorDiv = cursorRef.current;
        if (!cursorDiv || !cursorDiv.parentElement || !isTopLevel) return;

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
    }, [isTopLevel, pathname]);

    return (
        isTopLevel && (
            <div
                ref={cursorRef}
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
        )
    );
}
