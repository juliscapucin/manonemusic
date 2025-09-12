import { IconArrow, IconArrowShort } from '@/components/icons';

interface ButtonArrowProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    classes?: string;
    isShort?: boolean;
}

export default function ButtonArrow({
    classes,
    isShort,
    ...props
}: ButtonArrowProps) {
    return (
        <button
            className={`flex items-center justify-center opacity-30 transition-opacity duration-300 hover:opacity-100 ${classes || ''}`}
            {...props}
        >
            {isShort ? <IconArrowShort /> : <IconArrow />}
        </button>
    );
}
