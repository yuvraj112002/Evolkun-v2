// src/data/webDevlopment.js

// -----------------------------
// Scoring model (INR estimate later can use this)
// Keep it simple & predictable.
// -----------------------------
const SCORE = {
  websiteSituation: { new: 10, improve: 18, features: 22 },

  websiteKind: { business: 10, store: 18, booking: 16, platform: 35 },

  audienceReach: { local: 8, regional: 14, national: 22, global: 30 },

  timeline: { exploring: 5, "1-2-months": 12, weeks: 18, immediate: 25 },

  contentStatus: {
    ready: 8,
    refine: 12,
    rewrite: 18,
    unsure: 14,
    "need-all": 24,
  },

  redesignScope: { full: 25, major: 18, minor: 5 },

  featureCriticality: { core: 25, high: 18, moderate: 10, exploratory: 5 },
};

export function calculateScore(formData) {
  let score = 0;

  const add = (key, val) => {
    if (SCORE[key] && SCORE[key][val] != null) score += SCORE[key][val];
  };

  add("websiteSituation", formData.websiteSituation);
  add("websiteKind", formData.websiteKind);
  add("audienceReach", formData.audienceReach);
  add("timeline", formData.timeline);
  add("contentStatus", formData.contentStatus);
  add("redesignScope", formData.redesignScope);
  add("featureCriticality", formData.featureCriticality);

  // priorities (pick 2)
  if (Array.isArray(formData.priorities)) score += formData.priorities.length * 6;

  // multilingual
  if (formData.websiteLanguage === "multi") score += 10;

  // USP (optional)
  if (formData.usp && String(formData.usp).trim().length > 4) score += 5;

  // idea notes
  if (formData.ideaNotes && String(formData.ideaNotes).trim().length > 10) score += 4;

  return score;
}

// -----------------------------
// Score -> INR estimate mapping
// (adjust ranges any time)
// -----------------------------
export function scoreToInrEstimate(score) {
  // NOTE: These are “initial estimate ranges” (not final quote).
  if (score <= 35) return { min: 25000, max: 45000, label: "Starter Build" };
  if (score <= 55) return { min: 45000, max: 85000, label: "Growth Website" };
  if (score <= 75) return { min: 85000, max: 150000, label: "High-Impact Build" };
  if (score <= 95) return { min: 150000, max: 275000, label: "Advanced Website / Store" };
  return { min: 275000, max: 600000, label: "Platform / Custom System" };
}

// --------------------------------------------------
// Questions (Professional rewrite + interstitial screens)
// showWhen keeps it step-based (one screen at a time).
// --------------------------------------------------
export const questions = [
  // Stage 1 — Business Context
  {
    id: 1,
    type: "text",
    label: "What’s your business or brand name?",
    name: "businessName",
    required: true,
    placeholder: "e.g., Evolkun Studio",
  },
  {
    id: 2,
    type: "select",
    label: "Which best describes your business?",
    name: "businessType",
    required: true,
    options: [
      { label: "Restaurant / Café / Food brand", value: "restaurant" },
      { label: "Local services (salon, gym, etc.)", value: "local-services" },
      { label: "Home services (repair, maintenance)", value: "home-services" },
      { label: "E-commerce / Online store", value: "ecommerce" },
      { label: "Fashion / Clothing brand", value: "fashion" },
      { label: "Doctor / Clinic / Healthcare", value: "medical" },
      { label: "Coach / Educator / Institute", value: "coach" },
      { label: "Hotel / Resort / Homestay", value: "hotel" },
      { label: "Real estate", value: "real-estate" },
      { label: "Legal / Financial services", value: "legal" },
      { label: "Creator / Personal brand", value: "creator" },
      { label: "Tech startup / SaaS", value: "saas" },
      { label: "Agency / Studio", value: "agency" },
      { label: "NGO / Non-profit", value: "ngo" },
      { label: "Other", value: "other" },
    ],
  },

  // Stage 2 — Website Situation (branch root)
  {
    id: 3,
    type: "radio-card",
    label: "What are you here for today?",
    name: "websiteSituation",
    required: true,
    options: [
      {
        label: "Build a new website",
        value: "new",
        description: "You don’t have a website yet",
      },
      {
        label: "Upgrade my current website",
        value: "improve",
        description: "Redesign, structure, speed, conversions",
      },
      {
        label: "Add features to my website",
        value: "features",
        description: "Bookings, payments, dashboards, automation",
      },
    ],
  },

  // GRID / greet (1–2 lines)
  {
    id: 4,
    type: "greet",
    title: "Nice. You’re in the right place.",
    name: "grid",
    showWhen: { field: "websiteSituation", notEmpty: true },
    messageTemplate:
      "Answer a few quick questions — we’ll generate an initial estimate and a clear next-step plan for {businessName}.",
  },

  // ✅ Interstitial (engaging “diet app style”)
  {
    id: 4.5,
    type: "interstitial",
    name: "welcome_interstitial",
    topLabel: "Project Profile",
    title: "Let’s build your project profile",
    subtitle:
      "This takes ~2 minutes. You’ll see an estimated range + what’s included.",
    image: "/web dev/welcome.png",
    cards: [
      { icon: "⚡", title: "Fast clarity", desc: "No confusing back-and-forth." },
      { icon: "🧠", title: "Strategy-first", desc: "Scope → then pricing." },
      { icon: "📈", title: "Built for results", desc: "Speed, SEO, conversions." },
      { icon: "🔎", title: "Transparent workflow", desc: "Track progress clearly." },
    ],
    ctaText: "Continue",
    showWhen: { field: "websiteSituation", notEmpty: true },
  },

  // Stage 3 — Vision & Positioning (core shared)
  {
    id: 5,
    type: "radio-card",
    label: "What type of website do you need?",
    name: "websiteKind",
    required: true,
    options: [
      { label: "Business website", value: "business", description: "Services & inquiries" },
      { label: "Online store", value: "store", description: "Products & payments" },
      { label: "Booking website", value: "booking", description: "Appointments / reservations" },
      { label: "Platform / marketplace", value: "platform", description: "Multiple users / vendors" },
    ],
  },

  {
    id: 6,
    type: "radio-card",
    label: "Who is the website mainly for?",
    name: "audienceReach",
    required: true,
    options: [
      { label: "Local", value: "local" },
      { label: "Regional", value: "regional" },
      { label: "Nationwide", value: "national" },
      { label: "International", value: "global" },
    ],
  },

  // USP only when launching new
  {
    id: 7,
    type: "textarea",
    label: "Do you have a USP or standout idea? (Optional)",
    name: "usp",
    required: false,
    showWhen: { field: "websiteSituation", equals: "new" },
    placeholder: "Example: same-day delivery, premium experience, 1-click booking…",
    helper: "If you’re not sure yet, you can skip.",
  },

  // ✅ Interstitial after USP (only new)
  {
    id: 7.5,
    type: "interstitial",
    name: "usp_interstitial",
    topLabel: "Brand",
    title: "That’s a strong direction.",
    subtitle: "Even a simple USP can shape the full website flow.",
    image: "/web dev/usp.png",
    cards: [
      { icon: "🎯", title: "Clear messaging", desc: "USP becomes headline + structure." },
      { icon: "🧩", title: "Better layout", desc: "Pages built around your strongest offer." },
      { icon: "💬", title: "Better copy", desc: "Confident words, not cringe sales." },
      { icon: "🚀", title: "Faster decisions", desc: "Launch becomes easier with clarity." },
    ],
    ctaText: "Continue",
    showWhen: { field: "websiteSituation", equals: "new" },
  },

  // Business maturity only for new website
  {
    id: 8,
    type: "radio-card",
    label: "Where are you at right now?",
    name: "businessMaturity",
    required: true,
    showWhen: { field: "websiteSituation", equals: "new" },
    options: [
      { label: "Fully offline", value: "offline" },
      { label: "Offline, moving online", value: "moving-online" },
      { label: "Already online", value: "online" },
      { label: "Early-stage concept", value: "early-idea" },
    ],
  },

  // Design direction (shared for new + improve)
  {
    id: 9,
    type: "radio-card",
    label: "Which visual direction fits you best?",
    name: "designVibe",
    required: true,
    showWhen: { field: "websiteSituation", notEquals: "features" },
    options: [
      { label: "Clean & minimal", value: "minimal" },
      { label: "Bold & modern", value: "modern" },
      { label: "Trend-focused", value: "stylish" },
      { label: "Premium / luxury", value: "luxury" },
      { label: "Creative / artistic", value: "creative" },
    ],
  },

  {
    id: 10,
    type: "radio-card",
    label: "Do you have design references?",
    name: "hasReferences",
    required: true,
    showWhen: { field: "websiteSituation", notEquals: "features" },
    options: [
      { label: "Yes, I’ll share links", value: "yes" },
      { label: "I have ideas, no links", value: "ideas" },
      { label: "No, I’d like guidance", value: "no" },
    ],
  },

  {
    id: 11,
    type: "radio-card",
    label: "What’s the status of your content?",
    name: "contentStatus",
    required: true,
    showWhen: { field: "websiteSituation", notEquals: "features" },
    options: [
      { label: "Ready to use", value: "ready" },
      { label: "Needs refinement", value: "refine" },
      { label: "Needs rewriting", value: "rewrite" },
      { label: "Not sure yet", value: "unsure" },
    ],
  },

  {
    id: 12,
    type: "radio-card",
    label: "What timeline are you working with?",
    name: "timeline",
    required: true,
    options: [
      { label: "Exploring options", value: "exploring" },
      { label: "Within 1–2 months", value: "1-2-months" },
      { label: "Within a few weeks", value: "weeks" },
      { label: "Immediate", value: "immediate" },
    ],
  },

  {
    id: 13,
    type: "checkbox-max",
    label: "What matters most right now? (Select up to 2)",
    name: "priorities",
    required: true,
    max: 2,
    options: [
      { label: "Speed", value: "speed" },
      { label: "Premium quality", value: "quality" },
      { label: "Conversions", value: "conversions" },
      { label: "SEO growth", value: "seo" },
      { label: "User experience", value: "ux" },
    ],
  },

  // ✅ Interstitial (workflow + trust)
  {
    id: 13.5,
    type: "interstitial",
    name: "process_interstitial",
    topLabel: "Workflow",
    title: "This is how your project runs",
    subtitle: "Clean workflow. No chaos. You always know what’s next.",
    image: "/web dev/workflow.png",
    cards: [
      { icon: "1️⃣", title: "Scope + plan", desc: "Finalize structure + features." },
      { icon: "2️⃣", title: "Design sprint", desc: "Key screens + feedback loop." },
      { icon: "3️⃣", title: "Build + review", desc: "Staging link + iterations." },
      { icon: "4️⃣", title: "Launch + handover", desc: "Go-live + training + support." },
    ],
    trust: {
      headline: "Trusted by founders & growing brands",
      rating: 5,
      quote: "Clear workflow, fast delivery, and the results were actually measurable.",
      person: "Client, India",
    },
    ctaText: "Continue",
    showWhen: { field: "websiteSituation", notEmpty: true },
  },

  {
    id: 14,
    type: "voice-transcript",
    label: "Describe your vision (Optional)",
    name: "ideaNotes",
    required: false,
  },

  {
    id: 15,
    type: "radio-card",
    label: "Website language preference?",
    name: "websiteLanguage",
    required: true,
    options: [
      { label: "English", value: "english" },
      { label: "Local language", value: "local" },
      { label: "Multilingual", value: "multi" },
      { label: "Not decided", value: "unsure" },
    ],
  },

  {
    id: 16,
    type: "checkbox",
    label: "Which core sections will you need? (Optional)",
    name: "sectionsNeeded",
    required: false,
    options: [
      { label: "Home", value: "home" },
      { label: "About", value: "about" },
      { label: "Services / Products", value: "services" },
      { label: "Contact", value: "contact" },
      { label: "Pricing", value: "pricing" },
      { label: "Blog / Updates", value: "blog" },
    ],
  },

  // Improve existing website block
  {
    id: 17,
    type: "text",
    label: "Current website URL (Optional)",
    name: "currentWebsiteUrl",
    required: false,
    showWhen: { field: "websiteSituation", equals: "improve" },
    placeholder: "https://example.com",
  },

  {
    id: 18,
    type: "radio-card",
    label: "What level of upgrade are you considering?",
    name: "redesignScope",
    required: true,
    showWhen: { field: "websiteSituation", equals: "improve" },
    options: [
      { label: "Complete website overhaul", value: "full", description: "New structure + new experience" },
      { label: "Major improvement", value: "major", description: "Design & flow upgrades" },
      { label: "Minor updates only", value: "minor", description: "Small edits / sections only" },
    ],
  },

  {
    id: 19,
    type: "greet",
    title: "Quick note",
    name: "minorGateMsg",
    showWhen: { field: "redesignScope", equals: "minor" },
    message:
      "We focus on upgrades where we can improve performance and results. If you're open to a full upgrade, we can continue.",
  },

  {
    id: 20,
    type: "radio-card",
    label: "Do you want to continue with a full upgrade evaluation?",
    name: "minorUpgradeConsent",
    required: true,
    showWhen: { field: "redesignScope", equals: "minor" },
    options: [
      { label: "Yes, continue", value: "continue" },
      { label: "Not at this time", value: "stop" },
    ],
  },

  {
    id: 21,
    type: "checkbox-max",
    label: "What’s not working well today? (Select up to 2)",
    name: "redesignPainPoints",
    required: true,
    max: 2,
    showWhen: { field: "websiteSituation", equals: "improve" },
    options: [
      { label: "Outdated design", value: "outdated" },
      { label: "Doesn’t reflect the brand", value: "brand" },
      { label: "Low conversions / engagement", value: "conversions" },
      { label: "Poor mobile experience", value: "mobile" },
      { label: "Business has evolved (services/audience)", value: "evolved" },
      { label: "Not sure — it just feels off", value: "off" },
    ],
  },

  {
    id: 22,
    type: "checkbox-max",
    label: "What should improve the most after the upgrade? (Select up to 2)",
    name: "redesignImproveMost",
    required: true,
    max: 2,
    showWhen: { field: "websiteSituation", equals: "improve" },
    options: [
      { label: "Visual presence", value: "visual" },
      { label: "User experience & flow", value: "ux" },
      { label: "Conversions", value: "conversions" },
      { label: "Speed & performance", value: "performance" },
      { label: "Messaging clarity", value: "messaging" },
    ],
  },

  {
    id: 23,
    type: "textarea",
    label: "Anything important we should know about this upgrade? (Optional)",
    name: "redesignNotes",
    required: false,
    showWhen: { field: "websiteSituation", equals: "improve" },
    placeholder: "Share context, constraints, expectations…",
  },

  // Add functionality block
  {
    id: 24,
    type: "text",
    label: "Current website URL",
    name: "featureWebsiteUrl",
    required: true,
    showWhen: { field: "websiteSituation", equals: "features" },
    placeholder: "https://example.com",
  },

  {
    id: 25,
    type: "select",
    label: "Which platform is it built on?",
    name: "builtOn",
    required: true,
    showWhen: { field: "websiteSituation", equals: "features" },
    options: [
      { label: "WordPress", value: "wordpress" },
      { label: "Shopify", value: "shopify" },
      { label: "Webflow", value: "webflow" },
      { label: "Wix", value: "wix" },
      { label: "Framer", value: "framer" },
      { label: "Custom-built", value: "custom" },
      { label: "Not sure", value: "unsure" },
    ],
  },

  {
    id: 26,
    type: "textarea",
    label: "What functionality do you want to add?",
    name: "featuresToAdd",
    required: true,
    showWhen: { field: "websiteSituation", equals: "features" },
    placeholder: "Bookings, payments, login, dashboard, automation, integrations…",
  },

  {
    id: 27,
    type: "radio-card",
    label: "Why now?",
    name: "featureWhyNow",
    required: true,
    showWhen: { field: "websiteSituation", equals: "features" },
    options: [
      { label: "Business growth", value: "growth" },
      { label: "Manual work is slowing us down", value: "manual" },
      { label: "Customer demand", value: "demand" },
      { label: "Scaling operations", value: "scaling" },
      { label: "Competitive reasons", value: "competition" },
    ],
  },

  {
    id: 28,
    type: "radio-card",
    label: "How critical is this for your business?",
    name: "featureCriticality",
    required: true,
    showWhen: { field: "websiteSituation", equals: "features" },
    options: [
      { label: "Core to operations", value: "core" },
      { label: "High priority", value: "high" },
      { label: "Moderate priority", value: "moderate" },
      { label: "Exploratory", value: "exploratory" },
    ],
  },

  {
    id: 29,
    type: "radio-card",
    label: "How is this handled today?",
    name: "currentHandling",
    required: true,
    showWhen: { field: "websiteSituation", equals: "features" },
    options: [
      { label: "Manually (WhatsApp, sheets, email)", value: "manual" },
      { label: "Using third-party tools", value: "tools" },
      { label: "Partially on the website", value: "partial" },
      { label: "Not handled at all", value: "none" },
      { label: "Not sure", value: "unsure" },
    ],
  },

  {
    id: 30,
    type: "textarea",
    label: "Constraints or notes (Optional)",
    name: "featureNotes",
    required: false,
    showWhen: { field: "websiteSituation", equals: "features" },
    placeholder: "Timeline constraints, integrations, examples, anything important…",
  },

  // ✅ Final interstitial before submit / estimate button
  {
    id: 99,
    type: "interstitial",
    name: "analyzing_interstitial",
    topLabel: "Estimate",
    title: "We’re analyzing your inputs",
    subtitle: "Next: your estimated range, timeline, and what’s included.",
    image: "/web dev/analyzing.png",
    progressFake: 63,
    ctaText: "View my estimate",
    showWhen: { field: "websiteSituation", notEmpty: true },
  },
];
