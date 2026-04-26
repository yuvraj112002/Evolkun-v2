"use client";
import React, { useState } from 'react';
import { 
  Code2, Smartphone, Settings, Palette, Megaphone, 
  Search, Bot, Lightbulb, ArrowRight, CheckCircle2,
  Zap, Shield, TrendingUp, Users, Clock, Award
} from 'lucide-react';
import styles from './Services.module.scss';

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'development', name: 'Development' },
    { id: 'design', name: 'Design & Branding' },
    { id: 'marketing', name: 'Marketing & AI' },
  ];

  const services = [
    {
      category: 'development',
      icon: Code2,
      title: 'Web Development',
      description: 'Modern & scalable websites',
      fullDescription: 'Custom web applications built with cutting-edge technologies. From responsive landing pages to complex enterprise platforms, we deliver scalable, performant solutions.',
      features: [
        'Responsive design across all devices',
        'SEO-optimized architecture',
        'Fast loading times & performance',
        'Secure & scalable infrastructure',
        'CMS integration & management',
        'E-commerce solutions'
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'AWS'],
      deliverables: ['Source code', 'Documentation', 'Deployment', '3 months support'],
      timeline: '4-12 weeks',
      color: '#6366f1'
    },
    {
      category: 'development',
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Android & iOS solutions',
      fullDescription: 'Native and cross-platform mobile applications that deliver exceptional user experiences. Built for performance, scalability, and user engagement.',
      features: [
        'iOS & Android native apps',
        'Cross-platform solutions',
        'Intuitive user interfaces',
        'Real-time synchronization',
        'Push notifications',
        'Analytics integration'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      deliverables: ['App store submission', 'Beta testing', 'App analytics', '6 months support'],
      timeline: '8-16 weeks',
      color: '#8b5cf6'
    },
    {
      category: 'development',
      icon: Settings,
      title: 'Custom Software',
      description: 'Tailored business software',
      fullDescription: 'Bespoke software solutions designed specifically for your business needs. From workflow automation to enterprise systems, we build software that scales with you.',
      features: [
        'Process automation',
        'Custom workflows',
        'Integration with existing systems',
        'Cloud-based or on-premise',
        'User training & onboarding',
        'Ongoing maintenance'
      ],
      technologies: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Kubernetes'],
      deliverables: ['Custom solution', 'Training materials', 'Documentation', '12 months support'],
      timeline: '12-24 weeks',
      color: '#06b6d4'
    },
    {
      category: 'design',
      icon: Palette,
      title: 'UI/UX Design',
      description: 'User-centric digital experiences',
      fullDescription: 'Beautiful, intuitive interfaces that users love. We combine aesthetic excellence with usability research to create designs that convert and engage.',
      features: [
        'User research & personas',
        'Wireframing & prototyping',
        'Visual design & branding',
        'Usability testing',
        'Design systems',
        'Responsive layouts'
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle'],
      deliverables: ['Design files', 'Prototype', 'Design system', 'Developer handoff'],
      timeline: '3-8 weeks',
      color: '#ec4899'
    },
    {
      category: 'design',
      icon: Lightbulb,
      title: 'Branding',
      description: 'Identity & brand strategy',
      fullDescription: 'Comprehensive brand identity that tells your story. From logo design to complete brand guidelines, we create cohesive visual systems that resonate.',
      features: [
        'Brand strategy & positioning',
        'Logo design & variations',
        'Color palette & typography',
        'Brand guidelines',
        'Marketing collateral',
        'Social media assets'
      ],
      technologies: ['Illustrator', 'Photoshop', 'InDesign', 'After Effects'],
      deliverables: ['Brand book', 'Logo files', 'Templates', 'Style guide'],
      timeline: '4-8 weeks',
      color: '#f59e0b'
    },
    {
      category: 'design',
      icon: Palette,
      title: 'Graphic Design',
      description: 'Creative visual solutions',
      fullDescription: 'Eye-catching graphics for all your marketing needs. From social media posts to print materials, we create visuals that capture attention and communicate effectively.',
      features: [
        'Social media graphics',
        'Marketing materials',
        'Infographics & data visualization',
        'Presentation design',
        'Print design',
        'Illustration & iconography'
      ],
      technologies: ['Illustrator', 'Photoshop', 'InDesign', 'Canva Pro'],
      deliverables: ['Source files', 'Print-ready files', 'Web assets', 'Templates'],
      timeline: '1-4 weeks',
      color: '#14b8a6'
    },
    {
      category: 'marketing',
      icon: Megaphone,
      title: 'Digital Marketing',
      description: 'Growth-driven marketing',
      fullDescription: 'Data-driven marketing strategies that deliver measurable results. From social media to email campaigns, we help you reach and engage your target audience.',
      features: [
        'Social media management',
        'Content marketing strategy',
        'Email campaign management',
        'PPC advertising',
        'Analytics & reporting',
        'Conversion optimization'
      ],
      technologies: ['Google Ads', 'Meta Ads', 'Mailchimp', 'HubSpot', 'Google Analytics'],
      deliverables: ['Marketing strategy', 'Content calendar', 'Analytics reports', 'Campaign assets'],
      timeline: 'Ongoing/Monthly',
      color: '#ef4444'
    },
    {
      category: 'marketing',
      icon: Search,
      title: 'SEO & Performance',
      description: 'Rank higher & convert more',
      fullDescription: 'Comprehensive SEO strategies to improve your search rankings and drive organic traffic. We optimize every aspect of your online presence for maximum visibility.',
      features: [
        'Technical SEO audit',
        'Keyword research & strategy',
        'On-page optimization',
        'Link building',
        'Local SEO',
        'Performance monitoring'
      ],
      technologies: ['SEMrush', 'Ahrefs', 'Google Search Console', 'PageSpeed Insights'],
      deliverables: ['SEO audit report', 'Optimization roadmap', 'Monthly reports', 'Keyword tracking'],
      timeline: '3-6 months',
      color: '#10b981'
    },
    {
      category: 'marketing',
      icon: Bot,
      title: 'AI Automation',
      description: 'Smart AI-powered solutions',
      fullDescription: 'Leverage artificial intelligence to automate workflows, enhance customer experiences, and gain competitive advantages. From chatbots to predictive analytics.',
      features: [
        'AI chatbot development',
        'Process automation',
        'Predictive analytics',
        'Natural language processing',
        'Computer vision solutions',
        'AI integration consulting'
      ],
      technologies: ['OpenAI', 'TensorFlow', 'Python', 'LangChain', 'Hugging Face'],
      deliverables: ['AI solution', 'Training & optimization', 'Documentation', 'Ongoing updates'],
      timeline: '6-16 weeks',
      color: '#a855f7'
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Agile processes ensure quick turnaround without compromising quality'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Rigorous testing and QA processes for bulletproof solutions'
    },
    {
      icon: TrendingUp,
      title: 'Scalable Solutions',
      description: 'Built to grow with your business from day one'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Dedicated specialists with proven track records'
    },
    {
      icon: Clock,
      title: 'Ongoing Support',
      description: 'Comprehensive maintenance and support packages'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: '100+ successful projects delivered to satisfied clients'
    },
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  const [expandedService, setExpandedService] = useState(null);

  return (
    <div className={styles.servicesPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>Our Services</div>
          <h1 className={styles.heroTitle}>
            Comprehensive Digital Solutions
            <span className={styles.gradient}> Tailored for You</span>
          </h1>
          <p className={styles.heroDescription}>
            From web development to AI automation, we offer end-to-end digital services
            that transform your business. Expert team, proven results, transparent pricing.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>100+</div>
              <div className={styles.statLabel}>Projects Delivered</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Happy Clients</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>98%</div>
              <div className={styles.statLabel}>Satisfaction Rate</div>
            </div>
          </div>
        </div>
        <div className={styles.heroBackground}>
          <div className={styles.gridPattern}></div>
          <div className={styles.gradientOrb} style={{ '--orb-color': '#6366f1' }}></div>
          <div className={styles.gradientOrb} style={{ '--orb-color': '#ec4899' }}></div>
        </div>
      </section>

      {/* Category Filter */}
      <section className={styles.filterSection}>
        <div className={styles.container}>
          <div className={styles.categoryFilter}>
            {categories.map(category => (
              <button
                key={category.id}
                className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className={styles.servicesGrid}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {filteredServices.map((service, index) => {
              const Icon = service.icon;
              const isExpanded = expandedService === index;
              
              return (
                <div 
                  key={index} 
                  className={`${styles.serviceCard} ${isExpanded ? styles.expanded : ''}`}
                  style={{ '--accent-color': service.color }}
                >
                  <div className={styles.serviceHeader}>
                    <div className={styles.iconWrapper}>
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <div className={styles.serviceTitle}>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                  </div>

                  <div className={styles.serviceBody}>
                    <p className={styles.fullDescription}>{service.fullDescription}</p>

                    <div className={styles.features}>
                      <h4>Key Features</h4>
                      <ul>
                        {service.features.map((feature, i) => (
                          <li key={i}>
                            <CheckCircle2 size={16} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {isExpanded && (
                      <div className={styles.expandedContent}>
                        <div className={styles.technologies}>
                          <h4>Technologies</h4>
                          <div className={styles.techTags}>
                            {service.technologies.map((tech, i) => (
                              <span key={i} className={styles.techTag}>{tech}</span>
                            ))}
                          </div>
                        </div>

                        <div className={styles.deliverables}>
                          <h4>Deliverables</h4>
                          <ul>
                            {service.deliverables.map((item, i) => (
                              <li key={i}>
                                <CheckCircle2 size={14} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className={styles.timeline}>
                          <Clock size={16} />
                          <span>Typical Timeline: {service.timeline}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={styles.serviceFooter}>
                    <button 
                      className={styles.learnMoreBtn}
                      onClick={() => setExpandedService(isExpanded ? null : index)}
                    >
                      {isExpanded ? 'Show Less' : 'Learn More'}
                      <ArrowRight size={16} className={styles.arrow} />
                    </button>
                    <button className={styles.getQuoteBtn}>
                      Get Quote
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefitsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Choose Evolkun?</h2>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Ready to Transform Your Business?</h2>
            <p>Let's build something amazing together. Get a free quote tailored to your needs.</p>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryBtn}>
                Get Free Quote Instantly
                <ArrowRight size={20} />
              </button>
              <button className={styles.secondaryBtn}>
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
        <div className={styles.ctaBackground}>
          <div className={styles.gradientOrb} style={{ '--orb-color': '#6366f1' }}></div>
          <div className={styles.gradientOrb} style={{ '--orb-color': '#ec4899' }}></div>
        </div>
      </section>
    </div>
  );
};

export default Services;