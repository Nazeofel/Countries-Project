import { RefObject, useEffect, useState } from "react";

export default function useObserver(element: RefObject<HTMLElement>) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoading(true);
        } else {
          setLoading(false);
        }
      },

      {
        root: null,
        rootMargin: "0px",
        threshold: 0.4,
      }
    );
    if (element.current) {
      observer.observe(element.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [element]);

  return loading;
}
