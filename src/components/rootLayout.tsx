"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Cookies } from "@/components/ui";
import { MouseFollower, NoiseBackground } from "@/components";

import { useWindowDimensions } from "@/hooks";
import { Cookies as CookiesType } from "@/types";
import { IntroPage } from "./pages";
import subtitle from "./ui/subtitle";

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
   const [rootTheme, setRootTheme] = useState<string>("dark");
   const { width } = useWindowDimensions();
   const pathname = usePathname();

   const segments = pathname.split("/").filter(Boolean);
   const isHome = pathname === "/";
   const isTopLevelPath = isHome || segments.length === 1;

   useEffect(() => {
      const storageTheme = localStorage.getItem("theme");
      if (storageTheme) {
         setRootTheme(storageTheme);
      }
   }, []);

   return (
      <html lang="en" data-theme={rootTheme}>
         <body
            className={`relative w-screen overflow-x-clip bg-primary text-secondary ${fontClass}`}
         >
            {children}
            <Cookies cookiesData={cookiesData} />
            <NoiseBackground />
            {isTopLevelPath && width >= 1024 && (
               <MouseFollower variant="small" />
            )}
            {/* <IntroPage /> */}
         </body>
      </html>
   );
}
