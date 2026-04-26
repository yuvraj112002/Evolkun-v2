"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useSurvey } from "@/components/survey/SurveyProvider";

export default function GreetScreen({ step }) {
  const { state } = useSurvey();
  const content = step.greetContent?.(state.answers);

  if (!content) return null;

  return (
    <div className="survey-screen survey-screen--centered">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
        className="greet-badge survey-screen__badge survey-screen__badge--large"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles size={40} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="survey-screen__content"
      >
        <h1 className="survey-screen__title">{content.title}</h1>
        <p className="survey-screen__subtitle">{content.subtitle}</p>
      </motion.div>
    </div>
  );
}