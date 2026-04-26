"use client";

import React, { useMemo } from "react";

function ProblemAnimation() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      {["?", "?", "?", "?", "?"].map((mark, i) => (
        <div
          key={i}
          className="absolute text-4xl md:text-5xl font-bold text-indigo-200/50 problem-float"
          style={{
            left: `${18 + i * 14}%`,
            top: `${18 + i * 10}%`,
            animationDelay: `${i * 0.35}s`,
          }}
        >
          {mark}
        </div>
      ))}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-32 md:h-32 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full opacity-20 soft-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full medium-pulse" />
    </div>
  );
}

function FrameworkAnimation() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-36 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-2xl shadow-xl medium-pulse" />
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-36 h-36 bg-gradient-to-br from-purple-200 to-purple-300 rounded-2xl shadow-xl medium-pulse"
        style={{ animationDelay: "0.2s" }}
      />
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-36 h-36 bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl shadow-xl medium-pulse"
        style={{ animationDelay: "0.4s" }}
      />

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <line
          x1="50%"
          y1="70%"
          x2="50%"
          y2="38%"
          stroke="#c7d2fe"
          strokeWidth="2"
          strokeDasharray="6 6"
          className="slow-dash"
        />
      </svg>
    </div>
  );
}

function SuccessAnimation() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
      <div className="absolute w-44 h-44 border-4 border-indigo-200 rounded-full spin-slow" />
      <div className="absolute w-36 h-36 border-4 border-purple-200 rounded-full spin-reverse" />

      <svg
        className="w-20 h-20 text-indigo-500"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M20 6L9 17L4 12"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="draw-check"
        />
      </svg>
    </div>
  );
}

function GradientBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${(i * 7.3) % 100}%`,
        top: `${(i * 11.7) % 100}%`,
        duration: `${6 + (i % 5)}s`,
        delay: `${(i % 4) * 0.6}s`,
      })),
    []
  );

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full particle-float"
            style={{
              left: particle.left,
              top: particle.top,
              animationDuration: particle.duration,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Pill({ children, variant = "default" }) {
  const variants = {
    default: "border-gray-200 bg-white text-gray-600 shadow-sm",
    indigo: "border-indigo-200 bg-indigo-50 text-indigo-700 shadow-sm",
    purple: "border-purple-200 bg-purple-50 text-purple-700 shadow-sm",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

function Card({ title, items, gradient = false }) {
  return (
    <div
      className={`rounded-2xl border p-8 h-full flex flex-col relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${
        gradient
          ? "bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 border-indigo-200"
          : "bg-white border-gray-200"
      }`}
    >
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-tr from-white/50 via-transparent to-white/30 pointer-events-none" />
      )}

      <p className="text-xs font-semibold tracking-wider text-gray-400 mb-6 relative z-10">
        {title}
      </p>

      <ul className="space-y-4 text-sm text-gray-700 flex-1 relative z-10">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex-shrink-0" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MetricCard({ number, label }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/90 p-6 md:p-8 text-center shadow-sm">
      <div className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
        {number}
      </div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

const PROCESS_CARDS = [
  {
    title: "01 — INPUT",
    items: [
      "Your vision & goals",
      "Market research",
      "User needs",
      "Technical constraints",
    ],
  },
  {
    title: "02 — LOGIC",
    items: [
      "Priority mapping",
      "Risk assessment",
      "Resource planning",
      "Timeline creation",
    ],
  },
  {
    title: "03 — OUTPUT",
    items: [
      "Clear scope",
      "Feature roadmap",
      "Tech direction",
      "Launch strategy",
    ],
  },
];

export default function WhyChooseEvolkun() {
  return (
    <main className="bg-white">
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-40">
        <div className="h-full w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-90" />
      </div>

      <div className="relative">
        <section className="relative min-h-screen overflow-hidden section-shell">
          <GradientBackground />
          <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-screen items-center">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs tracking-[0.2em] text-gray-400">
                    (01) — THE PROBLEM
                  </span>
                  <span className="w-2 h-2 rounded-full bg-indigo-400 medium-pulse" />
                </div>

                <h1 className="text-5xl md:text-6xl font-light text-gray-900 leading-tight">
                  Ideas don't fail at
                </h1>
                <h1 className="text-5xl md:text-6xl font-bold mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  execution.
                </h1>
                <h1 className="text-5xl md:text-6xl font-light mt-4 text-gray-800">
                  They fail at{" "}
                  <span className="relative">
                    <span className="relative z-10">decision.</span>
                    <span className="absolute bottom-3 left-0 w-full h-3 bg-gradient-to-r from-indigo-200 to-purple-200 -z-0 rounded-full" />
                  </span>
                </h1>

                <p className="mt-8 text-lg text-gray-500 leading-relaxed">
                  Too many options, too much noise. We turn complexity into
                  clarity with a structured approach.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Pill variant="indigo">Overwhelmed by choices</Pill>
                  <Pill variant="purple">Analysis paralysis</Pill>
                </div>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <MetricCard number="83%" label="Projects fail at planning" />
                  <MetricCard number="2.5x" label="Faster with clear scope" />
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center">
                <ProblemAnimation />
              </div>
            </div>
          </div>
        </section>

        <section className="relative min-h-screen overflow-hidden section-shell">
          <GradientBackground />
          <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-screen items-center">
              <div className="hidden lg:flex order-2 lg:order-1 items-center justify-center">
                <FrameworkAnimation />
              </div>

              <div className="max-w-xl order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs tracking-[0.2em] text-gray-400">
                    (02) — THE FRAMEWORK
                  </span>
                  <span className="w-2 h-2 rounded-full bg-purple-400 medium-pulse" />
                </div>

                <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                  Three layers.
                </h2>
                <h2 className="text-3xl md:text-4xl font-light text-gray-500 mt-3">
                  One clear direction.
                </h2>

                <p className="mt-6 text-gray-500 leading-relaxed">
                  We break down your vision into inputs, logic, and outputs —
                  transforming ambiguity into a build-ready blueprint.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    "Data-driven decision making",
                    "Structured prioritization",
                    "Scalable architecture",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  <Pill variant="indigo">Input → Logic → Output</Pill>
                  <Pill variant="purple">Systematic approach</Pill>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative min-h-screen overflow-hidden section-shell">
          <GradientBackground />
          <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-24 flex items-center">
            <div className="w-full">
              <div className="text-center mb-12">
                <span className="text-xs tracking-[0.2em] text-gray-400">
                  (03) — THE PROCESS
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PROCESS_CARDS.map((card) => (
                  <Card
                    key={card.title}
                    title={card.title}
                    items={card.items}
                    gradient
                  />
                ))}
              </div>

              <div className="flex justify-center flex-wrap gap-3 mt-8">
                <Pill variant="indigo">Structured</Pill>
                <Pill variant="purple">Scalable</Pill>
                <Pill variant="indigo">Predictable</Pill>
                <Pill variant="purple">Efficient</Pill>
              </div>
            </div>
          </div>
        </section>

        <section className="relative min-h-screen overflow-hidden section-shell">
          <GradientBackground />
          <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-screen items-center">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs tracking-[0.2em] text-gray-400">
                    (04) — THE OUTCOME
                  </span>
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 medium-pulse" />
                </div>

                <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                  From confusion
                </h2>
                <h2 className="text-3xl md:text-4xl font-light text-gray-500 mt-3">
                  to{" "}
                  <span className="font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    confidence.
                  </span>
                </h2>

                <div className="mt-10 space-y-6">
                  {[
                    "Clear priorities, not endless debates",
                    "Predictable timelines, not constant surprises",
                    "Scalable foundation, not technical debt",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-4 bg-white/70 rounded-xl border border-gray-100"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Pill variant="indigo">Clear roadmap</Pill>
                  <Pill variant="purple">Confident launch</Pill>
                  <Pill variant="indigo">Fast execution</Pill>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center">
                <SuccessAnimation />
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes particleFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.2;
          }
          50% {
            transform: translate3d(10px, -18px, 0);
            opacity: 0.8;
          }
        }

        @keyframes floatSoft {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -12px, 0);
          }
        }

        @keyframes pulseSoft {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.25;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.08);
            opacity: 0.4;
          }
        }

        @keyframes pulseMedium {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.06);
          }
        }

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spinReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes dashMove {
          from {
            stroke-dashoffset: 30;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes drawCheck {
          0% {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
          }
          40%,
          100% {
            stroke-dasharray: 100;
            stroke-dashoffset: 0;
          }
        }

        .particle-float {
          animation-name: particleFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .problem-float {
          animation: floatSoft 3.8s ease-in-out infinite;
        }

        .soft-pulse {
          animation: pulseSoft 3s ease-in-out infinite;
        }

        .medium-pulse {
          animation: pulseMedium 2.8s ease-in-out infinite;
        }

        .spin-slow {
          animation: spinSlow 10s linear infinite;
        }

        .spin-reverse {
          animation: spinReverse 14s linear infinite;
        }

        .slow-dash {
          animation: dashMove 2.2s linear infinite;
        }

        .draw-check {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: drawCheck 2.4s ease-out infinite;
        }

        .section-shell {
          content-visibility: auto;
          contain-intrinsic-size: 1000px;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #6366f1, #a855f7);
          border-radius: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          .particle-float,
          .problem-float,
          .soft-pulse,
          .medium-pulse,
          .spin-slow,
          .spin-reverse,
          .slow-dash,
          .draw-check {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}