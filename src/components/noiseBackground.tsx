export default function NoiseBackground() {
    return (
        <div
            className='pointer-events-none fixed inset-[-50%] z-100 h-[200vh] w-[200vw]'
            aria-hidden='true'
            style={{
                backgroundImage: 'url("/imgs/noise-transparent.png")',
                backgroundRepeat: 'repeat',
                animation: 'noise-animation .2s infinite',
                opacity: 0.5,
            }}
        />
    );
}
