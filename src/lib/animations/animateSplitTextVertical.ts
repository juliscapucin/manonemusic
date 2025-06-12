import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import { SplitText } from "gsap/dist/SplitText";

import { customEase } from "@/utils/constants";

gsap.registerPlugin(SplitText, CustomEase);

CustomEase.create("butter", customEase);

export const animateSplitTextVertical = (
   textElement: HTMLHeadingElement,
   yTranslate?: number,
   delay?: number,
   duration?: number,
) => {
   if (!textElement) return;
   const split = new SplitText(textElement, { type: "chars" });

   const tl = gsap.timeline({ ease: "butter" });

   gsap.set(split.chars, {
      yPercent: yTranslate ? yTranslate : 100,
      opacity: 0,
   });

   return tl.fromTo(
      split.chars,
      {
         yPercent: yTranslate ? yTranslate : 100,
         opacity: 1,
      },
      {
         opacity: 1,
         yPercent: 0,
         duration: 0.8,
         delay: delay || 0,
         stagger: 0.02,
         ease: CustomEase.create("custom", customEase),
      },
   );
};
