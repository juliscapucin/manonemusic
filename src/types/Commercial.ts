import { ImageField, ImageTexture } from "./Image";

export type Commercial = {
   title: string;
   slug: {
      _type: string;
      current: string;
   };
   image: ImageField;
   imageTexture: ImageTexture;
   info?: string;
   description?: string;
   projectLink?: string;
   projectVideo?: string;
};
