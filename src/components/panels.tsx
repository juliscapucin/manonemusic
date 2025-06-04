"use client";

import { PanelDesktop, PanelMobile } from "@/components";
import { Footer, NavMenu } from "@/components/ui";

import { useWindowDimensions } from "@/hooks";

import { AllData } from "@/types";

export default function Panels({ data }: { data: AllData }) {
   const { width } = useWindowDimensions();

   return (
      <main>
         {width && width >= 1024 ? (
            <>
               {/* <Header navLinks={data.headerNavLinks} /> */}
               <NavMenu
                  navLinks={data.headerNavLinks}
                  breakpoint="desktop"
                  variant="section"
               />
               <PanelDesktop data={data} sections={data.headerNavLinks} />
               <Footer navLinks={data.headerNavLinks} />
            </>
         ) : (
            <>
               <NavMenu
                  navLinks={data.headerNavLinks}
                  breakpoint="mobile"
                  variant="section"
               />
               <PanelMobile data={data} />
            </>
         )}
      </main>
   );
}
