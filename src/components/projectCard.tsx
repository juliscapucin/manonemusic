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

type ProjectCardProps = {
   variant: "section" | "page";
   section: string;
   title: string;
   image: ImageField;
   slug: string;
   index: number;
   handleCardHover: ((arg: number | null) => void) | null;
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

   const cardImageRef = useRef<HTMLDivElement>(null);
   const labelRef = useRef<HTMLParagraphElement>(null);

   const aspectRatio = image.imageWidth / image.imageHeight;

   const isCardHovered = hoveredCard === index;

   // LABEL ANIMATIONS
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

   return (
      <CustomButton
         transitionOnClick={() => {
            variant === "section"
               ? panelsExit(() => router.push(`/${section}/${slug}`))
               : projectExit(() => router.push(`/${section}/${slug}`), false);
         }}
         onMouseEnter={() => {
            if (variant === "section" && handleCardHover)
               handleCardHover(index);
         }}
         onMouseLeave={() => {
            if (variant === "section" && handleCardHover) handleCardHover(null);
         }}
         link={`/${section}/${slug}`}
         classes={`relative group block bg-primary ${variant === "section" ? "min-w-40 h-full w-fit bg-faded-10" : `h-full w-fit lg:h-fit lg:w-32 ${pathname.includes(slug) && "pointer-events-none"}`}`}
         style={{ aspectRatio }}
         aria-labelledby={`project-title-${slug}`}
         disabled={pathname.includes(slug)}
      >
         {image?.imageRef && (
            <div
               className="rounded-sm pointer-events-none w-full overflow-hidden group-hover:scale-105 origin-bottom transition-all duration-300"
               ref={cardImageRef}
               role="img"
               aria-label={image.imageAlt}
            >
               <div
                  className={`absolute top-0 left-0 mix-blend-multiply w-full h-full z-15 bg-primary transition-opacity duration-300 ${(!isCardHovered && hoveredCard) || (variant === "page" && !pathname.includes(slug)) ? "group-hover:opacity-0 opacity-80" : "opacity-0"}`}
               ></div>
               <Image
                  className={`relative h-full w-full object-cover ${variant === "section" && "rounded-sm"}`}
                  src={urlFor(image.imageRef).url()} // generate url from ref to avoid unnecessary calls on server
                  alt={image.imageAlt}
                  width={image.imageWidth}
                  height={image.imageHeight}
                  sizes="30vw"
               />
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
