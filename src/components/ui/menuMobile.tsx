'use client';

import { useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { animateMobileMenu } from '@/lib/animations';

import { ButtonBurger, ButtonClose } from '@/components/buttons';

import type { NavLink } from '@/types';

type NavLinksProps = {
    navLinks: NavLink[];
};

export default function MenuMobile({ navLinks }: NavLinksProps) {
    const mobileMenuRef = useRef(null);
    const pathname = usePathname();
    const router = useRouter();

    return (
        <>
            {navLinks && (
                <div className='pointer-events-none fixed top-0 right-0 left-0 z-mobile block h-dvh lg:hidden'>
                    <div className='pointer-events-auto absolute top-0 z-burger flex w-full items-center justify-end border-b border-faded bg-primary pr-4'>
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
                                        className='relative flex w-full justify-center'
                                        key={link.slug}
                                    >
                                        <button
                                            className='block disabled:opacity-30'
                                            onClick={() =>
                                                animateMobileMenu(
                                                    mobileMenuRef.current,
                                                    () => {
                                                        router.push(
                                                            `/${link.slug}`
                                                        );
                                                    }
                                                )
                                            }
                                            disabled={
                                                (pathname === '/' &&
                                                    link.slug === '/') ||
                                                pathname.includes(
                                                    `/${link.slug}`
                                                )
                                            }
                                        >
                                            <span className='font-headline text-headline-medium text-secondary uppercase sm:text-headline-large'>
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
