"use client";

import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Maximize2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useSurvey } from "@/components/survey/SurveyProvider";
import OptionCard from "@/components/survey/OptionCard";

function Headline({ question, highlights = [] }) {
  const parsedParts = useMemo(() => {
    if (!highlights?.length) return [{ text: question, highlight: false }];

    const parts = [];
    let remaining = question;

    for (const highlight of highlights) {
      const index = remaining.toLowerCase().indexOf(highlight.toLowerCase());

      if (index >= 0) {
        if (index > 0) {
          parts.push({ text: remaining.slice(0, index), highlight: false });
        }

        parts.push({
          text: remaining.slice(index, index + highlight.length),
          highlight: true,
        });

        remaining = remaining.slice(index + highlight.length);
      }
    }

    if (remaining) {
      parts.push({ text: remaining, highlight: false });
    }

    return parts.length ? parts : [{ text: question, highlight: false }];
  }, [question, highlights]);

  return (
    <h1 className="survey-step__title">
      {parsedParts.map((part, index) =>
        part.highlight ? (
          <span key={index} className="survey-highlight">
            {part.text}
          </span>
        ) : (
          <span key={index}>{part.text}</span>
        )
      )}
    </h1>
  );
}

export default function SurveyStep({ step }) {
  const { state, setAnswer, next } = useSurvey();
  const value = state.answers[step.id];

  const [isRecording, setIsRecording] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [direction, setDirection] = useState(0);

  const recognitionRef = useRef(null);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const hasSpeechRecognition =
    typeof window !== "undefined" &&
    ("webkitSpeechRecognition" in window || "SpeechRecognition" in window);

  const handleSingleSelect = (optionId) => {
    setAnswer(step.id, optionId);
    setTimeout(() => next(), 300);
  };

  const handleMultiSelect = (optionId) => {
    const current = Array.isArray(value) ? [...value] : [];
    const index = current.indexOf(optionId);

    if (index >= 0) {
      current.splice(index, 1);
    } else if (!step.maxSelect || current.length < step.maxSelect) {
      current.push(optionId);
    }

    setAnswer(step.id, current);
  };

  const toggleVoice = useCallback(() => {
    if (!hasSpeechRecognition) return;

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      setAnswer(step.id, `${value || ""} ${transcript}`.trim());
      setIsRecording(false);
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }, [hasSpeechRecognition, isRecording, setAnswer, step.id, value]);

  // Carousel functions
  const scrollToIndex = useCallback((index) => {
    if (!carouselRef.current || !step.options?.length) return;

    const container = carouselRef.current;
    const containerWidth = container.offsetWidth;
    const targetScroll = index * containerWidth;

    setDirection(index > currentIndex ? 1 : -1);

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
    setCurrentIndex(index);
  }, [currentIndex, step.options?.length]);

  const nextSlide = useCallback(() => {
    if (currentIndex < (step.options?.length || 0) - 1) {
      scrollToIndex(currentIndex + 1);
    }
  }, [currentIndex, step.options?.length, scrollToIndex]);

  const prevSlide = useCallback(() => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  }, [currentIndex, scrollToIndex]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left
      nextSlide();
    } else if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right
      prevSlide();
    }
  };

  // Update current index based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current || !step.options?.length) return;

      const container = carouselRef.current;
      const containerWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;
      const index = Math.round(scrollLeft / containerWidth);

      setCurrentIndex(Math.max(0, Math.min(index, step.options.length - 1)));
    };

    const container = carouselRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [step.options?.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (step.id === "design-vibe") {
        if (e.key === "ArrowLeft") {
          prevSlide();
        } else if (e.key === "ArrowRight") {
          nextSlide();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step.id, prevSlide, nextSlide]);

  const isDesignCarousel = step.id === "design-vibe";

  return (
    <>
      <div className={`survey-step ${isDesignCarousel ? "survey-step--design" : ""}`}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="survey-step__header"
        >
          <Headline question={step.question || ""} highlights={step.highlights} />

          {step.subtitle && (
            <p className="survey-step__subtitle">{step.subtitle}</p>
          )}

          {(step.type === "single" || step.type === "multi") && (
            <>
              <div className="survey-step__helper">
                {step.type === "single"
                  ? "Select one option"
                  : "Select all that apply"}
              </div>
              <div className="survey-step__divider" />
            </>
          )}
        </motion.div>

        {(step.type === "text" || step.type === "url") && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <input
              type={step.type === "url" ? "url" : "text"}
              value={value || ""}
              onChange={(event) => setAnswer(step.id, event.target.value)}
              placeholder={step.placeholder}
              className="survey-field"
              autoFocus
              aria-label={step.question}
            />
          </motion.div>
        )}

        {step.type === "textarea" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="survey-textarea-wrap"
          >
            <textarea
              value={value || ""}
              onChange={(event) => setAnswer(step.id, event.target.value)}
              placeholder={step.placeholder}
              rows={4}
              className="survey-field survey-field--textarea"
              aria-label={step.question}
            />

            {hasSpeechRecognition && (
              <button
                type="button"
                onClick={toggleVoice}
                className={`survey-voice-btn ${isRecording ? "is-recording" : ""}`}
                aria-label={isRecording ? "Stop recording" : "Start voice input"}
              >
                <Mic size={16} />
              </button>
            )}
          </motion.div>
        )}

        {step.type === "single" && isDesignCarousel && (
          <div className="design-carousel">
            {/* Main Carousel */}
            <div
              className="design-carousel__stage"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                ref={carouselRef}
                className="design-carousel__track"
                role="listbox"
                data-lenis-prevent
              >
                {step.options?.map((option, index) => {
                  const selected = value === option.id;
                  const isActive = index === currentIndex;

                  return (
                    <motion.div
                      key={option.id}
                      className={`design-carousel__slide ${selected ? "design-carousel__slide--selected" : ""
                        } ${isActive ? "design-carousel__slide--active" : ""}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.05,
                        ease: [0.2, 0, 0, 1]
                      }}
                    >
                      <div className="design-carousel__card">
                        {/* Media Section */}
                        <div className="design-carousel__media">
                          {option.mediaType === "video" && option.mediaSrc ? (
                            <video
                              className="design-carousel__video"
                              src={option.mediaSrc}
                              poster={option.poster}
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="metadata"
                            />
                          ) : option.mediaSrc ? (
                            <img
                              className="design-carousel__image"
                              src={option.mediaSrc}
                              alt={option.label}
                              loading="lazy"
                            />
                          ) : (
                            <div className="design-carousel__fallback">
                              <Sparkles size={48} />
                            </div>
                          )}

                          {/* Selection Badge */}
                          <motion.div
                            className="design-carousel__check"
                            initial={false}
                            animate={{
                              scale: selected ? 1 : 0,
                              rotate: selected ? 0 : -10,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <Check size={20} />
                          </motion.div>

                          {/* Preview Button */}
                          <motion.button
                            type="button"
                            className="design-carousel__preview"
                            onClick={() => setPreviewItem(option)}
                            aria-label={`Preview ${option.label}`}
                            initial={false}
                            animate={{
                              opacity: isActive ? 1 : 0.88,
                              y: 0,
                            }}
                            transition={{ duration: 0.2 }}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.96 }}
                          >
                            <Maximize2 size={18} />
                          </motion.button>

                          {/* Gradient Overlay */}
                          <div className="design-carousel__overlay" />
                        </div>

                        {/* Content Section */}
                        <div className="design-carousel__content">
                          <h3 className="design-carousel__title">
                            {option.label}
                          </h3>
                          {option.description && (
                            <p className="design-carousel__description">
                              {option.description}
                            </p>
                          )}

                          {/* Select Button */}
                          <motion.button
                            type="button"
                            className={`design-carousel__select-btn ${selected ? 'design-carousel__select-btn--selected' : ''
                              }`}
                            onClick={() => handleSingleSelect(option.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span>{selected ? 'Selected' : 'Select this style'}</span>
                            <ArrowRight size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Controls */}
            {step.options && step.options.length > 1 && (
              <>
                {/* Progress Bar */}
                <div className="design-carousel__progress">
                  <div className="design-carousel__progress-bar">
                    <motion.div
                      className="design-carousel__progress-fill"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((currentIndex + 1) / step.options.length) * 100}%`
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <span className="design-carousel__progress-text">
                    {currentIndex + 1} / {step.options.length}
                  </span>
                </div>

                {/* Navigation Dots */}
                <div className="design-carousel__dots" role="tablist">
                  {step.options.map((option, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      className={`design-carousel__dot ${index === currentIndex ? 'active' : ''}`}
                      onClick={() => scrollToIndex(index)}
                      aria-label={`Go to ${option.label}`}
                      aria-selected={index === currentIndex}
                      role="tab"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      initial={false}
                      animate={{
                        width: index === currentIndex ? 32 : 8,
                        backgroundColor: index === currentIndex
                          ? 'var(--survey-primary)'
                          : 'rgba(122, 89, 231, 0.2)',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>

                {/* Arrow Navigation */}
                <div className="design-carousel__arrows">
                  <motion.button
                    type="button"
                    className="design-carousel__arrow"
                    onClick={prevSlide}
                    aria-label="Previous design"
                    disabled={currentIndex === 0}
                    whileHover={{ scale: 1.1, backgroundColor: 'var(--survey-primary)', color: 'white' }}
                    whileTap={{ scale: 0.95 }}
                    initial={false}
                    animate={{
                      opacity: currentIndex === 0 ? 0.5 : 1,
                    }}
                  >
                    <ChevronLeft size={24} />
                  </motion.button>

                  <motion.button
                    type="button"
                    className="design-carousel__arrow"
                    onClick={nextSlide}
                    aria-label="Next design"
                    disabled={currentIndex === step.options.length - 1}
                    whileHover={{ scale: 1.1, backgroundColor: 'var(--survey-primary)', color: 'white' }}
                    whileTap={{ scale: 0.95 }}
                    initial={false}
                    animate={{
                      opacity: currentIndex === step.options.length - 1 ? 0.5 : 1,
                    }}
                  >
                    <ChevronRight size={24} />
                  </motion.button>
                </div>
              </>
            )}
          </div>
        )}

        {step.type === "single" && !isDesignCarousel && (
          <div className="survey-options" role="listbox" data-lenis-prevent>
            {step.options?.map((option, index) => (
              <OptionCard
                key={option.id}
                icon={option.icon}
                label={option.label}
                description={option.description}
                selected={value === option.id}
                onClick={() => handleSingleSelect(option.id)}
                index={index}
              />
            ))}
          </div>
        )}

        {step.type === "multi" && (
          <div
            className="survey-options"
            role="listbox"
            aria-multiselectable="true"
            data-lenis-prevent
          >
            {step.options?.map((option, index) => (
              <OptionCard
                key={option.id}
                icon={option.icon}
                label={option.label}
                description={option.description}
                selected={Array.isArray(value) && value.includes(option.id)}
                onClick={() => handleMultiSelect(option.id)}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewItem && (
          <motion.div
            className="design-preview-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewItem(null)}
          >
            <motion.div
              className="design-preview-modal__dialog"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                duration: 0.4,
                ease: [0.2, 0, 0, 1]
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="design-preview-modal__close"
                onClick={() => setPreviewItem(null)}
                aria-label="Close preview"
              >
                <X size={20} />
              </button>

              <div className="design-preview-modal__media">
                {previewItem.mediaType === "video" && previewItem.mediaSrc ? (
                  <video
                    className="design-preview-modal__video"
                    src={previewItem.mediaSrc}
                    poster={previewItem.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                  />
                ) : previewItem.mediaSrc ? (
                  <img
                    className="design-preview-modal__image"
                    src={previewItem.mediaSrc}
                    alt={previewItem.label}
                  />
                ) : null}
              </div>

              <div className="design-preview-modal__content">
                <h2 className="design-preview-modal__title">
                  {previewItem.label}
                </h2>
                {previewItem.description && (
                  <p className="design-preview-modal__description">
                    {previewItem.description}
                  </p>
                )}

                <motion.button
                  type="button"
                  className="design-preview-modal__select"
                  onClick={() => {
                    handleSingleSelect(previewItem.id);
                    setPreviewItem(null);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Select this style
                  <ArrowRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}