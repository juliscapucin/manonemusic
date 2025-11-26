'use client';

import { useRef } from 'react';
import useGenerateGrid from '@/hooks/useGenerateGrid';

export default function AutoGrid() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Get number of columns based on container width
    const columns = useGenerateGrid(containerRef.current);

    return (
        <div
            className='autogrid pointer-events-none absolute inset-0 z-0 mix-blend-difference'
            aria-hidden='true'
            role='presentation'
            style={{ color: 'transparent' }}
        >
            <div
                ref={containerRef}
                className='absolute top-8 flex h-[50vh] w-full border-y border-faded'
            >
                {Array.from({ length: columns }).map((_, i) => (
                    <div
                        key={i}
                        role='presentation'
                        className={`group pointer-events-auto relative h-full flex-1 overflow-clip mix-blend-difference ${
                            i !== columns - 1 ? 'border-r border-faded' : ''
                        }`}
                    >
                        <div
                            aria-hidden='true'
                            role='presentation'
                            className='h-full -translate-y-[96%] bg-faded-70 transition-transform duration-500 group-hover:translate-y-0 lg:-translate-y-[92%]'
                        ></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
