import ButtonChevron from "./buttonChevron";

interface ButtonsCarouselProps {
   tl: gsap.core.Timeline;
   itemsCount: number;
   activeCarouselImage: number;
   setActiveCarouselImage: (arg: number) => void;
}

const timingSettings = { duration: 0.3, ease: "power1.inOut" };

export default function ButtonsCarousel({
   tl,
   itemsCount,
   activeCarouselImage,
   setActiveCarouselImage,
}: ButtonsCarouselProps) {
   const buttonClasses = "flex items-center justify-center";

   return (
      <div className="lg:hidden mt-10">
         {/* PAGE INDICATORS */}
         <div className="w-full flex justify-center items-center gap-2 h-full">
            {[...Array(itemsCount)].map((_, index) => (
               <button
                  onClick={() => {
                     tl.toIndex(index, timingSettings);
                     setActiveCarouselImage(tl.current());
                  }}
                  className={`h-[1px] bg-secondary w-4 ${activeCarouselImage === index ? "opacity-100" : "opacity-30"}`}
                  key={index}
               ></button>
            ))}
         </div>
         {/* TODO: remove or fix this */}
         <div className="hidden relative mt-2 w-full h-16 px-4 justify-center items-center gap-8">
            {/* BUTTON PREVIOUS */}
            <ButtonChevron
               onClick={() => {
                  tl.toIndex(activeCarouselImage - 1, timingSettings);
                  setActiveCarouselImage(tl.current());
               }}
               classes={`prev-btn rotate-180 ${buttonClasses}`}
            />

            {/* BUTTON NEXT */}
            <ButtonChevron
               onClick={() => {
                  tl.toIndex(activeCarouselImage + 1, timingSettings);
                  setActiveCarouselImage(tl.current());
               }}
               classes={`next-btn rotate-0 ${buttonClasses}`}
            />
         </div>
      </div>
   );
}
