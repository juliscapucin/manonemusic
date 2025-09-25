'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { NavLink } from '@/types';

import { handlePanelSlide } from '@/lib/animations';
import { Button, ButtonScroll } from '../buttons';
import Availability from '../availability';

type FooterProps = {
    navLinks: NavLink[];
};

export default function Footer({ navLinks }: FooterProps) {
    const pathname = usePathname();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const foundPage = navLinks.find((link) => `/${link.slug}` === pathname);
        const newIndex = foundPage ? navLinks.indexOf(foundPage) : 0;

        setIndex(newIndex);
    }, [pathname, navLinks]);

    const handleNavigation = (direction: 'previous' | 'next') => {
        const newIndex =
            direction === 'previous'
                ? index - 1 >= 0
                    ? index - 1
                    : index
                : index + 1 < navLinks.length
                  ? index + 1
                  : index;
        const newSlug = navLinks[newIndex].slug;

        handlePanelSlide(newSlug);
    };

    return (
        <footer className='text-white fixed bottom-0 flex w-full items-center justify-between border-t border-faded bg-primary px-8 text-center'>
            <Availability slideToContact={() => handlePanelSlide('contact')} />

            <ButtonScroll
                sections={navLinks}
                action={handleNavigation}
                index={index}
            />
        </footer>
    );
}
