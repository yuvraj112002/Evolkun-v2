"use client";

import { ReactLenis } from "lenis/react";
import React, { useEffect, useRef } from "react";

function GridOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0
      bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),
          linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]
      bg-[size:54px_54px]
      [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
    />
  );
}

function CosmicBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-[10%] w-48 h-48 md:w-72 md:h-72 bg-purple-600/20 rounded-full blur-2xl md:blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-[10%] w-64 h-64 md:w-96 md:h-96 bg-cyan-600/20 rounded-full blur-2xl md:blur-3xl animate-pulse-slower" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-600/10 rounded-full blur-2xl md:blur-3xl animate-spin-slow" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 hidden md:block">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${8 + Math.random() * 10}s infinite linear`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Pill({ children, variant = "default" }) {
  const variants = {
    default: "border-white/15 bg-white/5 text-white/80",
    purple: "border-purple-500/30 bg-purple-500/10 text-purple-300",
    cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
  };
  
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs backdrop-blur-sm ${variants[variant]}`}>
      {children}
    </span>
  );
}

function Card({ title, items, variant = "default", gradient = false }) {
  const baseClasses = "rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-md h-full flex flex-col relative overflow-hidden";
  
  const variants = {
    default: "border border-white/10 bg-white/5",
    purple: "border border-purple-500/20 bg-purple-950/30",
    cyan: "border border-cyan-500/20 bg-cyan-950/30",
  };

  return (
    <div className={`${baseClasses} ${variants[variant]}`}>
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
      )}
      <p className="text-[10px] md:text-xs font-semibold tracking-[0.18em] text-white/50 mb-3 md:mb-4">
        {title}
      </p>
      <ul className="space-y-2 md:space-y-3 text-[11px] md:text-sm text-white/80 flex-1">
        {items.map((t) => (
          <li key={t} className="flex gap-2 md:gap-3 items-start">
            <span className="mt-1 h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-white/40 flex-shrink-0" />
            <span className="leading-snug md:leading-relaxed">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatCard({ number, label, variant = "purple" }) {
  return (
    <div className="rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6 backdrop-blur-sm text-center">
      <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent`}>
        {number}
      </div>
      <div className="text-[10px] md:text-xs text-white/50 mt-1">{label}</div>
    </div>
  );
}

export default function Index() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Fix for sticky positioning on mobile
    const updateHeight = () => {
      if (containerRef.current) {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false,
      }}
    >
      <main className="max-w-full overflow-x-hidden bg-black" ref={containerRef}>
        {/* STICKY STACK WRAPPER */}
        <div className="relative" style={{ height: '300vh' }}>
          
          {/* SLIDE 1 - The Problem */}
          <div className="sticky top-0 h-screen bg-black text-white overflow-hidden">
            <GridOverlay />
            <CosmicBackground />
            
            <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4 md:px-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  <span className="text-[10px] md:text-xs tracking-[0.2em] text-white/40">(01) — THE CHALLENGE</span>
                </div>

                <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight">
                  Ideas don't fail at
                </h2>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mt-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  execution.
                </h2>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-light mt-2">
                  They fail at{" "}
                  <span className="underline decoration-purple-500/30">decision.</span>
                </h2>

                <p className="mt-6 md:mt-8 text-sm md:text-base text-white/50 max-w-md leading-relaxed">
                  Too many options, too much noise. We turn complexity into clarity with a structured approach.
                </p>

                <div className="mt-8 md:mt-12 flex gap-4">
                  <StatCard number="83%" label="of projects fail at planning" />
                  <StatCard number="2.5x" label="faster with clear scope" />
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 2 - The System */}
          <div className="sticky top-0 h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 text-white overflow-hidden rounded-t-3xl">
            <GridOverlay />
            <CosmicBackground />
            
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15),transparent_50%)]" />
            
            <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4 md:px-6">
              <div className="w-full py-8 md:py-12">
                <div className="flex items-center gap-2 mb-6 md:mb-8">
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[10px] md:text-xs tracking-[0.2em] text-white/40">(02) — THE FRAMEWORK</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                  {/* Left */}
                  <div className="flex flex-col justify-center">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
                      Three layers.
                    </h2>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-white/80 mt-2">
                      One clear direction.
                    </h2>

                    <p className="mt-4 md:mt-6 text-sm md:text-base text-white/50 max-w-md">
                      We break down your vision into inputs, logic, and outputs — transforming ambiguity into a build-ready blueprint.
                    </p>

                    <div className="mt-6 md:mt-8 flex flex-wrap gap-2">
                      <Pill variant="purple">Data-driven</Pill>
                      <Pill variant="cyan">Structured</Pill>
                      <Pill variant="purple">Scalable</Pill>
                      <Pill variant="cyan">Predictable</Pill>
                    </div>
                  </div>

                  {/* Right - Cards */}
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <Card
                      title="INPUT"
                      items={[
                        "Your vision",
                        "Market context",
                        "User needs",
                        "Constraints"
                      ]}
                      variant="purple"
                      gradient={true}
                    />
                    <Card
                      title="LOGIC"
                      items={[
                        "Priority mapping",
                        "Risk assessment",
                        "Resource planning",
                        "Timeline"
                      ]}
                      variant="cyan"
                      gradient={true}
                    />
                    <Card
                      title="OUTPUT"
                      items={[
                        "Clear scope",
                        "Feature roadmap",
                        "Tech direction",
                        "Launch plan"
                      ]}
                      variant="purple"
                      gradient={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 3 - The Outcome */}
          <div className="sticky top-0 h-screen bg-gradient-to-t from-black via-purple-950/10 to-black text-white overflow-hidden">
            <GridOverlay />
            <CosmicBackground />
            
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.1),transparent_60%)]" />
            
            <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4 md:px-6">
              <div className="w-full py-8 md:py-12">
                <div className="flex items-center gap-2 mb-6 md:mb-8">
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  <span className="text-[10px] md:text-xs tracking-[0.2em] text-white/40">(03) — THE RESULT</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                  {/* Left */}
                  <div className="flex flex-col justify-center">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
                      From confusion
                    </h2>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-white/80 mt-2">
                      to confidence.
                    </h2>

                    <div className="mt-6 md:mt-8 space-y-4">
                      {[
                        "Clear priorities, not endless debates",
                        "Predictable timelines, not constant surprises",
                        "Scalable foundation, not technical debt"
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 flex-shrink-0" />
                          <span className="text-sm md:text-base text-white/70">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right */}
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="col-span-2 rounded-xl md:rounded-2xl border border-purple-500/20 bg-purple-950/30 p-5 md:p-6 backdrop-blur-md">
                      <p className="text-xs md:text-sm font-medium text-white/90 mb-3">What you get</p>
                      <div className="grid grid-cols-2 gap-2">
                        {["Build blueprint", "Feature roadmap", "Tech stack", "Timeline"].map((item) => (
                          <div key={item} className="text-[10px] md:text-xs text-white/60 bg-white/5 rounded-lg px-3 py-2 text-center">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Card
                      title="BEFORE"
                      items={[
                        "Unclear scope",
                        "Endless revisions",
                        "Missed deadlines"
                      ]}
                      variant="default"
                    />
                    
                    <Card
                      title="AFTER"
                      items={[
                        "Crystal clarity",
                        "Fast execution",
                        "Confident launch"
                      ]}
                      variant="purple"
                      gradient={true}
                    />
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="mt-8 md:mt-12 flex items-center gap-3">
                  <div className="h-1 w-12 bg-purple-500 rounded-full" />
                  <div className="h-1 w-12 bg-white/10 rounded-full" />
                  <div className="h-1 w-12 bg-white/10 rounded-full" />
                  <span className="text-[10px] md:text-xs text-white/30 ml-2">3-step clarity system</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Section */}
        <section className="relative min-h-screen bg-black text-white border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 md:px-6 py-20 md:py-28">
            <p className="text-xs tracking-[0.2em] text-white/30 mb-4">(04) — WHAT'S NEXT</p>
            <h2 className="text-2xl md:text-4xl font-light max-w-2xl">
              Ready to turn your idea into a clear roadmap?
            </h2>
            <div className="mt-12 w-16 h-px bg-gradient-to-r from-purple-500 to-cyan-500" />
          </div>
        </section>
      </main>

      <style jsx global>{`
        @keyframes float-particle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }
        
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes spin-slower {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        
        .animate-spin-slower {
          animation: spin-slower 40s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 4s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse 6s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
        }

        @media (max-width: 768px) {
          .h-screen {
            height: 100dvh;
          }
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        ::selection {
          background: rgba(168, 85, 247, 0.3);
          color: white;
        }
      `}</style>
    </ReactLenis>
  );
}