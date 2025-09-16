'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, Observer);

import { AllData, NavLink } from '@/types';
import { PanelContent } from '@/components';
import { useWindowDimensions } from '@/hooks';
import { animateSplitText } from '@/lib/animations';
import { ScrollProgress } from '@/components/ui';
import { useCookieModalContext } from '@/context';

type PanelDesktopProps = {
    data: AllData;
    sections: NavLink[];
};

export default function PanelDesktop({ data, sections }: PanelDesktopProps) {
    const panelsContainerRef = useRef<HTMLDivElement | null>(null);
    const [tween, setTween] = useState<gsap.core.Tween | null>(null);
    const scrollProgressRef = useRef(0);
    const { width } = useWindowDimensions();
    const { isModalOpen } = useCookieModalContext();
    const scrollSmootherRef = useRef<ScrollSmoother | null>(null);

    console.log('panel desktop render');

    // Smooth Scroll
    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

        const smoother = ScrollSmoother.create({
            effects: true,
            smooth: 1,
            normalizeScroll: true,
            ease: 'power3',
        });

        scrollSmootherRef.current = smoother;

        return () => {
            scrollSmootherRef.current?.kill();
        };
    }, []);

    // Pause ScrollSmoother if cookie modal is open
    useLayoutEffect(() => {
        scrollSmootherRef.current?.paused(isModalOpen);
    }, [isModalOpen]);

    // Horizontal Panel animation
    useGSAP(() => {
        if (!panelsContainerRef.current || width < 1024) return;

        /* Panels */
        const container = panelsContainerRef.current;

        const tweenRef = gsap.to('.gsap-panels-container', {
            x: () => -1 * (container.scrollWidth - innerWidth),
            duration: 5,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                pin: true,
                start: 'top top',
                scrub: 1,
                end: () =>
                    '+=' + (container.scrollWidth - container.offsetWidth),
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    scrollProgressRef.current = self.progress * 100;
                },
                // markers: true,
            },
        });

        // set Ref value to pass to title animations
        setTween(tweenRef);
    }, []);

    // Left/right gestures through trackpad
    useGSAP(() => {
        const container = panelsContainerRef.current;
        if (width < 1024) return;

        Observer.create({
            target: window,
            type: 'touch, pointer, wheel',
            preventDefault: true,

            onChange: (self) => {
                // Ignore vertical scrolls
                if (Math.abs(self.deltaX) <= Math.abs(self.deltaY)) return;
                window.scrollBy({
                    top: self.deltaX * 3, // Translate horizontal delta into vertical scroll
                    behavior: 'auto',
                });
            },
        });
    }, [width]);

    // Title animations + routing funcionality
    useGSAP(() => {
        // Start ScrollTrigger when window is in desktop breakpoint
        if (width < 1024 || !tween) return;

        const titles = panelsContainerRef.current?.querySelectorAll(
            '.gsap-section-title'
        ) as HTMLHeadingElement[] | undefined;

        if (!titles) return;

        // Title ScrollTrigger + route handler
        titles.forEach((title, index) => {
            if (!title) return;

            if (index !== 0) gsap.set(title, { opacity: 0 });

            // Create slug from title text
            let slug =
                index === 0
                    ? '/'
                    : `/${title.innerText.toLowerCase().replace(/\s+/g, '-')}`;
            if (!slug) return;

            let slugTimeout: ReturnType<typeof setTimeout> | null = null;

            ScrollTrigger.create({
                trigger: title,
                start: 'left right-=400',
                //  start: index === 0 ? 'left+=30 left' : 'left right-=400',
                end: 'right center',
                invalidateOnRefresh: true,
                toggleActions: 'play none none reverse',
                onEnter: () => {
                    if (index === 0) return; // don't run animation on home section
                    gsap.set(title, { opacity: 1 });
                    animateSplitText(title, 2000);
                },
                onEnterBack: () => {
                    if (index === 0) return;
                    gsap.set(title, { opacity: 1 });
                },
                onLeave: () => {
                    if (index === 0) return;
                    gsap.to(title, { opacity: 0 });
                },
                onLeaveBack: () => {
                    if (index === 0) return;
                    gsap.to(title, { opacity: 0 });
                },
                fastScrollEnd: true,
                horizontal: true,
                containerAnimation: tween,
                onToggle: (self) => {
                    if (self.isActive && window.location.pathname !== slug) {
                        // cancel any existing timeout before starting a new one
                        if (slugTimeout) {
                            clearTimeout(slugTimeout);
                            slugTimeout = null;
                        }

                        slugTimeout = setTimeout(() => {
                            if (
                                self.isActive &&
                                window.location.pathname !== slug
                            ) {
                                window.history.pushState(null, '', slug);
                            }
                            // clear after use
                            if (slugTimeout) {
                                clearTimeout(slugTimeout);
                                slugTimeout = null;
                            }
                        }, 700);
                    }
                },
            });

            // Pin Title Horizontally on long sections
            const projectsMenu = title.parentElement
                ?.nextElementSibling as HTMLElement;

            const projectsMenuWidth = projectsMenu?.offsetWidth;

            if (!projectsMenuWidth || projectsMenuWidth < window.innerWidth)
                return;

            gsap.to(title, {
                scrollTrigger: {
                    scrub: true,
                    trigger: projectsMenu,
                    start: 'left-=20 left',
                    end: () => '+=' + (projectsMenuWidth - window.innerWidth),
                    invalidateOnRefresh: true,
                    markers: true,
                    containerAnimation: tween,
                },
                x: () => '+=' + (projectsMenuWidth - window.innerWidth),
                ease: 'none',
            });
        }, panelsContainerRef.current);
    }, [{ dependencies: [tween], scope: panelsContainerRef }]);

    // Fade in panels on load
    useGSAP(() => {
        if (!panelsContainerRef.current) return;
        gsap.set(panelsContainerRef.current, {
            opacity: 0,
        });

        gsap.fromTo(
            panelsContainerRef.current,
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 0.6,
                delay: 0.7,
            }
        );
    }, [panelsContainerRef]);

    return (
        <div id='smooth-wrapper'>
            <div id='smooth-content'>
                <div
                    ref={panelsContainerRef}
                    className='gsap-panels-container relative flex gap-96 opacity-0'
                >
                    {sections.map((section) => {
                        return (
                            <section
                                data-id={`panel-${section.slug === '/' ? 'home' : section.slug}`}
                                className='gsap-panel h-screen min-h-full w-fit min-w-fit px-8'
                                key={`panel-${section.slug}`}
                            >
                                <PanelContent
                                    data={data}
                                    section={section.slug}
                                />
                            </section>
                        );
                    })}
                </div>
                {/* TODO: enable scroll progress bar */}
                <ScrollProgress progressRef={scrollProgressRef} />
            </div>
        </div>
    );
}
