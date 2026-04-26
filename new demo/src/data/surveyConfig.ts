
export interface SurveyOption {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  mediaType?: 'image' | 'video';
  mediaSrc?: string;
  poster?: string;
}

export interface SurveyStep {
  id: string;
  type: 'text' | 'single' | 'multi' | 'textarea' | 'url' | 'greet' | 'match' | 'summary' | 'end-message';
  section: number;
  question?: string;
  highlights?: string[];
  subtitle?: string;
  placeholder?: string;
  options?: SurveyOption[];
  maxSelect?: number;
  required?: boolean;
  condition?: (answers: Record<string, any>) => boolean;
  greetContent?: (answers: Record<string, any>) => { title: string; subtitle: string };
  endMessage?: { title: string; subtitle: string };
}

const isNormalPath = (a: Record<string, any>) => {
  const s = a['website-stage'];
  return s !== 'redesign' && s !== 'add-features';
};

const isRedesignPath = (a: Record<string, any>) => a['website-stage'] === 'redesign';
const isFeaturesPath = (a: Record<string, any>) => a['website-stage'] === 'add-features';

export const surveySteps: SurveyStep[] = [
  // ─── Section 1: Business Info ───
  {
    id: 'business-name',
    type: 'text',
    section: 1,
    question: "What's the name of your business or brand?",
    highlights: ['business', 'brand'],
    placeholder: 'e.g. Bloom Studio, FreshBite…',
    required: true,
  },
  {
    id: 'business-type',
    type: 'single',
    section: 1,
    question: 'What kind of work do you do?',
    highlights: ['work'],
    options: [
      { id: 'restaurant', label: 'Restaurant / Café / Food brand', icon: '🍽️' },
      { id: 'local-services', label: 'Local services (salon, gym, etc.)', icon: '🔧' },
      { id: 'home-services', label: 'Home services (cleaning, repair)', icon: '🏠' },
      { id: 'ecommerce', label: 'E-commerce / Online store', icon: '🛒' },
      { id: 'fashion', label: 'Fashion / Clothing brand', icon: '👗' },
      { id: 'healthcare', label: 'Doctor / Clinic / Healthcare', icon: '🏥' },
      { id: 'coach', label: 'Coach / Educator / Institute', icon: '📚' },
      { id: 'hotel', label: 'Hotel / Resort / Homestay', icon: '🏨' },
      { id: 'realestate', label: 'Real estate', icon: '🏘️' },
      { id: 'legal', label: 'Legal / Financial services', icon: '⚖️' },
      { id: 'creator', label: 'Creator / Influencer / Artist', icon: '🎨' },
      { id: 'tech', label: 'Tech startup / SaaS', icon: '💻' },
      { id: 'agency', label: 'Agency / Studio', icon: '🏢' },
      { id: 'ngo', label: 'NGO / Non-profit', icon: '🤝' },
      { id: 'other', label: 'Other', icon: '📋' },
    ],
  },
  {
    id: 'website-stage',
    type: 'single',
    section: 1,
    question: 'Where are you right now with your website project?',
    highlights: ['website project'],
    options: [
      { id: 'fully-offline', label: 'Fully offline (no online presence yet)', icon: '🌱' },
      { id: 'offline-to-online', label: 'Offline business moving online', icon: '🔄' },
      { id: 'already-online', label: 'Already operating online', icon: '🌐' },
      { id: 'early-idea', label: 'Early-stage idea or concept', icon: '💡' },
      { id: 'redesign', label: 'I have a website → redesign it', icon: '🎨' },
      { id: 'add-features', label: 'I have a website → add features', icon: '➕' },
      { id: 'from-scratch', label: "I'm starting from scratch", icon: '🆕' },
    ],
  },

  // ─── Greet after Stage ───
  {
    id: 'greet-stage',
    type: 'greet',
    section: 1,
    greetContent: (a) => {
      const s = a['website-stage'];
      if (s === 'fully-offline') return { title: 'Starting from scratch — perfect.', subtitle: "We'll build this the right way from the ground up." };
      if (s === 'redesign') return { title: "Time for a fresh start!", subtitle: "Let\u2019s transform your site into something remarkable." };
      if (s === 'add-features') return { title: "Let\u2019s level up your site!", subtitle: "We'll add powerful features to what you already have." };
      if (s === 'early-idea') return { title: 'Great ideas start here.', subtitle: "Let\u2019s shape your vision into something real." };
      return { title: "Awesome, let's go!", subtitle: "We'll craft the perfect plan for your project." };
    },
  },

  // ─── Normal Path: Section 2 ───
  {
    id: 'website-kind',
    type: 'single',
    section: 2,
    question: 'What kind of website are you building?',
    highlights: ['website'],
    condition: isNormalPath,
    options: [
      { id: 'business', label: 'Business website', icon: '🏢', description: 'Services + trust + inquiry' },
      { id: 'store', label: 'Online store', icon: '🛍️', description: 'Products + payments' },
      { id: 'booking', label: 'Booking website', icon: '📅', description: 'Appointments / reservations' },
      { id: 'platform', label: 'Platform / marketplace', icon: '🌐', description: 'Multiple vendors / users' },
    ],
  },
  {
    id: 'target-audience',
    type: 'single',
    section: 2,
    question: 'Who is the website mainly for?',
    highlights: ['mainly for'],
    condition: isNormalPath,
    options: [
      { id: 'local', label: 'Local customers (near me)', icon: '📍' },
      { id: 'city', label: 'City / region', icon: '🏙️' },
      { id: 'nationwide', label: 'Nationwide', icon: '🗺️' },
      { id: 'global', label: 'Global / international', icon: '🌍' },
    ],
  },
  {
    id: 'usp',
    type: 'text',
    section: 2,
    question: 'Any unique USP or feature you want to highlight?',
    highlights: ['USP', 'feature'],
    subtitle: 'Optional — but helps us make you stand out.',
    placeholder: 'e.g. "Same-day delivery", "AI-powered matching"…',
    required: false,
    condition: isNormalPath,
  },
  {
    id: 'greet-usp',
    type: 'greet',
    section: 2,
    condition: (a) => isNormalPath(a) && !!a['usp']?.trim(),
    greetContent: (a) => ({
      title: "That USP is strong 💪",
      subtitle: `We'll make sure "${a['usp']}" stands out front and center.`,
    }),
  },
  {
    id: 'design-vibe',
    type: 'single',
    section: 3,
    question: 'What kind of design vibe are you going for?',
    highlights: ['design vibe'],
    subtitle: 'Choose the visual direction that feels closest to your brand.',
    condition: isNormalPath,
    options: [
      {
        id: 'minimal',
        label: 'Clean & Minimal',
        description: 'Soft spacing, calm layouts, refined simplicity',
        mediaType: 'video',
        mediaSrc: '/images/survey/video1.mp4',
      },
      {
        id: 'futuristic',
        label: 'Futuristic',
        description: 'Motion, glow, modern layouts and premium tech feel',
        mediaType: 'video',
        mediaSrc: '/images/survey/video2.mp4',
      },
      {
        id: 'bold',
        label: 'Bold & Modern',
        description: 'Strong contrast, high-attention sections, confident feel',
        mediaType: 'video',
        mediaSrc: '/images/survey/video3.mp4',
      },
      {
        id: 'premium',
        label: 'Premium & Luxury',
        description: 'Elegant, polished, high-end brand presentation',
        mediaType: 'video',
        mediaSrc: '/images/survey/video1.mp4',
      },
      {
        id: 'creative',
        label: 'Creative & Artistic',
        description: 'Expressive visuals, unique layout, original feel',
        mediaType: 'video',
        mediaSrc: '/images/survey/video2.mp4',
      },
      {
        id: 'parallax',
        label: 'Parallax & Motion',
        description: 'Layered movement, depth, and immersive storytelling',
        mediaType: 'video',
        mediaSrc: '/images/survey/video3.mp4',
      },
    ],
  },
  {
    id: 'references',
    type: 'single',
    section: 3,
    question: 'Do you have any website references or inspiration?',
    highlights: ['references', 'inspiration'],
    condition: isNormalPath,
    options: [
      { id: 'yes', label: "Yes (I'll share links later)", icon: '🔗' },
      { id: 'some-ideas', label: 'I have some ideas but no links', icon: '💭' },
      { id: 'guide-me', label: 'No, I want you to guide me', icon: '🧭' },
    ],
  },
  {
    id: 'content-readiness',
    type: 'single',
    section: 3,
    question: 'How are you handling the content for the website?',
    highlights: ['content'],
    condition: isNormalPath,
    options: [
      { id: 'ready', label: 'I already have all the content', icon: '✅' },
      { id: 'rough', label: 'Rough content that needs refinement', icon: '📝' },
      { id: 'need-help', label: 'I need help writing content', icon: '✍️' },
      { id: 'both', label: 'Need help with content and visuals', icon: '🎨' },
      { id: 'unsure', label: "I'm not sure yet", icon: '🤷' },
    ],
  },
  {
    id: 'timeline',
    type: 'single',
    section: 3,
    question: 'How soon do you want to move forward?',
    highlights: ['move forward'],
    condition: isNormalPath,
    options: [
      { id: 'exploring', label: 'Just exploring for now', icon: '🔍' },
      { id: '1-2-months', label: 'In the next 1–2 months', icon: '📅' },
      { id: 'few-weeks', label: 'Within a few weeks', icon: '⏳' },
      { id: 'immediately', label: 'Immediately', icon: '🚀' },
    ],
  },
  {
    id: 'priority',
    type: 'multi',
    section: 3,
    question: 'What matters most to you for this project?',
    highlights: ['matters most'],
    subtitle: 'Pick up to 2',
    maxSelect: 2,
    condition: isNormalPath,
    options: [
      { id: 'speed', label: 'Speed', icon: '⚡' },
      { id: 'quality', label: 'Premium quality', icon: '💎' },
      { id: 'leads', label: 'Leads / conversions', icon: '📈' },
      { id: 'seo', label: 'SEO & long-term growth', icon: '🔍' },
      { id: 'ux', label: 'Smooth user experience', icon: '✨' },
    ],
  },
  {
    id: 'greet-priority',
    type: 'greet',
    section: 3,
    condition: (a) => isNormalPath(a) && Array.isArray(a['priority']) && a['priority'].length > 0,
    greetContent: (a) => {
      const picks = (a['priority'] as string[]) || [];
      const labels: Record<string, string> = { speed: 'Speed', quality: 'Premium quality', leads: 'Leads & conversions', seo: 'SEO & growth', ux: 'User experience' };
      const pickLabels = picks.map(p => labels[p] || p).join(' & ');
      return { title: `Nice choice! 🎯`, subtitle: `We'll optimize everything around: ${pickLabels}.` };
    },
  },
  {
    id: 'explain-idea',
    type: 'textarea',
    section: 4,
    question: 'Tell us about your idea',
    highlights: ['your idea'],
    subtitle: 'Optional — anything extra you want us to know.',
    placeholder: 'Describe your vision, goals, or any specifics…',
    required: false,
    condition: isNormalPath,
  },
  {
    id: 'website-language',
    type: 'single',
    section: 4,
    question: 'What language should the website be in?',
    highlights: ['language'],
    condition: isNormalPath,
    options: [
      { id: 'english', label: 'English only', icon: '🇬🇧' },
      { id: 'local', label: 'Local language', icon: '🗣️' },
      { id: 'multilingual', label: 'Multilingual', icon: '🌐' },
      { id: 'unsure', label: 'Not sure yet', icon: '🤷' },
    ],
  },
  {
    id: 'sections-needed',
    type: 'multi',
    section: 4,
    question: "Which sections do you already know you'll need?",
    highlights: ['sections'],
    subtitle: 'Select all that apply',
    maxSelect: 20,
    condition: isNormalPath,
    options: [
      { id: 'home', label: 'Home', icon: '🏠' },
      { id: 'about', label: 'About', icon: '📖' },
      { id: 'services', label: 'Services / Products', icon: '🛠️' },
      { id: 'contact', label: 'Contact', icon: '📧' },
      { id: 'pricing', label: 'Pricing', icon: '💰' },
      { id: 'blog', label: 'Blog / Updates', icon: '📰' },
    ],
  },

  // ─── Redesign Path ───
  {
    id: 'redesign-type',
    type: 'single',
    section: 2,
    question: 'What type of redesign are you looking for?',
    highlights: ['redesign'],
    condition: isRedesignPath,
    options: [
      { id: 'complete', label: 'Complete website redesign', icon: '🔄', description: 'New design, structure, improved experience' },
      { id: 'major', label: 'Major upgrade needed', icon: '⬆️', description: "Feels outdated, doesn't reflect the brand" },
      { id: 'small', label: 'Only small changes or section updates', icon: '🔧' },
    ],
  },
  {
    id: 'redesign-small-end',
    type: 'end-message',
    section: 2,
    condition: (a) => isRedesignPath(a) && a['redesign-type'] === 'small',
    endMessage: {
      title: 'Thanks for sharing!',
      subtitle: "We currently focus on complete website redesigns where we can fully improve design, flow, and performance. If you're planning a full redesign in the future, we'd love to help.",
    },
  },
  {
    id: 'redesign-why',
    type: 'multi',
    section: 2,
    question: 'Why redesign now?',
    highlights: ['Why'],
    subtitle: 'Pick up to 2',
    maxSelect: 2,
    condition: (a) => isRedesignPath(a) && a['redesign-type'] !== 'small',
    options: [
      { id: 'outdated', label: 'The design looks outdated', icon: '📅' },
      { id: 'brand', label: "Doesn't represent the brand", icon: '🎭' },
      { id: 'conversions', label: 'Low conversions / engagement', icon: '📉' },
      { id: 'mobile', label: 'Poor mobile experience', icon: '📱' },
      { id: 'evolved', label: 'Business has evolved', icon: '🚀' },
    ],
  },
  {
    id: 'redesign-improve',
    type: 'multi',
    section: 2,
    question: 'What should improve the most?',
    highlights: ['improve'],
    subtitle: 'Pick up to 2',
    maxSelect: 2,
    condition: (a) => isRedesignPath(a) && a['redesign-type'] !== 'small',
    options: [
      { id: 'visual', label: 'Visual quality & brand presence', icon: '🎨' },
      { id: 'ux', label: 'User experience & flow', icon: '✨' },
      { id: 'conversions', label: 'Conversions (leads / sales)', icon: '📈' },
      { id: 'performance', label: 'Speed & performance', icon: '⚡' },
      { id: 'messaging', label: 'Clarity of messaging', icon: '💬' },
    ],
  },
  {
    id: 'redesign-direction',
    type: 'single',
    section: 3,
    question: 'What design direction do you want to move towards?',
    highlights: ['design direction'],
    condition: (a) => isRedesignPath(a) && a['redesign-type'] !== 'small',
    options: [
      { id: 'minimal', label: 'Clean & minimal', icon: '✨' },
      { id: 'bold', label: 'Bold & modern', icon: '⚡' },
      { id: 'trendy', label: 'Trendy & stylish', icon: '🔥' },
      { id: 'premium', label: 'Premium / luxury', icon: '💎' },
      { id: 'playful', label: 'Playful / artistic', icon: '🎭' },
    ],
  },
  {
    id: 'redesign-brand-assets',
    type: 'single',
    section: 3,
    question: 'Do you already have brand guidelines or visual assets?',
    highlights: ['brand guidelines'],
    condition: (a) => isRedesignPath(a) && a['redesign-type'] !== 'small',
    options: [
      { id: 'full', label: 'Yes (logo, colors, fonts ready)', icon: '✅' },
      { id: 'logo-only', label: 'Logo only (needs a system)', icon: '🎯' },
      { id: 'none', label: 'No (brand visuals need improvement)', icon: '🔨' },
    ],
  },
  {
    id: 'redesign-references',
    type: 'single',
    section: 3,
    question: 'Do you have any website references or inspiration?',
    highlights: ['references'],
    condition: (a) => isRedesignPath(a) && a['redesign-type'] !== 'small',
    options: [
      { id: 'yes', label: "Yes (I'll share links later)", icon: '🔗' },
      { id: 'some-ideas', label: 'I have some ideas but no links', icon: '💭' },
      { id: 'guide-me', label: 'No, I want you to guide me', icon: '🧭' },
    ],
  },
  {
    id: 'redesign-content',
    type: 'single',
    section: 3,
    question: 'What about the current content?',
    highlights: ['content'],
    condition: (a) => isRedesignPath(a) && a['redesign-type'] !== 'small',
    options: [
      { id: 'good', label: 'Content is good, just needs redesign', icon: '✅' },
      { id: 'refine', label: 'Content needs refinement', icon: '📝' },
      { id: 'rewrite', label: 'Content needs rewriting', icon: '✍️' },
      { id: 'unsure', label: 'Not sure yet', icon: '🤷' },
    ],
  },
  {
    id: 'redesign-timeline',
    type: 'single',
    section: 3,
    question: 'How soon do you want to move forward?',
    highlights: ['move forward'],
    condition: (a) => isRedesignPath(a) && a['redesign-type'] !== 'small',
    options: [
      { id: 'exploring', label: 'Just exploring for now', icon: '🔍' },
      { id: '1-2-months', label: 'In the next 1–2 months', icon: '📅' },
      { id: 'few-weeks', label: 'Within a few weeks', icon: '⏳' },
      { id: 'immediately', label: 'Immediately', icon: '🚀' },
    ],
  },
  {
    id: 'redesign-dislike',
    type: 'textarea',
    section: 4,
    question: "Tell us what you don't like about your current site",
    highlights: ["don't like"],
    subtitle: 'Or what you want it to become.',
    placeholder: 'Describe what feels off or what you envision…',
    required: false,
    condition: (a) => isRedesignPath(a) && a['redesign-type'] !== 'small',
  },
  {
    id: 'redesign-extra',
    type: 'textarea',
    section: 4,
    question: 'Anything specific about this redesign?',
    highlights: ['specific'],
    placeholder: 'Constraints, expectations, context…',
    required: false,
    condition: (a) => isRedesignPath(a) && a['redesign-type'] !== 'small',
  },

  // ─── Features Path ───
  {
    id: 'features-url',
    type: 'url',
    section: 2,
    question: "What's your current website URL?",
    highlights: ['website URL'],
    placeholder: 'https://www.example.com',
    required: true,
    condition: isFeaturesPath,
  },
  {
    id: 'features-platform',
    type: 'single',
    section: 2,
    question: "What platform is your website built on?",
    highlights: ['platform'],
    condition: isFeaturesPath,
    options: [
      { id: 'wordpress', label: 'WordPress', icon: '📝' },
      { id: 'shopify', label: 'Shopify', icon: '🛍️' },
      { id: 'webflow', label: 'Webflow', icon: '🌊' },
      { id: 'wix', label: 'Wix', icon: '🔮' },
      { id: 'framer', label: 'Framer', icon: '🖼️' },
      { id: 'custom', label: 'Custom-built (HTML/JS)', icon: '💻' },
    ],
  },
  {
    id: 'features-to-add',
    type: 'textarea',
    section: 2,
    question: 'What features do you want to add?',
    highlights: ['features'],
    placeholder: 'e.g. Online booking, payment gateway, live chat, user dashboard…',
    required: true,
    condition: isFeaturesPath,
  },
  {
    id: 'features-why',
    type: 'single',
    section: 3,
    question: 'Why add these features now?',
    highlights: ['Why'],
    condition: isFeaturesPath,
    options: [
      { id: 'growth', label: 'Business growth', icon: '📈' },
      { id: 'manual', label: 'Manual work is slowing us down', icon: '⏱️' },
      { id: 'demand', label: 'Customer demand', icon: '👥' },
      { id: 'scaling', label: 'Scaling operations', icon: '🚀' },
      { id: 'competition', label: 'Competitive pressure', icon: '🏁' },
    ],
  },
  {
    id: 'features-critical',
    type: 'single',
    section: 3,
    question: 'How critical are these features?',
    highlights: ['critical'],
    condition: isFeaturesPath,
    options: [
      { id: 'core', label: 'Core to my business', icon: '💯' },
      { id: 'important', label: 'Very important (major improvement)', icon: '⭐' },
      { id: 'useful', label: 'Useful but not urgent', icon: '👍' },
      { id: 'experimenting', label: 'Just experimenting', icon: '🧪' },
    ],
  },
  {
    id: 'features-timeline',
    type: 'single',
    section: 3,
    question: 'How soon do you want to move forward?',
    highlights: ['move forward'],
    condition: isFeaturesPath,
    options: [
      { id: 'exploring', label: 'Just exploring', icon: '🔍' },
      { id: '1-2-months', label: 'In the next 1–2 months', icon: '📅' },
      { id: 'few-weeks', label: 'Within a few weeks', icon: '⏳' },
      { id: 'immediately', label: 'Immediately', icon: '🚀' },
    ],
  },
  {
    id: 'features-current',
    type: 'single',
    section: 3,
    question: 'How are these tasks or features handled right now?',
    highlights: ['handled right now'],
    condition: isFeaturesPath,
    options: [
      { id: 'manual', label: 'Manually (spreadsheets, email, etc.)', icon: '📋' },
      { id: 'third-party', label: 'Using third-party tools', icon: '🔌' },
      { id: 'partial', label: 'Partially on the website', icon: '🌗' },
      { id: 'not-handled', label: 'Not handled at all', icon: '❌' },
      { id: 'unsure', label: 'Not sure', icon: '🤷' },
    ],
  },
  {
    id: 'features-extra',
    type: 'textarea',
    section: 4,
    question: 'Anything else we should know?',
    highlights: ['Anything else'],
    placeholder: 'Constraints, expectations, context…',
    required: false,
    condition: isFeaturesPath,
  },

  // ─── End: Match + Summary (all paths) ───
  {
    id: 'match',
    type: 'match',
    section: 5,
    condition: (a) => !(isRedesignPath(a) && a['redesign-type'] === 'small'),
  },
  {
    id: 'summary',
    type: 'summary',
    section: 5,
    condition: (a) => !(isRedesignPath(a) && a['redesign-type'] === 'small'),
  },
];

export function getActiveSteps(answers: Record<string, any>): SurveyStep[] {
  return surveySteps.filter((step) => {
    if (!step.condition) return true;
    return step.condition(answers);
  });
}

export function getSectionCount(steps: SurveyStep[]): number {
  return Math.max(...steps.map(s => s.section));
}
