"use client";

import { PanelDesktop, PanelMobile } from "@/components";
import { Footer, Header, MenuMobile } from "@/components/ui";

import { AllData } from "@/types";

export default function Panels({ data }: { data: AllData }) {
   return (
      <main>
         <div className="hidden lg:block">
            <Header navLinks={data.headerNavLinks} />
            <PanelDesktop data={data} sections={data.headerNavLinks} />
            <Footer navLinks={data.headerNavLinks} />
         </div>

         <div className="lg:hidden">
            <MenuMobile navLinks={data.headerNavLinks} />
            <PanelMobile data={data} />
         </div>
      </main>
   );
}
