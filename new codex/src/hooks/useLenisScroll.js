"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * ✅ Next.js-safe Lenis hook
 * - Guards against React StrictMode double-mount in dev
 * - No useState rerender
 * - Stable RAF loop + cleanup
 * - Exposes window.__lenis so modals can stop/start smooth scroll
 */
export default function useLenisScroll(options = {}) {
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    // ✅ StrictMode guard (dev double-mount)
    if (mountedRef.current) return;
    mountedRef.current = true;

    // (Optional but recommended) prevent browser restoring scroll weirdly
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      // safe defaults
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.6,
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      ...options,
    });

    lenisRef.current = lenis;

    // ✅ ADD THIS: expose globally for modal locks etc.
    if (typeof window !== "undefined") {
      window.__lenis = lenis;
    }

    const raf = (time) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };

    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;

      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      // ✅ cleanup global ref
      if (typeof window !== "undefined") {
        window.__lenis = undefined;
      }

      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return lenisRef.current;
}
