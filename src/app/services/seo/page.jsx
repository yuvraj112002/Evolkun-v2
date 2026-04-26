"use client";
import React, { useState } from 'react';
import { 
  Search, TrendingUp, Target, Zap, BarChart3, Globe,
  FileText, Link2, Smartphone, Gauge, Award, CheckCircle2,
  ArrowRight, Users, Clock, Shield, ChevronDown, ChevronUp,
  LineChart, Activity, Eye, MousePointer, Layers, Code2,
  Server, Image as ImageIcon, Settings, Star, DollarSign
} from 'lucide-react';
import Link from 'next/link';
import styles from './SEOPerformance.module.scss';

const SEOPerformance = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState('growth');

  const services = [
    {
      icon: Search,
      title: 'Technical SEO',
      description: 'Optimize your website\'s technical foundation for search engines',
      features: [
        'Comprehensive SEO audit',
        'Site architecture optimization',
        'XML sitemap creation',
        'Robots.txt configuration',
        'Schema markup implementation',
        'Canonical URL setup',
        'SSL & HTTPS migration',
        'Mobile-first indexing'
      ]
    },
    {
      icon: FileText,
      title: 'On-Page SEO',
      description: 'Optimize individual pages to rank higher and earn relevant traffic',
      features: [
        'Keyword research & mapping',
        'Title tag optimization',
        'Meta description writing',
        'Header tag structure',
        'Content optimization',
        'Image alt text optimization',
        'Internal linking strategy',
        'URL structure optimization'
      ]
    },
    {
      icon: Link2,
      title: 'Off-Page SEO',
      description: 'Build authority and credibility through quality backlinks',
      features: [
        'Link building strategy',
        'Guest posting outreach',
        'Directory submissions',
        'Social bookmarking',
        'Brand mentions monitoring',
        'Competitor backlink analysis',
        'Broken link building',
        'Digital PR campaigns'
      ]
    },
    {
      icon: Target,
      title: 'Local SEO',
      description: 'Dominate local search results and Google Maps',
      features: [
        'Google Business Profile optimization',
        'Local citation building',
        'NAP consistency audit',
        'Local keyword targeting',
        'Review generation strategy',
        'Location page creation',
        'Local schema markup',
        'Google Maps optimization'
      ]
    },
    {
      icon: Gauge,
      title: 'Page Speed Optimization',
      description: 'Lightning-fast load times for better rankings and conversions',
      features: [
        'Core Web Vitals optimization',
        'Image compression & optimization',
        'Code minification',
        'Browser caching setup',
        'CDN implementation',
        'Lazy loading images',
        'Database optimization',
        'Server response time reduction'
      ]
    },
    {
      icon: BarChart3,
      title: 'SEO Analytics & Reporting',
      description: 'Track, measure, and optimize your SEO performance',
      features: [
        'Google Analytics setup',
        'Search Console integration',
        'Keyword ranking tracking',
        'Traffic analysis',
        'Conversion tracking',
        'Competitor monitoring',
        'Monthly SEO reports',
        'ROI measurement'
      ]
    }
  ];

  const performanceMetrics = [
    {
      metric: 'Page Speed',
      icon: Zap,
      before: '4.5s',
      after: '0.8s',
      improvement: '82%',
      color: '#f59e0b'
    },
    {
      metric: 'Organic Traffic',
      icon: TrendingUp,
      before: '2.5K/mo',
      after: '15K/mo',
      improvement: '+500%',
      color: '#10b981'
    },
    {
      metric: 'Keyword Rankings',
      icon: Target,
      before: '12 top 10',
      after: '87 top 10',
      improvement: '+625%',
      color: '#6366f1'
    },
    {
      metric: 'Conversion Rate',
      icon: MousePointer,
      before: '1.2%',
      after: '3.8%',
      improvement: '+217%',
      color: '#ec4899'
    }
  ];

  const seoPackages = [
    {
      id: 'starter',
      name: 'Starter SEO',
      price: '$799',
      period: '/month',
      bestFor: 'Small businesses & new websites',
      features: [
        'Up to 10 target keywords',
        'Monthly SEO audit',
        'On-page optimization (5 pages)',
        'Basic link building (5 links/month)',
        'Google My Business setup',
        'Monthly performance report',
        'Email support'
      ],
      highlighted: false
    },
    {
      id: 'growth',
      name: 'Growth SEO',
      price: '$1,999',
      period: '/month',
      bestFor: 'Growing businesses ready to scale',
      features: [
        'Up to 30 target keywords',
        'Bi-weekly SEO audits',
        'On-page optimization (20 pages)',
        'Advanced link building (15 links/month)',
        'Content creation (4 blog posts)',
        'Local SEO optimization',
        'Competitor analysis',
        'Technical SEO fixes',
        'Bi-weekly reports',
        'Priority support'
      ],
      highlighted: true,
      badge: 'Most Popular'
    },
    {
      id: 'enterprise',
      name: 'Enterprise SEO',
      price: '$4,999',
      period: '/month',
      bestFor: 'Large businesses & e-commerce',
      features: [
        'Unlimited target keywords',
        'Weekly SEO audits',
        'On-page optimization (unlimited)',
        'Premium link building (40+ links/month)',
        'Content creation (12 blog posts)',
        'E-commerce SEO',
        'International SEO',
        'Advanced technical SEO',
        'Dedicated account manager',
        'Weekly strategy calls',
        'Custom reporting dashboard',
        '24/7 priority support'
      ],
      highlighted: false
    }
  ];

  const caseStudies = [
    {
      industry: 'E-commerce',
      client: 'Fashion Retailer',
      challenge: 'Low organic visibility, page 3+ rankings for key terms',
      solution: 'Complete technical SEO overhaul, content strategy, and link building campaign',
      timeline: '6 months',
      results: [
        '487% increase in organic traffic',
        '156 keywords ranking in top 3',
        '$250K additional monthly revenue',
        'Page speed improved from 3.8s to 0.9s'
      ],
      metrics: {
        traffic: '+487%',
        keywords: '156',
        revenue: '$250K',
        speed: '0.9s'
      }
    },
    {
      industry: 'SaaS',
      client: 'Project Management Tool',
      challenge: 'Competing with established brands, low domain authority',
      solution: 'Content marketing strategy, technical optimization, digital PR',
      timeline: '8 months',
      results: [
        '342% organic traffic growth',
        'Domain authority from 18 to 45',
        '12,500 new trial signups from organic',
        '95+ Google PageSpeed score'
      ],
      metrics: {
        traffic: '+342%',
        authority: '45 DA',
        signups: '12.5K',
        score: '95'
      }
    },
    {
      industry: 'Local Services',
      client: 'Dental Practice Network',
      challenge: 'Poor local visibility across 8 locations',
      solution: 'Local SEO strategy, Google Business optimization, review management',
      timeline: '4 months',
      results: [
        '278% increase in local search traffic',
        'All locations in top 3 map pack',
        '450+ new patient appointments',
        '4.8 star average rating'
      ],
      metrics: {
        traffic: '+278%',
        rankings: 'Top 3',
        leads: '450+',
        rating: '4.8★'
      }
    }
  ];

  const seoProcess = [
    {
      step: '01',
      title: 'SEO Audit & Analysis',
      description: 'Comprehensive analysis of your current SEO performance, technical issues, and opportunities',
      deliverables: ['Technical audit report', 'Competitor analysis', 'Keyword research', 'SEO roadmap']
    },
    {
      step: '02',
      title: 'Strategy Development',
      description: 'Create a customized SEO strategy based on your goals, industry, and competition',
      deliverables: ['SEO strategy document', 'Content calendar', 'Link building plan', 'Success metrics']
    },
    {
      step: '03',
      title: 'On-Page Optimization',
      description: 'Optimize website content, structure, and technical elements for search engines',
      deliverables: ['Optimized pages', 'Meta tags', 'Schema markup', 'Internal links']
    },
    {
      step: '04',
      title: 'Content Creation',
      description: 'Develop high-quality, keyword-optimized content that attracts and engages users',
      deliverables: ['Blog posts', 'Landing pages', 'Product descriptions', 'FAQs']
    },
    {
      step: '05',
      title: 'Link Building',
      description: 'Acquire high-quality backlinks from authoritative websites in your industry',
      deliverables: ['Guest posts', 'Directory listings', 'Digital PR', 'Link reports']
    },
    {
      step: '06',
      title: 'Monitor & Optimize',
      description: 'Continuous monitoring, testing, and optimization to improve rankings and traffic',
      deliverables: ['Monthly reports', 'Ranking updates', 'Traffic analysis', 'Strategy adjustments']
    }
  ];

  const tools = [
    { name: 'Google Analytics', icon: '📊' },
    { name: 'Google Search Console', icon: '🔍' },
    { name: 'Ahrefs', icon: '🔗' },
    { name: 'SEMrush', icon: '📈' },
    { name: 'Screaming Frog', icon: '🕷️' },
    { name: 'GTmetrix', icon: '⚡' },
    { name: 'PageSpeed Insights', icon: '🚀' },
    { name: 'Moz Pro', icon: '📉' }
  ];

  const faqs = [
    {
      question: 'How long does it take to see SEO results?',
      answer: 'SEO is a long-term strategy. You can expect to see initial improvements in 3-4 months, with significant results typically appearing after 6-12 months. Factors like competition, current website state, and industry affect timelines.'
    },
    {
      question: 'What\'s the difference between on-page and off-page SEO?',
      answer: 'On-page SEO involves optimizing elements on your website (content, meta tags, structure), while off-page SEO focuses on external factors like backlinks, social signals, and brand mentions that influence your rankings.'
    },
    {
      question: 'Do you guarantee first page rankings?',
      answer: 'We don\'t guarantee specific rankings as search algorithms constantly evolve. However, we guarantee our best efforts using proven strategies, transparent reporting, and continuous optimization to improve your visibility and organic traffic.'
    },
    {
      question: 'How do you measure SEO success?',
      answer: 'We track multiple metrics: organic traffic growth, keyword rankings, conversion rates, page speed, backlink quality, domain authority, and ultimately, the ROI from organic search in terms of leads and revenue.'
    },
    {
      question: 'Will SEO work for my industry?',
      answer: 'Yes! SEO works for virtually every industry. We customize our approach based on your specific market, competition, and business goals. We have experience across e-commerce, SaaS, local services, B2B, and more.'
    },
    {
      question: 'What happens if I stop SEO services?',
      answer: 'Your rankings will gradually decline as competitors continue optimizing and algorithms change. SEO is an ongoing process. However, the content and technical improvements made will continue providing value long-term.'
    }
  ];

  return (
    <div className={styles.seoPerformancePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <Search size={14} />
            SEO & Performance Optimization
          </div>
          <h1 className={styles.heroTitle}>
            Rank Higher, Load Faster
            <span className={styles.gradient}> Convert Better</span>
          </h1>
          <p className={styles.heroDescription}>
            Comprehensive SEO strategies and performance optimization that drive organic traffic, 
            improve user experience, and increase conversions. Get found by customers actively searching for your services.
          </p>
          
          <div className={styles.heroButtons}>
            <button className={styles.primaryBtn}>
              Get Free SEO Audit
              <ArrowRight size={20} />
            </button>
            <button className={styles.secondaryBtn}>
              <BarChart3 size={18} />
              View Case Studies
            </button>
          </div>

          <div className={styles.trustBadges}>
            <div className={styles.trustItem}>
              <Award size={18} />
              <span>Google Certified</span>
            </div>
            <div className={styles.trustItem}>
              <Star size={18} />
              <span>500+ Page 1 Rankings</span>
            </div>
            <div className={styles.trustItem}>
              <CheckCircle2 size={18} />
              <span>White Hat Only</span>
            </div>
          </div>
        </div>

        <div className={styles.heroBackground}>
          <div className={styles.gridPattern}></div>
          <div className={styles.gradientOrb} style={{ '--orb-color': '#10b981' }}></div>
          <div className={styles.gradientOrb} style={{ '--orb-color': '#14b8a6' }}></div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className={styles.metricsSection}>
        <div className={styles.container}>
          <div className={styles.metricsGrid}>
            {performanceMetrics.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className={styles.metricCard}>
                  <div className={styles.metricIcon} style={{ '--metric-color': item.color }}>
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className={styles.metricName}>{item.metric}</h3>
                  <div className={styles.metricComparison}>
                    <div className={styles.metricBefore}>
                      <span className={styles.metricLabel}>Before</span>
                      <span className={styles.metricValue}>{item.before}</span>
                    </div>
                    <ArrowRight size={20} className={styles.metricArrow} />
                    <div className={styles.metricAfter}>
                      <span className={styles.metricLabel}>After</span>
                      <span className={styles.metricValue}>{item.after}</span>
                    </div>
                  </div>
                  <div className={styles.metricImprovement} style={{ '--metric-color': item.color }}>
                    <TrendingUp size={16} />
                    {item.improvement} Improvement
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Complete SEO Services</h2>
            <p className={styles.sectionDescription}>
              End-to-end SEO solutions to dominate search results
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

      {/* SEO Process */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our SEO Process</h2>
            <p className={styles.sectionDescription}>
              A proven methodology that delivers sustainable results
            </p>
          </div>

          <div className={styles.processGrid}>
            {seoProcess.map((item, index) => (
              <div key={index} className={styles.processCard}>
                <div className={styles.processStep}>{item.step}</div>
                <h3 className={styles.processTitle}>{item.title}</h3>
                <p className={styles.processDescription}>{item.description}</p>
                <div className={styles.processDeliverables}>
                  <h4>Deliverables:</h4>
                  <ul>
                    {item.deliverables.map((deliverable, i) => (
                      <li key={i}>
                        <CheckCircle2 size={14} />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className={styles.pricingSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>SEO Packages</h2>
            <p className={styles.sectionDescription}>
              Choose the plan that fits your business goals
            </p>
          </div>

          <div className={styles.pricingGrid}>
            {seoPackages.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`${styles.pricingCard} ${pkg.highlighted ? styles.highlighted : ''}`}
              >
                {pkg.badge && (
                  <div className={styles.pricingBadge}>{pkg.badge}</div>
                )}
                <div className={styles.pricingHeader}>
                  <h3 className={styles.pricingName}>{pkg.name}</h3>
                  <div className={styles.pricingPrice}>
                    {pkg.price}
                    <span className={styles.pricingPeriod}>{pkg.period}</span>
                  </div>
                  <p className={styles.pricingBestFor}>{pkg.bestFor}</p>
                </div>

                <ul className={styles.pricingFeatures}>
                  {pkg.features.map((feature, index) => (
                    <li key={index}>
                      <CheckCircle2 size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`${styles.pricingButton} ${pkg.highlighted ? styles.primary : ''}`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  Get Started
                  <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className={styles.caseStudiesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Success Stories</h2>
            <p className={styles.sectionDescription}>
              Real results from real SEO campaigns
            </p>
          </div>

          <div className={styles.caseStudiesGrid}>
            {caseStudies.map((study, index) => (
              <div key={index} className={styles.caseStudyCard}>
                <div className={styles.caseStudyHeader}>
                  <div className={styles.caseStudyIndustry}>{study.industry}</div>
                  <h3 className={styles.caseStudyClient}>{study.client}</h3>
                  <div className={styles.caseStudyTimeline}>
                    <Clock size={14} />
                    {study.timeline}
                  </div>
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

                  <div className={styles.caseStudyMetrics}>
                    {Object.entries(study.metrics).map(([key, value]) => (
                      <div key={key} className={styles.metricBadge}>
                        <span className={styles.metricBadgeValue}>{value}</span>
                        <span className={styles.metricBadgeLabel}>{key}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className={styles.toolsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Enterprise SEO Tools</h2>
            <p className={styles.sectionDescription}>
              We use the best tools in the industry
            </p>
          </div>

          <div className={styles.toolsGrid}>
            {tools.map((tool, index) => (
              <div key={index} className={styles.toolCard}>
                <span className={styles.toolIcon}>{tool.icon}</span>
                <span className={styles.toolName}>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionDescription}>
              Everything you need to know about our SEO services
            </p>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`${styles.faqItem} ${expandedFAQ === index ? styles.expanded : ''}`}
              >
                <button 
                  className={styles.faqQuestion}
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Ready to Dominate Search Results?</h2>
            <p>
              Get a free SEO audit and discover exactly what's holding your website back. 
              No commitments, no credit card required.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryBtn}>
                Get Free SEO Audit
                <ArrowRight size={20} />
              </button>
              <button className={styles.secondaryBtn}>
                <Clock size={18} />
                Schedule Consultation
              </button>
            </div>
            
            <div className={styles.ctaStats}>
              <div className={styles.ctaStat}>
                <TrendingUp size={20} />
                <span>500+ Page 1 Rankings</span>
              </div>
              <div className={styles.ctaStat}>
                <Award size={20} />
                <span>98% Client Retention</span>
              </div>
              <div className={styles.ctaStat}>
                <Users size={20} />
                <span>200+ Businesses Helped</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.ctaBackground}>
          <div className={styles.gradientOrb} style={{ '--orb-color': '#10b981' }}></div>
          <div className={styles.gradientOrb} style={{ '--orb-color': '#14b8a6' }}></div>
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

export default SEOPerformance;