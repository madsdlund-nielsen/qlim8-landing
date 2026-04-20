import { useEffect } from "react";

export function useFavicon() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const update = (e: MediaQueryListEvent | MediaQueryList) => {
      const el = document.getElementById("favicon") as HTMLLinkElement | null;
      if (el) el.href = e.matches ? "/favicon-dark.png" : "/favicon-light.png";
    };
    update(mq);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
}
