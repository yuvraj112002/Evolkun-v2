"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "../components/Navbar/Header";
import Footer from "@/components/Footer/page";
import Chatbot from "@/components/Chatbot/Chatbot";
import { AuthProvider } from "@/context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import styles from "@/styles/modules/layout.module.scss";
import useLenisScroll from "@/hooks/useLenisScroll";

export default function ClientShell({ children }) {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  const hideChromePaths = [
    "/signup",
    "/signin",
    "/app-development",
    "/comming-soon",
  ];

  const lenis = useLenisScroll({
    duration: 1.1,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1.15,
    touchMultiplier: 1.6,
    autoResize: true,
    infinite: false,
  });

  useEffect(() => {
    const handleLoad = () => setIsReady(true);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    if (!lenis) return;

    requestAnimationFrame(() => {
      lenis.scrollTo(0, { immediate: true });
    });
  }, [pathname, lenis]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!lenis) return;

      const ease = (t) => 1 - Math.pow(1 - t, 3);

      switch (e.key) {
        case "Home":
          e.preventDefault();
          lenis.scrollTo(0, { duration: 1.2, easing: ease });
          break;
        case "End":
          e.preventDefault();
          lenis.scrollTo(document.body.scrollHeight, {
            duration: 1.2,
            easing: ease,
          });
          break;
        case "PageUp":
          e.preventDefault();
          lenis.scrollTo(window.scrollY - window.innerHeight * 0.85, {
            duration: 0.9,
            easing: ease,
          });
          break;
        case "PageDown":
          e.preventDefault();
          lenis.scrollTo(window.scrollY + window.innerHeight * 0.85, {
            duration: 0.9,
            easing: ease,
          });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [lenis]);

  const shouldHideChrome = hideChromePaths.includes(pathname);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        {!isReady && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "#f6f6f6",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                border: "4px solid rgba(100, 57, 255, 0.1)",
                borderTopColor: "#6439ff",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
          </div>
        )}

        <div className={styles.pageWrapper}>
          {!shouldHideChrome && (
            <Suspense fallback={null}>
              <Header className="mb-[2rem]" />
            </Suspense>
          )}
          <main className={styles.main}>{children}</main>
          {!shouldHideChrome && <Footer />}
          {!shouldHideChrome && <Chatbot />}
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          style={{ zIndex: 10000 }}
        />

        <style jsx global>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
