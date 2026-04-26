"use client";

import { motion } from "framer-motion";
import { Award, ArrowRight } from "lucide-react";

export default function MatchScreen() {
  return (
    <div className="survey-screen survey-screen--centered survey-screen--match">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.1 }}
        className="survey-match__ring-wrap"
      >
        <div className="match-ring survey-match__ring">
          <div className="survey-match__ring-inner">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Award className="survey-match__icon" />
            </motion.div>
          </div>
        </div>

        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="survey-match__particle"
            style={{
              top: `${20 + Math.sin(i * 1.2) * 50}%`,
              left: `${20 + Math.cos(i * 1.2) * 50}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="survey-screen__content"
      >
        <p className="survey-screen__eyebrow">We've got your match!</p>
        <h1 className="survey-screen__title survey-screen__title--xl">Your Website Plan</h1>
        <p className="survey-screen__subtitle">
          Based on your answers, we&apos;ll craft the best-fit structure, design vibe, and
          execution plan.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="survey-match__hint"
      >
        <span>Continue to see your summary</span>
        <ArrowRight size={16} />
      </motion.div>
    </div>
  );
}