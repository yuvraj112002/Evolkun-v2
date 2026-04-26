"use client";
import React, { useState } from 'react';
import { 
  TrendingUp, Target, Users, BarChart3, Mail, Share2,
  Search, MessageSquare, Video, Award, CheckCircle2,
  ArrowRight, Zap, DollarSign, Globe, Clock, Star
} from 'lucide-react';
import Link from 'next/link';
import styles from './DigitalMarketing.module.scss';

const DigitalMarketing = () => {
  const [selectedPlan, setSelectedPlan] = useState('growth');

  const services = [
    {
      icon: Share2,
      title: 'Social Media Marketing',
      description: 'Build engaged communities and drive conversions across all major platforms',
      features: [
        'Content strategy & planning',
        'Multi-platform management',
        'Community engagement',
        'Paid social advertising',
        'Influencer partnerships',
        'Performance analytics'
      ]
    },
    {
      icon: Search,
      title: 'Search Engine Marketing',
      description: 'Get instant visibility with targeted Google Ads and PPC campaigns',
      features: [
        'Google Ads management',
        'Keyword research & targeting',
        'Ad copywriting & testing',
        'Landing page optimization',
        'Bid strategy optimization',
        'ROI tracking & reporting'
      ]
    },
    {
      icon: Mail,
      title: 'Email Marketing',
      description: 'Nurture leads and drive sales with personalized email campaigns',
      features: [
        'Email campaign strategy',
        'List segmentation',
        'Automated drip campaigns',
        'Template design',
        'A/B testing',
        'Performance optimization'
      ]
    },
    {
      icon: Video,
      title: 'Content Marketing',
      description: 'Create compelling content that attracts, engages, and converts',
      features: [
        'Content strategy development',
        'Blog writing & SEO',
        'Video production',
        'Infographics & visuals',
        'eBooks & whitepapers',
        'Content distribution'
      ]
    },
    {
      icon: MessageSquare,
      title: 'Conversion Optimization',
      description: 'Turn more visitors into customers with data-driven CRO strategies',
      features: [
        'Website audit & analysis',
        'User behavior tracking',
        'A/B & multivariate testing',
        'Landing page optimization',
        'Funnel optimization',
        'UX improvements'
      ]
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reporting',
      description: 'Make informed decisions with comprehensive data insights',
      features: [
        'Google Analytics setup',
        'Custom dashboard creation',
        'KPI tracking',
        'Monthly performance reports',
        'Competitor analysis',
        'ROI measurement'
      ]
    }
  ];

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$999',
      period: '/month',
      description: 'Perfect for small businesses getting started with digital marketing',
      features: [
        'Social media management (2 platforms)',
        'Monthly content calendar (12 posts)',
        'Basic email campaigns',
        'Monthly analytics report',
        'Email support',
        '1 campaign per month'
      ],
      highlighted: false
    },
    {
      id: 'growth',
      name: 'Growth',
      price: '$2,499',
      period: '/month',
      description: 'Ideal for growing businesses looking to scale their marketing',
      features: [
        'Social media management (4 platforms)',
        'Monthly content calendar (30 posts)',
        'Advanced email automation',
        'Google Ads management ($1,000 ad spend)',
        'Bi-weekly analytics reports',
        'Priority support',
        '3 campaigns per month',
        'A/B testing & optimization',
        'Conversion rate optimization'
      ],
      highlighted: true,
      badge: 'Most Popular'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Comprehensive solutions for established businesses',
      features: [
        'Full-service digital marketing',
        'Unlimited platforms & campaigns',
        'Dedicated account manager',
        'Custom strategy & planning',
        'Advanced automation & AI',
        'Real-time reporting dashboard',
        'Weekly strategy calls',
        'Dedicated creative team',
        'Priority 24/7 support'
      ],
      highlighted: false
    }
  ];

  const results = [
    {
      metric: '300%',
      label: 'Average ROI increase',
      icon: TrendingUp
    },
    {
      metric: '150%',
      label: 'Lead generation growth',
      icon: Target
    },
    {
      metric: '45%',
      label: 'Conversion rate boost',
      icon: DollarSign
    },
    {
      metric: '200%',
      label: 'Social engagement up',
      icon: Users
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Analysis',
      description: 'We analyze your business, competitors, and target audience to identify opportunities'
    },
    {
      step: '02',
      title: 'Strategy Development',
      description: 'Create a custom marketing strategy aligned with your business goals and budget'
    },
    {
      step: '03',
      title: 'Campaign Launch',
      description: 'Execute multi-channel campaigns with compelling creatives and targeted messaging'
    },
    {
      step: '04',
      title: 'Optimize & Scale',
      description: 'Continuously monitor, test, and optimize for maximum ROI and sustainable growth'
    }
  ];

  const platforms = [
    { name: 'Google Ads', icon: '🎯' },
    { name: 'Meta Ads', icon: '📘' },
    { name: 'LinkedIn', icon: '💼' },
    { name: 'Instagram', icon: '📸' },
    { name: 'Twitter/X', icon: '🐦' },
    { name: 'TikTok', icon: '🎵' },
    { name: 'YouTube', icon: '▶️' },
    { name: 'Pinterest', icon: '📌' }
  ];

  const caseStudies = [
    {
      client: 'E-commerce Fashion Brand',
      challenge: 'Low online sales and poor social media engagement',
      solution: 'Implemented influencer marketing, Instagram shopping, and retargeting campaigns',
      results: [
        '250% increase in online sales',
        '400% growth in Instagram followers',
        '3.5x ROAS on ad spend'
      ]
    },
    {
      client: 'B2B SaaS Company',
      challenge: 'High cost per acquisition and low lead quality',
      solution: 'LinkedIn lead gen campaigns, content marketing, and email nurture sequences',
      results: [
        '60% reduction in cost per lead',
        '200% increase in qualified leads',
        '45% improvement in conversion rate'
      ]
    },
    {
      client: 'Local Service Business',
      challenge: 'Limited online visibility and inconsistent leads',
      solution: 'Google Ads, local SEO, and automated email follow-ups',
      results: [
        '180% increase in website traffic',
        '320% more monthly leads',
        '$150K additional revenue in 6 months'
      ]
    }
  ];

  return (
    <div className={styles.digitalMarketingPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <Zap size={14} />
            Digital Marketing Services
          </div>
          <h1 className={styles.heroTitle}>
            Growth-Driven Marketing
            <span className={styles.gradient}> That Delivers Results</span>
          </h1>
          <p className={styles.heroDescription}>
            Data-driven digital marketing strategies that attract, engage, and convert your ideal customers. 
            From social media to PPC, we help you reach and grow your audience across all channels.
          </p>
          
          <div className={styles.heroButtons}>
            <button className={styles.primaryBtn}>
              Get Free Marketing Audit
              <ArrowRight size={20} />
            </button>
            <button className={styles.secondaryBtn}>
              <Video size={18} />
              Watch Case Studies
            </button>
          </div>

          <div className={styles.trustBadges}>
            <div className={styles.trustItem}>
              <Award size={18} />
              <span>Google Partner</span>
            </div>
            <div className={styles.trustItem}>
              <Star size={18} />
              <span>Meta Business Partner</span>
            </div>
            <div className={styles.trustItem}>
              <CheckCircle2 size={18} />
              <span>HubSpot Certified</span>
            </div>
          </div>
        </div>

        <div className={styles.heroBackground}>
          <div className={styles.gridPattern}></div>
          <div className={styles.gradientOrb} style={{ '--orb-color': '#ef4444' }}></div>
          <div className={styles.gradientOrb} style={{ '--orb-color': '#f59e0b' }}></div>
        </div>
      </section>

      {/* Results Section */}
      <section className={styles.resultsSection}>
        <div className={styles.container}>
          <div className={styles.resultsGrid}>
            {results.map((result, index) => {
              const Icon = result.icon;
              return (
                <div key={index} className={styles.resultCard}>
                  <Icon size={32} className={styles.resultIcon} />
                  <div className={styles.resultMetric}>{result.metric}</div>
                  <div className={styles.resultLabel}>{result.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Comprehensive Marketing Services</h2>
            <p className={styles.sectionDescription}>
              Everything you need to build, grow, and scale your online presence
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  <ul className={styles.serviceFeatures}>
                    {service.features.map((feature, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Proven Process</h2>
            <p className={styles.sectionDescription}>
              A systematic approach to marketing success
            </p>
          </div>

          <div className={styles.processGrid}>
            {process.map((item, index) => (
              <div key={index} className={styles.processCard}>
                <div className={styles.processStep}>{item.step}</div>
                <h3 className={styles.processTitle}>{item.title}</h3>
                <p className={styles.processDescription}>{item.description}</p>
                {index < process.length - 1 && (
                  <div className={styles.processArrow}>
                    <ArrowRight size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className={styles.platformsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Platforms We Master</h2>
            <p className={styles.sectionDescription}>
              Reach your audience wherever they are
            </p>
          </div>

          <div className={styles.platformsGrid}>
            {platforms.map((platform, index) => (
              <div key={index} className={styles.platformCard}>
                <span className={styles.platformIcon}>{platform.icon}</span>
                <span className={styles.platformName}>{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={styles.pricingSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Transparent Pricing</h2>
            <p className={styles.sectionDescription}>
              Choose the plan that fits your business goals
            </p>
          </div>

          <div className={styles.pricingGrid}>
            {pricingPlans.map((plan) => (
              <div 
                key={plan.id} 
                className={`${styles.pricingCard} ${plan.highlighted ? styles.highlighted : ''}`}
              >
                {plan.badge && (
                  <div className={styles.pricingBadge}>{plan.badge}</div>
                )}
                <div className={styles.pricingHeader}>
                  <h3 className={styles.pricingName}>{plan.name}</h3>
                  <div className={styles.pricingPrice}>
                    {plan.price}
                    <span className={styles.pricingPeriod}>{plan.period}</span>
                  </div>
                  <p className={styles.pricingDescription}>{plan.description}</p>
                </div>

                <ul className={styles.pricingFeatures}>
                  {plan.features.map((feature, index) => (
                    <li key={index}>
                      <CheckCircle2 size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`${styles.pricingButton} ${plan.highlighted ? styles.primary : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.id === 'enterprise' ? 'Contact Sales' : 'Get Started'}
                  <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className={styles.caseStudiesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Success Stories</h2>
            <p className={styles.sectionDescription}>
              Real results from real clients
            </p>
          </div>

          <div className={styles.caseStudiesGrid}>
            {caseStudies.map((study, index) => (
              <div key={index} className={styles.caseStudyCard}>
                <div className={styles.caseStudyHeader}>
                  <h3 className={styles.caseStudyClient}>{study.client}</h3>
                </div>
                
                <div className={styles.caseStudyContent}>
                  <div className={styles.caseStudySection}>
                    <h4>Challenge</h4>
                    <p>{study.challenge}</p>
                  </div>
                  
                  <div className={styles.caseStudySection}>
                    <h4>Solution</h4>
                    <p>{study.solution}</p>
                  </div>
                  
                  <div className={styles.caseStudySection}>
                    <h4>Results</h4>
                    <ul className={styles.caseStudyResults}>
                      {study.results.map((result, i) => (
                        <li key={i}>
                          <TrendingUp size={16} />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Ready to Accelerate Your Growth?</h2>
            <p>
              Get a free marketing audit and discover untapped opportunities to grow your business.
              No commitment required.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryBtn}>
                Get Free Audit
                <ArrowRight size={20} />
              </button>
              <button className={styles.secondaryBtn}>
                <Clock size={18} />
                Schedule a Call
              </button>
            </div>
            
            <div className={styles.ctaStats}>
              <div className={styles.ctaStat}>
                <Globe size={20} />
                <span>50+ Happy Clients</span>
              </div>
              <div className={styles.ctaStat}>
                <Award size={20} />
                <span>98% Client Satisfaction</span>
              </div>
              <div className={styles.ctaStat}>
                <TrendingUp size={20} />
                <span>$5M+ Revenue Generated</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.ctaBackground}>
          <div className={styles.gradientOrb} style={{ '--orb-color': '#ef4444' }}></div>
          <div className={styles.gradientOrb} style={{ '--orb-color': '#f59e0b' }}></div>
        </div>
      </section>

      {/* Back to Services Link */}
      <div className={styles.backToServices}>
        <div className={styles.container}>
          <Link href="/Services" className={styles.backLink}>
            ← Back to All Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DigitalMarketing;