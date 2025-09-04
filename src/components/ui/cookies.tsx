"use client";

import { PortableText } from "@portabletext/react";
import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";

import { ButtonClose, ButtonRounded } from "@/components/buttons";
import { Heading } from "@/components/ui";
import { useCloseOnClickOutside, useCloseOnKeyPress } from "@/hooks";
import { Cookies as CookiesType } from "@/types";
import { useGSAP } from "@gsap/react";
import { useCookieModalContext } from "@/context";

type CookiesProps = {
   cookiesData: CookiesType;
};

export default function Cookies({ cookiesData }: CookiesProps) {
   const {
      isModalOpen,
      setIsModalOpen,
      cookieConsent,
      setCookieConsent,
      updateCookieConsent,
   } = useCookieModalContext();
   const cookieButtonRef = useRef<HTMLDivElement>(null);
   const modalRef = useRef<HTMLDivElement>(null);
   const backgroundOverlayRef = useRef<HTMLDivElement>(null);

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

   // Open / Close animation
   useGSAP(() => {
      if (
         !modalRef.current ||
         !backgroundOverlayRef.current ||
         cookieConsent === "true"
      )
         return;

      const tl = gsap.timeline();

      tl.to(modalRef.current, {
         yPercent: isModalOpen ? -150 : 0,
         duration: 0.4,
         ease: "power2.out",
      }).to(
         backgroundOverlayRef.current,
         {
            opacity: isModalOpen ? 1 : 0,
            duration: 0.3,
            ease: "power2.out",
         },
         "<", // sync with modal animation
      );
   }, [isModalOpen]);

   // Close on click outside hook
   useCloseOnClickOutside(
      modalRef,
      cookieButtonRef,
      setIsModalOpen,
      isModalOpen,
   );

   // Close on Escape key
   useCloseOnKeyPress(isModalOpen, setIsModalOpen);

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
                  ref={backgroundOverlayRef}
                  className="fixed top-0 left-0 right-0 bottom-0 max-w-desktop mx-auto flex items-end justify-end overflow-clip md:bg-primary/80 z-cookies-modal pointer-events-none"
               ></div>

               {/* Cookie Button */}
               <div className="fixed top-0 left-0 right-0 bottom-0 max-w-desktop mx-auto flex items-end justify-end z-cookies-modal overflow-clip pointer-events-none">
                  <div
                     ref={cookieButtonRef}
                     className="absolute right-8 bottom-8 flex items-center gap-4 bg-primary text-secondary border border-secondary rounded-full px-5 py-1 pointer-events-auto z-cookies-elements"
                  >
                     <button
                        onClick={() => setIsModalOpen(true)}
                        className="underlined-link uppercase text-body-small select-none"
                     >
                        This site uses cookies
                     </button>
                     <ButtonRounded
                        classes="text-body-small leading-[1.4]"
                        onClick={() => handleOKButton("true")}
                     >
                        OK
                     </ButtonRounded>
                  </div>
               </div>

               {/* Modal */}
               <div
                  ref={modalRef}
                  className="fixed top-20 left-4 right-4 md:left-auto md:right-4 lg:right-4 bottom-8 pr-0 md:w-3/4 lg:w-2/5 translate-y-[150%] z-cookies-elements"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="cookie-modal-title"
               >
                  {/* Button Close */}
                  <div className="fixed top-[1px] right-4 left-1 bg-primary p-3 flex justify-end z-cookies-elements">
                     <ButtonClose onClick={() => setIsModalOpen(false)} />
                  </div>
                  {/* Content */}
                  <div className="gutter-stable relative ml-auto lg:mr-8 bg-primary border border-secondary rounded-xs h-full w-full pb-8 overflow-y-scroll overflow-x-clip">
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
