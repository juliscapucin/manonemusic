'use client';

import { Heading } from '@/components/ui';

type TitleProps = {
    ref?: React.RefObject<HTMLDivElement | null>;
    children: string;
    classes?: string;
};

export default function TitleDisplay({ children, classes, ref }: TitleProps) {
    return (
        <div
            className={`pointer-events-none mt-16 mb-8 border-t border-faded pl-4 lg:mt-0 lg:mb-0 lg:pl-6 ${classes || ''}`}
            ref={ref}
        >
            <Heading
                tag={'h2'}
                classes='gsap-section-title whitespace-nowrap uppercase leading-0.8 lg:-mt-3 text-faded-90'
                variant='display'
            >
                {children}
            </Heading>
        </div>
    );
}
