'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { NavLink } from '@/types';

import { handlePanelSlide } from '@/lib/animations';
import Pagination from '@/components/pagination';
import Availability from '@/components/availability';

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
        <footer className='fixed bottom-0 z-header flex w-full items-center justify-between border-t border-faded bg-primary px-8 text-center text-secondary'>
            <Availability slideToContact={() => handlePanelSlide('contact')} />

            <Pagination
                sections={navLinks}
                action={handleNavigation}
                index={index}
            />
        </footer>
    );
}
