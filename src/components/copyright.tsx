type CopyrightProps = {
    alignRight?: boolean;
};

export default function Copyright({ alignRight }: CopyrightProps) {
    const year = new Date().getFullYear();

    return (
        <p
            className={`text-body-medium text-nowrap uppercase lg:text-body-large ${alignRight && 'text-right'}`}
        >
            {`©2017–${year}`}
        </p>
    );
}
