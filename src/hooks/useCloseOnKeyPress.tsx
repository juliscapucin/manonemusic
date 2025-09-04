import { useEffect } from "react";

export default function useCloseOnKeyPress(
   isModalOpen: boolean,
   setIsModalOpen: (isOpen: boolean) => void,
) {
   useEffect(() => {
      function handleKeyDown(e: KeyboardEvent) {
         if (e.key === "Escape" && isModalOpen) {
            setIsModalOpen(false);
         }
      }

      window.addEventListener("keydown", handleKeyDown);

      return () => {
         window.removeEventListener("keydown", handleKeyDown);
      };
   }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
