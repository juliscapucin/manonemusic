"use client";

import { useRef } from "react";

import { location } from "@/utils/constants";

import { Copyright, Status } from "@/components";
import { Heading, Logo, SectionWrapper, TextBlock } from "@/components/ui";

import type { HomePage } from "@/types";
import { BlockContent } from "@/types/BlockContent";

type HomePageProps = {
   content: BlockContent[];
};

export default function HomePage({ content }: HomePageProps) {
   const titleHomeRef = useRef(null);

   return (
      <SectionWrapper classes="h-full">
         <div className="h-full">
            <div
               ref={titleHomeRef}
               className="gsap-section-title mt-2 lg:mt-0 opacity-90"
            >
               <Logo />
            </div>

            <div className="w-full min-h-full lg:h-80 flex flex-col lg:flex-row gap-16 mt-8 *:lg:flex-1">
               <TextBlock
                  text={content}
                  classes="text-balance max-w-[60%] lg:max-w-[400px] mb-16 lg:mb-0"
               />

               <Status location={location} />

               <div className="text-right self-end">
                  <p>[Selected works]</p>
                  <Copyright alignRight={true} />
               </div>
            </div>
         </div>
      </SectionWrapper>
   );
}
