import type { Metadata } from 'next';

// Sanity Live implementation
import { draftMode } from 'next/headers';
import { sanityFetch } from '@/lib/sanity.fetch';

import {
    PreviewDocumentsCount, // Sanity Live implementation
    DocumentsCount, // Sanity Live implementation
    sanityQuery, // Sanity Live implementation
    Panels,
} from '@/components';

export const metadata: Metadata = {
    title: 'Man One Music',
    description:
        'Man One Music and lead composer Matt Rudge specialise in original music and sound.',
};

import { notFound } from 'next/navigation';

import {
    getHomePage,
    getAboutPage,
    getContactPage,
    getPortfolioItems,
    getPortfolioSections,
    getHeaderNavLinks,
} from '@/sanity/sanity-queries';

export default async function Page() {
    const [
        headerNavLinks,
        homePage,
        contactPage,
        aboutPage,
        sections,
        films,
        commercials,
        releases,
        projects,
    ] = await Promise.all([
        getHeaderNavLinks(),
        getHomePage(),
        getContactPage(),
        getAboutPage(),
        getPortfolioSections(),
        getPortfolioItems('film'),
        getPortfolioItems('commercial'),
        getPortfolioItems('release'),
        getPortfolioItems('project'),
    ]);

    const sanityData = await sanityFetch<number>({
        query: sanityQuery,
        tags: ['post'],
    });

    if ((await draftMode()).isEnabled) {
        return <PreviewDocumentsCount data={sanityData} />;
    }

    const portfolioSections = sections.reduce(
        (acc: { [key: string]: (typeof sections)[0] }, item) => {
            acc[item.slug] = item;
            return acc;
        },
        {}
    );

    const data = {
        headerNavLinks,
        homePage,
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
        !data.homePage ||
        !data.contactPage ||
        !data.aboutPage ||
        !data.portfolioSections ||
        !data.films ||
        !data.commercials ||
        !data.releases ||
        !data.projects
    )
        return notFound();

    return (
        <>
            <DocumentsCount data={sanityData} />
            <Panels data={data} />
        </>
    );
}
