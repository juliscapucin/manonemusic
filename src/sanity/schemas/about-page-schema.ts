import { Rule } from "sanity";

const aboutPageSchema = {
   name: "aboutPage",
   title: "About Page",
   type: "document",
   fields: [
      {
         name: "title",
         title: "Title (required)",
         type: "string",
         validation: (Rule: Rule) => Rule.required().error("Title is required"),
      },
      {
         name: "subtitle",
         title: "Subtitle",
         type: "text",
         rows: 3,
      },
      {
         name: "image",
         type: "object",
         title: "Image",
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
      },
      {
         name: "content1",
         title: "Content 1 (required)",
         type: "array",
         of: [{ type: "block" }],
         validation: (Rule: Rule) =>
            Rule.required().error("Content is required"),
      },
      {
         name: "content2",
         title: "Content 2",
         type: "array",
         of: [{ type: "block" }],
      },
      { name: "metadataTitle", title: "Metadata Title", type: "string" },
      {
         name: "metadataDescription",
         title: "Metadata Description",
         type: "string",
      },
      {
         name: "metadataKeywords",
         title: "Metadata Keywords",
         type: "array",
         of: [{ type: "string" }],
      },
   ],
};

export default aboutPageSchema;
