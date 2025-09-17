'use client';

import { PanelDesktop, PanelMobile } from '@/components';
import { Footer, Header, MenuMobile } from '@/components/ui';

import { AllData } from '@/types';

import { useWindowDimensions } from '@/hooks';
import { Suspense } from 'react';

export default function Panels({ data }: { data: AllData }) {
    const { width } = useWindowDimensions();

    return (
        <main>
            {width && width >= 1024 ? (
                <Suspense>
                    <Header navLinks={data.headerNavLinks} />
                    <PanelDesktop data={data} sections={data.headerNavLinks} />
                    <Footer navLinks={data.headerNavLinks} />{' '}
                </Suspense>
            ) : (
                <Suspense>
                    <MenuMobile navLinks={data.headerNavLinks} />
                    <PanelMobile data={data} />
                </Suspense>
            )}
        </main>
    );
}
