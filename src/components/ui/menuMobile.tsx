"use client";

import { useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import { animateMobileMenu } from "@/animations";

import { ButtonBurger, ButtonClose } from "@/components/buttons";

import type { NavLink } from "@/types";

type NavLinksProps = {
   navLinks: NavLink[];
};

export default function MenuMobile({ navLinks }: NavLinksProps) {
   const mobileMenuRef = useRef(null);
   const pathname = usePathname();
   const router = useRouter();

   return (
      <>
         {navLinks && (
            <div className="fixed top-0 right-0 left-0 block lg:hidden h-dvh z-mobile pointer-events-none">
               <div className="absolute w-full top-0 pr-4 flex justify-end items-center z-burger pointer-events-auto border-b border-faded bg-primary">
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
                              className="relative w-full flex justify-center"
                              key={link.slug}
                           >
                              <button
                                 className="block disabled:opacity-30"
                                 onClick={() =>
                                    animateMobileMenu(
                                       mobileMenuRef.current,
                                       () => {
                                          router.push(`/${link.slug}`);
                                       },
                                    )
                                 }
                                 disabled={
                                    (pathname === "/" && link.slug === "/") ||
                                    pathname.includes(`/${link.slug}`)
                                 }
                              >
                                 <span className="font-headline text-headlineMedium sm:text-headlineLarge uppercase text-secondary">
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
