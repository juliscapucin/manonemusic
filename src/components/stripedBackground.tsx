"use client";

import { useEffect, useRef } from "react";
import { colors } from "@/utils/constants";

interface AnimatedStripedBackgroundProps {
   className?: string;
   spacing?: number;
   waveSpeed?: number;
   waveAmplitude?: number;
   segmentLength?: number;
   segmentHeight?: number;
   fillColor?: string;
}

export default function StripedBackground({
   className = "",
   spacing = 8,
   waveSpeed = 0.005,
   waveAmplitude = 22,
   segmentLength = 20,
   segmentHeight = 2,
   fillColor = colors.primaryDarkRGB,
}: AnimatedStripedBackgroundProps) {
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const animationRef = useRef<number>(null);
   const timeRef = useRef(0);

   useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const resizeCanvas = () => {
         const rect = canvas.getBoundingClientRect();
         canvas.width = rect.width * window.devicePixelRatio;
         canvas.height = rect.height * window.devicePixelRatio;
         ctx.setTransform(1, 0, 0, 1, 0, 0);
         ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
         canvas.style.width = rect.width + "px";
         canvas.style.height = rect.height + "px";
      };

      const animate = () => {
         const rect = canvas.getBoundingClientRect();
         const width = rect.width;
         const height = rect.height;

         ctx.fillStyle = colors.primaryRGB;
         ctx.fillRect(0, 0, width, height);

         ctx.fillStyle = fillColor;

         const rows = Math.ceil(height / spacing) + 2;
         const segments = Math.ceil(width / segmentLength);

         for (let j = 0; j < rows; j++) {
            const y = j * spacing - spacing;
            for (let i = 0; i < segments; i++) {
               const x = i * segmentLength;
               // Each segment gets its own wave offset
               const wave =
                  Math.sin((x + y) * 0.01 + timeRef.current * waveSpeed) *
                     waveAmplitude +
                  Math.sin(
                     (x + y) * 0.008 + timeRef.current * waveSpeed * 1.2,
                  ) *
                     (waveAmplitude / 2);

               // Draw a rectangle for each segment
               ctx.fillRect(x, y + wave, segmentLength, segmentHeight);
            }
         }

         timeRef.current += 1;
         animationRef.current = requestAnimationFrame(animate);
      };

      // Initial setup
      resizeCanvas();
      animate();

      // Handle resize
      const handleResize = () => {
         resizeCanvas();
      };

      window.addEventListener("resize", handleResize);

      return () => {
         if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
         }
         window.removeEventListener("resize", handleResize);
      };
   }, [
      spacing,
      waveSpeed,
      waveAmplitude,
      segmentLength,
      segmentHeight,
      fillColor,
   ]);

   return (
      <canvas
         ref={canvasRef}
         className={`w-full h-full ${className}`}
         style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: -1,
         }}
      />
   );
}
