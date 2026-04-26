"use client";
import React, { useState } from 'react';
import { 
  Palette, Image, FileText, Layers, Figma, Layout,
  Zap, Award, Users, TrendingUp, CheckCircle2, ArrowRight,
  Star, Sparkles, Package, Smartphone, Globe, Monitor,
  PenTool, Dribbble, Instagram
} from 'lucide-react';
import styles from './GraphicDesign.module.scss';

const GraphicDesign = () => {
  const designServices = [
    {
      id: 'social-media',
      icon: Instagram,
      title: 'Social Media Graphics',
      description: 'Eye-catching posts, stories, and covers for all platforms',
      timeline: '1-2 weeks',
      price: 'From $500',
      color: '#ec4899'
    },
    {
      id: 'marketing',
      icon: FileText,
      title: 'Marketing Materials',
      description: 'Brochures, flyers, posters, and promotional designs',
      timeline: '1-3 weeks',
      price: 'From $600',
      color: '#6366f1'
    },
    {
      id: 'infographics',
      icon: Layers,
      title: 'Infographics',
      description: 'Data visualization and information design that engages',
      timeline: '1-2 weeks',
      price: 'From $700',
      color: '#10b981'
    },
    {
      id: 'presentations',
      icon: Monitor,
      title: 'Presentation Design',
      description: 'Professional slide decks that captivate audiences',
      timeline: '1-2 weeks',
      price: 'From $800',
      color: '#f59e0b'
    },
    {
      id: 'illustrations',
      icon: PenTool,
      title: 'Custom Illustrations',
      description: 'Unique illustrations and iconography for your brand',
      timeline: '2-3 weeks',
      price: 'From $900',
      color: '#8b5cf6'
    },
    {
      id: 'print',
      icon: Package,
      title: 'Print Design',
      description: 'Business cards, stationery, packaging, and more',
      timeline: '1-3 weeks',
      price: 'From $550',
      color: '#06b6d4'
    },
    {
      id: 'digital-ads',
      icon: Globe,
      title: 'Digital Advertising',
      description: 'Banner ads, display ads, and social media ad creatives',
      timeline: '1 week',
      price: 'From $400',
      color: '#ef4444'
    },
    {
      id: 'ebook',
      icon: FileText,
      title: 'eBook & Magazine Design',
      description: 'Beautiful layouts for digital publications',
      timeline: '2-4 weeks',
      price: 'From $1,200',
      color: '#14b8a6'
    }
  ];

  const portfolio = [
    {
      category: 'Social Media',
      image: '/api/placeholder/600/600',
      color: '#ec4899'
    },
    {
      category: 'Branding',
      image: '/image.png',
      color: '#6366f1'
    },
    {
      category: 'Print Design',
      image: '/api/placeholder/600/600',
      color: '#f59e0b'
    },
    {
      category: 'Infographics',
      image: '/api/placeholder/600/600',
      color: '#10b981'
    },
    {
      category: 'Illustrations',
      image: '/api/placeholder/600/600',
      color: '#8b5cf6'
    },
    {
      category: 'Marketing',
      image: '/api/placeholder/600/600',
      color: '#06b6d4'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Brief & Research',
      description: 'We understand your goals, audience, and design requirements',
      icon: FileText
    },
    {
      step: '02',
      title: 'Concept Development',
      description: 'Create initial concepts and mood boards for your approval',
      icon: Palette
    },
    {
      step: '03',
      title: 'Design & Refine',
      description: 'Craft polished designs with unlimited revisions',
      icon: PenTool
    },
    {
      step: '04',
      title: 'Delivery & Support',
      description: 'Provide final files and ongoing support',
      icon: CheckCircle2
    }
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: 'Award-Winning Designers',
      description: 'Team of creative experts with proven track record'
    },
    {
      icon: Zap,
      title: 'Fast Turnaround',
      description: 'Quick delivery without compromising quality'
    },
    {
      icon: Users,
      title: 'Unlimited Revisions',
      description: 'We refine until you\'re completely satisfied'
    },
    {
      icon: TrendingUp,
      title: 'Results-Driven',
      description: 'Designs that drive engagement and conversions'
    },
    {
      icon: Layers,
      title: 'All File Formats',
      description: 'Receive files ready for print and digital use'
    },
    {
      icon: Sparkles,
      title: 'Original & Unique',
      description: 'Fresh, creative designs tailored to your brand'
    }
  ];

  const tools = [
    { name: 'Figma', icon: Figma },
    { name: 'Photoshop' },
    { name: 'Illustrator' },
    { name: 'InDesign' },
    { name: 'After Effects' }
  ];

  return (
    <div className={styles.graphicDesignPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <Palette size={16} />
            <span>Graphic Design Services</span>
          </div>
          <h1 className={styles.heroTitle}>
            Creative Designs That
            <span className={styles.gradient}> Make an Impact</span>
          </h1>
          <p className={styles.heroDescription}>
            From social media graphics to complete marketing campaigns, we create 
            stunning visuals that capture attention and drive results.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.primaryBtn}>
              Get Started Now
              <ArrowRight size={20} />
            </button>
            <button className={styles.secondaryBtn}>
              View Portfolio
            </button>
          </div>

          {/* Stats */}
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Designs Created</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>98%</div>
              <div className={styles.statLabel}>Client Satisfaction</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>24-48h</div>
              <div className={styles.statLabel}>Avg Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Design Services</h2>
            <p className={styles.sectionSubtitle}>
              Professional graphic design for all your needs
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {designServices.map((service) => {
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

      {/* Portfolio Section */}
      <section className={styles.portfolioSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Work</h2>
            <p className={styles.sectionSubtitle}>
              A glimpse of our creative excellence
            </p>
          </div>

          <div className={styles.portfolioGrid}>
            {portfolio.map((item, index) => (
              <div 
                key={index} 
                className={styles.portfolioCard}
                style={{ '--portfolio-color': item.color }}
              >
                <div className={styles.portfolioImage}>
                  <img src={item.image} alt={item.category} />
                  <div className={styles.portfolioOverlay}>
                    <span className={styles.portfolioCategory}>{item.category}</span>
                    <button className={styles.viewProject}>
                      View Project
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.portfolioCTA}>
            <button className={styles.viewAllBtn}>
              View Full Portfolio
              <Dribbble size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Design Process</h2>
            <p className={styles.sectionSubtitle}>
              From concept to final delivery
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

      {/* Why Choose Us */}
      <section className={styles.whyChooseSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Why Choose Evolkun?</h2>
            <p className={styles.sectionSubtitle}>
              Excellence in every pixel
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

      {/* Tools Section */}
      <section className={styles.toolsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Design Tools</h2>
            <p className={styles.sectionSubtitle}>
              Industry-standard software for professional results
            </p>
          </div>

          <div className={styles.toolsGrid}>
            {tools.map((tool, index) => (
              <div key={index} className={styles.toolCard}>
                {tool.icon && <tool.icon size={32} />}
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <Sparkles className={styles.ctaIcon} size={48} />
            <h2>Ready to Elevate Your Brand?</h2>
            <p>
              Let's create stunning graphics that make your brand unforgettable. 
              Get started with a free consultation and custom quote.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimary}>
                Start Your Design Project
                <ArrowRight size={20} />
              </button>
              <button className={styles.ctaSecondary}>
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GraphicDesign;