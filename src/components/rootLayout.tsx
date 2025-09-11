'use client';

import { Suspense, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

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
    const [rootTheme, setRootTheme] = useState<string>('dark');
    const [isTopLevel, setIsTopLevel] = useState(false);
    //  const pathname = usePathname();

    console.log('render root layout');

    useEffect(() => {
        const storageTheme = localStorage.getItem('theme');
        if (storageTheme) {
            setRootTheme(storageTheme);
        }
    }, []);

    //  useEffect(() => {
    //      const segments = pathname.split('/').filter(Boolean);
    //      setIsTopLevel(pathname === '/' || segments.length === 1);
    //  }, []);

    return (
        <Suspense>
            <html lang='en' data-theme={rootTheme}>
                <CookieModalContextProvider>
                    <body
                        className={`relative w-screen overflow-x-clip bg-primary text-secondary ${fontClass}`}
                    >
                        {children}
                        <NoiseBackground />
                        <Cookies cookiesData={cookiesData} />
                        {/* <Suspense>
                            {isTopLevel && pathname === '/' && (
                                <MouseFollower variant='small' />
                            )}
                        </Suspense> */}
                        <IntroPage />
                    </body>
                </CookieModalContextProvider>
            </html>
        </Suspense>
    );
}
