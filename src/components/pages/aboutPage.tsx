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
      <SectionWrapper classes="w-full">
         <TitleDisplay ref={titleAboutRef}>{title}</TitleDisplay>
         <div className="relative w-full lg:flex items-start *:flex-1 gap-8 lg:px-8 lg:pt-8 lg:h-72 bg-primary border-faded-10 border-t">
            {/* Image Block */}
            {image && (
               <div className="relative lg:block w-full aspect-square rounded-sm overflow-clip">
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
            )}
            {/* Text Block 1 */}
            {content1 && <TextBlock text={content1} classes="mt-8 lg:mt-0" />}
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
