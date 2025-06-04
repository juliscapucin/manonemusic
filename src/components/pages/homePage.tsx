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
      <SectionWrapper classes="h-full lg:pt-32 lg:pb-40">
         <div
            ref={titleHomeRef}
            className="gsap-section-title mt-2 lg:mt-0 opacity-90"
         >
            <Logo />
         </div>

         <div className="mt-8 w-full flex flex-col justify-between lg:flex-row gap-16 *:lg:flex-1">
            <TextBlock
               text={content}
               classes="text-balance max-w-[60%] lg:max-w-[400px] mb-16 lg:mb-0"
            />

            <Status location={location} />

            <span>::</span>

            <div className="flex flex-col justify-end lg:h-80 text-right">
               <p>[Selected works]</p>
               <Copyright alignRight={true} />
            </div>
         </div>
      </SectionWrapper>
   );
}
