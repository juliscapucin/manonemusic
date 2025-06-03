import { PortableTextBlock } from "next-sanity";
import { ImageField, ImageTexture } from "./Image";
import { Track } from "./Track";

export type Project = {
   title: string;
   slug: {
      _type: string;
      current: string;
   };
   releaseDate?: string;
   info?: string;
   image: ImageField;
   imageTexture: ImageTexture;
   description?: PortableTextBlock[];
   projectLink?: string;
   releaseLink?: string;
   projectVideo?: string;
   tracklist?: Track[];
};
