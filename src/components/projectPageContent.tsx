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
        <div className='gsap-project-page-content relative flex-1 w-fit gap-8 mt-8 pb-24 md:pb-0 lg:pt-8 lg:pl-8 md:pr-16 border-t border-faded md:overflow-y-auto bg-primary'>
            {/* IMAGE */}
            <div className='gsap-project-image md:fixed w-full md:w-1/2 lg:w-1/3 xl:w-1/4 min-w-[300px] max-w-[550px] opacity-0'>
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
            </div>

            {/* CONTENT */}
            <div className='mt-2 md:ml-[50vw] lg:ml-[30vw] xl:ml-[25vw] px-4 pt-4 lg:pt-0 lg:flex-1 max-w-prose'>
                {tracklist && <PlayerTrackList tracks={tracklist} />}
                {description && <TextBlock text={description} />}

                {/* Project Links */}
                <div className='mt-10 flex flex-col lg:flex-row gap-4 w-fit mx-auto'>
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
