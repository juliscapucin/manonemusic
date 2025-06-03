import { ImageField, ImageTexture } from "./Image";

export type PortfolioItem = {
   title: string;
   slug: string;
   image: ImageField;
   imageTexture: ImageTexture;
};
