'use client';

import { useRef } from 'react';

import { Copyright, Credits, SocialLinks } from '@/components';
import { SectionWrapper, TitleDisplay } from '@/components/ui';
import type { ContactPage } from '@/types';
import ButtonEmail from '../buttons/buttonEmail';

type ContactPageProps = ContactPage;

export default function ContactPage({
    title,
    email,
    socials,
}: ContactPageProps) {
    const titleContactRef = useRef(null);

    return (
        <SectionWrapper classes='lg:w-full'>
            <TitleDisplay ref={titleContactRef}>{title}</TitleDisplay>
            <div className='relative z-5 h-full w-full border-t border-b border-faded bg-primary px-8 pb-8 lg:h-72'>
                <div className='flex h-full w-full max-w-section flex-col-reverse gap-32 *:flex-1 lg:flex-row lg:gap-16'>
                    <div className='lg:self-end'>
                        <Copyright />
                        <Credits />
                    </div>
                    <ButtonEmail email={email} />

                    <SocialLinks data={socials} />
                </div>
            </div>
        </SectionWrapper>
    );
}
