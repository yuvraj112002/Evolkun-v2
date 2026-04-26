"use client";
import React, { useState } from 'react';
import { 
  ArrowRight, TrendingUp, Users, Clock, Award,
  ExternalLink, ChevronRight, Filter, Search,
  Code2, Palette, Megaphone, Bot, Target, Zap
} from 'lucide-react';
import styles from './CaseStudies.module.scss';

const CaseStudies = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);

  const categories = [
    { id: 'all', name: 'All Projects', icon: Filter },
    { id: 'development', name: 'Development', icon: Code2 },
    { id: 'design', name: 'Design', icon: Palette },
    { id: 'marketing', name: 'Marketing', icon: Megaphone },
    { id: 'ai', name: 'AI Solutions', icon: Bot },
  ];

  const caseStudies = [
    {
      id: 1,
      category: 'development',
      title: 'E-commerce Platform Revolution',
      client: 'TechMart Solutions',
      industry: 'E-commerce',
      thumbnail: '/api/placeholder/800/600',
      description: 'Transformed a traditional retail business into a thriving digital marketplace with AI-powered recommendations.',
      challenge: 'Client needed to modernize their outdated platform and compete with major e-commerce players.',
      solution: 'Built a scalable Next.js platform with real-time inventory, AI recommendations, and seamless checkout.',
      results: [
        { metric: '350%', label: 'Increase in Sales' },
        { metric: '2.5M', label: 'Monthly Users' },
        { metric: '45%', label: 'Lower Cart Abandonment' },
        { metric: '4.8/5', label: 'Customer Rating' }
      ],
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
      timeline: '4 months',
      color: '#6366f1',
      featured: true
    },
    {
      id: 2,
      category: 'design',
      title: 'Brand Identity Transformation',
      client: 'GreenLeaf Organics',
      industry: 'Food & Beverage',
      thumbnail: '/api/placeholder/800/600',
      description: 'Complete brand overhaul for an organic food company, creating a fresh, modern identity that resonates with health-conscious consumers.',
      challenge: 'Outdated brand identity was limiting market expansion and failing to attract younger demographics.',
      solution: 'Developed comprehensive brand guidelines, new logo system, packaging design, and digital presence.',
      results: [
        { metric: '250%', label: 'Social Media Growth' },
        { metric: '180%', label: 'Brand Recognition' },
        { metric: '5x', label: 'Customer Engagement' },
        { metric: '95%', label: 'Positive Sentiment' }
      ],
      technologies: ['Figma', 'Illustrator', 'After Effects', 'Photoshop'],
      timeline: '3 months',
      color: '#10b981',
      featured: true
    },
    {
      id: 3,
      category: 'marketing',
      title: 'Digital Marketing Campaign Success',
      client: 'FitZone Gyms',
      industry: 'Fitness & Wellness',
      thumbnail: '/api/placeholder/800/600',
      description: 'Comprehensive digital marketing strategy that tripled membership sign-ups through targeted campaigns.',
      challenge: 'Low brand awareness and struggling to compete with established fitness chains in the market.',
      solution: 'Multi-channel marketing campaign with SEO optimization, social media ads, and influencer partnerships.',
      results: [
        { metric: '300%', label: 'New Memberships' },
        { metric: '450%', label: 'Website Traffic' },
        { metric: '85%', label: 'Ad ROI' },
        { metric: '#1', label: 'Local SEO Ranking' }
      ],
      technologies: ['Google Ads', 'Meta Ads', 'SEMrush', 'HubSpot'],
      timeline: '6 months',
      color: '#ef4444',
      featured: false
    },
    {
      id: 4,
      category: 'ai',
      title: 'AI-Powered Customer Service Bot',
      client: 'BankTech Financial',
      industry: 'Banking & Finance',
      thumbnail: '/api/placeholder/800/600',
      description: 'Intelligent chatbot system that handles 80% of customer queries, reducing support costs dramatically.',
      challenge: 'High customer service costs and long wait times were impacting customer satisfaction scores.',
      solution: 'Developed custom AI chatbot with natural language processing and integration with banking systems.',
      results: [
        { metric: '80%', label: 'Queries Automated' },
        { metric: '2min', label: 'Avg Response Time' },
        { metric: '$500K', label: 'Annual Savings' },
        { metric: '92%', label: 'User Satisfaction' }
      ],
      technologies: ['OpenAI', 'Python', 'TensorFlow', 'Node.js', 'React'],
      timeline: '5 months',
      color: '#a855f7',
      featured: true
    },
    {
      id: 5,
      category: 'development',
      title: 'Mobile App for Healthcare',
      client: 'MediCare Connect',
      industry: 'Healthcare',
      thumbnail: '/api/placeholder/800/600',
      description: 'Secure mobile platform connecting patients with healthcare providers for telemedicine consultations.',
      challenge: 'Need for HIPAA-compliant platform enabling remote consultations during pandemic.',
      solution: 'Built native mobile apps with end-to-end encryption, video calling, and prescription management.',
      results: [
        { metric: '100K+', label: 'Active Users' },
        { metric: '50K', label: 'Consultations/Month' },
        { metric: '4.9/5', label: 'App Store Rating' },
        { metric: '100%', label: 'HIPAA Compliance' }
      ],
      technologies: ['React Native', 'WebRTC', 'Firebase', 'AWS', 'Stripe'],
      timeline: '6 months',
      color: '#06b6d4',
      featured: false
    },
    {
      id: 6,
      category: 'design',
      title: 'SaaS Dashboard Redesign',
      client: 'DataFlow Analytics',
      industry: 'Software & Technology',
      thumbnail: '/api/placeholder/800/600',
      description: 'Complete UX/UI overhaul of analytics dashboard, improving user engagement and reducing churn.',
      challenge: 'Complex interface was confusing users, leading to high churn rate and poor adoption.',
      solution: 'User research-driven redesign focusing on intuitive navigation and data visualization.',
      results: [
        { metric: '65%', label: 'Reduced Churn' },
        { metric: '90%', label: 'User Satisfaction' },
        { metric: '3x', label: 'Daily Active Users' },
        { metric: '40%', label: 'Faster Task Completion' }
      ],
      technologies: ['Figma', 'React', 'D3.js', 'Tailwind CSS'],
      timeline: '4 months',
      color: '#ec4899',
      featured: false
    },
  ];

  const filteredCaseStudies = caseStudies.filter(study => {
    const matchesCategory = activeFilter === 'all' || study.category === activeFilter;
    const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         study.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         study.industry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredStudies = caseStudies.filter(study => study.featured);

  return (
    <div className={styles.caseStudiesPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>Success Stories</div>
          <h1 className={styles.heroTitle}>
            Real Results for
            <span className={styles.gradient}> Real Businesses</span>
          </h1>
          <p className={styles.heroDescription}>
            Discover how we've helped businesses like yours achieve remarkable growth through 
            innovative digital solutions. From startups to enterprises, see the measurable impact 
            of our work.
          </p>
          
          {/* Stats */}
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <Target size={24} />
              <div className={styles.statContent}>
                <div className={styles.statNumber}>100+</div>
                <div className={styles.statLabel}>Projects Delivered</div>
              </div>
            </div>
            <div className={styles.stat}>
              <TrendingUp size={24} />
              <div className={styles.statContent}>
                <div className={styles.statNumber}>250%</div>
                <div className={styles.statLabel}>Avg ROI Increase</div>
              </div>
            </div>
            <div className={styles.stat}>
              <Award size={24} />
              <div className={styles.statContent}>
                <div className={styles.statNumber}>98%</div>
                <div className={styles.statLabel}>Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.heroBackground}>
          <div className={styles.gridPattern}></div>
          <div className={styles.gradientOrb} style={{ '--orb-color': '#6366f1' }}></div>
          <div className={styles.gradientOrb} style={{ '--orb-color': '#ec4899' }}></div>
        </div>
      </section>

      {/* Featured Case Studies */}
      {activeFilter === 'all' && !searchQuery && (
        <section className={styles.featuredSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Featured Projects</h2>
              <p className={styles.sectionDescription}>
                Our most impactful success stories
              </p>
            </div>

            <div className={styles.featuredGrid}>
              {featuredStudies.map((study) => (
                <div 
                  key={study.id} 
                  className={styles.featuredCard}
                  style={{ '--accent-color': study.color }}
                >
                  <div className={styles.featuredCardContent}>
                    <div className={styles.featuredCardHeader}>
                      <span className={styles.industry}>{study.industry}</span>
                      <Zap className={styles.featuredIcon} size={20} />
                    </div>
                    
                    <h3 className={styles.featuredTitle}>{study.title}</h3>
                    <p className={styles.featuredClient}>{study.client}</p>
                    <p className={styles.featuredDescription}>{study.description}</p>

                    <div className={styles.featuredResults}>
                      {study.results.slice(0, 2).map((result, idx) => (
                        <div key={idx} className={styles.featuredResult}>
                          <div className={styles.resultMetric}>{result.metric}</div>
                          <div className={styles.resultLabel}>{result.label}</div>
                        </div>
                      ))}
                    </div>

                    <button className={styles.viewCaseStudy}>
                      View Case Study
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters & Search */}
      <section className={styles.filtersSection}>
        <div className={styles.container}>
          <div className={styles.filtersWrapper}>
            {/* Category Filters */}
            <div className={styles.categoryFilters}>
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    className={`${styles.filterButton} ${activeFilter === category.id ? styles.active : ''}`}
                    onClick={() => setActiveFilter(category.id)}
                  >
                    <Icon size={18} />
                    {category.name}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className={styles.searchWrapper}>
              <Search size={20} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search case studies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>
        </div>
      </section>

      {/* All Case Studies Grid */}
      <section className={styles.allCaseStudies}>
        <div className={styles.container}>
          <div className={styles.resultsCount}>
            Showing {filteredCaseStudies.length} {filteredCaseStudies.length === 1 ? 'project' : 'projects'}
          </div>

          <div className={styles.caseStudiesGrid}>
            {filteredCaseStudies.map((study) => {
              const isExpanded = expandedCard === study.id;
              
              return (
                <div 
                  key={study.id} 
                  className={`${styles.caseStudyCard} ${isExpanded ? styles.expanded : ''}`}
                  style={{ '--accent-color': study.color }}
                >
                  <div className={styles.cardHeader}>
                    <span className={styles.categoryBadge}>{study.industry}</span>
                    <span className={styles.timeline}>
                      <Clock size={14} />
                      {study.timeline}
                    </span>
                  </div>

                  <h3 className={styles.cardTitle}>{study.title}</h3>
                  <p className={styles.cardClient}>{study.client}</p>
                  <p className={styles.cardDescription}>{study.description}</p>

                  <div className={styles.cardFooter}>
                    <button 
                      className={styles.readMoreButton}
                      onClick={() => setExpandedCard(isExpanded ? null : study.id)}
                    >
                      Read More
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Modal Overlay for Expanded Content */}
                  {isExpanded && (
                    <>
                      <div 
                        className={styles.modalOverlay}
                        onClick={() => setExpandedCard(null)}
                      ></div>
                      <div className={styles.modalContent}>
                        <button 
                          className={styles.closeButton}
                          onClick={() => setExpandedCard(null)}
                        >
                          ×
                        </button>

                        <div className={styles.modalHeader}>
                          <span className={styles.categoryBadge}>{study.industry}</span>
                          <span className={styles.timeline}>
                            <Clock size={14} />
                            {study.timeline}
                          </span>
                        </div>

                        <h3 className={styles.modalTitle}>{study.title}</h3>
                        <p className={styles.modalClient}>{study.client}</p>
                        <p className={styles.modalDescription}>{study.description}</p>

                        <div className={styles.modalDivider}></div>

                        <div className={styles.modalDetails}>
                          <div className={styles.detailSection}>
                            <h4>Challenge</h4>
                            <p>{study.challenge}</p>
                          </div>

                          <div className={styles.detailSection}>
                            <h4>Solution</h4>
                            <p>{study.solution}</p>
                          </div>
                        </div>

                        <div className={styles.resultsGrid}>
                          {study.results.map((result, idx) => (
                            <div key={idx} className={styles.resultCard}>
                              <div className={styles.resultMetric}>{result.metric}</div>
                              <div className={styles.resultLabel}>{result.label}</div>
                            </div>
                          ))}
                        </div>

                        <div className={styles.technologies}>
                          <div className={styles.techLabel}>Technologies:</div>
                          <div className={styles.techTags}>
                            {study.technologies.map((tech, idx) => (
                              <span key={idx} className={styles.techTag}>{tech}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {filteredCaseStudies.length === 0 && (
            <div className={styles.noResults}>
              <Search size={48} />
              <h3>No case studies found</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Ready to Be Our Next Success Story?</h2>
            <p>
              Let's discuss how we can help your business achieve similar results. 
              Get a free consultation and personalized strategy.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryBtn}>
                Start Your Project
                <ArrowRight size={20} />
              </button>
              <button className={styles.secondaryBtn}>
                Schedule a Call
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

export default CaseStudies;