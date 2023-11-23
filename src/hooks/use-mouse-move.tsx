"use client";

import React from "react";

// NOTE: Copied from https://github.com/openstatusHQ/time-picker/blob/main/src/hooks/use-mouse-move.tsx
export default function useMouseMove() {
  React.useEffect(() => {
    function mouseMoveEvent(e: MouseEvent) {
      const scale = window.visualViewport?.scale;
      // disable mouse movement on viewport zoom - causes page to slow down
      if (scale === 1) {
        const body = document.body;

        const targetX = e.clientX;
        const targetY = e.clientY;

        body.style.setProperty("--bgx", `${targetX}px`);
        body.style.setProperty("--bgy", `${targetY}px`);
      }
    }

    document.addEventListener("mousemove", mouseMoveEvent);

    return () => {
      document.removeEventListener("mousemove", mouseMoveEvent);
    };
  }, []);
}
