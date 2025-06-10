export default function NoiseBackground() {
   return (
      <div
         className="fixed inset-[-50%] w-[200vw] h-[200vh] pointer-events-none z-noise"
         aria-hidden="true"
         style={{
            backgroundImage: 'url("/imgs/noise-transparent.png")',
            backgroundRepeat: "repeat",
            animation: "bg-animation .2s infinite",
            opacity: 0.5,
            // mixBlendMode: "overlay",
         }}
      />
   );
}
