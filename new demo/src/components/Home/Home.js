"use client";

/* -------------------------------------------------------------------------- */
/*                               IMPORTS / SETUP                              */
/* -------------------------------------------------------------------------- */

import React, { useEffect, useState, useCallback, useRef } from "react";
import styles from "./Home.module.scss";
import radialStyles from "./RadialTransition.module.scss";

import { useRouter } from "next/navigation";
import { runRadialTransition } from "./RadialTransition";
import useLenisScroll from "@/hooks/useLenisScroll";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";

/* ---------------------------- Reusable Sections ---------------------------- */
import EvonEngineSection from "../EvonengineSection/evonEngineSec";
import StarRating from "@/components/shared/star-rating";
import Cursor from "@/components/Home/brand";
import Projects from "@/components/Home/Project";
import CreativeMind from "@/components/old-creative-mind";
import ClientMarquee from "../ClientMarque/index.jsx";
import WhyChooseEvolkun from "./why-choose-Evolkun";
import GsapTypewriter from "@/components/shared/GsapTypewriter";

/* -------------------------------------------------------------------------- */
/*                              STATIC / MOCK DATA                            */
/* -------------------------------------------------------------------------- */

/**
 * Avatar list shown beside CTA button
 * This creates the small stacked profile images near the rating.
 */
const avatarList = [
  {
    image: "/images/home/avatar_1.jpg",
    title: "Sarah Johnson",
  },
  {
    image: "/images/home/avatar_2.jpg",
    title: "Olivia Miller",
  },
  {
    image: "/images/home/avatar_3.jpg",
    title: "Sophia Roberts",
  },
  {
    image: "/images/home/avatar_4.jpg",
    title: "Isabella Clark",
  },
];

/**
 * Brand/logo list passed into <Cursor />
 * This is your brand logo strip / logo showcase section.
 */
const brandList = [
  {
    image: "/images/home/brand/1.png",
    darkImg: "/images/home/brand/1.png",
    title: "Adobe",
  },
  {
    image: "/images/home/brand/2.png",
    darkImg: "/images/home/brand/2.png",
    title: "Sketch",
  },
  {
    image: "/images/home/brand/3.png",
    darkImg: "/images/home/brand/3.png",
    title: "Framer",
  },
  {
    image: "/images/home/brand/4.png",
    darkImg: "/images/home/brand/4.png",
    title: "Framer",
  },
  {
    image: "/images/home/brand/5.png",
    darkImg: "/images/home/brand/5.png",
    title: "Framer",
  },
  {
    image: "/images/home/brand/6.png",
    darkImg: "/images/home/brand/6.png",
    title: "Framer",
  },
];

/**
 * Case studies / project showcase data
 * Passed into <Projects /> section.
 */
const caseStudiesList = [
  {
    image: "/images/home/onlinePresence/online_img_1.jpg",
    title: "Rediseño de App Bancaria",
    images: [
      "/images/home/onlinePresence/online_img_1.jpg",
      "/images/home/onlinePresence/online_img_2.jpg",
      "/images/home/onlinePresence/online_img_1.jpg",
      "/images/home/onlinePresence/online_img_1.jpg",
      "/images/home/onlinePresence/online_img_2.jpg",
      "/images/home/onlinePresence/online_img_1.jpg",
    ],
    points: [
      "Transferencias UPI/SEPA y pagos de servicios",
      "Saldo en tiempo real y movimientos detallados",
      "Controles de tarjeta, límites y bloqueo instantáneo",
      "Inicio de sesión biométrico y 2FA",
    ],
  },
  {
    image: "/images/home/onlinePresence/online_img_2.jpg",
    title: "Plataforma E-learning",
    images: [
      "/images/home/onlinePresence/online_img_2.jpg",
      "/images/home/onlinePresence/online_img_3.jpg",
      "/images/home/onlinePresence/online_img_2.jpg",
    ],
    points: [
      "Cursos autogestionados con evaluaciones",
      "Seguimiento de progreso y certificados",
      "Soporte de video, cuestionarios y foros",
      "Panel para instructores con analíticas",
    ],
  },
  {
    image: "/images/home/onlinePresence/online_img_3.jpg",
    title: "Dashboard Analítico",
    images: [
      "/images/home/onlinePresence/online_img_3.jpg",
      "/images/home/onlinePresence/online_img_4.jpg",
      "/images/home/onlinePresence/online_img_3.jpg",
    ],
    points: [
      "KPIs en tiempo real con visualizaciones claras",
      "Filtros, segmentos y drill-down",
      "Alertas y exportación de reportes",
      "Integración con SQL, GA4 y APIs",
    ],
  },
  {
    image: "/images/home/onlinePresence/online_img_4.jpg",
    title: "App de Delivery",
    images: [
      "/images/home/onlinePresence/online_img_4.jpg",
      "/images/home/onlinePresence/online_img_1.jpg",
      "/images/home/onlinePresence/online_img_4.jpg",
    ],
    points: [
      "Seguimiento de pedidos en vivo",
      "Búsqueda con filtros y locales cercanos",
      "Pagos seguros y billeteras digitales",
      "Perfiles, reseñas y calificaciones",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                              ANIMATION CONFIG                              */
/* -------------------------------------------------------------------------- */

/**
 * Simple bottom-up fade animation for Framer Motion
 * Used on hero text, CTA block, and Projects section.
 */
const bottomAnimation = {
  initial: { y: "20%", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.3, ease: "easeOut" },
};

/**
 * Register GSAP plugin globally
 */
gsap.registerPlugin(ScrollTrigger);

/**
 * Texts used in hero typewriter
 */
const TEXTS = [
  "Can't stand boring",
  "Think loud, dream louder",
  "Bleed ideas at midnight",
  "Want chills, not checklists",
];

/* -------------------------------------------------------------------------- */
/*                         OPTIONAL CUSTOM TYPEWRITER                         */
/* -------------------------------------------------------------------------- */

/**
 * This custom Typewriter component is currently NOT used,
 * because you are using <GsapTypewriter /> instead.
 *
 * You can keep it for fallback or remove it if unused.
 */
function Typewriter({ strings }) {
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  const type = useCallback(() => {
    const currentString = strings[currentIndex % strings.length];

    if (isTyping) {
      if (text.length < currentString.length) {
        setTimeout(() => {
          setText(currentString.substring(0, text.length + 1));
        }, 100);
      } else {
        setTimeout(() => setIsTyping(false), 1500);
      }
    } else {
      if (text.length > 0) {
        setTimeout(() => {
          setText(currentString.substring(0, text.length - 1));
        }, 50);
      } else {
        setTimeout(() => {
          setIsTyping(true);
          setCurrentIndex(currentIndex + 1);
        }, 500);
      }
    }
  }, [text, currentIndex, isTyping, strings]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    type();
  }, [type]);

  return (
    <div className="min-h-[10rem] mt-20 flex items-center justify-center">
      <span
        className={`md:whitespace-nowrap ${styles.highlight} ${styles.highlightAll}`}
      >
        {text}
        <span className={styles.cursor} style={{ opacity: showCursor ? 1 : 0 }}>
          |
        </span>
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              MAIN HOME SECTION                             */
/* -------------------------------------------------------------------------- */

export default function HomeSection() {
  /* -------------------------- Smooth scroll hook -------------------------- */
  useLenisScroll();

  /* ------------------------------ Refs / utils ----------------------------- */
  const buttonRef = useRef(null);          // CTA button ref
  const overlayRefs = useRef([]);          // radial transition overlays
  const ref = useRef(null);                // currently unused
  const router = useRouter();

  /* ------------------------------------------------------------------------ */
  /*                         CTA BUTTON CLICK HANDLER                         */
  /* ------------------------------------------------------------------------ */

  /**
   * On CTA click:
   * 1. Find the inner CTA box
   * 2. Run radial transition animation
   * 3. Navigate to /survey-page
   */
  const handleButtonClick = () => {
    const rocket = buttonRef.current?.querySelector(`.${styles.ctaBox}`);

    runRadialTransition(rocket, overlayRefs.current.filter(Boolean), () =>
      router.push("/survey-page")
    );
  };

  /* ------------------------------------------------------------------------ */
  /*                          PREFETCH + BUTTON WIDTH                         */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    // Prefetch destination page for faster navigation
    router.prefetch("/survey-page");

    // Store button width in CSS variable
    const updateButtonWidth = () => {
      if (buttonRef.current) {
        buttonRef.current.style.setProperty(
          "--button-width",
          `${buttonRef.current.offsetWidth}px`
        );
      }
    };

    updateButtonWidth();
    window.addEventListener("resize", updateButtonWidth);

    return () => window.removeEventListener("resize", updateButtonWidth);
  }, [router]);

  /* ------------------------------------------------------------------------ */
  /*                                  RENDER                                  */
  /* ------------------------------------------------------------------------ */

  return (
    <section className={styles.section}>
      {/* ==================================================================== */}
      {/*                               HERO SECTION                           */}
      {/* ==================================================================== */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>

          {/* ---------------------- Hero Heading + Subtext --------------------- */}
          <motion.div
            {...bottomAnimation}
            className="flex flex-col items-center justify-center"
          >
            <h1 className={styles.mainText}>
              <span className="inline-block min-h-[1.2em]">
                {/* Main animated heading */}
                <GsapTypewriter texts={TEXTS} holdMs={2500} />
              </span>
            </h1>

            {/* Hero paragraph / value proposition */}
            <p className="p-2 text-gray-400 max-w-[40rem] md:text-[16px] text-[12px]">
              No more waiting weeks for quotations. Evolkun helps you discover
              the perfect package for your business—whether it’s Web
              Development, App Development, Social Media Handling, or
              Branding—with transparent pricing tailored to your needs.
            </p>
          </motion.div>

          {/* ---------------------- CTA + Social Proof Area -------------------- */}
          <div className="w-full">
            <motion.div
              {...bottomAnimation}
              className="flex flex-col items-center justify-center gap-4"
            >
              <div className="flex flex-col items-center justify-center gap-8 w-full sm:flex-row">

                {/* -------------------------- CTA Button -------------------------- */}
                <button
                  ref={buttonRef}
                  className={styles.ctaButton}
                  onClick={handleButtonClick}
                >
                  <div className={styles.ctaBox}>
                    <Image
                      src="/svgs/arrow-right1.svg"
                      alt="arrow"
                      className={styles.arrow}
                      width={120}
                      height={60}
                    />
                  </div>

                  <span className={styles.ctaText}>
                    Get Free Quote Instantly
                  </span>
                </button>

                {/* ---------------------- Avatar + Rating Block ---------------------- */}
                <div className="flex items-center gap-7">
                  <ul className="avatar flex flex-row items-center">
                    {avatarList?.map((items, index) => (
                      <li key={index} className="-mr-2 z-1 avatar-hover:ml-2">
                        <Image
                          src={items.image}
                          alt={items.title}
                          width={44}
                          height={44}
                          quality={100}
                          className="rounded-full border-2 border-white"
                          unoptimized={true}
                        />
                      </li>
                    ))}
                  </ul>

                  <div className="gap-1 flex flex-col">
                    <div>
                      <StarRating count={5} color="#F59E0B" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero footer supporting line */}
              <p className={styles.footerNote}>
                Answer a few questions so we can tailor your dream solution.
              </p>
            </motion.div>

            {/* ================================================================ */}
            {/*                      BRAND LOGO / MARQUEE SECTION               */}
            {/* ================================================================ */}
            <Cursor brandList={brandList} className="w-full" />
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/*                    SECTION STACK BELOW HERO / BRANDS                 */}
      {/* ==================================================================== */}
      <div className="flex flex-col">

        {/* ------------------------------------------------------------------ */}
        {/* 1) WHY CHOOSE EVOLKUN SECTION                                      */}
        {/* This is the FIRST section after the brand logo section             */}
        {/* ------------------------------------------------------------------ */}
        <WhyChooseEvolkun className="w-full" />

        {/* ------------------------------------------------------------------ */}
        {/* 2) PROJECTS / CASE STUDIES SECTION                                 */}
        {/* bottomAnimation is applied here                                    */}
        {/* ------------------------------------------------------------------ */}
        <motion.div {...bottomAnimation}>
          <Projects caseStudiesList={caseStudiesList} className="w-full" />
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/* 3) CREATIVE MIND SECTION                                           */}
        {/* ------------------------------------------------------------------ */}
        <CreativeMind className="w-full" />

        {/* ------------------------------------------------------------------ */}
        {/* 4) CLIENT MARQUEE SECTION                                          */}
        {/* ------------------------------------------------------------------ */}
        <ClientMarquee className="w-full" />

        {/* ------------------------------------------------------------------ */}
        {/* 5) EVON ENGINE SECTION                                             */}
        {/* ------------------------------------------------------------------ */}
        <EvonEngineSection className="w-full" />
      </div>

      {/* ==================================================================== */}
      {/*                    OLD / COMMENTED FEATURE SECTION                   */}
      {/* ==================================================================== */}
      {/*
      <div className={styles.featureSection}>
        <h2 className={styles.sectionHeading}>
          Why Choose <span className={styles.highlighted}>Evolkun</span>?
        </h2>
        <p className={styles.sectionSubheading}>
          We combine creativity, speed, and AI-driven precision to build your
          digital future.
        </p>
        <div className={styles.cardGrid}></div>
      </div>
      */}

      {/* ==================================================================== */}
      {/*                    RADIAL PAGE TRANSITION OVERLAYS                   */}
      {/* Used when CTA button is clicked and route changes to survey page     */}
      {/* ==================================================================== */}
      <div className={radialStyles.pageOverlayContainer}>
        <div
          ref={(el) => (overlayRefs.current[0] = el)}
          className={`${radialStyles.overlay} ${radialStyles.overlayBlue}`}
        ></div>

        <div
          ref={(el) => (overlayRefs.current[1] = el)}
          className={`${radialStyles.overlay} ${radialStyles.overlayLight}`}
        ></div>

        <div
          ref={(el) => (overlayRefs.current[2] = el)}
          className={`${radialStyles.overlay} ${radialStyles.overlayWhite}`}
        ></div>
      </div>

      {/* Empty placeholder section */}
      <section>{/* <EvonEngineSection /> */}</section>
    </section>
  );
}