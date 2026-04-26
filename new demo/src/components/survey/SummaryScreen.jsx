"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Layers3, Workflow, CalendarDays, ArrowRight, RotateCcw, AlertTriangle } from "lucide-react";
import { useSurvey } from "@/components/survey/SurveyProvider";

const iconMap = {
  "Project Stage": Layers3,
  "Creative Direction": Workflow,
  "Top Priority": Sparkles,
  "Decision Window": CalendarDays,
};

export default function SummaryScreen() {
  const { state, next, reset } = useSurvey();
  const { answers } = state;

  const [loading, setLoading] = useState(true);
  const [brief, setBrief] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function generateBrief() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/project-brief", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answers }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data?.error || "Failed to generate project brief");
        }

        if (!ignore) {
          setBrief(data.brief);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Something went wrong while generating the brief.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    generateBrief();

    return () => {
      ignore = true;
    };
  }, [answers]);

  if (loading) {
    return (
      <div className="project-brief">
        <div className="project-brief__loading">
          <div className="project-brief__loading-spinner" />
          <h2>Generating your project brief...</h2>
          <p>Our AI is analyzing your answers and preparing a cleaner overview.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-brief">
        <div className="project-brief__error-card">
          <AlertTriangle size={22} />
          <h3>We couldn’t generate your brief</h3>
          <p>{error}</p>
          <button type="button" className="survey-cta" onClick={reset}>
            Start Again
          </button>
        </div>
      </div>
    );
  }

  if (brief && brief.valid === false) {
    return (
      <div className="project-brief">
        <motion.div
          className="project-brief__error-card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <AlertTriangle size={24} />
          <h3>Please review your details</h3>
          <p>
            {brief.reason ||
              "Some of your selections look unclear or inconsistent. Please fill the form again more clearly."}
          </p>

          <div className="project-brief__error-actions">
            <button type="button" className="survey-cta" onClick={reset}>
              Start Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="project-brief">
      <motion.div
        className="project-brief__hero"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="project-brief__eyebrow">
          <Sparkles size={14} />
          <span>AI Project Brief</span>
        </div>

        <h1 className="project-brief__title">
          {brief?.title || "Your Project Brief is Ready"}
        </h1>

        <p className="project-brief__subtitle">
          {brief?.subtitle ||
            "We analyzed your responses and prepared a structured overview for your consultation."}
        </p>
      </motion.div>

      <motion.div
        className="project-brief__main-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.45 }}
      >
        <div className="project-brief__card-top">
          <div>
            <p className="project-brief__mini-label">Project Overview</p>
            <h2 className="project-brief__card-title">
              A clear direction based on your submitted requirements
            </h2>
          </div>

          <div className="project-brief__badge">
            <span>Prepared for consultation</span>
          </div>
        </div>

        <div className="project-brief__narrative">
          {(brief?.narrative || []).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {brief?.highlight && (
          <div className="project-brief__highlight-note">
            <span>{brief.highlight}</span>
          </div>
        )}
      </motion.div>

      <motion.div
        className="project-brief__insights"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14, duration: 0.45 }}
      >
        {(brief?.insights || []).map((item, index) => {
          const Icon = iconMap[item.label] || Sparkles;

          return (
            <div className="project-brief__insight-card" key={index}>
              <div className="project-brief__insight-icon">
                <Icon size={18} />
              </div>
              <div className="project-brief__insight-content">
                <div className="project-brief__insight-label">{item.label}</div>
                <div className="project-brief__insight-value">{item.value}</div>
              </div>
            </div>
          );
        })}
      </motion.div>

      <motion.div
        className="project-brief__cta-block"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.45 }}
      >
        <div className="project-brief__cta-copy">
          <h3>Discuss this brief with our team</h3>
          <p>
            The next step is a short consultation call so we can validate your
            requirements and prepare the right project plan.
          </p>
        </div>

        <button type="button" className="survey-cta project-brief__cta-btn" onClick={next}>
          <span>Schedule Consultation</span>
          <ArrowRight size={18} />
        </button>

        <button type="button" className="project-brief__ghost-btn" onClick={reset}>
          <RotateCcw size={16} />
          <span>Start Again</span>
        </button>
      </motion.div>
    </div>
  );
}