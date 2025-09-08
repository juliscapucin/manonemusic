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
            <aside className='fixed h-24 w-full bottom-0 flex gap-4 overflow-x-auto border-t border-faded z-10 lg:hidden p-4 bg-primary '>
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
                className='gsap-projects-menu-page hidden lg:flex fixed w-[172px] overflow-x-clip top-16 right-0 bottom-0 flex-col gap-4 z-projects-menu bg-primary border-l border-faded p-4 overflow-y-auto gutter-stable pointer-events-auto'
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
                {/* <div style={{ height: 4000, background: "#eee" }}>Test scroll</div> */}
            </aside>
        </>
    );
}
