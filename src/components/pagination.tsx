import { NavLink } from '@/types';
import { IconArrow } from '@/components/icons';

type PaginationProps = {
    action: (direction: 'previous' | 'next') => void;
    index: number;
    sections: NavLink[];
};

type ScrollArrowProps = {
    direction: 'previous' | 'next';
    isDisabled: boolean;
    onClick: () => void;
};

const ScrollArrow = ({ direction, isDisabled, onClick }: ScrollArrowProps) => (
    <button
        className={`flex items-center gap-2 transition-opacity duration-300 ${
            direction === 'previous' ? 'rotate-180' : ''
        } ${isDisabled ? 'opacity-20' : 'opacity-100'}`}
        onClick={onClick}
        aria-label={`Scroll to ${direction} page`}
        disabled={isDisabled}
    >
        <IconArrow />
    </button>
);

export default function Pagination({
    action,
    index,
    sections,
}: PaginationProps) {
    return (
        <div className='flex h-full justify-center gap-8 border-r border-l border-faded px-4 py-6'>
            <ScrollArrow
                direction='previous'
                isDisabled={index === 0}
                onClick={() => action('previous')}
            />
            <span className='text-right'>
                [0{index + 1}/0{sections.length}]
            </span>

            <ScrollArrow
                direction='next'
                isDisabled={index === sections.length - 1}
                onClick={() => action('next')}
            />
        </div>
    );
}
