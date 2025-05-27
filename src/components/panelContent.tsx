import {
   AboutPage,
   ContactPage,
   HomePage,
   ProjectsPage,
} from "@/components/pages";

import { AllData } from "@/types";

type PanelContentProps = {
   data: AllData;
   section: string;
};

export default function PanelContent({ data, section }: PanelContentProps) {
   let Content: React.ReactNode;

   switch (section) {
      case "/":
         Content = <HomePage />;
         break;
      case "about":
         Content = <AboutPage {...data.aboutPage} />;
         break;
      case "contact":
         Content = <ContactPage {...data.contactPage} />;
         break;
      case "film":
      case "commercial":
         Content = (
            <ProjectsPage
               projectsPageData={data.portfolioSections[section]}
               projects={data[`${section}s`]}
            />
         );
         break;
      case "releases":
      case "projects":
         Content = (
            <ProjectsPage
               projectsPageData={data.portfolioSections[section]}
               projects={data[section]}
            />
         );
         break;
      default:
         Content = null;
   }

   return <>{Content}</>;
}
