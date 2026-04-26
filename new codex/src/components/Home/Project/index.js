import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

function CaseStudiesShowcase({ caseStudiesList }) {
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalImages, setModalImages] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDescIdx, setOpenDescIdx] = useState(null);

  const horizontalContainerRef = useRef(null);
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastFocusedElRef = useRef(null);
  const scrollYRef = useRef(0);

  const defaultCaseStudies = [
    {
      title: "E-commerce Platform",
      image: "https://picsum.photos/625/410?random=1",
      images: [
        "https://picsum.photos/1200/800?random=11",
        "https://picsum.photos/1200/800?random=12",
        "https://picsum.photos/1200/800?random=13",
        "https://picsum.photos/1200/800?random=14",
      ],
      points: [
        "Custom checkout & coupons",
        "Analytics dashboard for sales",
        "Multi-currency support",
        "Role-based admin access",
      ],
    },
    {
      title: "Mobile Banking App",
      image: "https://picsum.photos/625/410?random=2",
      images: [
        "https://picsum.photos/1200/800?random=21",
        "https://picsum.photos/1200/800?random=22",
        "https://picsum.photos/1200/800?random=23",
      ],
      points: [
        "UPI transfers & bill pay",
        "Realtime balance & statements",
        "Card controls & limits",
        "Biometric login",
      ],
    },
    {
      title: "Healthcare Dashboard",
      image: "https://picsum.photos/625/410?random=3",
      images: [
        "https://picsum.photos/1200/800?random=31",
        "https://picsum.photos/1200/800?random=32",
        "https://picsum.photos/1200/800?random=33",
        "https://picsum.photos/1200/800?random=34",
        "https://picsum.photos/1200/800?random=35",
      ],
      points: [
        "Vitals & lab results in one view",
        "Role-based access for clinicians",
        "Alerting & escalations",
        "FHIR-ready APIs",
      ],
    },
    {
      title: "Real Estate Portal",
      image: "https://picsum.photos/625/410?random=4",
      images: [
        "https://picsum.photos/1200/800?random=41",
        "https://picsum.photos/1200/800?random=42",
        "https://picsum.photos/1200/800?random=43",
      ],
      points: [
        "Map search with filters",
        "Lead capture & broker CRM",
        "Property media galleries",
        "Saved searches & alerts",
      ],
    },
  ];

  const cases = caseStudiesList || defaultCaseStudies;

  const toggleDesc = (i) => setOpenDescIdx((prev) => (prev === i ? null : i));

  const navigateImages = useCallback(
    (direction) => {
      setActiveIndex((prev) => {
        const len = modalImages.length || 1;
        let next = prev + direction;
        if (next < 0) next = len - 1;
        if (next >= len) next = 0;
        return next;
      });
    },
    [modalImages.length]
  );

  const handleImageClick = (caso) => {
    lastFocusedElRef.current = document.activeElement;
    setSelectedProject(caso);
    setModalImages(caso.images || [caso.image]);
    setActiveIndex(0);
    setShowModal(true);
  };

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  // ✅ LOCK BACKGROUND (Lenis-safe)
  useEffect(() => {
    if (!showModal) {
      // restore native scroll position
      const y = scrollYRef.current || 0;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overscrollBehavior = "";

      window.scrollTo(0, y);

      // ✅ resume lenis
      if (typeof window !== "undefined" && window.__lenis?.start) {
        window.__lenis.start();
      }

      // restore focus
      const last = lastFocusedElRef.current;
      if (last && last.focus) last.focus();

      return;
    }

    // ✅ stop lenis
    if (typeof window !== "undefined" && window.__lenis?.stop) {
      window.__lenis.stop();
    }

    scrollYRef.current = window.scrollY || window.pageYOffset || 0;

    // lock body
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.documentElement.style.overscrollBehavior = "none";

    // focus close button for accessibility
    requestAnimationFrame(() => closeBtnRef.current?.focus?.());
  }, [showModal]);

  // Prevent scroll events on overlay bubbling
  useEffect(() => {
    if (!showModal) return;
    const el = overlayRef.current;
    if (!el) return;

    const stop = (e) => e.preventDefault();
    el.addEventListener("wheel", stop, { passive: false });
    el.addEventListener("touchmove", stop, { passive: false });
    return () => {
      el.removeEventListener("wheel", stop);
      el.removeEventListener("touchmove", stop);
    };
  }, [showModal]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showModal) return;

      if (e.key === "Escape") handleCloseModal();
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") navigateImages(-1);
      else if (e.key === "ArrowRight" || e.key === "ArrowDown")
        navigateImages(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showModal, handleCloseModal, navigateImages]);

  // Center active image in horizontal strip
  useEffect(() => {
    const container = horizontalContainerRef.current;
    if (!container) return;
    const target = container.children[activeIndex];
    if (!target) return;

    const containerWidth = container.offsetWidth;
    const targetWidth = target.offsetWidth;
    const targetScrollLeft =
      target.offsetLeft - containerWidth / 2 + targetWidth / 2;

    container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
  }, [activeIndex]);

  // Wheel: vertical intent -> next/prev
  useEffect(() => {
    if (!showModal) return;
    const el = horizontalContainerRef.current;
    if (!el) return;

    let accum = 0;
    const THRESHOLD = 80;
    let locked = false;
    const COOLDOWN = 250;

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      if (locked) return;

      accum += e.deltaY;

      if (accum > THRESHOLD) {
        navigateImages(1);
        accum = 0;
        locked = true;
        setTimeout(() => (locked = false), COOLDOWN);
      } else if (accum < -THRESHOLD) {
        navigateImages(-1);
        accum = 0;
        locked = true;
        setTimeout(() => (locked = false), COOLDOWN);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [showModal, navigateImages]);

  return (
    <>
      <section id="casos-estudio">
        <div className="2xl:py-20 py-11 flex justify-center items-center">
          <div className="container">
            <div className="flex flex-col p-[1rem] justify-center items-center gap-10">
              <div className="max-w-3xl text-center">
                <h1 className="text-[3rem] md:text-[4rem] font-bold text-black">
                  Our Projects
                </h1>
                <p className="mt-3 text-black/60">
                  Real builds. Real outcomes. Tap a project to preview the work.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-x-6 gap-y-8 p-4">
                {cases?.map((caso, index) => (
                  <div
                    key={index}
                    className="group flex flex-col gap-6 cursor-pointer transform transition-transform duration-300 hover:scale-[1.01]"
                    onClick={() => handleImageClick(caso)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && handleImageClick(caso)}
                  >
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={caso.image}
                        alt={caso.title}
                        className="w-full h-[410px] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center text-white">
                          <ArrowUpRight className="w-12 h-12 mx-auto mb-2" />
                          <p className="text-sm font-medium">
                            {caso.images
                              ? `${caso.images.length} images`
                              : "View Project"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-3 sm:gap-4">
                      <h5 className="text-lg sm:text-xl font-semibold group-hover:text-[var(--color-primary)] transition-colors duration-300">
                        {caso.title}
                      </h5>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDesc(index);
                        }}
                        aria-expanded={openDescIdx === index}
                        aria-controls={`details-${index}`}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-900 hover:text-white transition-colors"
                      >
                        {openDescIdx === index ? "Hide details" : "View details"}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openDescIdx === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div
                        id={`details-${index}`}
                        onClick={(e) => e.stopPropagation()}
                        className={`w-full overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-in-out ${
                          openDescIdx === index
                            ? "max-h-64 opacity-100 mt-2"
                            : "max-h-0 opacity-0 mt-0"
                        }`}
                      >
                        <div className="w-full rounded-xl bg-gray-50 ring-1 ring-gray-200 p-3 sm:p-4">
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2 text-[13px] sm:text-sm text-gray-700">
                            {caso.points?.map((point, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 mt-[2px] shrink-0 text-emerald-500" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 👇 NEW mini CTA inside section */}
              <div className="w-full max-w-4xl rounded-2xl border border-black/10 bg-white p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-black/50">
                    WANT A BUILD LIKE THIS?
                  </p>
                  <h3 className="mt-2 text-xl md:text-2xl font-semibold text-black">
                    Answer 6 questions — get a clear build direction.
                  </h3>
                  <p className="mt-2 text-black/60 text-sm">
                    Scope, features, platform, and timeline — mapped in minutes.
                  </p>
                </div>
                <a
                  href="/survey"
                  className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm text-white hover:bg-black/90 transition"
                >
                  Start the survey <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[1111] animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject?.title || "Project preview"}
        >
          <div
            ref={overlayRef}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            onClick={handleCloseModal}
          />

          <div className="relative w-full h-full flex flex-col justify-center items-center p-4 md:p-8">
            <div className="absolute top-4 md:top-2 left-4 md:left-8 right-4 md:right-8 z-50 flex justify-between items-center">
              <div className="text-white text-left max-w-[80%]">
                <h2 className="text-2xl md:text-3xl font-bold mb-1 truncate">
                  {selectedProject?.title}
                </h2>
                <p className="text-white/70 text-sm">
                  Use mouse wheel (vertical) or arrows to navigate
                </p>
              </div>

              <button
                ref={closeBtnRef}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-200"
                onClick={handleCloseModal}
                aria-label="Close"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {modalImages.length > 1 && (
              <>
                <button
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-200"
                  onClick={() => navigateImages(-1)}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                <button
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-200"
                  onClick={() => navigateImages(1)}
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            <div
              ref={horizontalContainerRef}
              className="flex items-center overflow-x-scroll overflow-y-hidden scrollbar-hide snap-x snap-mandatory h-full w-full overscroll-contain"
            >
              {modalImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 snap-center w-full h-full flex items-center justify-center p-4 md:p-8"
                  style={{ minWidth: "100%" }}
                >
                  <img
                    src={image}
                    alt={`${selectedProject?.title || "Project"} - Image ${
                      index + 1
                    }`}
                    loading="eager"
                    className={`w-full max-h-[90vh] object-contain rounded-xl shadow-2xl transition-all duration-500 ease-out ${
                      index === activeIndex
                        ? "scale-100 opacity-100"
                        : "scale-95 opacity-80"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          <style jsx>{`
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .overscroll-contain {
              overscroll-behavior: contain;
              touch-action: pan-x pan-y;
            }
          `}</style>
        </div>
      )}
    </>
  );
}

export default CaseStudiesShowcase;
