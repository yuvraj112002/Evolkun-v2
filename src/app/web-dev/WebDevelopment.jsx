"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Globe,
  Zap,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from "./WebDevelopment.module.scss";

const technologies = [
  { name: "React", src: "web dev/react-js-icon.svg" },
  { name: "Node.js", src: "web dev/node-js-icon.svg" },
  { name: "TypeScript", src: "web dev/typescript-programming-language-icon.svg" },
  { name: "PostgreSQL", src: "web dev/postgresql-icon.svg" },
  { name: "MySQL", src: "web dev/mysql-icon.svg" },
  { name: "MongoDB", src: "web dev/mongodb-icon.svg" },
  { name: "AWS", src: "web dev/aws-icon.svg" },
  { name: "Vercel", src: "web dev/vercel-v0-icon.svg" },
  { name: "WordPress", src: "web dev/wordpress-icon.svg" },
  { name: "WooCommerce", src: "web dev/woocommerce-icon.svg" },
  { name: "Shopify", src: "web dev/shopify-icon.svg" },
  { name: "phpMyAdmin", src: "web dev/phpmyadmin-icon.svg" },
  { name: "Webflow", src: "web dev/webflow-icon.svg" },
  { name: "framer", src: "web dev/framer-black-icon.svg" },
  { name: "wix", src: "web dev/wix-company-icon.svg" },

  
];

const services = [
  {
    icon: <Globe />,
    title: "Modern Websites",
    description: "Lightning-fast, SEO-optimized websites built with the latest technologies",
    features: [
      "Responsive design across all devices",
      "Performance optimization",
      "SEO best practices",
      "Accessibility compliance",
    ],
  },
  {
    icon: <Code2 />,
    title: "Web Applications",
    description: "Scalable web apps that grow with your business",
    features: ["Custom functionality", "Real-time features", "API integrations", "Database architecture"],
  },
  {
    icon: <Smartphone />,
    title: "Progressive Web Apps",
    description: "App-like experiences that work offline and install on any device",
    features: ["Offline functionality", "Push notifications", "App-like experience", "Cross-platform compatibility"],
  },
  {
    icon: <Zap />,
    title: "Performance Optimization",
    description: "Make your existing website blazing fast",
    features: ["Speed optimization", "Core Web Vitals improvement", "Code splitting", "Image optimization"],
  },
];

const process = [
  { step: "01", title: "Discovery & Planning", description: "We understand your business goals and define project scope", duration: "1-2 weeks" },
  { step: "02", title: "Design & Prototype", description: "Create wireframes and interactive prototypes for feedback", duration: "2-3 weeks" },
  { step: "03", title: "Development", description: "Build your website with clean, maintainable code", duration: "4-8 weeks" },
  { step: "04", title: "Testing & Launch", description: "Rigorous testing followed by smooth deployment", duration: "1-2 weeks" },
  { step: "05", title: "Support & Growth", description: "Ongoing maintenance and feature enhancements", duration: "Ongoing" },
];

const portfolioItems = [
  { title: "E-commerce Platform", category: "Retail", image: "/portfolio/ecommerce.jpg", stats: { metric: "+150%", label: "Sales Growth" } },
  { title: "SaaS Dashboard", category: "Technology", image: "/portfolio/saas.jpg", stats: { metric: "50k+", label: "Active Users" } },
  { title: "Healthcare Portal", category: "Healthcare", image: "/portfolio/healthcare.jpg", stats: { metric: "99.9%", label: "Uptime" } },
];

const pricing = [
  {
    name: "Starter",
    price: "$2,999",
    description: "Perfect for small businesses and startups",
    features: ["5-7 page website", "Responsive design", "Basic SEO setup", "Contact forms", "1 month support", "CMS integration"],
    popular: false,
  },
  {
    name: "Professional",
    price: "$5,999",
    description: "For growing businesses that need more",
    features: [
      "10-15 page website",
      "Custom design",
      "Advanced SEO",
      "E-commerce ready",
      "3 months support",
      "Analytics setup",
      "Performance optimization",
      "Content migration",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large organizations",
    features: [
      "Unlimited pages",
      "Custom functionality",
      "Advanced integrations",
      "Dedicated team",
      "12 months support",
      "Priority support",
      "Custom analytics",
      "Security audits",
    ],
    popular: false,
  },
];

export default function WebDevelopment() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className={styles.badge}>
              <Sparkles size={16} />
              <span>Modern & Scalable</span>
            </div>

            <h1 className={styles.title}>
              Web Development That
              <span className={styles.gradient}> Drives Results</span>
            </h1>

            <p className={styles.subtitle}>
              We build lightning-fast, SEO-optimized websites and web applications that help your business grow.
              From concept to launch and beyond.
            </p>

            <div className={styles.heroButtons}>
              <Link href="#pricing" className={styles.primaryBtn}>
                Get Free Quote
                <ArrowRight size={20} />
              </Link>
              <Link href="#portfolio" className={styles.secondaryBtn}>
                View Our Work
              </Link>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>200+</span>
                <span className={styles.statLabel}>Projects Delivered</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>98%</span>
                <span className={styles.statLabel}>Client Satisfaction</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>24/7</span>
                <span className={styles.statLabel}>Support Available</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technologies */}
      <section className={styles.technologies}>
        <div className={styles.sectionHeader}>
          <h2>Powered by Modern Technologies</h2>
          <p>We use cutting-edge tools to build fast, secure, and scalable solutions</p>
        </div>

        <div className={styles.techGrid}>
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className={styles.techCard}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <span className={styles.techIcon}>
                <Image
                  src={tech.src}
                  alt={tech.name}
                  width={28}
                  height={28}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className={styles.techName}>{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className={styles.services}>
        <div className={styles.sectionHeader}>
          <h2>Our Web Development Services</h2>
          <p>Comprehensive solutions tailored to your needs</p>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={styles.serviceCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
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

      {/* Process */}
      <section className={styles.process}>
        <div className={styles.sectionHeader}>
          <h2>Our Development Process</h2>
          <p>A proven methodology that delivers exceptional results</p>
        </div>

        <div className={styles.processTimeline}>
          {process.map((item, index) => (
            <motion.div
              key={item.step}
              className={styles.processStep}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
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

      {/* Portfolio Preview */}
      <section className={styles.portfolio} id="portfolio">
        <div className={styles.sectionHeader}>
          <h2>Recent Projects</h2>
          <p>See how we've helped businesses like yours succeed</p>
        </div>

        <div className={styles.portfolioGrid}>
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.title}
              className={styles.portfolioCard}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.portfolioImage}>
                <div className={styles.imagePlaceholder}>
                  <Globe size={48} />
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
            View Full Portfolio
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Pricing */}
      <section className={styles.pricing} id="pricing">
        <div className={styles.sectionHeader}>
          <h2>Transparent Pricing</h2>
          <p>Choose the package that fits your needs and budget</p>
        </div>

        <div className={styles.pricingGrid}>
          {pricing.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`${styles.pricingCard} ${plan.popular ? styles.popular : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: index * 0.1 }}
            >
              {plan.popular && <div className={styles.popularBadge}>Most Popular</div>}
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
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <h2>Ready to Start Your Project?</h2>
          <p>
            Let's discuss your vision and create something amazing together.
            Get a free consultation and quote today.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.primaryBtn}>
              Get Free Consultation
              <ArrowRight size={20} />
            </Link>
            <Link href="/portfolio" className={styles.secondaryBtn}>
              View More Work
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
