"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { getActiveSteps } from "@/data/surveyConfig";

const STORAGE_KEY = "survey-state";

const SurveyContext = createContext(null);

function loadState() {
  if (typeof window === "undefined") {
    return { answers: {}, currentStepIndex: 0, direction: 1 };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to load survey state:", error);
  }

  return { answers: {}, currentStepIndex: 0, direction: 1 };
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_ANSWER":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.stepId]: action.value,
        },
      };

    case "NEXT":
      return {
        ...state,
        currentStepIndex: state.currentStepIndex + 1,
        direction: 1,
      };

    case "PREV":
      return {
        ...state,
        currentStepIndex: Math.max(0, state.currentStepIndex - 1),
        direction: -1,
      };

    case "GO_TO":
      return {
        ...state,
        currentStepIndex: action.index,
        direction: action.index > state.currentStepIndex ? 1 : -1,
      };

    case "RESET":
      return {
        answers: {},
        currentStepIndex: 0,
        direction: 1,
      };

    case "HYDRATE":
      return action.state;

    default:
      return state;
  }
}

export function SurveyProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const activeSteps = useMemo(() => getActiveSteps(state.answers), [state.answers]);
  const safeIndex = Math.min(state.currentStepIndex, Math.max(activeSteps.length - 1, 0));
  const currentStep = activeSteps[safeIndex] || null;
  const progress = activeSteps.length > 1 ? safeIndex / (activeSteps.length - 1) : 0;

  const canGoNext = useMemo(() => {
    if (!currentStep) return false;
    if (["greet", "match", "end-message"].includes(currentStep.type)) return true;
    if (currentStep.type === "summary") return false;
    if (!currentStep.required) return true;

    const value = state.answers[currentStep.id];

    if (currentStep.type === "multi") {
      return Array.isArray(value) && value.length > 0;
    }

    return !!value && String(value).trim() !== "";
  }, [currentStep, state.answers]);

  const setAnswer = useCallback((stepId, value) => {
    dispatch({ type: "SET_ANSWER", stepId, value });
  }, []);

  const next = useCallback(() => dispatch({ type: "NEXT" }), []);
  const prev = useCallback(() => dispatch({ type: "PREV" }), []);
  const goTo = useCallback((index) => dispatch({ type: "GO_TO", index }), []);

  const reset = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    dispatch({ type: "RESET" });
  }, []);

  const value = {
    state: { ...state, currentStepIndex: safeIndex },
    activeSteps,
    currentStep,
    progress,
    setAnswer,
    next,
    prev,
    goTo,
    canGoNext,
    isFirst: safeIndex === 0,
    isLast: safeIndex === activeSteps.length - 1,
    reset,
  };

  return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>;
}

export function useSurvey() {
  const context = useContext(SurveyContext);

  if (!context) {
    throw new Error("useSurvey must be used within SurveyProvider");
  }

  return context;
}