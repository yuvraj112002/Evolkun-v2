"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useSurvey } from "@/components/survey/SurveyProvider";

export default function ProgressHeader() {
  const { progress, isFirst, prev, currentStep } = useSurvey();

  if (!currentStep || currentStep.type === "summary") return null;

  const totalSections = 5;
  const currentSection = currentStep.section;

  return (
    <div className="survey-progress">
      <div className="survey-progress__inner">
        {!isFirst && (
          <button
            onClick={prev}
            className="survey-progress__back"
            aria-label="Go back"
            type="button"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div className="survey-progress__track-group">
          {Array.from({ length: totalSections }).map((_, index) => (
            <div key={index} className="survey-progress__segment">
              <div className="survey-progress__track">
                <motion.div
                  className="survey-progress__fill"
                  initial={{ width: "0%" }}
                  animate={{
                    width:
                      index + 1 < currentSection
                        ? "100%"
                        : index + 1 === currentSection
                        ? `${Math.max(10, progress * 100)}%`
                        : "0%",
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>

              <motion.div
                className={`survey-progress__dot ${
                  index + 1 <= currentSection ? "is-active" : ""
                }`}
                animate={{ scale: index + 1 === currentSection ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}