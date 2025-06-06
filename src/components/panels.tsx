"use client";

import { PanelDesktop, PanelMobile } from "@/components";
import { Footer, Header, MenuMobile } from "@/components/ui";

import { useWindowDimensions } from "@/hooks";

import { AllData } from "@/types";

export default function Panels({ data }: { data: AllData }) {
   const { width } = useWindowDimensions();

   return (
      <main>
         {width && width >= 1024 ? (
            <>
               <Header navLinks={data.headerNavLinks} />
               <PanelDesktop data={data} sections={data.headerNavLinks} />
               <Footer navLinks={data.headerNavLinks} />
            </>
         ) : (
            <>
               <MenuMobile navLinks={data.headerNavLinks} />
               <PanelMobile data={data} />
            </>
         )}
      </main>
   );
}
