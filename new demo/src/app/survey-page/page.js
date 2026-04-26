"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SurveyPage() {
  const [showAllServices, setShowAllServices] = useState(false);
  const router = useRouter();

  const services = [
    { name: "Branding", icon: "🎨" },
    { name: "Web Development", icon: "🌐" },
    { name: "App Development", icon: "📱" },
    { name: "SEO", icon: "🔍" },
    { name: "Marketing", icon: "📢" },
    { name: "UI/UX", icon: "✨" },
    { name: "Content Writing", icon: "✍️" },
    { name: "Social Media", icon: "📱" },
    { name: "Graphic Design", icon: "🎨" },
    { name: "Video Editing", icon: "🎬" },
  ];

  const visibleServices = services.slice(0, 6);
  const hiddenServices = services.slice(6);

  const serviceRouteMap = {
    "Web Development": "/web-development",
    "App Development": "/app-development",
    Branding: "/branding",
    SEO: "/seo",
    Marketing: "/marketing",
    "UI/UX": "/ui-ux",
    "Content Writing": "/content-writing",
    "Social Media": "/social-media",
    "Graphic Design": "/graphic-design",
    "Video Editing": "/video-editing",
  };

  useEffect(() => {
    const el = document.getElementById("animatedHeading");
    if (el) {
      requestAnimationFrame(() => {
        el.querySelectorAll(".cta-letter").forEach((s) => s.classList.add("animate"));
      });
    }
  }, []);

  const heading = "Get a Free Quote";
  const words = (() => {
    const parts = heading.split(" ");
    let idx = 0;
    return parts.map((word) => {
      const letters = word.split("").map((ch) => ({ ch, idx: idx++ }));
      return letters;
    });
  })();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-4 bg-gradient-to-b from-gray-50 to-white pt-20">
      <div className="w-full max-w-5xl">
        {/* Heading */}
        <h1
          id="animatedHeading"
          className="relative overflow-hidden flex justify-center flex-wrap gap-1 text-gray-900 cursor-default leading-tight text-3xl sm:text-4xl md:text-5xl mb-2"
          style={{ 
            fontFamily: "var(--font-body)",
            letterSpacing: "-0.01em",
            fontWeight: "500"
          }}
        >
          {words.map((letters, wi) => (
            <span key={`word-${wi}`} className="cta-word" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {letters.map(({ ch, idx }) => (
                <span
                  key={`${ch}-${idx}`}
                  className="cta-letter"
                  style={{
                    ["--i"]: idx,
                    display: "inline-block",
                  }}
                  aria-hidden
                >
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <style>{`
          .cta-letter {
            opacity: 0;
            transform: translateY(10px);
            display: inline-block;
            will-change: transform, opacity;
          }
          .cta-letter.animate {
            animation: ctaIn 400ms cubic-bezier(.2,.9,.2,1) both;
            animation-delay: calc(var(--i) * 35ms);
          }
          @keyframes ctaIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            .cta-letter, .cta-letter.animate {
              animation: none !important;
              transform: none !important;
              opacity: 1 !important;
            }
          }
        `}</style>

        <p className="text-center text-base md:text-lg text-gray-500 mb-5 font-normal">
          Tell us your needs and get a tailored solution for your business.
        </p>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-medium text-sm">
            1
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-500 font-medium text-sm">
            2
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-500 font-medium text-sm">
            3
          </div>
        </div>

        {/* Main Container */}
        <div
          className="bg-white rounded-3xl px-6 py-6 md:px-10 md:py-8 w-full shadow-md border border-gray-200 relative"
          aria-labelledby="services-label"
        >
          {/* Heading */}
          <h2 className="text-xl md:text-2xl text-gray-900 mb-2 text-center font-medium">
            What can we help you with?
          </h2>

          <p className="text-center text-sm md:text-base text-gray-500 mb-6 font-normal">
            Select a service to continue to the next step.
          </p>

          {/* Service Selection */}
          <div className="w-full">
            {/* Services Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-3">
              {visibleServices.map((service) => {
                const route = serviceRouteMap[service.name] ?? "/coming-soon";
                return (
                  <Link
                    key={service.name}
                    href={route}
                    prefetch
                    className="group bg-white hover:bg-blue-50 rounded-2xl px-4 py-4 cursor-pointer transition-all duration-200 border-2 border-gray-200 hover:border-blue-500 flex items-center justify-center"
                    style={{
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors text-sm md:text-base font-medium text-center">
                      {service.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Hidden Services */}
            <div
              className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 transition-all duration-500 ease-in-out overflow-hidden"
              style={{
                maxHeight: showAllServices ? "1000px" : "0",
                opacity: showAllServices ? 1 : 0,
                marginBottom: showAllServices ? "12px" : "0",
              }}
            >
              {hiddenServices.map((service) => {
                const route = serviceRouteMap[service.name] ?? "/coming-soon";
                return (
                  <Link
                    key={service.name}
                    href={route}
                    prefetch
                    className="group bg-white hover:bg-blue-50 rounded-2xl px-4 py-4 cursor-pointer transition-all duration-200 border-2 border-gray-200 hover:border-blue-500 flex items-center justify-center"
                    style={{
                      fontFamily: "var(--font-body)",
                    }}
                    onMouseEnter={() => router.prefetch?.(route)}
                  >
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors text-sm md:text-base font-medium text-center">
                      {service.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Show More Button */}
            <button
              className="mt-5 px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm md:text-base rounded-xl block mx-auto transition-all duration-200 font-medium"
              onClick={() => setShowAllServices(!showAllServices)}
              style={{
                fontFamily: "var(--font-body)",
              }}
            >
              {showAllServices ? "Show Less" : "Show More Services"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}