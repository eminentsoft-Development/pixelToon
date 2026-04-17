'use client';

import Script from 'next/script';

export default function SociableKitWidget({ widgetId }) {
  return (
    <div className="w-full max-w-6xl mx-auto my-10 px-4">
      {/* Container where the widget will render */}
      <div className="sk-ww-google-reviews" data-embed-id={widgetId}></div>

      {/* Load the SociableKIT script asynchronously */}
      <Script 
        src="https://widgets.sociablekit.com/google-reviews/widget.js" 
        strategy="afterInteractive" 
      />
    </div>
  );
}