const scoreMap = {
  businessStage: {
    new: 1,
    irregular: 2,
    "active-low": 3,
    growing: 4,
  },
  mainGoal: {
    awareness: 21,
    community: 22,
    sales: 23,
    all: 24,
  },
  platforms: {
    instagram: 1,
    facebook: 1,
    linkedin: 2,
    twitter: 2,
    youtube: 3,
    pinterest: 2,
    not_sure: 1,
  },
  postingFrequency: {
    "1-3": 1,
    "4-7": 2,
    "8-15": 3,
    "15+": 4,
  },
  contentHelp: {
    no: 1,
    text_only: 2,
    design_only: 3,
    full: 4,
  },
  ads: {
    no: 1,
    yes_creatives: 2,
    yes_full: 3,
  },
  influencers: {
    no: 1,
    maybe: 2,
    micro: 3,
    macro: 4,
  },
  involvement: {
    not_sure: 1,
    review: 2,
    supportive: 3,
    hands_off: 4,
  },
  brandKit: {
    none: 1,
    need_help: 2,
    partial: 3,
    full: 4,
  },
};

export function calculateQuestionScore(formData) {
  let score = 0;

  for (const key in formData) {
    if (key === "platforms" && Array.isArray(formData[key])) {
      // Add score for each selected platform
      formData[key].forEach((platform) => {
        score += scoreMap.platforms[platform] || 0;
      });
    } else {
      const value = formData[key];
      score += scoreMap[key]?.[value] || 0;
    }
  }

  return score;
}
export const questions = [
  {
    id: 1,
    type: "text",
    name: "businessName",
    label: "What's your brand or social media handle?",
    placeholder: "Give it a name, even if it's temporary.",
    helper: "Helps us talk to you like a real partner.",
    score: 1,
  },
  {
    id: 2,
    name: "businessStage",
    label: "Where is your business right now?",
    type: "radio-card",
    required: true,
    options: [
      { value: "new", label: "Just starting, no social media yet" },
      { value: "irregular", label: "I post sometimes, but not often" },
      {
        value: "active-low",
        label: "I post often, but not getting good results",
      },
      {
        value: "growing",
        label: "I'm doing well, just need help to grow faster",
      },
    ],
  },
  {
    id: 3,
    name: "mainGoal",
    label: "What do you want from social media?",
    type: "radio-card",
    required: true,
    options: [
      { value: "awareness", label: "More people should know me" },
      {
        value: "community",
        label: "I want people to talk and connect with my brand",
      },
      { value: "sales", label: "I want to get leads or sales" },
      { value: "all", label: "I want all of these" },
    ],
  },
  {
    id: 4,
    name: "platforms",
    label: "Which platforms do you want to grow on?",
    type: "checkbox",
    required: true,
    options: [
      { value: "instagram", label: "Instagram" },
      { value: "facebook", label: "Facebook" },
      { value: "linkedin", label: "LinkedIn" },
      { value: "twitter", label: "Twitter (X)" },
      { value: "youtube", label: "YouTube" },
      { value: "pinterest", label: "Pinterest" },
      { value: "not_sure", label: "Not sure yet" },
    ],
  },
  {
    id: 5,
    name: "postingFrequency",
    label: "How many posts per week are you aiming for?",
    type: "radio-card",
    required: true,
    options: [
      { value: "1-3", label: "1–3 posts per week" },
      { value: "4-7", label: "4–7 posts per week" },
      { value: "8-15", label: "8–15 posts per week" },
      { value: "15+", label: "15+ posts per week" },
    ],
  },
  {
    id: 6,
    name: "contentHelp",
    label: "What kind of content help do you need?",
    type: "radio-card",
    required: true,
    options: [
      { value: "full", label: "Yes, design + write everything" },
      { value: "design_only", label: "Just design, I’ll write" },
      { value: "text_only", label: "Just text, I have the images" },
      { value: "no", label: "I’ll do everything, just need a plan" },
    ],
  },
  {
    id: 7,
    name: "ads",
    label: "Do you want to run paid ads?",
    type: "radio-card",
    required: true,
    options: [
      { value: "yes_full", label: "Yes, I need full help with ads" },
      {
        value: "yes_creatives",
        label: "I’ll run ads, just need good creatives",
      },
      { value: "no", label: "No ads for now" },
    ],
  },
  {
    id: 8,
    name: "influencers",
    label: "Interested in working with influencers?",
    type: "radio-card",
    required: true,
    options: [
      { value: "micro", label: "Yes, small local influencers" },
      { value: "macro", label: "Yes, big or niche influencers" },
      { value: "maybe", label: "Maybe" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: 9,
    name: "brandKit",
    label: "Do you have your brand ready?",
    type: "radio-card",
    required: true,
    options: [
      { value: "full", label: "Yes, I have a full brand kit" },
      { value: "partial", label: "I have a logo and colors" },
      { value: "need_help", label: "No, but I want help" },
      { value: "none", label: "No, and I’m okay without it" },
    ],
  },
  {
    id: 10,
    name: "involvement",
    label: "How involved do you want to be in the process?",
    type: "radio-card",
    required: true,
    options: [
      { value: "review", label: "I want to plan and review monthly" },
      { value: "supportive", label: "I’ll give ideas, but you manage things" },
      { value: "hands_off", label: "You handle everything" },
      { value: "not_sure", label: "Not sure yet" },
    ],
  },
];

