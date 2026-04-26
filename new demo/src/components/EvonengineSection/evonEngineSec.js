"use client";

import React, { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ClipboardList, Cpu, DollarSign, Rocket } from "lucide-react";
import styles from "./EvonEngineSection.module.scss";

export default function EvonEngineSection() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, margin: "-15% 0px" });

  const steps = useMemo(
    () => [
      {
        icon: ClipboardList,
        title: "Tell Us About Your Project",
        desc: "Answer a short, interactive survey — website, app, branding, or social media.",
        chips: ["AI powered", "Takes ~2 min"],
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      },
      {
        icon: Cpu,
        title: "EvoEngine Analyzes It",
        desc: "Our AI studies your inputs, business type, and features to predict accurate outcomes.",
        chips: ["Smart matching", "Real-time"],
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      },
      {
        icon: DollarSign,
        title: "Get Your Price & Plan",
        desc: "Receive a transparent quotation with platform suggestions and timelines.",
        chips: ["Transparent", "Tailored"],
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      },
      {
        icon: Rocket,
        title: "Take Action",
        desc: "Choose your plan or book a call — and let's bring your vision to life.",
        chips: ["Fast start", "Support"],
        gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      },
    ],
    []
  );

  // ✅ simpler + cheaper than rotateX / 3d transforms
  const cardVariants = {
    hidden: { y: 18, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.12 + 0.15,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const headerVariants = {
    hidden: { y: 12, opacity: 0 },
    visible: (delay = 0) => ({
      y: 0,
      opacity: 1,
      transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      style={{
        // ✅ big win: skip work offscreen
        contentVisibility: "auto",
        containIntrinsicSize: "900px",
      }}
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <motion.h2
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            variants={headerVariants}
            className={styles.title}
          >
            Evon Engine™
          </motion.h2>

          <motion.p
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.08}
            variants={headerVariants}
            className={styles.subtitle}
          >
            Our intelligent system understands your business and auto-generates
            digital strategies tailored to your goals.
          </motion.p>

          <motion.p
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.16}
            variants={headerVariants}
            className={styles.quote}
          >
            "Imagine telling us your brand, budget, and goals. In 12 seconds,
            the Evon Engine maps out your ideal digital roadmap — tech stacks,
            features, timelines — ready to deploy."
          </motion.p>
        </div>

        {/* Steps Wrapper */}
        <div className={styles.stepsWrapper}>
          {/* ✅ Connector lines: CSS-driven, no GSAP, no getTotalLength */}
          <svg
            className={styles.connectorSvg}
            height="140"
            viewBox="0 0 1200 140"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className={isInView && !reduceMotion ? styles.drawPath : styles.staticPath}
              d="M100 70 C 220 20, 280 20, 400 70"
              stroke="url(#gradient1)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              className={isInView && !reduceMotion ? styles.drawPath : styles.staticPath}
              d="M400 70 C 520 120, 680 120, 800 70"
              stroke="url(#gradient2)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              className={isInView && !reduceMotion ? styles.drawPath : styles.staticPath}
              d="M800 70 C 920 20, 980 20, 1100 70"
              stroke="url(#gradient3)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#667eea" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#f093fb" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f093fb" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#4facfe" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4facfe" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#43e97b" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Steps Grid */}
          <div className={styles.stepsGrid}>
            {steps.map((step, i) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  custom={i}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={cardVariants}
                  className={styles.stepCard}
                  style={{
                    // ✅ isolate paints to the card
                    contain: "layout paint",
                    willChange: "transform",
                  }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -6,
                          scale: 1.02,
                          transition: { duration: 0.22, ease: "easeOut" },
                        }
                  }
                >
                  <div className={styles.cardGlow} style={{ background: step.gradient }} />

                  <div className={styles.stepBadge}>{i + 1}</div>

                  <div className={styles.iconWrapper}>
                    <div className={styles.iconContainer} style={{ background: step.gradient }}>
                      <Icon className={styles.icon} />
                    </div>
                  </div>

                  <div className={styles.content}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.desc}</p>
                  </div>

                  {/* ✅ chips: no framer per chip, just CSS */}
                  <div className={styles.chips}>
                    {step.chips.map((chip) => (
                      <span key={chip} className={styles.chip}>
                        {chip}
                      </span>
                    ))}
                  </div>

                  {/* ✅ progress bar: CSS hover, no framer width animation */}
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ background: step.gradient }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.55, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={styles.ctaWrapper}
        >
          <a href="/survey-page" className={styles.ctaButton}>
            Start the 2-min Survey <span className={styles.ctaArrow}>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
