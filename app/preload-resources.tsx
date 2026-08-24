"use client";

import ReactDOM from "react-dom";

export function PreloadResources() {
  ReactDOM.preload("/logo-lg-ui.webp", {
    as: "image",
    type: "image/webp",
    fetchPriority: "high",
  });

  return null;
}
