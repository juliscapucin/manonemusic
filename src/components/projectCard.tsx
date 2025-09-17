'use client';

import { useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { projectExit, panelsExit, animateCardLabel } from '@/lib/animations';
import { ImageField } from '@/types/Image';

import { CustomButton } from '@/components/ui';

import { urlFor } from '@/sanity/lib/sanityImageURL';
import { useWindowDimensions } from '@/hooks';

type ProjectCardProps = {
    variant: 'section' | 'page';
    section: string;
    title: string;
    image: ImageField;
    slug: string;
    index: number;
    handleCardHover: (arg: number | null) => void;
    hoveredCard: number | null;
};

export default function ProjectCard({
    variant,
    section,
    title,
    image,
    slug,
    index,
    handleCardHover,
    hoveredCard,
}: ProjectCardProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { width } = useWindowDimensions();

    const imageOverlayRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLParagraphElement>(null);

    const aspectRatio = image.imageWidth / image.imageHeight;

    const isCardHovered = hoveredCard === index;

    // LABEL ANIMATION
    useGSAP(
        () => {
            if (!labelRef.current) return;
            const label = labelRef.current;

            // MouseEnter
            if (isCardHovered) {
                gsap.set(label, {
                    opacity: 0,
                });

                gsap.to(label, {
                    opacity: 1,
                    duration: 0.2,
                });

                animateCardLabel(label);

                // MouseLeave
            } else {
                gsap.to(label, {
                    opacity: 0,
                    duration: 0.2,
                });
            }
        },
        { dependencies: [isCardHovered] }
    );

    // OVERLAY REVEAL
    useGSAP(
        () => {
            if (!imageOverlayRef.current) return;

            gsap.to(imageOverlayRef.current, {
                clipPath: isCardHovered
                    ? 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
                    : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 0.4,
                ease: 'power4.out',
            });
        },
        { dependencies: [isCardHovered] }
    );

    return (
        <CustomButton
            transitionOnClick={() => {
                variant === 'section'
                    ? panelsExit(() => router.push(`/${section}/${slug}`))
                    : projectExit(
                          () => router.push(`/${section}/${slug}`),
                          false
                      );
            }}
            onMouseEnter={() => {
                handleCardHover(index);
            }}
            onMouseLeave={() => {
                handleCardHover(null);
            }}
            link={`/${section}/${slug}`}
            classes={`relative group block ${variant === 'section' ? 'min-w-40 lg:min-w-16 h-full w-fit' : `h-full w-fit lg:h-fit lg:w-32`}`}
            style={{ aspectRatio }}
            aria-label={`Click to open ${title} project`}
            disabled={pathname.includes(slug)}
        >
            {/* IMAGE */}
            {image?.imageRef && (
                <div
                    className={`w-full origin-bottom overflow-clip rounded-xs transition-all duration-300 lg:group-hover:scale-105`}
                    role='img'
                    aria-label={image.imageAlt}
                >
                    {/* DISABLED OVERLAY */}
                    {pathname.includes(slug) && (
                        <>
                            <div className='absolute inset-0 z-10 overflow-clip rounded-xs border border-faded'>
                                <div className='absolute top-0 h-px w-[150%] origin-top-left rotate-45 bg-faded'></div>
                                <div className='absolute top-0 right-0 h-px w-[150%] origin-top-right -rotate-45 bg-faded'></div>
                            </div>

                            <div className='absolute inset-0 z-5 rounded-xs bg-primary opacity-70'></div>
                        </>
                    )}
                    {/* IMAGE */}
                    <div>
                        <Image
                            className={`relative h-full w-full rounded-xs object-cover ${isCardHovered ? 'saturate-100' : 'saturate-50'} ${pathname.includes(slug) ? 'saturate-0' : ''}`}
                            src={urlFor(image.imageRef).url()} // generate url from ref to avoid unnecessary calls on server
                            alt={image.imageAlt}
                            width={image.imageWidth}
                            height={image.imageHeight}
                            sizes='30vw'
                        />{' '}
                    </div>

                    {/* OVERLAY */}
                    <div
                        className='absolute top-0 right-0 bottom-0 left-0 bg-primary opacity-50 mix-blend-overlay'
                        // mask's initial state
                        style={{
                            clipPath:
                                'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                        }}
                        ref={imageOverlayRef}
                    ></div>
                </div>
            )}

            {/* LABEL */}
            {variant === 'section' && (
                <div className='absolute top-full mt-2 flex gap-2 text-left text-label-medium leading-none text-nowrap uppercase md:text-body-medium'>
                    <span>
                        [{index < 9 && 0}
                        {index + 1}]
                    </span>
                    <p className='' id={`project-title-${slug}`} ref={labelRef}>
                        {title}
                    </p>
                </div>
            )}
        </CustomButton>
    );
}
