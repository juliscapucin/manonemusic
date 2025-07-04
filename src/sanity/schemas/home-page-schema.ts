import { Rule } from "sanity";

const homePageSchema = {
   name: "homePage",
   title: "Home Page",
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
         type: "string",
         validation: (Rule: Rule) =>
            Rule.required().error("Subtitle is required"),
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

export default homePageSchema;
