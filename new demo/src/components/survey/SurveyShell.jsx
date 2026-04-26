"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSurvey } from "@/components/survey/SurveyProvider";
import ProgressHeader from "@/components/survey/ProgressHeader";
import SurveyStep from "@/components/survey/SurveyStep";
import GreetScreen from "@/components/survey/GreetScreen";
import MatchScreen from "@/components/survey/MatchScreen";
import SummaryScreen from "@/components/survey/SummaryScreen";
import EndMessage from "@/components/survey/EndMessage";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function SurveyShell() {
  const { currentStep, state, next, canGoNext } = useSurvey();

  if (!currentStep) return null;

  const showCTA =
    currentStep.type !== "single" &&
    currentStep.type !== "summary" &&
    currentStep.type !== "end-message";

  const renderStep = () => {
    switch (currentStep.type) {
      case "greet":
        return <GreetScreen step={currentStep} />;
      case "match":
        return <MatchScreen />;
      case "summary":
        return <SummaryScreen />;
      case "end-message":
        return <EndMessage step={currentStep} />;
      default:
        return <SurveyStep step={currentStep} />;
    }
  };

  return (
    <section className="survey">
      <div className="survey__shell">
        <ProgressHeader />

        <div className="survey__content">
          <AnimatePresence mode="wait" custom={state.direction}>
            <motion.div
              key={currentStep.id}
              custom={state.direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
              className="survey__slide"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {showCTA && (
          <div className="survey__sticky-cta">
            <div className="survey__sticky-cta-inner">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={next}
                disabled={!canGoNext}
                className="survey-cta"
                aria-label="Continue to next step"
              >
                Continue
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}