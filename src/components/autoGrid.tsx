'use client';

import { useEffect, useRef, useState } from 'react';
import useGenerateGrid from '@/hooks/useGenerateGrid';

type autoGridProps = {
    isIntro?: boolean;
};

export default function AutoGrid({ isIntro }: autoGridProps) {
    const [showGrid, setShowGrid] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Get number of columns based on container width
    const columns = useGenerateGrid(containerRef.current);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGrid(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, [columns]);

    return (
        <div
            className='autogrid pointer-events-none absolute inset-0 z-1 min-h-full min-w-full'
            aria-hidden='true'
            role='presentation'
            style={{ color: 'transparent' }}
        >
            <div
                ref={containerRef}
                className='absolute top-8 flex h-[50vh] w-full border-y border-faded'
            >
                {showGrid &&
                    Array.from({ length: columns }).map((_, i) => (
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
