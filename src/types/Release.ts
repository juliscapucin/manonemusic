import { ImageField, ImageTexture } from "./Image";

import { Track } from "./Track";

export type Release = {
   title: string;
   slug: {
      _type: string;
      current: string;
   };
   image: ImageField;
   imageTexture: ImageTexture;
   releaseDate: string;
   info?: string;
   tracklist: Track[];
   releaseLink?: string;
};
