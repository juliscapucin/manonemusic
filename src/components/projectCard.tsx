"use client";

import { useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

import gsap from "gsap";

import { projectExit, panelsExit } from "@/lib/animations";
import { ImageField } from "@/types/Image";

import { CustomButton } from "@/components/ui";

import { animateCardLabel } from "@/animations";
import { urlFor } from "@/lib/sanityImageURL";
import { useGSAP } from "@gsap/react";
import { IconClose } from "./icons";

type ProjectCardProps = {
   variant: "section" | "page";
   section: string;
   title: string;
   image: ImageField;
   slug: string;
   index: number;
   handleCardHover: (arg: number | null) => void;
   hoveredCard: number | null;
};

export default function ProjectCard({
   variant,
   section,
   title,
   image,
   slug,
   index,
   handleCardHover,
   hoveredCard,
}: ProjectCardProps) {
   const router = useRouter();
   const pathname = usePathname();

   const imageOverlayRef = useRef<HTMLDivElement>(null);
   const labelRef = useRef<HTMLParagraphElement>(null);

   const aspectRatio = image.imageWidth / image.imageHeight;

   const isCardHovered = hoveredCard === index;

   // LABEL ANIMATION
   useGSAP(
      () => {
         if (!labelRef.current) return;
         const label = labelRef.current;

         // MouseEnter
         if (isCardHovered) {
            gsap.set(label, {
               opacity: 0,
            });

            gsap.to(label, {
               opacity: 1,
               duration: 0.2,
            });

            animateCardLabel(label);

            // MouseLeave
         } else {
            gsap.to(label, {
               opacity: 0,
               duration: 0.2,
            });
         }
      },
      { dependencies: [isCardHovered] },
   );

   // REVEAL ANIMATION
   useGSAP(
      () => {
         if (!imageOverlayRef.current) return;

         gsap.to(imageOverlayRef.current, {
            clipPath: isCardHovered
               ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
               : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.4,
            ease: "power4.out",
         });
      },
      { dependencies: [isCardHovered] },
   );

   return (
      <CustomButton
         transitionOnClick={() => {
            variant === "section"
               ? panelsExit(() => router.push(`/${section}/${slug}`))
               : projectExit(() => router.push(`/${section}/${slug}`), false);
         }}
         onMouseEnter={() => {
            handleCardHover(index);
         }}
         onMouseLeave={() => {
            handleCardHover(null);
         }}
         link={`/${section}/${slug}`}
         classes={`relative group block ${variant === "section" ? "min-w-40 lg:min-w-16 h-full w-fit" : `h-full w-fit lg:h-fit lg:w-32`}`}
         style={{ aspectRatio }}
         aria-labelledby={`project-title-${slug}`}
         disabled={pathname.includes(slug)}
      >
         {/* IMAGE */}
         {image?.imageRef && (
            <div
               className={`rounded-sm w-full overflow-clip lg:group-hover:scale-105 origin-bottom transition-all duration-300`}
               role="img"
               aria-label={image.imageAlt}
            >
               {/* DISABLED OVERLAY */}
               {pathname.includes(slug) && (
                  <>
                     <div className="absolute inset-0 overflow-clip border border-faded rounded-sm z-10">
                        <div className="absolute top-0 h-[1px] w-[150%] bg-faded rotate-45 origin-top-left"></div>
                        <div className="absolute top-0 right-0 h-[1px] w-[150%] bg-faded -rotate-45 origin-top-right"></div>
                     </div>

                     <div className="absolute inset-0 bg-primary opacity-70 rounded-sm z-5"></div>
                  </>
               )}
               {/* IMAGE */}
               <div>
                  <Image
                     className={`relative h-full w-full object-cover rounded-sm ${isCardHovered ? "saturate-100" : "saturate-50"} ${pathname.includes(slug) ? "saturate-0" : ""}`}
                     src={urlFor(image.imageRef).url()} // generate url from ref to avoid unnecessary calls on server
                     alt={image.imageAlt}
                     width={image.imageWidth}
                     height={image.imageHeight}
                     sizes="30vw"
                  />{" "}
               </div>

               {/* OVERLAY */}
               <div
                  className="absolute top-0 left-0 right-0 bottom-0 bg-primary opacity-50 mix-blend-overlay"
                  // mask's initial state
                  style={{
                     clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  }}
                  ref={imageOverlayRef}
               ></div>
            </div>
         )}
         <span className="sr-only">{title}</span>

         {/* LABEL */}
         {variant === "section" && (
            <div className="absolute top-full mt-2 text-labelMedium md:text-titleLarge uppercase text-left leading-none text-nowrap flex gap-2">
               <span>
                  [{index < 9 && 0}
                  {index + 1}]
               </span>
               <p className="" id={`project-title-${slug}`} ref={labelRef}>
                  {title}
               </p>
            </div>
         )}
      </CustomButton>
   );
}
