"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { NavLink } from "@/types";
import { Pagination } from "@/components/ui";
import { IconArrow } from "@/components/icons";

import { handlePanelSlide } from "@/lib/animations";
import { Button, ButtonScroll } from "../buttons";
import Availability from "../availability";

type FooterProps = {
   navLinks: NavLink[];
};

export default function Footer({ navLinks }: FooterProps) {
   const pathname = usePathname();
   const [index, setIndex] = useState(0);

   useEffect(() => {
      const foundPage = navLinks.find((link) => `/${link.slug}` === pathname);
      const newIndex = foundPage ? navLinks.indexOf(foundPage) : 0;

      setIndex(newIndex);
   }, [pathname, navLinks]);

   const handleNavigation = (direction: "previous" | "next") => {
      const newIndex =
         direction === "previous"
            ? index - 1 >= 0
               ? index - 1
               : index
            : index + 1 < navLinks.length
              ? index + 1
              : index;
      const newSlug = navLinks[newIndex].slug;

      handlePanelSlide(newSlug);
   };

   return (
      <footer className="fixed bottom-0 w-full px-4 flex items-center justify-around text-white text-center border border-faded-10">
         <Availability slideToContact={() => handlePanelSlide("contact")} />

         <ButtonScroll
            sections={navLinks}
            action={handleNavigation}
            index={index}
         />
      </footer>
   );
}
