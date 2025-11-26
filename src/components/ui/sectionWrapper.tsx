'use client';

import { AutoGrid } from '@/components';

type SectionWrapperProps = {
    children: React.ReactNode;
    classes?: string;
    ref?: React.Ref<HTMLDivElement>;
    isIntro?: boolean;
};

export default function SectionWrapper({
    children,
    classes,
    ref,
    isIntro,
}: SectionWrapperProps) {
    return (
        <div
            ref={ref}
            className='section-wrapper relative w-screen min-w-[95vw] items-center justify-between overflow-x-clip border-faded px-0 pt-16 pb-8 lg:mt-0 lg:flex lg:min-h-svh lg:w-fit lg:overflow-clip lg:border lg:pt-0'
        >
            <div className={`bg-primary ${classes || ''}`}>{children}</div>
        </div>
    );
}
