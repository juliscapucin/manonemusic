"use client";

import { useRef } from "react";

import { Copyright, Credits, SocialLinks } from "@/components";
import { SectionWrapper, Subtitle, TitleDisplay } from "@/components/ui";
import type { ContactPage } from "@/types";
import ButtonEmail from "../buttons/buttonEmail";

type ContactPageProps = ContactPage;

export default function ContactPage({
   title,
   subtitle,
   email,
   socials,
}: ContactPageProps) {
   const titleContactRef = useRef(null);

   return (
      <SectionWrapper classes="landscape:w-full">
         {subtitle && <Subtitle subtitle={subtitle} />}
         <TitleDisplay ref={titleContactRef}>{title}</TitleDisplay>
         <div className="h-80 w-full flex flex-col-reverse lg:flex-row gap-16 *:flex-1">
            <div className="landscape:self-end">
               <Copyright />
               <Credits />
            </div>
            <ButtonEmail email={email} />

            <SocialLinks data={socials} />
         </div>
      </SectionWrapper>
   );
}
