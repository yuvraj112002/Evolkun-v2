import React, { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from 'react';
import { getActiveSteps, type SurveyStep } from '@/lib/lovable-survey/surveyConfig';

interface SurveyState {
  answers: Record<string, any>;
  currentStepIndex: number;
  direction: number; // 1 = forward, -1 = backward
}

type Action =
  | { type: 'SET_ANSWER'; stepId: string; value: any }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'GO_TO'; index: number }
  | { type: 'RESET' }
  | { type: 'HYDRATE'; state: SurveyState };

const STORAGE_KEY = 'survey-state';

function loadState(): SurveyState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { answers: {}, currentStepIndex: 0, direction: 1 };
}

function reducer(state: SurveyState, action: Action): SurveyState {
  switch (action.type) {
    case 'SET_ANSWER':
      return { ...state, answers: { ...state.answers, [action.stepId]: action.value } };
    case 'NEXT':
      return { ...state, currentStepIndex: state.currentStepIndex + 1, direction: 1 };
    case 'PREV':
      return { ...state, currentStepIndex: Math.max(0, state.currentStepIndex - 1), direction: -1 };
    case 'GO_TO':
      return { ...state, currentStepIndex: action.index, direction: action.index > state.currentStepIndex ? 1 : -1 };
    case 'RESET':
      return { answers: {}, currentStepIndex: 0, direction: 1 };
    case 'HYDRATE':
      return action.state;
    default:
      return state;
  }
}

interface SurveyContextValue {
  state: SurveyState;
  activeSteps: SurveyStep[];
  currentStep: SurveyStep | null;
  progress: number;
  setAnswer: (stepId: string, value: any) => void;
  next: () => void;
  prev: () => void;
  canGoNext: boolean;
  isFirst: boolean;
  isLast: boolean;
  reset: () => void;
}

const SurveyContext = createContext<SurveyContextValue | null>(null);

export function SurveyProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const activeSteps = useMemo(() => getActiveSteps(state.answers), [state.answers]);
  const safeIndex = Math.min(state.currentStepIndex, activeSteps.length - 1);
  const currentStep = activeSteps[safeIndex] || null;
  const progress = activeSteps.length > 1 ? safeIndex / (activeSteps.length - 1) : 0;

  const canGoNext = useMemo(() => {
    if (!currentStep) return false;
    if (currentStep.type === 'greet' || currentStep.type === 'match' || currentStep.type === 'end-message') return true;
    if (currentStep.type === 'summary') return false;
    if (!currentStep.required) return true;
    const val = state.answers[currentStep.id];
    if (currentStep.type === 'multi') return Array.isArray(val) && val.length > 0;
    return !!val && String(val).trim() !== '';
  }, [currentStep, state.answers]);

  const setAnswer = useCallback((stepId: string, value: any) => {
    dispatch({ type: 'SET_ANSWER', stepId, value });
  }, []);

  const next = useCallback(() => dispatch({ type: 'NEXT' }), []);
  const prev = useCallback(() => dispatch({ type: 'PREV' }), []);
  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: 'RESET' });
  }, []);

  const value: SurveyContextValue = {
    state: { ...state, currentStepIndex: safeIndex },
    activeSteps,
    currentStep,
    progress,
    setAnswer,
    next,
    prev,
    canGoNext,
    isFirst: safeIndex === 0,
    isLast: safeIndex === activeSteps.length - 1,
    reset,
  };

  return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>;
}

export function useSurvey() {
  const ctx = useContext(SurveyContext);
  if (!ctx) throw new Error('useSurvey must be used within SurveyProvider');
  return ctx;
}
