"use client";

import Link from "next/link";

type SocialsData = { platform: string; link: string };

type SocialLinksProps = {
   data: SocialsData[];
};

export default function SocialLinks({ data }: SocialLinksProps) {
   return (
      data && (
         <div className="text-right mt-8 lg:mt-0 lg:self-end">
            <h3 className="mb-4">Listen & Follow</h3>
            {data.map((item) => {
               return (
                  <div
                     className="relative flex justify-end items-start"
                     key={item.platform}
                  >
                     <Link
                        className="underlined-link block text-titleSmall md:text-titleMedium lg:text-titleLarge uppercase"
                        href={item.link}
                        target="_blank"
                     >
                        {item.platform}
                     </Link>
                  </div>
               );
            })}
         </div>
      )
   );
}
