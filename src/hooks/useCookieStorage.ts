"use client";

import { useEffect, useState } from "react";

export default function useCookieStorage() {
   const [cookieConsent, setCookieConsent] = useState<string | null>(null);

   const updateCookieConsent = (cookieConsent: string) => {
      localStorage.setItem("cookieConsentSettings", cookieConsent);
   };

   useEffect(() => {
      setCookieConsent(
         localStorage.getItem("cookieConsentSettings") || "false",
      );
   }, []);

   // Update cookieConsent in session storage on change
   useEffect(() => {
      if (!cookieConsent) return;
      updateCookieConsent(cookieConsent);
   }, [cookieConsent]);

   return { cookieConsent, setCookieConsent, updateCookieConsent };
}
