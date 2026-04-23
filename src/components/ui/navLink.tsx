'use client';

import { usePathname } from 'next/navigation';
import { CustomButton } from '@/components/ui';

interface NavLinkProps {
    label: string;
    slug: string;
    onClick: () => void;
    activeState?: boolean;
}

export default function NavLink({
    label,
    slug,
    onClick,
    activeState,
}: NavLinkProps) {
    return (
        <div>
            {activeState ? (
                <div className='relative max-h-8 overflow-clip'>
                    <span className='underlined-link active text-title-small uppercase md:text-title-medium'>
                        {label}
                    </span>
                </div>
            ) : (
                <div className='max-h-8 overflow-clip'>
                    <CustomButton
                        link={`/${slug}`}
                        classes={`underlined-link text-title-small md:text-title-medium uppercase`}
                        transitionOnClick={onClick}
                    >
                        {label}
                    </CustomButton>
                </div>
            )}
        </div>
    );
}
