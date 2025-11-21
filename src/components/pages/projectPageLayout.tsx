'use client';

import { Header, MenuMobile } from '../ui';
import { NavLink } from '@/types';
import { usePathname } from 'next/navigation';

type ProjectPageLayoutProps = {
    navLinks: NavLink[];
    children?: React.ReactNode;
};

export default function ProjectPageLayout({
    navLinks,
    children,
}: ProjectPageLayoutProps) {
    const pathname = usePathname();

    // Check if the pathname has two sections (e.g., /projects/case)
    const isTwoSections = pathname.split('/').filter(Boolean).length === 2;

    if (!isTwoSections) {
        return null; // Do not render anything if the condition is not met
    }

    return (
        <>
            <Header variant='page' navLinks={navLinks} />
            <MenuMobile navLinks={navLinks} />
            {children}
        </>
    );
}
