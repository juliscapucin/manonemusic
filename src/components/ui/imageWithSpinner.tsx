"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageField } from "@/types/Image";

import { urlFor } from "@/lib/sanityImageURL";

type ImageWithSpinnerProps = {
   classes: string;
   sizes: string;
   quality?: number;
   priority?: boolean;
   image: ImageField;
};

export default function ImageWithSpinner({
   classes,
   image,
   sizes,
   quality,
   priority = false,
}: ImageWithSpinnerProps) {
   const [isLoading, setIsLoading] = useState(true);
   const { imageRef, imageAlt, imageWidth, imageHeight } = image;

   return (
      <>
         {isLoading && (
            <div className="absolute top-0 left-0 w-full h-full bg-faded-5 flex items-center justify-center">
               <div className="relative w-[10%] min-w-12 aspect-square animate-spin">
                  <div className="absolute w-full h-full top-0 left-0 rounded-full border border-faded-10 border-r-secondary z-10"></div>
                  <div className="absolute w-full h-full top-0 left-0 rounded-full border border-faded-30 opacity-20"></div>
               </div>
            </div>
         )}
         <Image
            className={classes}
            src={urlFor(imageRef).url()} // generate url from ref to avoid unnecessary calls on server
            alt={imageAlt}
            sizes={sizes}
            quality={quality ? quality : 70}
            width={imageWidth}
            height={imageHeight}
            onLoad={() => {
               setIsLoading(false);
            }}
            priority={priority}
         />
      </>
   );
}
