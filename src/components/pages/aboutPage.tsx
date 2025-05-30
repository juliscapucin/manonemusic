"use client";

import { useRef } from "react";
import Image from "next/image";

import {
   SectionWrapper,
   Subtitle,
   TextBlock,
   TitleDisplay,
} from "@/components/ui";

import { ButtonRounded } from "@/components/buttons";

import type { AboutPage } from "@/types";
import { urlFor } from "@/lib/sanityImageURL";

type AboutPageProps = AboutPage;

export default function AboutPage({
   title,
   subtitle,
   content1,
   content2,
   image,
}: AboutPageProps) {
   const titleAboutRef = useRef(null);

   return (
      <SectionWrapper>
         <div className="landscape:flex items-end gap-8 [&>*]:flex-1 [&>*]:md:min-w-[45vw] [&>*]:lg:min-w-[28vw]">
            {/* First Block */}
            <div>
               <TitleDisplay ref={titleAboutRef}>{title}</TitleDisplay>
               <div className="landscape:h-80">
                  {subtitle && <Subtitle subtitle={subtitle} />}
               </div>
            </div>
            {/* Image Block */}
            <div className="relative lg:block">
               <div className="block relative aspect-square rounded-sm overflow-clip">
                  <Image
                     {...{
                        src: urlFor(image.imageRef).url(), // generate url via _ref to save on api calls
                        alt: `Profile picture of Matt Rudge, the leading figure behind ManOne Music`,
                        fill: true,
                        className: "object-cover",
                        sizes: "50vw",
                     }}
                  />
               </div>
            </div>
            {/* Text Block 1 */}
            {content1 && (
               <TextBlock text={content1} classes="mt-8 landscape:mt-0" />
            )}
            {/* Text Block 2 */}
            <div>
               {content2 && <TextBlock text={content2} />}
               {/* TODO: IMPLEMENT BUTTONS */}
               {/* <div className='flex gap-4 mt-8'>
						<ButtonRounded onClick={() => console.log("services")}>
							Services
						</ButtonRounded>
						<ButtonRounded onClick={() => console.log("services")}>
							Clients
						</ButtonRounded>
					</div> */}
            </div>
         </div>
      </SectionWrapper>
   );
}
