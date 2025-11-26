'use client';

import { Cookies } from '@/components/ui';
import { MouseFollower, NoiseBackground } from '@/components';

import { useWindowDimensions } from '@/hooks';
import { Cookies as CookiesType } from '@/types';
import { IntroPage } from './pages';
import { CookieModalContextProvider } from '@/context';

type RootLayoutProps = {
    children: React.ReactNode;
    cookiesData: CookiesType;
    fontClass: string;
};

export default function RootLayout({
    children,
    cookiesData,
    fontClass,
}: RootLayoutProps) {
    const { width } = useWindowDimensions();

    return (
        <html lang='en'>
            <CookieModalContextProvider>
                <body
                    className={`relative w-screen overflow-x-clip bg-primary text-secondary ${fontClass}`}
                >
                    {children}
                    <NoiseBackground />
                    <Cookies cookiesData={cookiesData} />
                    {width && width > 1024 && <MouseFollower variant='small' />}
                    <IntroPage />
                </body>
            </CookieModalContextProvider>
        </html>
    );
}
