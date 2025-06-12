import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { MouseFollower, NoiseBackground, RootLayout } from "@/components";
import { Cookies } from "@/components/ui";

import { getCookiesData } from "@/sanity/sanity-queries";

// Load custom font //
const font = localFont({
   variable: "--font-primary",
   src: [
      {
         path: "../../../public/fonts/PPSupplyMono-Regular.otf",
         weight: "400",
      },
      {
         path: "../../../public/fonts/PPSupplyMono-Ultralight.otf",
         weight: "200",
      },
   ],
});

export const metadata: Metadata = {
   title: "ManOne Music & Sound Design",
   description:
      "We create tailored sound design and audio identities that captures the spirit of your brand and resonate with your audience. Let's elevate your identity through sound.",
};

export default async function Layout({
   children,
}: {
   children: React.ReactNode;
}) {
   const cookiesData = await getCookiesData();
   return (
      <RootLayout>
         <body
            className={`${font.className} relative w-screen lg:h-screen overflow-x-clip`}
         >
            {children}
            <Cookies cookiesData={cookiesData} />
            <NoiseBackground />
            <MouseFollower variant="small" />
         </body>
      </RootLayout>
   );
}
