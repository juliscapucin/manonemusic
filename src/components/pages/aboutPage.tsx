'use client';

import { useRef } from 'react';
import Image from 'next/image';

import { SectionWrapper, TextBlock, TitleDisplay } from '@/components/ui';

import type { AboutPage } from '@/types';
import { urlFor } from '@/sanity/lib/sanityImageURL';

type AboutPageProps = AboutPage;

export default function AboutPage({
    title,
    subtitle,
    content1,
    content2,
    image,
}: AboutPageProps) {
    const titleAboutRef = useRef(null);

    return (
        <SectionWrapper classes='w-full'>
            <TitleDisplay ref={titleAboutRef}>{title}</TitleDisplay>
            <div className='relative z-5 h-fit w-full border-t border-faded bg-primary px-4 md:h-96 lg:h-72 lg:px-8 lg:pt-8'>
                <div className='w-full max-w-section items-start gap-8 *:flex-1 lg:flex'>
                    {/* Image Block */}
                    {image && (
                        <div className='relative mt-4 aspect-square w-full overflow-clip rounded-xs lg:mt-0 lg:block lg:max-w-[420px]'>
                            <Image
                                {...{
                                    src: urlFor(image.imageRef).url(), // generate url via _ref to save on api calls
                                    alt: `Profile picture of Matt Rudge, the leading figure behind ManOne Music`,
                                    fill: true,
                                    className: 'object-cover',
                                    sizes: '50vw',
                                }}
                            />
                        </div>
                    )}
                    {/* Text Block 1 */}
                    {content1 && (
                        <TextBlock text={content1} classes='mt-8 lg:mt-0' />
                    )}
                    {/* Text Block 2 */}
                    <div>{content2 && <TextBlock text={content2} />}</div>
                </div>
            </div>
        </SectionWrapper>
    );
}
