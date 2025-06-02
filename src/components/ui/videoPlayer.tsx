type VideoPlayerProps = {
   src: string;
};

export default function VideoPlayer({ src }: VideoPlayerProps) {
   return (
      <>
         {src.length > 0 && (
            <iframe
               src={`https://player.vimeo.com/video/${src}?title=0&byline=0&portrait=0&muted=0&autoplay=1&controls=0&loop=1&dnt=1`}
               allow="autoplay; fullscreen"
               className="w-full aspect-video"
            />
         )}
      </>
   );
}
