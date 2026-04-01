"use client";

import RichTextEditor from "@/components/admin/Editor";
import React, { useState } from "react";

const Page = () => {
  const [html, setHtml] = useState("");

  return (
    <div>
      <RichTextEditor
        value={html}
        onChange={setHtml}
        placeholder="Write something…"
        minHeight={400}
      />
    </div>
  );
};

export default Page;
