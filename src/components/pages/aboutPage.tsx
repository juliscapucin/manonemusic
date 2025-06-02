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
         <div className="lg:flex items-end gap-8">
            {/* First Block */}
            <div className="flex-1">
               <TitleDisplay ref={titleAboutRef}>{title}</TitleDisplay>

               {/* Image Block */}
               {image && (
                  <div className="relative lg:block h-80 overflow-clip">
                     <div className="block relative h-full aspect-square rounded-sm overflow-clip">
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
               )}
            </div>
            <div className="flex gap-8 h-full [&>*]:flex-1">
               {/* Text Block 1 */}
               {content1 && (
                  <TextBlock text={content1} classes="mt-8 lg:mt-0" />
               )}
               {/* Text Block 2 */}
               <div className="self-start">
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
         </div>
      </SectionWrapper>
   );
}
