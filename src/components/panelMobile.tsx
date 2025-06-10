"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { AllData } from "@/types";
import { usePathname } from "next/navigation";
import { PanelContent } from "@/components";
import { useLayoutEffect } from "react";

export default function PanelMobile({ data }: { data: AllData }) {
   const pathname = usePathname();

   useLayoutEffect(() => {
      gsap.registerPlugin(ScrollToPlugin);

      if (pathname === "/") {
         gsap.to(window, {
            scrollTo: {
               y: "#panel-home",
               offsetY: 0,
            },
            duration: 0.5,
         });
         return;
      }

      gsap.to(window, {
         scrollTo: {
            y: `#panel-${pathname.split("/")[1]}`,
            offsetY: 50,
         },
         duration: 0.5,
      });
   }, [pathname]);

   return (
      <div className="lg:hidden space-y-32">
         {data.headerNavLinks.map((section) => (
            <section
               id={`panel-${section.slug === "/" ? "home" : section.slug}`}
               data-id={`panel-${section.slug}`}
               className="panel w-screen overflow-x-clip"
               key={`panel-${section.slug}`}
            >
               <PanelContent data={data} section={section.slug} />
            </section>
         ))}
      </div>
   );
}
