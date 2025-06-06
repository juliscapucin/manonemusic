type IconChevronProps = {
   direction: "back" | "forward";
};

export default function IconChevron({ direction }: IconChevronProps) {
   return (
      <div className={direction === "back" ? "rotate-180" : ""}>
         <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path d="M17.666 9.14504L9.31334 17.4977" stroke="#A3CDB1" />
            <path d="M17.6602 9.24658L9.20607 0.79249" stroke="#A3CDB1" />
         </svg>
      </div>
   );
}
