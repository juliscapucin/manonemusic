export default function ProjectsMenuPageSkeleton() {
    return (
        <>
            {/* Mobile */}
            <aside className='fixed bottom-0 z-10 flex h-24 w-full gap-4 overflow-x-auto border-t border-faded bg-primary p-4 lg:hidden'>
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className='aspect-square h-20 animate-pulse bg-faded-30'
                    ></div>
                ))}
            </aside>

            {/* Desktop */}
            <aside className='fixed top-16 right-0 bottom-0 z-projects-menu hidden w-[172px] flex-col gap-4 overflow-x-clip overflow-y-auto border-l border-faded bg-primary p-4 lg:flex'>
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className='aspect-square h-32 w-full animate-pulse bg-faded-30'
                    ></div>
                ))}
            </aside>
        </>
    );
}
