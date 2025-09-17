'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { CustomButton, NavLink } from '@/components/ui';
import { handlePanelSlide, projectExit } from '@/lib/animations';
import { NavLink as NavLinkType } from '@/types';

type HeaderProps = {
    navLinks: NavLinkType[];
    variant?: 'section' | 'page';
};

// This is the header component for the desktop version
// Mobile version is handled in menuMobile.tsx
export default function Header({ navLinks, variant = 'section' }: HeaderProps) {
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // only run on first level
        if (variant === 'section') {
            // ScrollTo on Load
            handlePanelSlide(pathname, true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variant]);

    return (
        <header>
            <nav className='fixed top-0 right-0 left-0 z-header hidden h-(--header-height-mobile) justify-between overflow-clip border-b border-faded bg-primary px-12 py-4 lg:flex'>
                {/* LOGO */}
                <CustomButton
                    link='/'
                    classes={`underlined-link text-title-small md:text-title-medium uppercase transition-transform ${pathname === '/' ? '-translate-x-[150%]' : 'translate-x-0'}`}
                    transitionOnClick={
                        variant === 'section'
                            ? () => handlePanelSlide('/') // if in first level, slide to home
                            : () => projectExit(() => router.push('/'), true) // if in second level, exit and navigate to home
                    }
                >
                    MAN/ONE MUSIC
                </CustomButton>

                {/* NAVLINKS */}
                <div className='hidden gap-8 lg:flex'>
                    {navLinks.map(
                        (link, index) =>
                            link.slug !== '/' && (
                                <NavLink
                                    label={link.title}
                                    slug={link.slug}
                                    key={`panel-button-${index}`}
                                    activeState={
                                        pathname.includes(`/${link.slug}`)
                                            ? true
                                            : false
                                    }
                                    action={() => {
                                        variant === 'section'
                                            ? handlePanelSlide(link.slug)
                                            : projectExit(
                                                  () =>
                                                      router.push(
                                                          `/${link.slug}`
                                                      ),
                                                  true
                                              );
                                    }}
                                />
                            )
                    )}
                </div>
            </nav>
        </header>
    );
}
