'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { animateMobileMenu } from '@/lib/animations';

import { ButtonBurger, ButtonClose } from '@/components/buttons';

import type { NavLink } from '@/types';
import CustomButton from './customButton';
import { handlePanelSlide, projectExit } from '@/lib/animations';

type NavLinksProps = {
    navLinks: NavLink[];
    breakpoint: 'desktop' | 'mobile';
    variant: 'section' | 'page';
};

export default function NavMenu({
    navLinks,
    breakpoint,
    variant,
}: NavLinksProps) {
    const mobileMenuRef = useRef(null);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // only run on first level
        if (variant === 'section') {
            // ScrollTo on Load
            handlePanelSlide(pathname);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variant]);

    return (
        <>
            {/* LOGO */}
            {/* <CustomButton
            link="/"
            classes={`underlined-link text-title-small md:text-title-medium uppercase font-medium transition ${pathname === "/" ? "opacity-0 -translate-x-full" : "opacity-100"}`}
            transitionOnClick={
               variant === "section"
                  ? () => handlePanelSlide("/") // if in first level, slide to home
                  : () => projectExit(() => router.push("/"), true) // if in second level, exit and navigate to home
            }
         >
            MAN/ONE MUSIC
         </CustomButton> */}

            {/* NAVBAR */}
            {navLinks && (
                <div className='pointer-events-none fixed top-0 right-0 left-0 z-mobile block h-dvh'>
                    <div className='pointer-events-auto absolute top-4 right-4 z-burger flex max-w-full items-center justify-end'>
                        {/* BURGER BUTTON */}
                        <ButtonBurger
                            action={(e) => {
                                if (mobileMenuRef.current) {
                                    animateMobileMenu(mobileMenuRef.current);
                                }
                            }}
                        />
                    </div>

                    {/* EXPANDED MENU */}
                    <aside
                        className='pointer-events-auto absolute top-0 z-mobile min-h-svh w-full -translate-y-[120%] bg-primary transition-transform duration-300'
                        ref={mobileMenuRef}
                    >
                        {/* Close Button */}
                        <div className='absolute top-4 right-4 z-100'>
                            <ButtonClose
                                onClick={() => {
                                    if (mobileMenuRef.current) {
                                        animateMobileMenu(
                                            mobileMenuRef.current
                                        );
                                    }
                                }}
                            />
                        </div>

                        {/* NAV LINKS */}
                        <nav className='flex h-screen flex-col items-center justify-center'>
                            {navLinks.map((link) => {
                                return (
                                    <div
                                        className={`relative flex w-full justify-center`}
                                        key={link.slug}
                                    >
                                        <button
                                            className='block text-secondary disabled:text-faded-30'
                                            disabled={
                                                (pathname === '/' &&
                                                    link.slug === '/') ||
                                                pathname.includes(
                                                    `/${link.slug}`
                                                )
                                            }
                                            onClick={() => {
                                                if (breakpoint === 'mobile') {
                                                    animateMobileMenu(
                                                        mobileMenuRef.current,
                                                        () => {
                                                            router.push(
                                                                `/${link.slug}`
                                                            );
                                                        }
                                                    );
                                                } else {
                                                    if (variant === 'section') {
                                                        handlePanelSlide(
                                                            link.slug
                                                        );
                                                        animateMobileMenu(
                                                            mobileMenuRef.current
                                                        );
                                                    } else {
                                                        projectExit(
                                                            () =>
                                                                router.push(
                                                                    `/${link.slug}`
                                                                ),
                                                            true
                                                        );
                                                    }
                                                }
                                            }}
                                        >
                                            <span className='font-headline text-headline-medium uppercase sm:text-headline-large'>
                                                {link.title}
                                            </span>
                                        </button>
                                    </div>
                                );
                            })}
                        </nav>
                    </aside>
                </div>
            )}
        </>
    );
}
