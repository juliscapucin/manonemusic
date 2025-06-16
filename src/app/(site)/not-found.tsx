import { AutoGrid } from "@/components";
import { ButtonRounded } from "@/components/buttons";
import { Heading, Logo } from "@/components/ui";

const NotFoundPage = () => {
   return (
      <div className="relative px-4 lg:px-8 mx-4 lg:mx-8 pt-16 lg:pt-28 pb-8 overflow-x-clip border-x border-faded">
         <AutoGrid />

         <Logo />
         <div className="w-full text-center basis-auto mt-24">
            <Heading tag={"h1"} variant={"headline"} classes="mb-2">
               Page Not Found
            </Heading>
            <p className="text-secondary text-xl my-10 text-balance">
               The page you are looking for does not exist
            </p>
            <ButtonRounded classes="mx-auto" href="/">
               Restart
            </ButtonRounded>
         </div>
      </div>
   );
};
export default NotFoundPage;
