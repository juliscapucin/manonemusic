"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Cookies } from "@/components/ui";
import { MouseFollower, NoiseBackground } from "@/components";

import { useWindowDimensions } from "@/hooks";
import { Cookies as CookiesType } from "@/types";

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
   const isTopLevelPath = pathname.split("/").filter(Boolean).length === 1;

   useEffect(() => {
      const storageTheme = localStorage.getItem("theme");
      if (storageTheme) {
         setRootTheme(storageTheme);
      }
   }, []);

   return (
      <html
         lang="en"
         data-theme={rootTheme}
         className="relative w-screen h-screen custom-min-h-screen bg-primary text-secondary"
      >
         <body
            className={`${fontClass} relative w-screen lg:h-screen overflow-x-clip`}
         >
            {children}
            <Cookies cookiesData={cookiesData} />
            <NoiseBackground />
            {isTopLevelPath && width >= 1024 && (
               <MouseFollower variant="small" />
            )}
         </body>
      </html>
   );
}
