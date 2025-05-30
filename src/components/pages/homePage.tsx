"use client";

import { useRef } from "react";

import { location } from "@/utils/constants";

import { Copyright, Status } from "@/components";
import { Heading, Logo, SectionWrapper } from "@/components/ui";

import type { HomePage } from "@/types";

export default function HomePage() {
   const titleHomeRef = useRef(null);

   return (
      <SectionWrapper classes={"portrait:h-dvh"}>
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
            Music & Sound Design
         </Heading>
         <div className="w-full landscape:flex justify-between mt-32 md:mt-16">
            <p className="text-balance max-w-[400px] mb-16 landscape:mb-0">
               Tailored sound design and audio identities that capture the
               spirit of your brand and resonate with your audience
            </p>
            <Status location={location} />
         </div>
         <div className="my-8">
            <Copyright alignRight={true} />
         </div>
      </SectionWrapper>
   );
}
