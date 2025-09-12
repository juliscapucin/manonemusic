import ButtonChevron from './buttonChevron';

interface ButtonsCarouselProps {
    tl: gsap.core.Timeline;
    itemsCount: number;
    activeCarouselImage: number;
    setActiveCarouselImage: (arg: number) => void;
}

const timingSettings = { duration: 0.3, ease: 'power1.inOut' };

export default function ButtonsCarousel({
    tl,
    itemsCount,
    activeCarouselImage,
    setActiveCarouselImage,
}: ButtonsCarouselProps) {
    const buttonClasses = 'flex items-center justify-center';

    return (
        <div className='relative z-10 mt-8 lg:hidden'>
            {/* PAGE INDICATORS */}
            <div className='flex h-4 w-full items-center gap-px overflow-clip border-t border-b border-faded *:flex-1'>
                {[...Array(itemsCount)].map((_, index) => (
                    <button
                        onClick={() => {
                            tl.toIndex(index, timingSettings);
                            setActiveCarouselImage(tl.current());
                        }}
                        className={`w-6 bg-secondary transition-transform ${activeCarouselImage === index ? 'h-full opacity-100' : 'h-full opacity-10'}`}
                        key={index}
                        aria-label={`Go to slide ${index}`}
                    ></button>
                ))}
            </div>

            {/* BUTTONS PREV/NEXT */}
            <div className='relative flex h-16 w-full items-center border-b border-faded *:flex-1'>
                {/* BUTTON PREVIOUS */}
                <ButtonChevron
                    classes={`prev-btn h-full border-r border-faded ${buttonClasses}`}
                    direction='back'
                    aria-label='Go to previous slide'
                    onClick={() => {
                        tl.toIndex(activeCarouselImage - 1, timingSettings);
                        setActiveCarouselImage(tl.current());
                    }}
                />

                {/* BUTTON NEXT */}
                <ButtonChevron
                    classes={`next-btn rotate-0 ${buttonClasses}`}
                    direction='forward'
                    aria-label='Go to next slide'
                    onClick={() => {
                        tl.toIndex(activeCarouselImage + 1, timingSettings);
                        setActiveCarouselImage(tl.current());
                    }}
                />
            </div>
        </div>
    );
}
