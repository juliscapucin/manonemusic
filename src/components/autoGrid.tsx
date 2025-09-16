'use client';

import gsap from 'gsap';

import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import useGenerateGrid from '@/hooks/useGenerateGrid';

type autoGridProps = {
    isIntro?: boolean;
};

export default function AutoGrid({ isIntro }: autoGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Get number of columns based on container width
    const columns = useGenerateGrid(containerRef.current);

    return (
        <div className='autogrid absolute inset-0 min-h-full min-w-full'>
            <div
                ref={containerRef}
                className='absolute top-8 flex h-[50vh] w-full border-y border-faded'
            >
                {Array.from({ length: columns }).map((_, i) => (
                    <div
                        key={i}
                        className={`group relative h-full flex-1 overflow-clip ${
                            i !== columns - 1 ? 'border-r border-faded' : ''
                        }`}
                    >
                        <div className='h-full -translate-y-[96%] bg-faded-70 mix-blend-plus-lighter transition-transform duration-500 group-hover:translate-y-0 lg:-translate-y-[92%]'></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
