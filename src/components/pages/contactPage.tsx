"use client";

import { useRef } from "react";

import { Copyright, Credits, SocialLinks } from "@/components";
import { SectionWrapper, TitleDisplay } from "@/components/ui";
import type { ContactPage } from "@/types";
import ButtonEmail from "../buttons/buttonEmail";

type ContactPageProps = ContactPage;

export default function ContactPage({
   title,
   email,
   socials,
}: ContactPageProps) {
   const titleContactRef = useRef(null);

   return (
      <SectionWrapper classes="lg:w-full">
         <TitleDisplay ref={titleContactRef}>{title}</TitleDisplay>
         <div className="relative h-full lg:h-72 w-full flex flex-col-reverse gap-32 lg:flex-row lg:gap-16 *:flex-1 px-8 pb-8 border-t border-b border-faded bg-primary z-5">
            <div className="lg:self-end">
               <Copyright />
               <Credits />
            </div>
            <ButtonEmail email={email} />

            <SocialLinks data={socials} />
         </div>
      </SectionWrapper>
   );
}
