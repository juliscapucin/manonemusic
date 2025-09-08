'use client';

import { Project } from '@/types';
import { PlayerTrackList } from '@/components';
import { ButtonRounded } from '@/components/buttons';
import { ImageWithSpinner, TextBlock } from '@/components/ui';
import { usePathname } from 'next/navigation';

type ProjectPageContentProps = Project & {
    setIsTrailerActive: (value: boolean) => void;
    setIsPageDisplaced: (value: boolean) => void;
};

export default function ProjectPageContent({
    image,
    description,
    tracklist,
    projectVideo,
    projectLink,
    releaseLink,
    setIsTrailerActive,
    setIsPageDisplaced,
}: ProjectPageContentProps) {
    const pathname = usePathname();

    return (
        <div className='gsap-project-page-content relative flex-1 gap-8 border-b border-l border-faded bg-primary pb-12 md:w-fit md:overflow-y-auto md:pb-0 lg:pl-8'>
            {/* IMAGE */}
            <div className='gsap-project-image z-50 w-full max-w-[550px] min-w-[300px] pt-8 opacity-0 md:fixed md:w-1/2 lg:w-1/3 xl:w-1/4'>
                <ImageWithSpinner
                    quality={70}
                    {...{
                        image,
                        fill: true,
                        classes: '',
                        sizes: '50vw',
                        priority: true,
                    }}
                />
                §
            </div>
            §{/* CONTENT */}
            <div className='mb-8 h-fit max-w-prose px-4 pt-4 md:mb-16 md:ml-[50vw] md:pt-8 md:pr-8 lg:ml-[30vw] lg:flex-1 xl:ml-[25vw]'>
                {tracklist && <PlayerTrackList tracks={tracklist} />}
                {description && <TextBlock text={description} />}

                {/* Project Links */}
                <div className='mx-auto mt-10 mb-8 flex w-fit flex-col items-center gap-4 lg:flex-row'>
                    {projectVideo && setIsTrailerActive && (
                        <ButtonRounded
                            key={'button-trailer'}
                            onClick={() => {
                                setIsTrailerActive(true);
                                setIsPageDisplaced(true);
                            }}
                        >
                            View{' '}
                            {pathname.includes('film') ? 'Trailer' : 'Video'}
                        </ButtonRounded>
                    )}
                    {projectLink && (
                        <ButtonRounded
                            key={'button-project'}
                            href={projectLink}
                            target='_blank'
                        >
                            View Project
                        </ButtonRounded>
                    )}
                    {releaseLink && (
                        <ButtonRounded
                            key={'button-release'}
                            href={releaseLink}
                            target='_blank'
                        >
                            View Release
                        </ButtonRounded>
                    )}
                </div>
            </div>
        </div>
    );
}
