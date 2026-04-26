"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function OptionCard({
  icon,
  label,
  description,
  selected,
  onClick,
  index,
  mediaType,
  mediaSrc,
  poster,
  layout = "default",
}) {
  const isMediaCard = layout === "media";

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      onClick={onClick}
      className={`survey-card ${selected ? "survey-card--selected" : ""} ${
        isMediaCard ? "survey-card--media" : ""
      }`}
      whileTap={{ scale: 0.98 }}
      aria-pressed={selected}
      role="option"
    >
      {isMediaCard ? (
        <>
          <div className="survey-card__media">
            {mediaType === "video" && mediaSrc ? (
              <video
                className="survey-card__media-el"
                src={mediaSrc}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : mediaSrc ? (
              <img
                className="survey-card__media-el"
                src={mediaSrc}
                alt={label}
                loading="lazy"
              />
            ) : (
              <div className="survey-card__media-placeholder">{icon || "✦"}</div>
            )}
          </div>

          <div className="survey-card__body">
            <span className="survey-card__label">{label}</span>
            {description && <p className="survey-card__description">{description}</p>}
          </div>

          <motion.div
            initial={false}
            animate={{ scale: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="survey-card__check survey-card__check--floating"
          >
            <Check size={14} />
          </motion.div>
        </>
      ) : (
        <>
          {icon && <span className="survey-card__icon">{icon}</span>}

          <div className="survey-card__body">
            <span className="survey-card__label">{label}</span>
            {description && <p className="survey-card__description">{description}</p>}
          </div>

          <motion.div
            initial={false}
            animate={{ scale: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="survey-card__check"
          >
            <Check size={14} />
          </motion.div>
        </>
      )}
    </motion.button>
  );
}