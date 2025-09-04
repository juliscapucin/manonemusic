"use client";

import { useCookieStorage } from "@/hooks";
import { createContext, useContext, useState } from "react";

type ContextProps = {
   isModalOpen: boolean;
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
   cookieConsent: string | null;
   setCookieConsent: (consent: string | null) => void;
   updateCookieConsent: (consent: string) => void;
};

// CREATE CONTEXT
const CookieModalContext = createContext<ContextProps | null>(null);

// CONTEXT PROVIDER
export const CookieModalContextProvider = ({
   children,
}: {
   children: React.ReactNode;
}) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const { cookieConsent, setCookieConsent, updateCookieConsent } =
      useCookieStorage();

   return (
      <CookieModalContext.Provider
         value={{
            isModalOpen,
            setIsModalOpen,
            cookieConsent,
            setCookieConsent,
            updateCookieConsent,
         }}
      >
         {children}
      </CookieModalContext.Provider>
   );
};

// CONTEXT CUSTOM HOOK
export const useCookieModalContext = () => {
   const context = useContext(CookieModalContext);
   if (!context)
      throw new Error(
         "useCookieModalContext must be used within CookieModalContextProvider",
      );
   return context;
};
