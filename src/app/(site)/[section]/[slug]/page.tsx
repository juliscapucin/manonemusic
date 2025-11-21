import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProject } from '@/sanity/sanity-queries';

import { ProjectPage } from '@/components/pages';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Project',
    description: 'Project description',
};

export default async function Page(props: {
    params: Promise<{ section: string; slug: string }>;
}) {
    const { section, slug } = await props.params;

    // Because all sections are singular in the schema but vary in the header nav / slug
    const sectionWithoutS = section.endsWith('s')
        ? section.slice(0, -1)
        : section;

    const projectPageData = await getProject(sectionWithoutS, slug);

    if (!projectPageData) return notFound();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProjectPage
                {...{
                    projectPageData,
                    section,
                }}
            />
        </Suspense>
    );
}
