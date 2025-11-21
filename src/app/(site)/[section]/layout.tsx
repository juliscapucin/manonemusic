import { ProjectPageLayout } from '@/components/pages';
import { ProjectsMenuPage } from '@/components';
import { ProjectsMenuPageSkeleton } from '@/components/skeletons';
import {
    getHeaderNavLinks,
    getPortfolioItems,
    getPortfolioPage,
} from '@/sanity/sanity-queries';

import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function PageLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ section: string }>;
}) {
    const { section } = await params;
    const navLinks = await getHeaderNavLinks();
    const projectsPageData = await getPortfolioPage(section);

    // Because all sections are singular in the schema but vary in the header nav / slug
    const sectionWithoutS = section.endsWith('s')
        ? section.slice(0, -1)
        : section;

    const projectsData = await getPortfolioItems(sectionWithoutS);

    if (!projectsData) return notFound();

    return (
        <>
            <ProjectPageLayout
                {...{
                    navLinks,
                    projectsData,
                    projectsPageData,
                }}
            >
                <Suspense fallback={<ProjectsMenuPageSkeleton />}>
                    <ProjectsMenuPage
                        projectsData={projectsData}
                        pageData={projectsPageData}
                    />
                </Suspense>
            </ProjectPageLayout>

            {children}
        </>
    );
}
