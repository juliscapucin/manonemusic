"use client";

import { useEffect, useRef } from "react";
import { colors } from "@/utils/constants";

interface PolygonBackgroundProps {
   className?: string;
   spacing?: number;
   segmentLength?: number;
   segmentHeight?: number;
   fillColor?: string;
   waveSpeed?: number;
   waveAmplitude?: number;
   irregularity?: number; // max random offset for vertices
}

export default function PolygonBackground({
   className = "",
   spacing = 80,
   segmentLength = 200,
   segmentHeight = 300,
   fillColor = colors.primaryDarkRGB,
   waveSpeed = 0.01,
   waveAmplitude = 60,
   irregularity = 16,
}: PolygonBackgroundProps) {
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const animationRef = useRef<number | null>(null);
   const timeRef = useRef(0);

   // For consistent randomness per cell, use a seeded pseudo-random function
   function seededRandom(seed: number) {
      let x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
   }

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
            // Animate the vertical offset of each row with a sine wave
            const waveOffset =
               Math.sin(j * 0.7 + timeRef.current * waveSpeed) * waveAmplitude;
            const y = j * spacing - spacing + waveOffset;

            for (let i = 0; i < segments; i++) {
               const x = i * segmentLength;

               // Use a deterministic seed for each cell for consistent randomness
               const cellSeed =
                  j * 1000 + i * 100 + Math.floor(timeRef.current / 60);

               // Randomly decide triangle or quad (50/50)
               const isTriangle = seededRandom(cellSeed) > 0.5;

               // Generate random offsets for each vertex
               const offset = (vertex: number) =>
                  (seededRandom(cellSeed + vertex) - 0.5) * irregularity;

               ctx.beginPath();
               if (isTriangle) {
                  // Random triangle
                  ctx.moveTo(x + offset(1), y + offset(2));
                  ctx.lineTo(x + segmentLength + offset(3), y + offset(4));
                  ctx.lineTo(
                     x + segmentLength / 2 + offset(5),
                     y + segmentHeight + offset(6),
                  );
               } else {
                  // Random quadrilateral
                  ctx.moveTo(x + offset(1), y + offset(2));
                  ctx.lineTo(x + segmentLength + offset(3), y + offset(4));
                  ctx.lineTo(
                     x + segmentLength + offset(5),
                     y + segmentHeight + offset(6),
                  );
                  ctx.lineTo(x + offset(7), y + segmentHeight + offset(8));
               }
               ctx.closePath();
               ctx.fill();
            }
         }

         timeRef.current += 1;
         animationRef.current = requestAnimationFrame(animate);
      };

      resizeCanvas();
      animate();

      const handleResize = () => {
         resizeCanvas();
         animate();
      };
      window.addEventListener("resize", handleResize);

      return () => {
         if (animationRef.current) cancelAnimationFrame(animationRef.current);
         window.removeEventListener("resize", handleResize);
      };
   }, [
      spacing,
      segmentLength,
      segmentHeight,
      fillColor,
      waveSpeed,
      waveAmplitude,
      irregularity,
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
