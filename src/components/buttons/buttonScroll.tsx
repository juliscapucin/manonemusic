import { NavLink } from "@/types";
import { IconArrow } from "../icons";
import { Pagination } from "@/components/ui";

type ButtonScrollProps = {
   action: (direction: "previous" | "next") => void;
   index: number;
   sections: NavLink[];
};

type ScrollArrowProps = {
   direction: "previous" | "next";
   isDisabled: boolean;
   onClick: () => void;
};

const ScrollArrow = ({ direction, isDisabled, onClick }: ScrollArrowProps) => (
   <button
      className={`flex items-center gap-2 transition-opacity duration-300 ${
         direction === "previous" ? "rotate-180" : ""
      } ${isDisabled ? "opacity-20" : "opacity-100"}`}
      onClick={onClick}
      aria-label={`Scroll to ${direction} page`}
      disabled={isDisabled}
   >
      <IconArrow />
   </button>
);

export default function ButtonScroll({
   action,
   index,
   sections,
}: ButtonScrollProps) {
   return (
      <div className="flex justify-center gap-8 rounded-full bg-primary border border-secondary px-4 py-3">
         <ScrollArrow
            direction="previous"
            isDisabled={index === 0}
            onClick={() => action("previous")}
         />
         <Pagination index={index} navLinks={sections} />

         <ScrollArrow
            direction="next"
            isDisabled={index === sections.length - 1}
            onClick={() => action("next")}
         />
      </div>
   );
}
