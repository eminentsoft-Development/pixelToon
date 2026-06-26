"use client";

import { useEffect, useState } from "react";
import { ServiceEnquiry } from "./EnquiryPopup";

export default function AutoPopup() {
  const [shouldTrigger, setShouldTrigger] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("enquiryPopupSeen");

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShouldTrigger(true);
        sessionStorage.setItem("enquiryPopupSeen", "true");
      }, 2000); 

      return () => clearTimeout(timer);
    }
  }, []);

  if (!shouldTrigger) return null;

  return (
    <ServiceEnquiry 
      btnName="" 
      classname="hidden" 
      autoOpen={true} 
    />
  );
}