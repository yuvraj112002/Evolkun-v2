"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useSurvey } from "@/components/survey/SurveyProvider";

export default function EndMessage({ step }) {
  const { reset } = useSurvey();
  const message = step.endMessage;

  if (!message) return null;

  return (
    <div className="survey-screen survey-screen--centered">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="greet-badge survey-screen__badge"
      >
        <Heart size={32} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="survey-screen__content"
      >
        <h1 className="survey-screen__title">{message.title}</h1>
        <p className="survey-screen__subtitle">{message.subtitle}</p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={reset}
        className="survey-cta survey-screen__button"
        type="button"
      >
        Start Over
      </motion.button>
    </div>
  );
}