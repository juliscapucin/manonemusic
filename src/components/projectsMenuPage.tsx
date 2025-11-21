'use client';

import { useRef, useState } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { PortfolioItem, PortfolioPage } from '@/types';
import { ProjectCard } from '@/components';

type ProjectsMenuPageProps = {
    projectsData: PortfolioItem[];
    pageData: PortfolioPage;
};

export default function ProjectsMenuPage({
    projectsData,
    pageData,
}: ProjectsMenuPageProps) {
    const menuDesktopRef = useRef<HTMLDivElement>(null);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const handleCardHover = (arg: number | null) => setHoveredCard(arg);

    // Enter animation
    useGSAP(
        () => {
            if (!menuDesktopRef.current || !menuDesktopRef.current?.children)
                return;

            gsap.fromTo(
                menuDesktopRef.current.children,
                {
                    xPercent: 100,
                },
                { xPercent: 0, duration: 0.8, stagger: 0.1, ease: 'power4.out' }
            );
        },
        { dependencies: [], scope: menuDesktopRef }
    );

    return (
        <>
            {/* Mobile */}
            <aside className='fixed bottom-0 z-10 flex h-24 w-full gap-4 overflow-x-auto border-t border-faded bg-primary p-4 lg:hidden'>
                {projectsData?.map((project: PortfolioItem, index) => {
                    return (
                        <ProjectCard
                            index={index}
                            variant='page'
                            section={pageData.slug}
                            key={project.slug}
                            title={project.title}
                            image={project.image}
                            slug={project.slug}
                            handleCardHover={handleCardHover}
                            hoveredCard={hoveredCard}
                        />
                    );
                })}
            </aside>

            {/* Desktop */}
            <aside
                ref={menuDesktopRef}
                className='gsap-projects-menu-page gutter-stable pointer-events-auto fixed top-16 right-0 bottom-0 z-projects-menu hidden w-[172px] flex-col gap-4 overflow-x-clip overflow-y-auto border-l border-faded bg-primary p-4 lg:flex'
            >
                {projectsData?.map((project: PortfolioItem, index) => {
                    return (
                        <ProjectCard
                            index={index}
                            variant='page'
                            section={pageData.slug}
                            key={project.slug}
                            title={project.title}
                            image={project.image}
                            slug={project.slug}
                            handleCardHover={handleCardHover}
                            hoveredCard={hoveredCard}
                        />
                    );
                })}
            </aside>
        </>
    );
}
