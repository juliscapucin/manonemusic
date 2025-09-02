"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import { animateMobileMenu } from "@/animations";

import { ButtonBurger, ButtonClose } from "@/components/buttons";

import type { NavLink } from "@/types";
import CustomButton from "./customButton";
import { handlePanelSlide, projectExit } from "@/lib/animations";

type NavLinksProps = {
   navLinks: NavLink[];
   breakpoint: "desktop" | "mobile";
   variant: "section" | "page";
};

export default function NavMenu({
   navLinks,
   breakpoint,
   variant,
}: NavLinksProps) {
   const mobileMenuRef = useRef(null);
   const pathname = usePathname();
   const router = useRouter();

   useEffect(() => {
      // only run on first level
      if (variant === "section") {
         // ScrollTo on Load
         handlePanelSlide(pathname);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [variant]);

   return (
      <>
         {/* LOGO */}
         {/* <CustomButton
            link="/"
            classes={`underlined-link text-title-small md:text-title-medium uppercase font-medium transition ${pathname === "/" ? "opacity-0 -translate-x-full" : "opacity-100"}`}
            transitionOnClick={
               variant === "section"
                  ? () => handlePanelSlide("/") // if in first level, slide to home
                  : () => projectExit(() => router.push("/"), true) // if in second level, exit and navigate to home
            }
         >
            MAN/ONE MUSIC
         </CustomButton> */}

         {/* NAVBAR */}
         {navLinks && (
            <div className="fixed top-0 right-0 left-0 block h-dvh z-mobile pointer-events-none">
               <div className="absolute max-w-full top-4 right-4 flex justify-end items-center z-burger pointer-events-auto">
                  {/* BURGER BUTTON */}
                  <ButtonBurger
                     action={(e) => {
                        if (mobileMenuRef.current) {
                           animateMobileMenu(mobileMenuRef.current);
                        }
                     }}
                  />
               </div>

               {/* EXPANDED MENU */}
               <aside
                  className="absolute top-0 w-full min-h-svh bg-primary transition-transform -translate-y-[120%] duration-300 z-mobile pointer-events-auto"
                  ref={mobileMenuRef}
               >
                  {/* Close Button */}
                  <div className="absolute top-4 right-4 z-100">
                     <ButtonClose
                        onClick={() => {
                           if (mobileMenuRef.current) {
                              animateMobileMenu(mobileMenuRef.current);
                           }
                        }}
                     />
                  </div>

                  {/* NAV LINKS */}
                  <nav className="h-screen flex flex-col justify-center items-center">
                     {navLinks.map((link) => {
                        return (
                           <div
                              className={`relative w-full flex justify-center`}
                              key={link.slug}
                           >
                              <button
                                 className="block text-secondary disabled:text-faded-30"
                                 disabled={
                                    (pathname === "/" && link.slug === "/") ||
                                    pathname.includes(`/${link.slug}`)
                                 }
                                 onClick={() => {
                                    if (breakpoint === "mobile") {
                                       animateMobileMenu(
                                          mobileMenuRef.current,
                                          () => {
                                             router.push(`/${link.slug}`);
                                          },
                                       );
                                    } else {
                                       if (variant === "section") {
                                          handlePanelSlide(link.slug);
                                          animateMobileMenu(
                                             mobileMenuRef.current,
                                          );
                                       } else {
                                          projectExit(
                                             () => router.push(`/${link.slug}`),
                                             true,
                                          );
                                       }
                                    }
                                 }}
                              >
                                 <span className="font-headline text-headline-medium sm:text-headline-large uppercase">
                                    {link.title}
                                 </span>
                              </button>
                           </div>
                        );
                     })}
                  </nav>
               </aside>
            </div>
         )}
      </>
   );
}
