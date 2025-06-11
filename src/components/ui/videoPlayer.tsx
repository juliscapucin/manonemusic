"use client";

import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import {
   IconPlay,
   IconPause,
   IconFullscreen,
   IconVolume,
   IconVolumeX,
} from "@/components/icons";

type VideoPlayerProps = {
   src: string; // Vimeo video ID
};

export default function VideoPlayer({ src }: VideoPlayerProps) {
   const iframeRef = useRef<HTMLIFrameElement | null>(null);
   const [player, setPlayer] = useState<Player | null>(null);
   const [isPlaying, setIsPlaying] = useState(false);
   const [isMuted, setIsMuted] = useState(false);

   useEffect(() => {
      if (!iframeRef.current || !src) return;

      const newPlayer = new Player(iframeRef.current);
      setPlayer(newPlayer);

      newPlayer.on("play", () => setIsPlaying(true));
      newPlayer.on("pause", () => setIsPlaying(false));

      newPlayer.getVolume().then((volume) => setIsMuted(volume === 0));

      return () => {
         newPlayer.unload();
      };
   }, [src]);

   const handlePlayPause = () => {
      if (!player) return;
      isPlaying ? player.pause() : player.play();
   };

   const handleMuteToggle = () => {
      if (!player) return;
      player.setVolume(isMuted ? 1 : 0);
      setIsMuted(!isMuted);
   };

   const handleFullscreen = () => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      if (iframe.requestFullscreen) iframe.requestFullscreen();
      else if ((iframe as any).webkitRequestFullscreen)
         (iframe as any).webkitRequestFullscreen();
      else if ((iframe as any).msRequestFullscreen)
         (iframe as any).msRequestFullscreen();
   };

   return (
      <div className="relative w-full aspect-video group">
         <iframe
            ref={iframeRef}
            src={`https://player.vimeo.com/video/${src}?title=0&byline=0&portrait=0&muted=0&autoplay=1&controls=0&loop=0&dnt=1`}
            allow="autoplay; fullscreen"
            className="w-full h-full"
         />
         <div className="absolute bottom-4 left-4 right-4 flex justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="backdrop-blur-md bg-faded-10 py-2 px-8 rounded-full flex gap-16 items-center">
               <button
                  onClick={handlePlayPause}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="text-secondary hover:scale-110 transition-transform"
               >
                  {isPlaying ? <IconPause /> : <IconPlay />}
               </button>
               <button
                  onClick={handleMuteToggle}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className="text-secondary hover:scale-110 transition-transform"
               >
                  {isMuted ? <IconVolumeX /> : <IconVolume />}
               </button>
               <button
                  onClick={handleFullscreen}
                  aria-label="Enter fullscreen"
                  className="text-secondary hover:scale-110 transition-transform"
               >
                  <IconFullscreen />
               </button>
            </div>
         </div>
      </div>
   );
}
