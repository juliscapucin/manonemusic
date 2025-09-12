import { IconClose } from '@/components/icons';

type ButtonCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    classes?: string;
};

export default function ButtonClose({ classes, ...props }: ButtonCloseProps) {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className={`relative h-12 w-12 ${classes || ''}`}
            aria-label='close'
        >
            <IconClose />
        </button>
    );
}
