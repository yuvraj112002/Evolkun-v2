"use client";
import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, Github, Play, X, ChevronLeft, ChevronRight,
  Sparkles, Code2, Palette, Smartphone, Globe, Zap, Award
} from 'lucide-react';
import styles from './Portfolio.module.scss';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(null);

  // Close modal with ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const categories = [
    { id: 'all', name: 'All Projects', icon: Sparkles },
    { id: 'web', name: 'Web Apps', icon: Globe },
    { id: 'mobile', name: 'Mobile Apps', icon: Smartphone },
    { id: 'design', name: 'UI/UX Design', icon: Palette },
    { id: 'branding', name: 'Branding', icon: Award },
  ];

  const portfolio = [
    {
      id: 1,
      category: 'web',
      title: 'FinanceFlow Dashboard',
      client: 'TechVest Capital',
      year: '2024',
      type: 'Web Application',
      description: 'Real-time financial analytics platform with AI-powered insights and automated reporting.',
      fullDescription: 'A comprehensive financial management platform designed for investment firms. Features include real-time market data visualization, AI-driven portfolio optimization, risk assessment tools, and automated compliance reporting. Built with cutting-edge technologies to handle millions of transactions while maintaining sub-second response times.',
      images: ['/api/placeholder/1200/800', '/api/placeholder/1200/800', '/api/placeholder/1200/800'],
      thumbnail: '/api/placeholder/600/400',
      tags: ['Next.js', 'TypeScript', 'D3.js', 'WebSocket', 'PostgreSQL', 'Redis'],
      highlights: [
        'Real-time data synchronization across 50+ markets',
        'AI-powered portfolio optimization engine',
        'Sub-second query performance on 10M+ records',
        'SOC 2 Type II compliant infrastructure'
      ],
      results: {
        metric1: '70%',
        label1: 'Faster Analysis',
        metric2: '$2M',
        label2: 'Cost Savings',
        metric3: '10K+',
        label3: 'Daily Users'
      },
      liveUrl: 'https://example.com',
      githubUrl: null,
      color: '#3b82f6',
      featured: true,
      award: 'Best Financial Tech 2024'
    },
    {
      id: 2,
      category: 'mobile',
      title: 'FitPulse Wellness',
      client: 'HealthFirst Inc',
      year: '2024',
      type: 'Mobile Application',
      description: 'AI-powered fitness tracking app with personalized workout plans and nutrition guidance.',
      fullDescription: 'Revolutionary wellness platform that combines AI-driven workout recommendations, real-time form analysis, nutrition tracking, and community features. Uses computer vision to analyze exercise form and provide instant feedback, helping users achieve their fitness goals safely and effectively.',
      images: ['/api/placeholder/1200/800', '/api/placeholder/1200/800', '/api/placeholder/1200/800'],
      thumbnail: '/api/placeholder/600/400',
      tags: ['React Native', 'TensorFlow', 'Firebase', 'Computer Vision', 'HealthKit'],
      highlights: [
        'AI form analysis using device camera',
        'Personalized workout plans adapting to progress',
        'Integration with 20+ fitness devices',
        '4.9/5 star rating on App Store'
      ],
      results: {
        metric1: '500K+',
        label1: 'Downloads',
        metric2: '4.9/5',
        label2: 'App Rating',
        metric3: '92%',
        label3: 'User Retention'
      },
      liveUrl: 'https://example.com',
      githubUrl: null,
      color: '#10b981',
      featured: true,
      award: 'Editor\'s Choice'
    },
    {
      id: 3,
      category: 'web',
      title: 'ShopSphere E-commerce',
      client: 'RetailHub Global',
      year: '2024',
      type: 'E-commerce Platform',
      description: 'Next-generation shopping experience with AR try-on and AI recommendations.',
      fullDescription: 'Immersive e-commerce platform that revolutionizes online shopping with augmented reality product visualization, AI-powered personalized recommendations, and seamless checkout experience. Supports over 100,000 SKUs with real-time inventory management across multiple warehouses.',
      images: ['/api/placeholder/1200/800', '/api/placeholder/1200/800', '/api/placeholder/1200/800'],
      thumbnail: '/api/placeholder/600/400',
      tags: ['Next.js', 'Three.js', 'Stripe', 'AR.js', 'MongoDB', 'AWS'],
      highlights: [
        'AR product visualization in real environment',
        'AI recommendation engine with 85% accuracy',
        'One-click checkout with 98% success rate',
        'Multi-warehouse inventory synchronization'
      ],
      results: {
        metric1: '300%',
        label1: 'Sales Increase',
        metric2: '45%',
        label2: 'Lower Returns',
        metric3: '2.5M',
        label3: 'Monthly Users'
      },
      liveUrl: 'https://example.com',
      githubUrl: null,
      color: '#f59e0b',
      featured: true
    },
    {
      id: 4,
      category: 'design',
      title: 'TravelNest Redesign',
      client: 'TravelNest Co',
      year: '2023',
      type: 'UX/UI Design',
      description: 'Complete redesign of travel booking platform focusing on user journey optimization.',
      fullDescription: 'Comprehensive UX/UI overhaul of a travel booking platform. Through extensive user research and testing, we reimagined the entire booking flow, reducing friction points and creating a delightful, intuitive experience. The new design increased conversion rates by 156% while reducing support tickets by 40%.',
      images: ['/api/placeholder/1200/800', '/api/placeholder/1200/800', '/api/placeholder/1200/800'],
      thumbnail: '/api/placeholder/600/400',
      tags: ['Figma', 'User Research', 'Prototyping', 'Design System', 'A/B Testing'],
      highlights: [
        'Reduced booking flow from 12 to 5 steps',
        'Created comprehensive design system',
        'Improved mobile conversion by 200%',
        'WCAG 2.1 AAA accessibility compliance'
      ],
      results: {
        metric1: '156%',
        label1: 'Conversion Up',
        metric2: '65%',
        label2: 'Faster Bookings',
        metric3: '40%',
        label3: 'Fewer Tickets'
      },
      liveUrl: 'https://example.com',
      color: '#ec4899',
      featured: false
    },
    {
      id: 5,
      category: 'branding',
      title: 'EcoBloom Brand Identity',
      client: 'EcoBloom Organics',
      year: '2024',
      type: 'Brand Identity',
      description: 'Sustainable brand identity for organic food company with complete visual system.',
      fullDescription: 'Created a fresh, modern brand identity for an organic food startup. The design emphasizes sustainability, natural ingredients, and health consciousness through earthy colors, organic shapes, and thoughtful typography. Includes logo suite, packaging design, marketing materials, and comprehensive brand guidelines.',
      images: ['/api/placeholder/1200/800', '/api/placeholder/1200/800', '/api/placeholder/1200/800'],
      thumbnail: '/api/placeholder/600/400',
      tags: ['Illustrator', 'Photoshop', 'Brand Strategy', 'Packaging', 'Print Design'],
      highlights: [
        'Complete brand identity system',
        'Eco-friendly packaging design',
        '50+ marketing collateral pieces',
        'Social media visual guidelines'
      ],
      results: {
        metric1: '280%',
        label1: 'Brand Recall',
        metric2: '12x',
        label2: 'Social Engagement',
        metric3: '95%',
        label3: 'Recognition'
      },
      liveUrl: null,
      color: '#22c55e',
      featured: false
    },
    {
      id: 6,
      category: 'mobile',
      title: 'MediConnect Telemedicine',
      client: 'HealthBridge',
      year: '2023',
      type: 'Healthcare App',
      description: 'HIPAA-compliant telemedicine platform connecting patients with healthcare providers.',
      fullDescription: 'Secure telemedicine application enabling virtual consultations, prescription management, and medical records access. Features end-to-end encryption, HD video calling, appointment scheduling, and integration with electronic health records. Fully HIPAA compliant with advanced security measures.',
      images: ['/api/placeholder/1200/800', '/api/placeholder/1200/800', '/api/placeholder/1200/800'],
      thumbnail: '/api/placeholder/600/400',
      tags: ['Flutter', 'WebRTC', 'Firebase', 'FHIR', 'Encryption', 'AWS'],
      highlights: [
        '100% HIPAA compliance',
        'End-to-end encrypted consultations',
        'EHR integration with 15+ systems',
        'Sub-3-second connection time'
      ],
      results: {
        metric1: '150K+',
        label1: 'Consultations',
        metric2: '4.8/5',
        label2: 'User Rating',
        metric3: '100%',
        label3: 'Compliance'
      },
      liveUrl: 'https://example.com',
      color: '#06b6d4',
      featured: false
    },
    {
      id: 7,
      category: 'web',
      title: 'LearnHub EdTech Platform',
      client: 'EduTech Solutions',
      year: '2024',
      type: 'Learning Management',
      description: 'Interactive learning platform with AI-powered personalized learning paths.',
      fullDescription: 'Comprehensive learning management system featuring AI-driven personalized learning paths, interactive course creation tools, real-time collaboration, progress tracking, and gamification. Supports various content types including video, interactive quizzes, live classes, and peer assessments.',
      images: ['/api/placeholder/1200/800', '/api/placeholder/1200/800', '/api/placeholder/1200/800'],
      thumbnail: '/api/placeholder/600/400',
      tags: ['React', 'Node.js', 'WebRTC', 'OpenAI', 'PostgreSQL', 'Redis'],
      highlights: [
        'AI-powered adaptive learning paths',
        'Real-time collaborative whiteboard',
        'Supports 100K+ concurrent users',
        'Multi-language content support'
      ],
      results: {
        metric1: '85%',
        label1: 'Completion Rate',
        metric2: '200K+',
        label2: 'Students',
        metric3: '4.7/5',
        label3: 'Satisfaction'
      },
      liveUrl: 'https://example.com',
      color: '#8b5cf6',
      featured: false
    },
    {
      id: 8,
      category: 'design',
      title: 'LuxeStay Hotel App',
      client: 'LuxeStay Hospitality',
      year: '2023',
      type: 'Mobile UI/UX',
      description: 'Luxury hotel booking and concierge app with premium user experience.',
      fullDescription: 'Elegant mobile experience for luxury hotel chain. Features seamless booking, digital room keys, in-app concierge, dining reservations, and personalized recommendations. Design emphasizes sophistication, ease of use, and premium brand positioning.',
      images: ['/api/placeholder/1200/800', '/api/placeholder/1200/800', '/api/placeholder/1200/800'],
      thumbnail: '/api/placeholder/600/400',
      tags: ['Figma', 'Principle', 'After Effects', 'Prototyping', 'Motion Design'],
      highlights: [
        'Award-winning interface design',
        'Seamless digital room key integration',
        'Personalized guest experiences',
        'Premium micro-interactions'
      ],
      results: {
        metric1: '89%',
        label1: 'NPS Score',
        metric2: '3.5x',
        label2: 'Direct Bookings',
        metric3: '12min',
        label3: 'Avg Session'
      },
      liveUrl: 'https://example.com',
      color: '#dc2626',
      featured: false,
      award: 'Design Excellence Award'
    },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? portfolio 
    : portfolio.filter(p => p.category === activeFilter);

  const featuredProjects = portfolio.filter(p => p.featured);

  const openProject = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className={styles.portfolioPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroLabel}>
            <Sparkles size={16} />
            <span>Our Work</span>
          </div>
          <h1 className={styles.heroTitle}>
            Crafting Digital
            <span className={styles.titleAccent}> Masterpieces</span>
          </h1>
          <p className={styles.heroDescription}>
            Every pixel perfected. Every interaction polished. Explore our portfolio 
            of award-winning projects that blend innovative technology with stunning design.
          </p>

          {/* Stats */}
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>100+</div>
              <div className={styles.statLabel}>Projects Delivered</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>15+</div>
              <div className={styles.statLabel}>Awards Won</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Happy Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Work</h2>
            <p className={styles.sectionSubtitle}>Our most impactful projects</p>
          </div>

          <div className={styles.featuredGrid}>
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className={styles.featuredCard}
                style={{ '--project-color': project.color }}
                onClick={() => openProject(project)}
                onMouseEnter={() => setIsHovering(project.id)}
                onMouseLeave={() => setIsHovering(null)}
              >
                <div className={styles.featuredImage}>
                  <img src={project.thumbnail} alt={project.title} />
                  <div className={styles.imageOverlay}>
                    <Play className={styles.playIcon} size={48} />
                  </div>
                </div>

                <div className={styles.featuredContent}>
                  <div className={styles.featuredMeta}>
                    <span className={styles.metaType}>{project.type}</span>
                    <span className={styles.metaDot}>•</span>
                    <span className={styles.metaYear}>{project.year}</span>
                  </div>

                  <h3 className={styles.featuredTitle}>{project.title}</h3>
                  <p className={styles.featuredClient}>{project.client}</p>
                  <p className={styles.featuredDescription}>{project.description}</p>

                  {project.award && (
                    <div className={styles.awardBadge}>
                      <Award size={14} />
                      {project.award}
                    </div>
                  )}

                  <div className={styles.featuredTags}>
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className={styles.tag}>{tag}</span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className={styles.tagMore}>+{project.tags.length - 3}</span>
                    )}
                  </div>
                </div>

                <div className={styles.cardShine}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className={styles.filterSection}>
        <div className={styles.container}>
          <div className={styles.filters}>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  className={`${styles.filterBtn} ${activeFilter === cat.id ? styles.active : ''}`}
                  onClick={() => setActiveFilter(cat.id)}
                >
                  <Icon size={18} />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className={styles.projectsSection}>
        <div className={styles.container}>
          <div className={styles.projectsGrid}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={styles.projectCard}
                style={{ '--project-color': project.color }}
                onClick={() => openProject(project)}
              >
                <div className={styles.projectImage}>
                  <img src={project.thumbnail} alt={project.title} />
                  <div className={styles.projectOverlay}>
                    <span className={styles.viewProject}>View Project</span>
                  </div>
                </div>

                <div className={styles.projectInfo}>
                  <div className={styles.projectMeta}>
                    <span className={styles.projectType}>{project.type}</span>
                    {project.award && <Award size={12} className={styles.awardIcon} />}
                  </div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectClient}>{project.client}</p>
                  
                  <div className={styles.projectTags}>
                    {project.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className={styles.miniTag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className={styles.modal}>
          <div className={styles.modalOverlay} onClick={closeProject}></div>
          
          <div className={styles.modalContent}>
            <button className={styles.modalClose} onClick={closeProject}>
              <X size={24} />
            </button>

            {/* Image Gallery */}
            <div className={styles.modalGallery}>
              <img 
                src={selectedProject.images[currentImageIndex]} 
                alt={selectedProject.title}
                className={styles.modalImage}
              />
              
              {selectedProject.images.length > 1 && (
                <>
                  <button className={styles.galleryPrev} onClick={prevImage}>
                    <ChevronLeft size={24} />
                  </button>
                  <button className={styles.galleryNext} onClick={nextImage}>
                    <ChevronRight size={24} />
                  </button>
                  
                  <div className={styles.galleryDots}>
                    {selectedProject.images.map((_, idx) => (
                      <button
                        key={idx}
                        className={`${styles.dot} ${idx === currentImageIndex ? styles.activeDot : ''}`}
                        onClick={() => setCurrentImageIndex(idx)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Project Details */}
            <div className={styles.modalDetails}>
              <div className={styles.modalHeader}>
                <div>
                  <div className={styles.modalMeta}>
                    <span>{selectedProject.type}</span>
                    <span>•</span>
                    <span>{selectedProject.year}</span>
                    <span>•</span>
                    <span>{selectedProject.client}</span>
                  </div>
                  <h2 className={styles.modalTitle}>{selectedProject.title}</h2>
                  {selectedProject.award && (
                    <div className={styles.modalAward}>
                      <Award size={16} />
                      {selectedProject.award}
                    </div>
                  )}
                </div>

                <div className={styles.modalLinks}>
                  {selectedProject.liveUrl && (
                    <a 
                      href={selectedProject.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.modalLink}
                    >
                      <ExternalLink size={18} />
                      Live Site
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.modalLink}
                    >
                      <Github size={18} />
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              <p className={styles.modalDescription}>{selectedProject.fullDescription}</p>

              {/* Highlights */}
              <div className={styles.highlightsSection}>
                <h3>Key Highlights</h3>
                <ul className={styles.highlightsList}>
                  {selectedProject.highlights.map((highlight, idx) => (
                    <li key={idx}>
                      <Zap size={16} />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results */}
              <div className={styles.resultsSection}>
                <h3>Results</h3>
                <div className={styles.resultsGrid}>
                  <div className={styles.resultItem}>
                    <div className={styles.resultMetric}>{selectedProject.results.metric1}</div>
                    <div className={styles.resultLabel}>{selectedProject.results.label1}</div>
                  </div>
                  <div className={styles.resultItem}>
                    <div className={styles.resultMetric}>{selectedProject.results.metric2}</div>
                    <div className={styles.resultLabel}>{selectedProject.results.label2}</div>
                  </div>
                  <div className={styles.resultItem}>
                    <div className={styles.resultMetric}>{selectedProject.results.metric3}</div>
                    <div className={styles.resultLabel}>{selectedProject.results.label3}</div>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div className={styles.techSection}>
                <h3>Technologies Used</h3>
                <div className={styles.techGrid}>
                  {selectedProject.tags.map((tag, idx) => (
                    <span key={idx} className={styles.techTag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Let's Create Something Amazing Together</h2>
            <p>Ready to bring your vision to life? Let's discuss your next project.</p>
            <button className={styles.ctaButton}>
              Start Your Project
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;