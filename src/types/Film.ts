import { ImageField, ImageTexture } from "./Image";

type FilmInfo = {
   genre?: string;
   duration?: string;
   releaseDate?: string;
   director?: string;
   writer?: string;
   music?: string;
};

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
