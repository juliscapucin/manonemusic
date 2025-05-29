"use client";

import { useEffect, useRef } from "react";
import { colors } from "@/utils/constants";

interface AnimatedHalftoneBackgroundProps {
   className?: string;
   dotSize?: number;
   spacing?: number;
   waveSpeed?: number;
   waveAmplitude?: number;
}

export default function HalftoneBackground({
   className = "",
   dotSize = 4,
   spacing = 9,
   waveSpeed = 0.01,
   waveAmplitude = 4,
}: AnimatedHalftoneBackgroundProps) {
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
         ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
         canvas.style.width = rect.width + "px";
         canvas.style.height = rect.height + "px";
      };

      const animate = () => {
         const rect = canvas.getBoundingClientRect();
         const width = rect.width;
         const height = rect.height;

         // Clear canvas
         ctx.fillStyle = colors.primaryRGB;
         ctx.fillRect(0, 0, width, height);

         // Set dot color
         ctx.fillStyle = colors.primaryDarkRGB;

         // Calculate grid dimensions
         const cols = Math.ceil(width / spacing) + 2;
         const rows = Math.ceil(height / spacing) + 2;

         // Draw halftone dots
         for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
               const x = i * spacing - spacing;
               const y = j * spacing - spacing;

               // Create wave effect using multiple sine waves
               const wave1 =
                  Math.sin(x * 0.01 + timeRef.current * waveSpeed) *
                  waveAmplitude;
               const wave2 =
                  Math.sin(y * 0.008 + timeRef.current * waveSpeed * 1.2) *
                  waveAmplitude;
               const wave3 =
                  Math.sin(
                     (x + y) * 0.005 + timeRef.current * waveSpeed * 0.8,
                  ) * waveAmplitude;

               // Combine waves to create complex pattern
               const waveValue = (wave1 + wave2 + wave3) / 3;

               // Calculate dot radius based on wave value and position
               const baseRadius = dotSize * 0.5;
               const radiusMultiplier = 0.5 + (waveValue + 1) * 0.5; // Normalize to 0-1 range
               const radius = baseRadius * radiusMultiplier;

               // Add some noise for granular texture
               const noise = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 0.2;
               const finalRadius = Math.max(0.5, radius + noise);

               // Draw the dot
               ctx.beginPath();
               ctx.arc(x, y, finalRadius, 0, Math.PI * 2);
               ctx.fill();
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
   }, [dotSize, spacing, waveSpeed, waveAmplitude]);

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
