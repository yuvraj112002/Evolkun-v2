"use client";

import "@/styles/survey/survey.scss";
import { SurveyProvider } from "@/components/survey/SurveyProvider";
import SurveyShell from "@/components/survey/SurveyShell";

export default function WebDevelopmentPage() {
  return (
    <div className="evk-survey-page">
      <div className="evk-survey-bg">
        <div className="evk-survey-bg__mesh" />
        <div className="evk-survey-bg__orb evk-survey-bg__orb--one" />
        <div className="evk-survey-bg__orb evk-survey-bg__orb--two" />
        <div className="evk-survey-bg__orb evk-survey-bg__orb--three" />
        <div className="evk-survey-bg__stars" />
        <div className="evk-survey-bg__grid" />
      </div>

      <div className="evk-survey-page__side evk-survey-page__side--left">
        <div className="survey-side-card">
          <div className="survey-side-card__label">AI Guided Flow</div>
          <div className="survey-side-card__title">Smarter project discovery</div>
          <div className="survey-side-card__text">
            Answer a few questions and turn raw ideas into a clear development brief.
          </div>
        </div>
      </div>

      <div className="evk-survey-page__side evk-survey-page__side--right">
        <div className="survey-orbit">
          <div className="survey-orbit__ring survey-orbit__ring--one" />
          <div className="survey-orbit__ring survey-orbit__ring--two" />
          <div className="survey-orbit__planet survey-orbit__planet--one" />
          <div className="survey-orbit__planet survey-orbit__planet--two" />
          <div className="survey-orbit__core" />
        </div>
      </div>

      <div className="evk-survey-page__content">
        <SurveyProvider>
          <SurveyShell />
        </SurveyProvider>
      </div>
    </div>
  );
}