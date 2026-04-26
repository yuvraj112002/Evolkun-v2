"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function GsapTypewriter({
  texts = [],
  typeMs = 50,     // typing speed in ms per char
  deleteMs = 20,   // delete speed in ms per char
  holdMs = 2000,   // pause after full word
  className = "",
}) {
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    // StrictMode protection (dev runs effects twice)
    if (mountedRef.current) return;
    mountedRef.current = true;

    if (!textRef.current) return;
    if (!Array.isArray(texts) || texts.length === 0) {
      textRef.current.textContent = "";
      return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let mode = "typing"; // typing | holding | deleting
    let timeoutId = null;

    const setText = (val) => {
      if (textRef.current) textRef.current.textContent = val;
    };

    // ✅ Ensure it NEVER starts empty
    setText(texts[0].slice(0, 1));

    const step = () => {
      const word = texts[wordIndex % texts.length] || "";

      if (mode === "typing") {
        charIndex = Math.min(charIndex + 1, word.length);
        setText(word.slice(0, charIndex));

        if (charIndex >= word.length) {
          mode = "holding";
          timeoutId = setTimeout(step, holdMs);
          return;
        }

        timeoutId = setTimeout(step, typeMs);
        return;
      }

      if (mode === "holding") {
        mode = "deleting";
        timeoutId = setTimeout(step, deleteMs);
        return;
      }

      // deleting
      charIndex = Math.max(charIndex - 1, 0);
      setText(word.slice(0, charIndex));

      if (charIndex <= 0) {
        wordIndex += 1;
        mode = "typing";
        timeoutId = setTimeout(step, typeMs);
        return;
      }

      timeoutId = setTimeout(step, deleteMs);
    };

    // start properly
    charIndex = 1;
    timeoutId = setTimeout(step, typeMs);

    // cursor blink (no React state)
    const cursorTween = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      cursorTween.kill();
      mountedRef.current = false;
    };
  }, [texts, typeMs, deleteMs, holdMs]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span ref={textRef} />
      <span ref={cursorRef} className="ml-1">
        |
      </span>
    </span>
  );
}
