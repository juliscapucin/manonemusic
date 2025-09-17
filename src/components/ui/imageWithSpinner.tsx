'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageField } from '@/types/Image';

import { urlFor } from '@/sanity/lib/sanityImageURL';

type ImageWithSpinnerProps = {
    classes: string;
    sizes: string;
    quality?: number;
    priority?: boolean;
    image: ImageField;
};

export default function ImageWithSpinner({
    classes,
    image,
    sizes,
    quality,
    priority = false,
}: ImageWithSpinnerProps) {
    const [isLoading, setIsLoading] = useState(true);
    const { imageRef, imageAlt, imageWidth, imageHeight } = image;

    return (
        <>
            {isLoading && (
                <div className='absolute top-0 left-0 flex h-full w-full items-center justify-center bg-faded-5'>
                    <div className='relative aspect-square w-[10%] min-w-12 animate-spin'>
                        <div className='absolute top-0 left-0 z-10 h-full w-full rounded-full border border-faded border-r-secondary'></div>
                        <div className='absolute top-0 left-0 h-full w-full rounded-full border border-faded-30 opacity-20'></div>
                    </div>
                </div>
            )}
            <Image
                className={classes}
                src={urlFor(imageRef).url()} // generate url from ref to avoid unnecessary calls on server
                alt={imageAlt}
                sizes={sizes}
                quality={quality ? quality : 70}
                width={imageWidth}
                height={imageHeight}
                onLoad={() => {
                    setIsLoading(false);
                }}
                priority={priority}
            />
        </>
    );
}
