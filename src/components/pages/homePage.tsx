'use client';

import { location } from '@/utils/constants';

import { Copyright, Status } from '@/components';
import { Logo, SectionWrapper } from '@/components/ui';

import type { HomePage } from '@/types';

export default function HomePage() {
    return (
        <SectionWrapper classes='h-[90svh] lg:pt-20 lg:pb-20'>
            <div className='mx-4 flex h-full flex-col justify-between lg:mx-8'>
                <Logo showSubtitle={true} />

                <div className='flex items-end'>
                    <Status location={location} />

                    <div>
                        <p className='text-body-medium uppercase lg:text-body-large'>
                            [Selected works]
                        </p>
                        <Copyright />
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
