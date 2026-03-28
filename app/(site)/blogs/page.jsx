"use client"

import Breadcrumbs from "@/components/site/Breadcrumbs";
import React, { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/data-fetch", {
          method: "GET",
          cache: "no-store", // For testing
          // credentials: 'include', // only if needed
        });

        if (!res.ok) throw new Error("Failed");

        const data = await res.json();
        console.log("✅ WP Data from API:", data);
      } catch (err) {
        console.error("❌ Fetch error:", err);
      }
    }

    fetchData();
  }, []);
  return (
    <div className="h-screen">
      <Breadcrumbs />
    </div>
  );
};

export default Page;
