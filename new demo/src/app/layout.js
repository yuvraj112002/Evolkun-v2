"use client";

import { useEffect, useState } from "react";
import Header from "../components/Navbar/Header";
import { AuthProvider } from "@/context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer/page";
import styles from "@/styles/modules/layout.module.scss";
import { usePathname } from "next/navigation";
import "./globals.css";
import "@/styles/globals.scss";
import { Inter } from "next/font/google";
import Chatbot from "@/components/Chatbot/Chatbot";
import useLenisScroll from "@/hooks/useLenisScroll";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  const hideChromePaths = [
    "/signup",
    "/signin",
    "/web-development",
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
    <html lang="en" className={inter.className}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="theme-color" content="#6439ff" />
      </head>

      <body>
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
                  transition: "opacity 0.5s ease",
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
                    animation: "spin 1s cubic-bezier(0.5, 0, 0.5, 1) infinite",
                  }}
                />
              </div>
            )}

            <div className={styles.pageWrapper}>
              {!shouldHideChrome && <Header className="mb-[2rem]" />}

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
          </AuthProvider>
        </GoogleOAuthProvider>

        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </body>
    </html>
  );
}