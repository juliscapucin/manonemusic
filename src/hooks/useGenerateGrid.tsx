import { useEffect, useState } from 'react';

export default function useGenerateGrid(containerRef: HTMLDivElement | null) {
    const [columns, setColumns] = useState(0);

    // Update number of columns on mount and when containerRef changes
    useEffect(() => {
        const updateGrid = () => {
            const containerWidth = containerRef?.offsetWidth || 0;
            const colCount = Math.floor(containerWidth / 60);
            setColumns(colCount - 1);
        };

        updateGrid();
        window.addEventListener('resize', updateGrid);
        return () => window.removeEventListener('resize', updateGrid);
    }, [containerRef]);

    return columns;
}
