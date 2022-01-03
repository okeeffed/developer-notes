import React, { useEffect } from "react";

export function Adsense() {
  const loadAds = () => {
    try {
      if (typeof window !== "undefined") {
        // @ts-expect-error: didn't add extra adsbygoogle property to window
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.log("adsense error", error.message);
    }
  };

  useEffect(() => {
    loadAds();
  }, []);

  return (
    <div
      style={{
        marginBottom: "24px",
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3242257428325939"
        data-ad-slot="1495933395"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
