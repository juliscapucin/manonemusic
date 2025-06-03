import { ImageField, ImageTexture } from "./Image";

export type Film = {
   title: string;
   slug: {
      _type: string;
      current: string;
   };
   info?: string;
   image: ImageField;
   imageTexture: ImageTexture;
   description?: string;
   projectLink?: string;
   projectVideo?: string;
};
