import { Rule, validation } from "sanity";

const filmSchema = {
   name: "film",
   title: "Film",
   type: "document",
   fields: [
      {
         name: "title",
         title: "Title (required)",
         type: "string",
         validation: (Rule: Rule) => Rule.required().error("Title is required"),
      },
      {
         name: "slug",
         title: "Slug (required)",
         type: "slug",
         options: {
            source: "title",
            maxLength: 96,
         },
         validation: (Rule: Rule) => Rule.required().error("Slug is required"),
      },
      {
         name: "info",
         title: "Info",
         type: "string",
      },
      {
         name: "image",
         type: "object",
         title: "Image (required)",
         fields: [
            {
               name: "image",
               title: "Image",
               type: "image",
               validation: (Rule: Rule) =>
                  Rule.required().error("Image file is required"),
            },
            {
               name: "imageAlt",
               title: "Image Alt Text",
               type: "string",
               validation: (Rule: Rule) =>
                  Rule.required().error("Image Alt Text is required"),
            },
         ],
         validation: (Rule: Rule) => Rule.required().error("Image is required"),
      },
      {
         name: "imageTexture",
         type: "object",
         title: "Image Texture",
         fields: [
            {
               name: "image",
               title: "Image",
               type: "image",
               // validation: (Rule: Rule) =>
               //    Rule.required().error("Image texture file is required"),
            },
         ],
         // validation: (Rule: Rule) =>
         //    Rule.required().error("Image texture is required"),
      },
      {
         name: "releaseDate",
         title: "Release Date",
         type: "date",
         options: {
            dateFormat: "MM/YYYY",
         },
         validation: (Rule: Rule) =>
            Rule.required().error("Release Date is required"),
      },
      {
         name: "description",
         title: "Description",
         type: "array",
         of: [{ type: "block" }],
      },
      {
         name: "projectVideo",
         title: "Project Video",
         description: "(ex: https://vimeo.com/68111130)",
         type: "url",
      },
      { name: "projectLink", title: "Project Link", type: "url" },
   ],
   orderings: [
      {
         title: "Release Date, New",
         name: "releaseDateDesc",
         by: [{ field: "releaseDate", direction: "desc" }],
      },
   ],
};

export default filmSchema;
