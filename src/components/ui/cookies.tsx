"use client";

import { PortableText } from "@portabletext/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import gsap from "gsap";

import { ButtonClose, ButtonRounded } from "@/components/buttons";
import { Heading } from "@/components/ui";
import { useCloseOnClickOutside, useCookieStorage } from "@/hooks";
import { Cookies as CookiesType } from "@/types";

type CookiesProps = {
   cookiesData: CookiesType;
};

export default function Cookies({ cookiesData }: CookiesProps) {
   const { cookieConsent, setCookieConsent, updateCookieConsent } =
      useCookieStorage();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const cookieButtonRef = useRef<HTMLDivElement>(null);
   const modalRef = useRef<HTMLDivElement>(null);

   // Enter cookie button animation + modal initial position
   useLayoutEffect(() => {
      if (!cookieButtonRef.current || cookieConsent === "true") return;
      gsap.set(cookieButtonRef.current, { xPercent: 120 });
      gsap.to(cookieButtonRef.current, {
         xPercent: 0,
         duration: 0.2,
         ease: "power4.out",
         delay: 2.7,
      });
   }, [cookieConsent]);

   useEffect(() => {
      if (!modalRef.current) return;

      gsap.to(modalRef.current, {
         yPercent: isModalOpen ? -120 : 0,
         duration: 0.4,
         ease: "power2.out",
      });
   }, [isModalOpen]);

   useCloseOnClickOutside(modalRef, () => setIsModalOpen, isModalOpen);

   useEffect(() => {
      function handleKeyDown(e: KeyboardEvent) {
         if (e.key === "Escape" && isModalOpen) {
            setIsModalOpen(false);
         }
      }

      window.addEventListener("keydown", handleKeyDown);

      return () => {
         window.removeEventListener("keydown", handleKeyDown);
      };
   }, []); // eslint-disable-line react-hooks/exhaustive-deps

   if (cookieConsent === "true") return null;

   const handleOKButton = (cookie: string) => {
      updateCookieConsent(cookie);

      if (!cookieButtonRef.current) return;
      gsap.to(cookieButtonRef.current, {
         xPercent: 100,
         duration: 0.2,
         ease: "power4.in",
         onComplete: () => {
            setCookieConsent(cookie);
         },
      });
   };

   {
      return (
         cookiesData &&
         cookieConsent !== "true" && (
            <>
               {/* Background Overlay */}
               <div
                  className={`fixed top-0 left-0 right-0 bottom-0 max-w-desktop mx-auto flex items-end justify-end z-10 overflow-clip  transition-colors duration-300 ${
                     isModalOpen
                        ? "md:bg-primary/80 pointer-events-auto"
                        : "pointer-events-none"
                  }`}
               >
                  {/* Cookie Button */}
                  <div
                     ref={cookieButtonRef}
                     className="absolute right-8 bottom-8 flex items-center gap-4 bg-primary text-secondary border border-secondary rounded-full px-5 py-1 pointer-events-auto z-50"
                  >
                     <button
                        onClick={() => setIsModalOpen(true)}
                        className="underlined-link uppercase text-bodySmall select-none"
                     >
                        This site uses cookies
                     </button>
                     <ButtonRounded
                        classes="text-bodySmall leading-[1.4]"
                        onClick={() => handleOKButton("true")}
                     >
                        OK
                     </ButtonRounded>
                  </div>
               </div>

               {/* Cookie Policy modal */}
               <div
                  ref={modalRef}
                  className="fixed top-24 right-0 bottom-8 pr-0 z-15 w-full md:w-3/4 lg:w-2/5 translate-y-[120%]"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="cookie-modal-title"
               >
                  {/* Gradients */}
                  <div
                     className={`absolute top-8 right-10 h-16 ml-auto bg-gradient-to-b from-20% bg-gradient-middle from-primary to-transparent z-80 ${
                        isModalOpen
                           ? "transition-opacity duration-300 delay-300"
                           : "opacity-0"
                     }`}
                  ></div>
                  <div
                     className={`absolute bottom-0 right-10 h-16 ml-auto bg-gradient-to-t from-20% bg-gradient-middle from-primary to-transparent z-80 ${
                        isModalOpen ? "" : "opacity-0"
                     }`}
                  ></div>

                  {/* Content */}
                  <div className="cookies-overlay gutter-stable relative ml-auto mr-8 bg-primary border border-secondary rounded-3xl h-full pb-8 overflow-y-scroll pointer-events-auto">
                     {/* Button Close */}
                     <div className="absolute top-8 right-0">
                        <ButtonClose
                           classes={`mx-auto pr-4 mt-4 flex justify-end z-100`}
                           onClick={() => setIsModalOpen(false)}
                        />
                     </div>
                     <div className="custom-rich-text w-full px-4 lg:px-12 pb-12 text-secondary">
                        <Heading
                           tag="h1"
                           id="cookie-modal-title"
                           variant="headline"
                           classes="mb-16 mt-24 lg:mt-16"
                        >
                           {cookiesData.title}
                        </Heading>
                        <PortableText value={cookiesData.content} />
                        <ButtonRounded
                           classes="mt-8 mx-auto"
                           onClick={() => handleOKButton("true")}
                        >
                           Agree and dismiss
                        </ButtonRounded>
                     </div>
                  </div>
               </div>
            </>
         )
      );
   }
}
