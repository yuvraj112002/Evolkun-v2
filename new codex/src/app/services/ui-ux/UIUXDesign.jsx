"use client";
import { motion } from 'framer-motion';
import { 
  Palette,
  Layers,
  Users,
  Smartphone,
  Monitor,
  Check,
  ArrowRight,
  Sparkles,
  Eye,
  Zap,
  Target,
  Award
} from 'lucide-react';
import Link from 'next/link';
import styles from './UIUXDesign.module.scss';

const designServices = [
  {
    icon: <Palette />,
    title: 'User Interface Design',
    description: 'Beautiful, modern interfaces that captivate and engage',
    features: [
      'Visual design systems',
      'Brand-aligned aesthetics',
      'Responsive layouts',
      'Micro-interactions'
    ]
  },
  {
    icon: <Users />,
    title: 'User Experience Design',
    description: 'Intuitive experiences based on user research and behavior',
    features: [
      'User research & testing',
      'Information architecture',
      'User journey mapping',
      'Usability optimization'
    ]
  },
  {
    icon: <Smartphone />,
    title: 'Mobile App Design',
    description: 'Native iOS and Android design that feels just right',
    features: [
      'Platform guidelines',
      'Touch-optimized UI',
      'Gesture interactions',
      'Adaptive layouts'
    ]
  },
  {
    icon: <Monitor />,
    title: 'Web Application Design',
    description: 'Scalable designs for complex web applications',
    features: [
      'Dashboard design',
      'Data visualization',
      'Admin panels',
      'SaaS interfaces'
    ]
  }
];

const designProcess = [
  {
    step: '01',
    title: 'Research & Discovery',
    description: 'Understanding your users, competitors, and business goals',
    duration: '1-2 weeks'
  },
  {
    step: '02',
    title: 'Information Architecture',
    description: 'Organizing content and defining user flows',
    duration: '1 week'
  },
  {
    step: '03',
    title: 'Wireframing',
    description: 'Low-fidelity layouts to validate structure and flow',
    duration: '1-2 weeks'
  },
  {
    step: '04',
    title: 'Visual Design',
    description: 'High-fidelity mockups with your brand identity',
    duration: '2-3 weeks'
  },
  {
    step: '05',
    title: 'Prototyping',
    description: 'Interactive prototypes for testing and validation',
    duration: '1-2 weeks'
  },
  {
    step: '06',
    title: 'Handoff & Support',
    description: 'Development-ready assets and ongoing collaboration',
    duration: 'Ongoing'
  }
];

const tools = [
  { name: 'Figma', icon: '🎨' },
  { name: 'Adobe XD', icon: '🔷' },
  { name: 'Sketch', icon: '💎' },
  { name: 'Framer', icon: '🎭' },
  { name: 'InVision', icon: '👁️' },
  { name: 'Miro', icon: '🎯' }
];

const principles = [
  {
    icon: <Eye />,
    title: 'User-Centric',
    description: 'Every design decision validated with real users'
  },
  {
    icon: <Zap />,
    title: 'Intuitive',
    description: 'Interfaces that feel natural and require no learning'
  },
  {
    icon: <Target />,
    title: 'Goal-Oriented',
    description: 'Designs that drive conversions and objectives'
  },
  {
    icon: <Award />,
    title: 'Accessible',
    description: 'WCAG compliant designs for all users'
  }
];

const portfolioItems = [
  {
    title: 'Healthcare Dashboard',
    category: 'Healthcare',
    stats: { metric: '45%', label: 'Efficiency Increase' }
  },
  {
    title: 'Banking Mobile App',
    category: 'Fintech',
    stats: { metric: '4.9★', label: 'User Rating' }
  },
  {
    title: 'E-commerce Platform',
    category: 'Retail',
    stats: { metric: '180%', label: 'Conversion Boost' }
  }
];

const pricing = [
  {
    name: 'UX Audit',
    price: '$3,500',
    description: 'Identify usability issues in your existing product',
    features: [
      'Heuristic evaluation',
      'User flow analysis',
      'Accessibility audit',
      'Detailed report',
      '2 week turnaround'
    ],
    popular: false
  },
  {
    name: 'Complete Design',
    price: '$12,000',
    description: 'End-to-end UI/UX design for new products',
    features: [
      'User research',
      'Information architecture',
      'Wireframes & prototypes',
      'Visual design',
      'Design system',
      'Usability testing',
      'Developer handoff'
    ],
    popular: true
  },
  {
    name: 'Design Partner',
    price: 'Custom',
    description: 'Ongoing design support for growing teams',
    features: [
      'Dedicated designer',
      'Unlimited requests',
      'Design system maintenance',
      'A/B test designs',
      'Priority support',
      'Flexible contract'
    ],
    popular: false
  }
];

export default function UIUXDesign() {
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
              <span>User-Centric Digital Experiences</span>
            </div>
            <h1 className={styles.title}>
              UI/UX Design That
              <span className={styles.gradient}> Users Love</span>
            </h1>
            <p className={styles.subtitle}>
              We craft intuitive, beautiful interfaces that solve real user problems. 
              From research to pixel-perfect designs, we create experiences that 
              drive engagement and business growth.
            </p>
            <div className={styles.heroButtons}>
              <Link href="#pricing" className={styles.primaryBtn}>
                Get Free Design Audit
                <ArrowRight size={20} />
              </Link>
              <Link href="#portfolio" className={styles.secondaryBtn}>
                View Design Work
              </Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>300+</span>
                <span className={styles.statLabel}>Designs Delivered</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>95%</span>
                <span className={styles.statLabel}>User Satisfaction</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>2.5x</span>
                <span className={styles.statLabel}>Avg. Conversion Lift</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Design Principles */}
      <section className={styles.principles}>
        <div className={styles.sectionHeader}>
          <h2>Our Design Philosophy</h2>
          <p>Guiding principles that drive every design decision</p>
        </div>
        <div className={styles.principlesGrid}>
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              className={styles.principleCard}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.principleIcon}>{principle.icon}</div>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Design Services */}
      <section className={styles.services}>
        <div className={styles.sectionHeader}>
          <h2>Our UI/UX Design Services</h2>
          <p>Comprehensive design solutions for digital products</p>
        </div>
        <div className={styles.servicesGrid}>
          {designServices.map((service, index) => (
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

      {/* Design Process */}
      <section className={styles.process}>
        <div className={styles.sectionHeader}>
          <h2>Our Design Process</h2>
          <p>A proven methodology that delivers exceptional user experiences</p>
        </div>
        <div className={styles.processTimeline}>
          {designProcess.map((item, index) => (
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

      {/* Tools */}
      <section className={styles.tools}>
        <div className={styles.sectionHeader}>
          <h2>Design Tools We Master</h2>
          <p>Industry-leading tools for world-class designs</p>
        </div>
        <div className={styles.toolsGrid}>
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              className={styles.toolCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <span className={styles.toolIcon}>{tool.icon}</span>
              <span className={styles.toolName}>{tool.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className={styles.portfolio} id="portfolio">
        <div className={styles.sectionHeader}>
          <h2>Featured Design Projects</h2>
          <p>Real results from our UI/UX design work</p>
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
                  <Layers size={48} />
                </div>
              </div>
              <div className={styles.portfolioInfo}>
                <span className={styles.category}>{item.category}</span>
                <h3>{item.title}</h3>
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
            View All Design Work
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Pricing */}
      <section className={styles.pricing} id="pricing">
        <div className={styles.sectionHeader}>
          <h2>UI/UX Design Pricing</h2>
          <p>Flexible options for every project stage</p>
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
          <h2>Ready to Create Amazing User Experiences?</h2>
          <p>
            Let's transform your product with beautiful, intuitive design. 
            Get a free UX audit and design consultation from our experts.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.primaryBtn}>
              Get Free UX Audit
              <ArrowRight size={20} />
            </Link>
            <Link href="/portfolio" className={styles.secondaryBtn}>
              See More Designs
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}