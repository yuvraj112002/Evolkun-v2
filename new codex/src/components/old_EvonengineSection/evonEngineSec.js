"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ClipboardList, Cpu, DollarSign, Rocket } from "lucide-react";
import styles from "./EvonEngineSection.module.scss";

function useInViewport(ref, options = {}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
        ...options,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options]);

  return isVisible;
}

export default function EvonEngineSection() {
  const sectionRef = useRef(null);
  const isVisible = useInViewport(sectionRef);

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

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "900px",
      }}
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={`${styles.header} ${isVisible ? styles.revealIn : styles.revealStart}`}>
          <h2 className={styles.title}>Evon Engine™</h2>

          <p className={styles.subtitle}>
            Our intelligent system understands your business and auto-generates
            digital strategies tailored to your goals.
          </p>

          <p className={styles.quote}>
            "Imagine telling us your brand, budget, and goals. In 12 seconds,
            the Evon Engine maps out your ideal digital roadmap — tech stacks,
            features, timelines — ready to deploy."
          </p>
        </div>

        {/* Steps Wrapper */}
        <div className={styles.stepsWrapper}>
          <svg
            className={`${styles.connectorSvg} ${isVisible ? styles.connectorVisible : ""}`}
            height="140"
            viewBox="0 0 1200 140"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className={styles.connectorPath}
              d="M100 70 C 220 20, 280 20, 400 70"
              stroke="url(#gradient1)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              className={styles.connectorPath}
              d="M400 70 C 520 120, 680 120, 800 70"
              stroke="url(#gradient2)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              className={styles.connectorPath}
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

          <div className={styles.stepsGrid}>
            {steps.map((step, i) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.title}
                  className={`${styles.stepCard} ${
                    isVisible ? styles.cardVisible : styles.cardHidden
                  }`}
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <div
                    className={styles.cardGlow}
                    style={{ background: step.gradient }}
                  />

                  <div className={styles.stepBadge}>{i + 1}</div>

                  <div className={styles.iconWrapper}>
                    <div
                      className={styles.iconContainer}
                      style={{ background: step.gradient }}
                    >
                      <Icon className={styles.icon} />
                    </div>
                  </div>

                  <div className={styles.content}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.desc}</p>
                  </div>

                  <div className={styles.chips}>
                    {step.chips.map((chip) => (
                      <span key={chip} className={styles.chip}>
                        {chip}
                      </span>
                    ))}
                  </div>

                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ background: step.gradient }}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div
          className={`${styles.ctaWrapper} ${
            isVisible ? styles.ctaVisible : styles.ctaHidden
          }`}
        >
          <a href="/survey-page" className={styles.ctaButton}>
            Start the 2-min Survey <span className={styles.ctaArrow}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}