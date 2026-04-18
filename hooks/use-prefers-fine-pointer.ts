"use client";

import * as React from "react";

/** Haqiqiy sichqoncha (MacBook, noutbuk) — hover animatsiyalar faqat shu yerda */
export function usePrefersFinePointer() {
  const [fine, setFine] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return fine;
}
