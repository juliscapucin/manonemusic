'use client';

import { PortableText } from '@portabletext/react';
import { useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';

import { ButtonClose, ButtonRounded } from '@/components/buttons';
import { Heading } from '@/components/ui';
import { useCloseOnClickOutside, useCloseOnKeyPress } from '@/hooks';
import { Cookies as CookiesType } from '@/types';
import { useGSAP } from '@gsap/react';
import { useCookieModalContext } from '@/context';

type CookiesProps = {
    cookiesData: CookiesType;
};

export default function Cookies({ cookiesData }: CookiesProps) {
    const {
        isModalOpen,
        setIsModalOpen,
        cookieConsent,
        setCookieConsent,
        updateCookieConsent,
    } = useCookieModalContext();
    const cookieButtonRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const backgroundOverlayRef = useRef<HTMLDivElement>(null);

    // Enter cookie button animation + modal initial position
    useLayoutEffect(() => {
        if (!cookieButtonRef.current || cookieConsent === 'true') return;
        gsap.set(cookieButtonRef.current, { xPercent: 120 });
        gsap.to(cookieButtonRef.current, {
            xPercent: 0,
            duration: 0.2,
            ease: 'power4.out',
            delay: 2.7,
        });
    }, [cookieConsent]);

    // Open / Close animation
    useGSAP(() => {
        if (
            !modalRef.current ||
            !backgroundOverlayRef.current ||
            cookieConsent === 'true'
        )
            return;

        const tl = gsap.timeline();

        tl.to(modalRef.current, {
            yPercent: isModalOpen ? 0 : 150,
            opacity: isModalOpen ? 1 : 0,
            duration: 0.4,
            ease: 'power2.out',
        }).to(
            backgroundOverlayRef.current,
            {
                opacity: isModalOpen ? 1 : 0,
                duration: 0.3,
                ease: 'power2.out',
            },
            '<' // sync with modal animation
        );
    }, [isModalOpen]);

    // Close on click outside hook
    useCloseOnClickOutside(
        modalRef,
        cookieButtonRef,
        setIsModalOpen,
        isModalOpen
    );

    // Close on Escape key
    useCloseOnKeyPress(isModalOpen, setIsModalOpen);

    if (cookieConsent === 'true') return null;

    const handleOKButton = (cookie: string) => {
        updateCookieConsent(cookie);

        if (!cookieButtonRef.current) return;
        gsap.to(cookieButtonRef.current, {
            xPercent: 100,
            duration: 0.2,
            ease: 'power4.in',
            onComplete: () => {
                setCookieConsent(cookie);
            },
        });
    };

    {
        return (
            cookiesData &&
            cookieConsent !== 'true' && (
                <>
                    {/* Background Overlay */}
                    <div
                        ref={backgroundOverlayRef}
                        className='pointer-events-none fixed inset-0 z-cookies-modal mx-auto flex items-end justify-end overflow-clip md:bg-primary/80'
                    ></div>

                    {/* Cookie Button */}
                    <div className='pointer-events-none fixed inset-0 z-cookies-modal mx-auto flex items-end justify-end overflow-clip'>
                        <div
                            ref={cookieButtonRef}
                            className='pointer-events-auto absolute right-12 bottom-22 z-cookies-elements flex items-center gap-4 rounded-full border border-secondary bg-primary px-5 py-1 text-secondary'
                        >
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className='underlined-link text-body-small uppercase select-none'
                            >
                                This site uses cookies
                            </button>
                            <ButtonRounded
                                classes='text-body-small leading-[1.4]'
                                onClick={() => handleOKButton('true')}
                            >
                                OK
                            </ButtonRounded>
                        </div>
                    </div>

                    {/* Modal */}
                    <div
                        ref={modalRef}
                        className='fixed top-4 right-4 bottom-6 left-4 z-cookies-elements pr-0 opacity-0 md:right-4 md:left-auto md:w-3/4 lg:w-2/5'
                        role='dialog'
                        aria-modal='true'
                        aria-label='Cookie preferences'
                    >
                        {/* Close Button */}
                        <div className='fixed top-[1px] right-4 left-1 z-cookies-elements flex justify-end bg-primary p-3 pt-4'>
                            <ButtonClose
                                onClick={() => setIsModalOpen(false)}
                            />
                        </div>

                        {/* Dismiss Button */}
                        <div className='pointer-events-none fixed right-4 bottom-[1px] left-[1px] z-cookies-elements flex items-center justify-center bg-primary'>
                            <ButtonRounded
                                classes='block my-4 pointer-events-auto'
                                onClick={() => handleOKButton('true')}
                            >
                                Agree and dismiss
                            </ButtonRounded>
                        </div>

                        <div className='gutter-stable relative ml-auto h-full w-full overflow-x-clip overflow-y-scroll rounded-xs border border-secondary bg-primary pb-28 lg:mr-8'>
                            <div className='custom-rich-text w-full px-4 text-secondary lg:px-8'>
                                <Heading
                                    tag='h1'
                                    id='cookie-modal-title'
                                    variant='headline'
                                    classes='mb-8 mt-24 lg:mt-18'
                                >
                                    {cookiesData.title}
                                </Heading>
                                <PortableText value={cookiesData.content} />
                            </div>
                        </div>
                    </div>
                </>
            )
        );
    }
}
