import { BlockContent } from "./BlockContent";
import { ImageField, ImageTexture } from "./Image";

export type AboutPage = {
   title: string;
   subtitle?: string;
   image: ImageField;
   imageTexture: ImageTexture;
   content1: BlockContent[];
   content2: BlockContent[];
   metadataTitle?: string;
   metadataDescription?: string;
   metadataKeywords?: string[];
};
