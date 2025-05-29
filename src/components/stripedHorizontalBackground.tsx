"use client";

import { useEffect, useRef } from "react";
import { colors } from "@/utils/constants";

interface StripedHorizontalBackgroundProps {
   className?: string;
   spacing?: number;
   waveSpeed?: number;
   waveAmplitude?: number;
   segmentLength?: number;
   segmentHeight?: number;
   fillColor?: string;
}

export default function StripedHorizontalBackground({
   className = "",
   spacing = 5,
   waveSpeed = 0.005,
   waveAmplitude = 40,
   segmentLength = 2,
   segmentHeight = 100,
   fillColor = colors.primaryDarkRGB,
}: StripedHorizontalBackgroundProps) {
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

         const cols = Math.ceil(width / spacing) + 2;
         const rows = Math.ceil(height / segmentHeight);
         for (let j = 0; j < rows; j++) {
            const y = j * segmentHeight;
            for (let i = 0; i < cols; i++) {
               const x = i * spacing - spacing;
               const wave =
                  Math.sin(x * 0.01 + timeRef.current * waveSpeed) *
                     waveAmplitude +
                  Math.sin(x * 0.008 + timeRef.current * waveSpeed * 1.2) *
                     (waveAmplitude / 2);
               ctx.fillRect(x + wave, y, segmentLength, segmentHeight);
            }
         }

         timeRef.current += 1;
         animationRef.current = requestAnimationFrame(animate);
      };

      resizeCanvas();
      animate();

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
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: -1,
         }}
      />
   );
}
