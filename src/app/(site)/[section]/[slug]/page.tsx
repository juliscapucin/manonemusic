import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
   getHeaderNavLinks,
   getPortfolioItems,
   getPortfolioPage,
   getProject,
} from "@/sanity/sanity-queries";

import { ProjectPage } from "@/components/pages";
import { Header } from "@/components/ui";
import { ProjectsMenuPage } from "@/components";

// Opt out of caching for all data requests in the route segment
// export const dynamic = "force-dynamic"

export const metadata: Metadata = {
   title: "Project",
   description: "Project description",
};

export default async function Page(props: {
   params: Promise<{ section: string; slug: string }>;
}) {
   const { section, slug } = await props.params;

   // Because all sections are singular in the schema but vary in the header nav / slug
   const sectionWithoutS = section.endsWith("s")
      ? section.slice(0, -1)
      : section;

   const projectPageData = await getProject(sectionWithoutS, slug);

   if (!projectPageData) return notFound();

   return (
      <ProjectPage
         {...{
            projectPageData,
            section,
         }}
      />
   );
}
