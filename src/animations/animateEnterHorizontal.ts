import gsap from "gsap";

export const animateEnterHorizontal = (
   divElement: HTMLElement,
   startPercent: number,
   delay?: number,
) => {
   gsap.fromTo(
      divElement,
      { xPercent: startPercent, opacity: 0 },
      {
         duration: 0.5,
         delay: delay || 0,
         xPercent: 0,
         opacity: 1,
         ease: "expo.out",
      },
   );
};
