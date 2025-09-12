import type { Metadata } from 'next';

import { Panels } from '@/components';

export const metadata: Metadata = {
    title: 'Man One Music',
    description:
        'Man One Music and lead composer Matt Rudge specialise in original music and sound.',
};

import { notFound } from 'next/navigation';

import {
    getAboutPage,
    getContactPage,
    getHeaderNavLinks,
    getPortfolioItems,
    getPortfolioSections,
} from '@/sanity/sanity-queries';

export async function generateStaticParams() {
    const headerNavLinks = await getHeaderNavLinks();
    // Filter out the home page if its slug is "/"
    return headerNavLinks
        .filter((item) => item.slug && item.slug !== '/')
        .map((item) => ({
            section: item.slug,
        }));
}

export default async function Page(props: {
    params: Promise<{ section: string }>;
}) {
    const params = await props.params;
    const [
        headerNavLinks,
        contactPage,
        aboutPage,
        sections,
        films,
        commercials,
        releases,
        projects,
    ] = await Promise.all([
        getHeaderNavLinks(),
        getContactPage(),
        getAboutPage(),
        getPortfolioSections(),
        getPortfolioItems('film'),
        getPortfolioItems('commercial'),
        getPortfolioItems('release'),
        getPortfolioItems('project'),
    ]);

    const portfolioSections = sections.reduce(
        (acc: { [key: string]: (typeof sections)[0] }, item) => {
            acc[item.slug] = item;
            return acc;
        },
        {}
    );

    // Check if the section exists, otherwise thwrow Error Page
    if (!headerNavLinks.find((item) => item.slug === params.section)) {
        return notFound();
    }

    const data = {
        headerNavLinks,
        contactPage,
        aboutPage,
        portfolioSections,
        films,
        commercials,
        releases,
        projects,
    };

    if (
        !data ||
        !data.headerNavLinks ||
        !data.contactPage ||
        !data.aboutPage ||
        !data.portfolioSections ||
        !data.films ||
        !data.commercials ||
        !data.releases ||
        !data.projects
    )
        return notFound();

    return <Panels data={data} />;
}
