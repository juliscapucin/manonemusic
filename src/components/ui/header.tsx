"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import { CustomButton, NavLink } from "@/components/ui";
import { handlePanelSlide, projectExit } from "@/lib/animations";
import { NavLink as NavLinkType } from "@/types";

type HeaderProps = {
   navLinks: NavLinkType[];
   variant?: "section" | "page";
};

// This is the header component for the desktop version
// Mobile version is handled in menuMobile.tsx
export default function Header({ navLinks, variant = "section" }: HeaderProps) {
   const pathname = usePathname();
   const router = useRouter();
   const navRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      // only run on first level
      if (variant === "section") {
         // ScrollTo on Load
         handlePanelSlide(pathname);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [variant]);

   return (
      <header>
         <nav
            ref={navRef}
            className="hidden landscape:flex fixed top-0 right-0 left-0 p-8 justify-between z-header"
         >
            <CustomButton
               link="/"
               classes={`underlined-link text-titleSmall md:text-titleMedium uppercase font-medium transition ${pathname === "/" ? "opacity-0 -translate-x-full" : "opacity-100"}`}
               transitionOnClick={
                  variant === "section"
                     ? () => handlePanelSlide("/") // if in first level, slide to home
                     : () => projectExit(() => router.push("/"), true) // if in second level, exit and navigate to home
               }
            >
               MAN/ONE MUSIC
            </CustomButton>

            <div className="hidden landscape:flex gap-8">
               {navLinks.map(
                  (link, index) =>
                     link.slug !== "/" && (
                        <NavLink
                           label={link.title}
                           slug={link.slug}
                           key={`panel-button-${index}`}
                           activeState={
                              pathname.includes(`/${link.slug}`) ? true : false
                           }
                           action={() => {
                              variant === "section"
                                 ? handlePanelSlide(link.slug)
                                 : projectExit(
                                      () => router.push(`/${link.slug}`),
                                      true,
                                   );
                           }}
                        />
                     ),
               )}
            </div>
         </nav>
      </header>
   );
}
