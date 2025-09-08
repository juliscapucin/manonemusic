'use client';

import { useEffect, useRef, useState } from 'react';

export default function AutoGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [columns, setColumns] = useState(0);

    useEffect(() => {
        const updateGrid = () => {
            const containerWidth = containerRef.current?.offsetWidth || 0;
            const colCount = Math.floor(containerWidth / 60);
            setColumns(colCount - 1);
        };

        updateGrid();
        window.addEventListener('resize', updateGrid);
        return () => window.removeEventListener('resize', updateGrid);
    }, []);

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
