"use client";
import { motion } from 'framer-motion';
import { 
  Smartphone,
  Tablet,
  Monitor,
  Zap,
  Shield,
  Users,
  Check,
  ArrowRight,
  Sparkles,
  Code2,
  Cloud,
  Lock,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import styles from './AppDevelopment.module.scss';

const platforms = [
  { name: 'iOS', icon: '🍎', description: 'Native Swift & SwiftUI' },
  { name: 'Android', icon: '🤖', description: 'Native Kotlin & Jetpack' },
  { name: 'React Native', icon: '⚛️', description: 'Cross-platform' },
  { name: 'Flutter', icon: '💙', description: 'Google\'s UI toolkit' },
  { name: 'Progressive Web', icon: '🌐', description: 'PWA technology' },
  { name: 'Hybrid Apps', icon: '🔄', description: 'Best of both worlds' }
];

const services = [
  {
    icon: <Smartphone />,
    title: 'Native Mobile Apps',
    description: 'High-performance apps built specifically for iOS and Android',
    features: [
      'Native performance & feel',
      'Platform-specific features',
      'Offline functionality',
      'Push notifications'
    ]
  },
  {
    icon: <Code2 />,
    title: 'Cross-Platform Development',
    description: 'Build once, deploy everywhere with React Native or Flutter',
    features: [
      'Single codebase',
      'Faster time to market',
      'Cost-effective solution',
      'Native-like performance'
    ]
  },
  {
    icon: <Cloud />,
    title: 'Backend & API Development',
    description: 'Robust server infrastructure to power your mobile app',
    features: [
      'RESTful & GraphQL APIs',
      'Cloud hosting',
      'Real-time databases',
      'Authentication systems'
    ]
  },
  {
    icon: <RefreshCw />,
    title: 'App Modernization',
    description: 'Update legacy apps with modern features and design',
    features: [
      'UI/UX redesign',
      'Performance optimization',
      'Feature additions',
      'Security updates'
    ]
  }
];

const process = [
  {
    step: '01',
    title: 'Strategy & Planning',
    description: 'Define app requirements, target audience, and platform strategy',
    duration: '1-2 weeks'
  },
  {
    step: '02',
    title: 'UI/UX Design',
    description: 'Create intuitive designs with interactive prototypes',
    duration: '2-4 weeks'
  },
  {
    step: '03',
    title: 'Development',
    description: 'Build your app with agile methodology and weekly updates',
    duration: '8-16 weeks'
  },
  {
    step: '04',
    title: 'Testing & QA',
    description: 'Comprehensive testing across devices and scenarios',
    duration: '2-3 weeks'
  },
  {
    step: '05',
    title: 'App Store Launch',
    description: 'Deploy to App Store and Google Play with optimization',
    duration: '1-2 weeks'
  },
  {
    step: '06',
    title: 'Maintenance & Updates',
    description: 'Ongoing support, bug fixes, and feature enhancements',
    duration: 'Ongoing'
  }
];

const features = [
  {
    icon: <Zap />,
    title: 'Lightning Fast',
    description: 'Optimized performance for smooth user experience'
  },
  {
    icon: <Shield />,
    title: 'Secure & Compliant',
    description: 'Bank-level security with data encryption'
  },
  {
    icon: <Users />,
    title: 'User-Centric',
    description: 'Intuitive interfaces that users love'
  },
  {
    icon: <Lock />,
    title: 'Privacy First',
    description: 'GDPR compliant with user data protection'
  }
];

const portfolioItems = [
  {
    title: 'Fitness Tracking App',
    category: 'Health & Fitness',
    platform: 'iOS & Android',
    stats: { metric: '1M+', label: 'Downloads' }
  },
  {
    title: 'Food Delivery Platform',
    category: 'E-commerce',
    platform: 'React Native',
    stats: { metric: '4.8★', label: 'App Rating' }
  },
  {
    title: 'Banking Mobile App',
    category: 'Fintech',
    platform: 'Native iOS/Android',
    stats: { metric: '500k+', label: 'Active Users' }
  }
];

const pricing = [
  {
    name: 'MVP',
    price: '$15,000',
    description: 'Perfect for startups and product validation',
    features: [
      'Single platform (iOS or Android)',
      'Core features only',
      'Basic UI design',
      '3 screens maximum',
      'Backend integration',
      '1 month support',
      'App store submission'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: '$35,000',
    description: 'Full-featured app for growing businesses',
    features: [
      'iOS & Android (React Native)',
      'Custom UI/UX design',
      'Up to 15 screens',
      'Advanced features',
      'Backend & API development',
      'Push notifications',
      '3 months support',
      'Analytics integration',
      'Payment gateway'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Complex apps with advanced requirements',
    features: [
      'Native iOS & Android',
      'Complex functionality',
      'Unlimited screens',
      'Custom backend',
      'Third-party integrations',
      'Advanced security',
      '12 months support',
      'Dedicated team',
      'White-label solution',
      'Custom SLA'
    ],
    popular: false
  }
];

const technologies = [
  { name: 'React Native', icon: '⚛️' },
  { name: 'Flutter', icon: '💙' },
  { name: 'Swift', icon: '🍎' },
  { name: 'Kotlin', icon: '🤖' },
  { name: 'Firebase', icon: '🔥' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'GraphQL', icon: '◀▶' },
  { name: 'PostgreSQL', icon: '🐘' }
];

export default function AppDevelopment() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.badge}>
              <Sparkles size={16} />
              <span>iOS & Android Excellence</span>
            </div>
            <h1 className={styles.title}>
              Mobile Apps That
              <span className={styles.gradient}> Users Love</span>
            </h1>
            <p className={styles.subtitle}>
              Transform your idea into a powerful mobile app. We build native and 
              cross-platform applications that deliver exceptional user experiences 
              and drive business growth.
            </p>
            <div className={styles.heroButtons}>
              <Link href="#pricing" className={styles.primaryBtn}>
                Get Free Estimate
                <ArrowRight size={20} />
              </Link>
              <Link href="#portfolio" className={styles.secondaryBtn}>
                View Our Apps
              </Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>150+</span>
                <span className={styles.statLabel}>Apps Launched</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>10M+</span>
                <span className={styles.statLabel}>Total Downloads</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>4.8★</span>
                <span className={styles.statLabel}>Average Rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platforms */}
      <section className={styles.platforms}>
        <div className={styles.sectionHeader}>
          <h2>Multi-Platform Expertise</h2>
          <p>We build for every platform your users need</p>
        </div>
        <div className={styles.platformGrid}>
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              className={styles.platformCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <span className={styles.platformIcon}>{platform.icon}</span>
              <h3>{platform.name}</h3>
              <p>{platform.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className={styles.services}>
        <div className={styles.sectionHeader}>
          <h2>Our Mobile App Services</h2>
          <p>End-to-end mobile development solutions</p>
        </div>
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={styles.serviceCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.serviceIcon}>{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className={styles.featureList}>
                {service.features.map((feature) => (
                  <li key={feature}>
                    <Check size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2>Why Choose Our App Development</h2>
          <p>Built with quality, security, and user experience in mind</p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={styles.featureCard}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className={styles.process}>
        <div className={styles.sectionHeader}>
          <h2>Our App Development Process</h2>
          <p>From idea to App Store in 6 strategic phases</p>
        </div>
        <div className={styles.processTimeline}>
          {process.map((item, index) => (
            <motion.div
              key={item.step}
              className={styles.processStep}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.stepNumber}>{item.step}</div>
              <div className={styles.stepContent}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className={styles.duration}>{item.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technologies */}
      <section className={styles.technologies}>
        <div className={styles.sectionHeader}>
          <h2>Technologies We Use</h2>
          <p>Modern tech stack for superior mobile experiences</p>
        </div>
        <div className={styles.techGrid}>
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className={styles.techCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <span className={styles.techIcon}>{tech.icon}</span>
              <span className={styles.techName}>{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className={styles.portfolio} id="portfolio">
        <div className={styles.sectionHeader}>
          <h2>Featured Mobile Apps</h2>
          <p>Successful apps we've built for our clients</p>
        </div>
        <div className={styles.portfolioGrid}>
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.title}
              className={styles.portfolioCard}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.portfolioImage}>
                <div className={styles.imagePlaceholder}>
                  <Smartphone size={48} />
                </div>
              </div>
              <div className={styles.portfolioInfo}>
                <span className={styles.category}>{item.category}</span>
                <h3>{item.title}</h3>
                <p className={styles.platform}>{item.platform}</p>
                <div className={styles.portfolioStats}>
                  <span className={styles.metric}>{item.stats.metric}</span>
                  <span className={styles.metricLabel}>{item.stats.label}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className={styles.portfolioCta}>
          <Link href="/portfolio" className={styles.secondaryBtn}>
            View All Projects
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Pricing */}
      <section className={styles.pricing} id="pricing">
        <div className={styles.sectionHeader}>
          <h2>App Development Pricing</h2>
          <p>Transparent pricing for every budget and requirement</p>
        </div>
        <div className={styles.pricingGrid}>
          {pricing.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`${styles.pricingCard} ${plan.popular ? styles.popular : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className={styles.popularBadge}>Most Popular</div>
              )}
              <h3>{plan.name}</h3>
              <div className={styles.price}>{plan.price}</div>
              <p className={styles.pricingDescription}>{plan.description}</p>
              <ul className={styles.pricingFeatures}>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={styles.pricingBtn}>
                Get Started
                <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <motion.div
          className={styles.ctaContent}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Build Your Mobile App?</h2>
          <p>
            Turn your app idea into reality. Get a free consultation and 
            detailed project estimate from our mobile development experts.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.primaryBtn}>
              Schedule Free Consultation
              <ArrowRight size={20} />
            </Link>
            <Link href="/portfolio" className={styles.secondaryBtn}>
              See More Apps
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}