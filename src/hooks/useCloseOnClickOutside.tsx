import { useEffect } from "react";

export default function useCloseOnClickOutside(
   refContainer: React.RefObject<HTMLDivElement | null>,
   refOpenButton: React.RefObject<HTMLDivElement | HTMLButtonElement | null>,
   setIsOpen: (arg: boolean) => void,
   isModalOpen: boolean,
) {
   useEffect(() => {
      function handleClickOutside(e: MouseEvent) {
         if (!refContainer.current || !refOpenButton.current || !isModalOpen)
            return;
         if (
            isModalOpen &&
            !refContainer.current.contains(e.target as Node) &&
            !refOpenButton.current.contains(e.target as Node)
         ) {
            setIsOpen(false);
         }
      }

      window.addEventListener("click", handleClickOutside);

      return () => {
         window.removeEventListener("click", handleClickOutside);
      };
   }, [setIsOpen, isModalOpen, refContainer, refOpenButton]);
}
