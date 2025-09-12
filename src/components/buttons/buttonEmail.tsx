import { ButtonRounded, CopyEmailButton } from '@/components/buttons';

export default function ButtonEmail({ email }: { email: string }) {
    const subject = encodeURIComponent('Hello there!');
    const body = encodeURIComponent("I'd like to ask about your services.");

    return (
        <div className='flex flex-1 flex-col items-center self-center'>
            <ButtonRounded
                aria-label='Send me an email'
                onClick={() =>
                    (window.location.href = `mailto:${email}?subject=${subject}&body=${body}`)
                }
            >
                Get in touch
            </ButtonRounded>
            <CopyEmailButton />
        </div>
    );
}
