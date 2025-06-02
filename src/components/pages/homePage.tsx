"use client";

import { useRef } from "react";

import { location } from "@/utils/constants";

import { Copyright, Status } from "@/components";
import { Heading, Logo, SectionWrapper, TextBlock } from "@/components/ui";

import type { HomePage } from "@/types";
import { BlockContent } from "@/types/BlockContent";

type HomePageProps = {
   subtitle: string;
   content: BlockContent[];
};

export default function HomePage({ subtitle, content }: HomePageProps) {
   const titleHomeRef = useRef(null);

   return (
      <SectionWrapper classes={"portrait:h-dvh"}>
         <div className="h-full flex flex-col justify-between">
            <div>
               <div
                  ref={titleHomeRef}
                  className="gsap-section-title mt-2 lg:mt-0 opacity-90"
               >
                  <Logo />
               </div>
               <Heading
                  tag="h2"
                  variant="headline"
                  classes="lg:w-1/2 mt-4 uppercase opacity-80"
               >
                  {subtitle}
               </Heading>
            </div>
            <div className="w-full landscape:flex justify-between mt-32 md:mt-16">
               <TextBlock
                  text={content}
                  classes="text-balance max-w-[400px] mb-16 landscape:mb-0"
               />

               <Status location={location} />
            </div>
            <div className="text-right my-8">
               <p>[Selected works]</p>
               <Copyright alignRight={true} />
            </div>
         </div>
      </SectionWrapper>
   );
}
