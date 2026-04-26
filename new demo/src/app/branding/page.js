"use client";
import { useState, useRef, useEffect } from "react";
import styles from "@/styles/modules/main.module.scss";
import ToastMessage from "@/components/ToastMessage/ToastMessage";
import ProgressBar from "@/components/ProgressBar";
import RadioCardField from "@/components/FormFields/RadioCardField";
import MarqueeText from "@/components/MarqueeText/MarqueeText";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/UserContext";
import { toast } from "react-toastify";
import { questions,calculateQuestionScore } from "@/data/branding";



export default function Branding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [manuallToast, setManuallToast] = useState(null);
  const { isAuthenticated, checkAuthProfile } = useAuth();
  const [errorField, setErrorField] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("brandingFormData");

    const stepValue = localStorage.getItem("formStep");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    if (stepValue) {
      const parsedStep = parseInt(stepValue, 10);
      if (!isNaN(parsedStep)) {
        setStep(parsedStep);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("brandingFormData", JSON.stringify(formData));
    localStorage.setItem("formStep", step.toString());
  }, [formData, step]);

  const fetchUserCountry = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      return data.country_name || "Unknown";
    } catch (err) {
      console.error("Failed to fetch country:", err);
      return "Unknown";
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
            ? [...(prev[name] || []), value]
            : (prev[name] || []).filter((v) => v !== value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }
    setLoading(true);
    const country = await fetchUserCountry();
    const score = calculateQuestionScore(formData);
    const payload = { formData: { ...formData }, country, score ,serviceType:"Branding/Social Media Handling",};
    try {
      const response = await fetch("/api/generatePlans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      
      // return;
      if (data.success) {
        router.push(`/pricing/${data?.planId}`);
        sessionStorage.removeItem("user");
        await checkAuthProfile();
        toast.success(data?.message || "Plane Generated Sucessfull");
        return;
      }
      toast.error(` ${data?.message || "Failed to generate plans"}`);
      router.push(`/`);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate pricing plans. Please try again.");
      router.push("/");
    } finally {
      setLoading(false);
      localStorage.removeItem("brandingFormData");
      localStorage.removeItem("formStep");
    }
  };

  const renderField = (q) => {
    const currentValue = formData[q.name];

    // For businessType question, filter options based on siteCategory
    let options = q.options;
    if (q.name === "businessType" && formData.siteCategory) {
      options = q.options.filter(
        (opt) => opt.category === formData.siteCategory || !opt.category
      );
    }

    // ✅ Regular fields (default JSX return)
    return (
      <div key={q.id} className={styles.fieldGroup}>
        <label>
          {q.id}. {q.label}
        </label>
        {q.helper && <p className={styles.helperText}>{q.helper}</p>}

        {q.type === "text" && (
          <>
            <input
              name={q.name}
              type="text"
              className={styles.input}
              onChange={handleChange}
              required={q.required}
              value={currentValue || ""}
              placeholder={q.placeholder}
            />
            {errorField === q.name && (
              // <p className={styles.errorText}>
              <ToastMessage
                message={"Please select an option before continuing."}
              />
              // </p>
            )}
          </>
        )}

        {q.type === "select" && options && (
          <>
            {q.recommendedLabel && (
              <div className={styles.recommendNotice}>{q.recommendedLabel}</div>
            )}
            <select
              name={q.name}
              className={styles.dropdown}
              onChange={handleChange}
              required={q.required}
              value={currentValue || ""}
            >
              <option value="">Select an option</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errorField === q.name && (
              // <p className={styles.errorText}>
              <ToastMessage
                message={"Please select an option before continuing."}
              />
              // {/* </p> */}
            )}
          </>
        )}

        {q.type === "radio-card" && options && (
          <>
            <RadioCardField
              q={q}
              value={currentValue}
              onChange={handleChange}
              options={options}
            />
            {errorField === q.name && (
              // <p className={styles.errorText}>
              <ToastMessage
                message={"Please select an option before continuing."}
              />
              // </p>
            )}
          </>
        )}

        {q.type === "checkbox" && options && (
          <div className={styles.checkboxGroup}>
            {options.map((opt) => (
              <label key={opt.value} className={styles.checkboxOption}>
                <input
                  type="checkbox"
                  name={q.name}
                  value={opt.value}
                  checked={(currentValue || []).includes(opt.value)}
                  onChange={handleChange}
                />
                {opt.label}
              </label>
            ))}
            {errorField === q.name && (
              // <p className={styles.errorText}>
              <ToastMessage
                message={"Please select an option before continuing."}
              />
              // </p>
            )}
          </div>
        )}

        {q.footer && <p className={styles.footerText}>{q.footer}</p>}

        {q.conditionalQuestions && q.conditionalQuestions[currentValue] && (
          <div className={styles.conditionalQuestions}>
            {q.conditionalQuestions[currentValue].map(renderField)}
          </div>
        )}
      </div>
    );
  };

  // Determine which questions to display based on current step
  let displayedQuestions = [];
  const totalSteps = questions.length;

  if (step === 1) {
    displayedQuestions = [questions[0]]; // Business name
  } else if (step === 2) {
    displayedQuestions = [questions[1]]; // Site category
  } else if (step === 3) {
    // Show business type question (filtered based on previous selection)
    displayedQuestions = [questions[2]];
  } else {
    // For steps after 3, show the remaining questions in order
    const remainingQuestions = questions.slice(3);
    const questionIndex = step - 4;
    if (questionIndex < remainingQuestions.length) {
      displayedQuestions = [remainingQuestions[questionIndex]];
    }
  }

  const isLastStep = step === totalSteps;

  return (
    <>
      {manuallToast && (
        <ToastMessage
          message={manuallToast}
          onClose={() => setManuallToast(null)}
        />
      )}

      <div className={styles.formWrapper}>
        <div className={styles.formInner}>
          <div>
            <MarqueeText />
          </div>

          <h1 className={styles.surveyHeading} id="animatedHeading">
            {step >= 2 && formData.businessName?.trim()
              ? formData.businessName
              : "Let's build your site"}
          </h1>

          <p className={styles.subHeading}>
            We offer personalized packages for you.
          </p>
          <ProgressBar step={step} totalSteps={totalSteps} />
          <form
            noValidate
            id="survey-form"
            onSubmit={(e) => {
              e.preventDefault();
              const currentQuestion = displayedQuestions[0]; // current step's only question
              const { name, required } = currentQuestion;
              const value = formData[name];
              if (required && !value) {
                setErrorField(name);
                return;
              }

              setErrorField(null);
              if (step === 1 && formData.businessName?.trim()) {
                setManuallToast(
                  `✨ Awesome! We'll call your site: ${formData.businessName}`
                );
              }

              if (isLastStep) handleSubmit();
              else setStep(step + 1);
            }}
            className={styles.formContainer}
          >
            {displayedQuestions.map(renderField)}
          </form>
          <div className={styles.bottomNavBar}>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className={styles.bottomBack}
              >
                Back
              </button>
            )}
            <button
              type="submit"
              form="survey-form"
              className={styles.bottomNext}
              disabled={loading}
            >
              {loading ? "Loading..." : isLastStep ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.stickyFooter}></div>
    </>
  );
}
