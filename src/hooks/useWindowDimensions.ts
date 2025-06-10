"use client";

import { useState, useEffect } from "react";

export default function useWindowDimensions() {
   const getWindowWidth = () =>
      typeof window !== "undefined" ? window.innerWidth : 0;
   const getWindowHeight = () =>
      typeof window !== "undefined" ? window.innerHeight : 0;

   const [width, setWidth] = useState(getWindowWidth());
   const [height, setHeight] = useState(getWindowHeight());
   const [windowAspectRatio, setWindowAspectRatio] = useState("");
   const [isMobile, setIsMobile] = useState<boolean | null>(null);

   useEffect(() => {
      if (typeof window === "undefined") return;

      const listener = () => {
         setWidth(window.innerWidth);
         setHeight(window.innerHeight);
         setWindowAspectRatio(
            window.innerWidth > window.innerHeight ? "landscape" : "portrait",
         );
         setIsMobile(window.innerWidth <= 768);
      };
      listener();

      window.addEventListener("resize", listener);

      return () => {
         window.removeEventListener("resize", listener);
      };
   }, []);

   return {
      width,
      height,
      windowAspectRatio,
      isMobile,
   };
}
