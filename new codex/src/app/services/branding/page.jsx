"use client";
import React, { useState } from 'react';
import { 
  Palette, Sparkles, Award, TrendingUp, Users, Heart,
  CheckCircle2, ArrowRight, Package, Zap, Target, Eye,
  MessageSquare, Star, ChevronRight, Layers, PenTool, Camera
} from 'lucide-react';
import styles from './Branding.module.scss';

const Branding = () => {
  const brandingServices = [
    {
      id: 'identity',
      icon: Palette,
      title: 'Brand Identity Design',
      description: 'Complete visual identity systems that capture your essence',
      details: 'From concept to execution, we craft cohesive brand identities that resonate with your audience and stand the test of time.',
      deliverables: [
        'Logo design & variations',
        'Color palette & typography',
        'Brand guidelines document',
        'Business card & stationery',
        'Social media templates',
        'Brand presentation deck'
      ],
      color: '#6366f1',
      timeline: '3-4 weeks',
      price: 'From $2,500'
    },
    {
      id: 'strategy',
      icon: Target,
      title: 'Brand Strategy',
      description: 'Strategic positioning that differentiates you in the market',
      details: 'We develop comprehensive brand strategies that align your vision with market opportunities, creating a roadmap for success.',
      deliverables: [
        'Market research & analysis',
        'Competitor positioning',
        'Brand messaging framework',
        'Target audience personas',
        'Value proposition development',
        'Brand voice & tone guide'
      ],
      color: '#10b981',
      timeline: '2-3 weeks',
      price: 'From $1,800'
    },
    {
      id: 'packaging',
      icon: Package,
      title: 'Packaging Design',
      description: 'Unforgettable product packaging that sells',
      details: 'Create packaging that not only protects but promotes. Designs that stand out on shelves and create memorable unboxing experiences.',
      deliverables: [
        'Package structural design',
        'Label & graphics design',
        'Print-ready artwork',
        'Mockups & prototypes',
        'Production specifications',
        'Supplier coordination'
      ],
      color: '#f59e0b',
      timeline: '4-6 weeks',
      price: 'From $3,000'
    },
    {
      id: 'collateral',
      icon: Layers,
      title: 'Marketing Collateral',
      description: 'Professional materials that reinforce your brand',
      details: 'From brochures to banners, we design marketing materials that communicate your message with clarity and style.',
      deliverables: [
        'Brochures & flyers',
        'Presentation templates',
        'Trade show materials',
        'Digital & print ads',
        'Email templates',
        'Signage & banners'
      ],
      color: '#ec4899',
      timeline: '1-3 weeks',
      price: 'From $800'
    },
    {
      id: 'refresh',
      icon: Sparkles,
      title: 'Brand Refresh',
      description: 'Modernize your brand while keeping what works',
      details: 'Evolve your existing brand identity to stay relevant and competitive without losing brand equity.',
      deliverables: [
        'Brand audit & analysis',
        'Refreshed logo & identity',
        'Updated brand guidelines',
        'Transition strategy',
        'Asset migration plan',
        'Launch support'
      ],
      color: '#8b5cf6',
      timeline: '3-5 weeks',
      price: 'From $2,200'
    },
    {
      id: 'content',
      icon: Camera,
      title: 'Brand Photography',
      description: 'Visual content that tells your brand story',
      details: 'Professional photography and videography that captures your brand personality and creates authentic connections.',
      deliverables: [
        'Brand photoshoot planning',
        'On-location photography',
        'Product photography',
        'Team & lifestyle shots',
        'Image editing & retouching',
        'Digital asset library'
      ],
      color: '#06b6d4',
      timeline: '1-2 weeks',
      price: 'From $1,500'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We dive deep into your business, audience, and goals to understand what makes you unique.',
      icon: Eye
    },
    {
      step: '02',
      title: 'Strategy',
      description: 'Develop a comprehensive brand strategy that positions you for success in your market.',
      icon: Target
    },
    {
      step: '03',
      title: 'Design',
      description: 'Create stunning visual identities that capture your essence and resonate with your audience.',
      icon: PenTool
    },
    {
      step: '04',
      title: 'Deliver',
      description: 'Provide complete brand assets, guidelines, and support for successful implementation.',
      icon: CheckCircle2
    }
  ];

  const caseStudies = [
    {
      client: 'GreenLeaf Organics',
      industry: 'Food & Beverage',
      result: '250% increase in brand recognition',
      image: '/api/placeholder/600/400',
      color: '#10b981'
    },
    {
      client: 'TechFlow Solutions',
      industry: 'Technology',
      result: '180% growth in customer engagement',
      image: '/api/placeholder/600/400',
      color: '#6366f1'
    },
    {
      client: 'Luxe Beauty Co.',
      industry: 'Beauty & Wellness',
      result: '5x increase in social media following',
      image: '/api/placeholder/600/400',
      color: '#ec4899'
    }
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: 'Award-Winning Design',
      description: 'Recognized excellence in brand design and strategy'
    },
    {
      icon: Users,
      title: 'Collaborative Process',
      description: 'Your vision combined with our expertise'
    },
    {
      icon: Zap,
      title: 'Fast Turnaround',
      description: 'Quality work delivered on time, every time'
    },
    {
      icon: Heart,
      title: 'Unlimited Revisions',
      description: 'We refine until you\'re 100% satisfied'
    },
    {
      icon: TrendingUp,
      title: 'Proven Results',
      description: 'Measurable impact on brand performance'
    },
    {
      icon: MessageSquare,
      title: 'Ongoing Support',
      description: 'We\'re here beyond project completion'
    }
  ];

  return (
    <div className={styles.brandingPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <Palette size={16} />
            <span>Brand Identity & Strategy</span>
          </div>
          <h1 className={styles.heroTitle}>
            Build a Brand That
            <span className={styles.gradient}> Stands Out</span>
          </h1>
          <p className={styles.heroDescription}>
            From logo design to complete brand identity systems, we create memorable 
            brands that connect with audiences and drive business growth.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.primaryBtn}>
              Start Your Brand Journey
              <ArrowRight size={20} />
            </button>
            <button className={styles.secondaryBtn}>
              View Our Portfolio
            </button>
          </div>

          {/* Stats */}
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>200+</div>
              <div className={styles.statLabel}>Brands Created</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>15+</div>
              <div className={styles.statLabel}>Awards Won</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>98%</div>
              <div className={styles.statLabel}>Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Branding Services</h2>
            <p className={styles.sectionSubtitle}>
              Comprehensive brand solutions tailored to your needs
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {brandingServices.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.id}
                  className={styles.serviceCard}
                  style={{ '--service-color': service.color }}
                >
                  <div className={styles.serviceIcon}>
                    <Icon size={32} strokeWidth={1.5} />
                  </div>

                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>

                  <div className={styles.serviceMeta}>
                    <span className={styles.timeline}>
                      <Star size={14} />
                      {service.timeline}
                    </span>
                    <span className={styles.price}>{service.price}</span>
                  </div>
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
            <h2 className={styles.sectionTitle}>Our Process</h2>
            <p className={styles.sectionSubtitle}>
              A proven methodology for creating exceptional brands
            </p>
          </div>

          <div className={styles.processGrid}>
            {process.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className={styles.processCard}>
                  <div className={styles.processStep}>{item.step}</div>
                  <div className={styles.processIcon}>
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className={styles.processTitle}>{item.title}</h3>
                  <p className={styles.processDescription}>{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className={styles.caseStudiesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Success Stories</h2>
            <p className={styles.sectionSubtitle}>
              Real brands, real results
            </p>
          </div>

          <div className={styles.caseStudiesGrid}>
            {caseStudies.map((study, index) => (
              <div 
                key={index} 
                className={styles.caseStudyCard}
                style={{ '--case-color': study.color }}
              >
                <div className={styles.caseStudyImage}>
                  <img src={study.image} alt={study.client} />
                  <div className={styles.caseStudyOverlay}>
                    <button className={styles.viewCase}>
                      View Case Study
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
                <div className={styles.caseStudyContent}>
                  <span className={styles.caseIndustry}>{study.industry}</span>
                  <h3 className={styles.caseClient}>{study.client}</h3>
                  <p className={styles.caseResult}>{study.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.whyChooseSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Why Choose Evolkun?</h2>
            <p className={styles.sectionSubtitle}>
              Excellence in every detail
            </p>
          </div>

          <div className={styles.whyChooseGrid}>
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className={styles.whyChooseCard}>
                  <div className={styles.whyChooseIcon}>
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
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
            <Sparkles className={styles.ctaIcon} size={48} />
            <h2>Ready to Build Your Brand?</h2>
            <p>
              Let's create a brand identity that captures your vision and resonates 
              with your audience. Get a free consultation and custom proposal.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimary}>
                Get Free Brand Consultation
                <ArrowRight size={20} />
              </button>
              <button className={styles.ctaSecondary}>
                Download Brand Guide Sample
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Branding;