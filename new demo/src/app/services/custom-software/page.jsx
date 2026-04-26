"use client";
import React, { useState } from 'react';
import { 
  Settings, Code2, Database, Cloud, Lock, Workflow,
  Zap, GitBranch, Boxes, CheckCircle2, ArrowRight,
  Users, Clock, Award, TrendingUp, Shield, Cpu,
  FileCode, Server, Layers, BarChart3, Gauge, Globe,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';
import styles from './CustomSoftware.module.scss';

const CustomSoftware = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const solutions = [
    {
      icon: Workflow,
      title: 'Business Process Automation',
      description: 'Streamline operations and eliminate manual tasks with intelligent automation',
      features: [
        'Custom workflow engines',
        'Task automation & scheduling',
        'Document processing',
        'Approval workflows',
        'Integration with existing systems',
        'Real-time monitoring & alerts'
      ],
      useCases: ['Invoice processing', 'Employee onboarding', 'Report generation']
    },
    {
      icon: Database,
      title: 'Enterprise Resource Planning',
      description: 'Unified systems to manage all aspects of your business operations',
      features: [
        'Inventory management',
        'Financial accounting',
        'HR & payroll systems',
        'Supply chain management',
        'Customer relationship management',
        'Business intelligence & reporting'
      ],
      useCases: ['Manufacturing', 'Retail chains', 'Distribution']
    },
    {
      icon: Users,
      title: 'Custom CRM Systems',
      description: 'Tailor-made customer relationship management built for your workflow',
      features: [
        'Lead & contact management',
        'Sales pipeline tracking',
        'Custom fields & stages',
        'Email integration',
        'Analytics & forecasting',
        'Mobile access'
      ],
      useCases: ['Sales teams', 'Service providers', 'B2B companies']
    },
    {
      icon: Cloud,
      title: 'SaaS Product Development',
      description: 'Build and launch scalable software-as-a-service products',
      features: [
        'Multi-tenant architecture',
        'Subscription management',
        'User authentication & roles',
        'API development',
        'Scalable infrastructure',
        'Analytics & monitoring'
      ],
      useCases: ['Startup MVPs', 'Product companies', 'Digital agencies']
    },
    {
      icon: BarChart3,
      title: 'Data Analytics Platforms',
      description: 'Transform raw data into actionable insights with custom analytics',
      features: [
        'Data warehousing',
        'ETL pipelines',
        'Custom dashboards',
        'Real-time analytics',
        'Predictive modeling',
        'Data visualization'
      ],
      useCases: ['Business intelligence', 'Marketing analytics', 'Operations']
    },
    {
      icon: GitBranch,
      title: 'API & Integration Services',
      description: 'Connect disparate systems and create seamless data flow',
      features: [
        'RESTful API development',
        'Third-party integrations',
        'Microservices architecture',
        'Webhook implementations',
        'Data synchronization',
        'API documentation'
      ],
      useCases: ['System consolidation', 'Partner integrations', 'Legacy modernization']
    }
  ];

  const techStack = [
    {
      category: 'Backend',
      technologies: [
        { name: 'Node.js', icon: '🟢' },
        { name: 'Python', icon: '🐍' },
        { name: 'Java', icon: '☕' },
        { name: 'C#/.NET', icon: '🔷' },
        { name: 'Go', icon: '🔵' },
        { name: 'Ruby', icon: '💎' }
      ]
    },
    {
      category: 'Frontend',
      technologies: [
        { name: 'React', icon: '⚛️' },
        { name: 'Vue.js', icon: '💚' },
        { name: 'Angular', icon: '🅰️' },
        { name: 'Next.js', icon: '▲' },
        { name: 'TypeScript', icon: '📘' },
        { name: 'Tailwind', icon: '🎨' }
      ]
    },
    {
      category: 'Database',
      technologies: [
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'MongoDB', icon: '🍃' },
        { name: 'MySQL', icon: '🐬' },
        { name: 'Redis', icon: '🔴' },
        { name: 'Elasticsearch', icon: '🔍' },
        { name: 'DynamoDB', icon: '⚡' }
      ]
    },
    {
      category: 'Cloud & DevOps',
      technologies: [
        { name: 'AWS', icon: '☁️' },
        { name: 'Azure', icon: '🔷' },
        { name: 'Docker', icon: '🐳' },
        { name: 'Kubernetes', icon: '☸️' },
        { name: 'Jenkins', icon: '🤖' },
        { name: 'Terraform', icon: '🏗️' }
      ]
    }
  ];

  const developmentProcess = [
    {
      phase: 'Discovery & Planning',
      duration: '1-2 weeks',
      icon: FileCode,
      activities: [
        'Requirements gathering',
        'Technical feasibility analysis',
        'Architecture design',
        'Project roadmap creation',
        'Cost estimation'
      ]
    },
    {
      phase: 'Design & Prototyping',
      duration: '2-3 weeks',
      icon: Layers,
      activities: [
        'UI/UX design',
        'Database schema design',
        'API specifications',
        'Interactive prototypes',
        'Design approval'
      ]
    },
    {
      phase: 'Development',
      duration: '8-20 weeks',
      icon: Code2,
      activities: [
        'Agile sprint development',
        'Code reviews',
        'Unit testing',
        'Integration testing',
        'Weekly demos'
      ]
    },
    {
      phase: 'Testing & QA',
      duration: '2-3 weeks',
      icon: CheckCircle2,
      activities: [
        'Functional testing',
        'Performance testing',
        'Security audits',
        'User acceptance testing',
        'Bug fixes'
      ]
    },
    {
      phase: 'Deployment',
      duration: '1 week',
      icon: Server,
      activities: [
        'Production setup',
        'Data migration',
        'Go-live support',
        'User training',
        'Documentation'
      ]
    },
    {
      phase: 'Maintenance',
      duration: 'Ongoing',
      icon: Settings,
      activities: [
        'Bug fixes',
        'Feature updates',
        'Performance optimization',
        'Security patches',
        '24/7 support'
      ]
    }
  ];

  const industries = [
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: '🏥',
      solutions: ['Patient management systems', 'Telemedicine platforms', 'Medical billing software']
    },
    {
      id: 'finance',
      name: 'Finance & Banking',
      icon: '💰',
      solutions: ['Payment processing', 'Risk management tools', 'Trading platforms']
    },
    {
      id: 'retail',
      name: 'Retail & E-commerce',
      icon: '🛍️',
      solutions: ['Inventory management', 'POS systems', 'Order management']
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      icon: '🏭',
      solutions: ['Production planning', 'Quality control systems', 'Supply chain optimization']
    },
    {
      id: 'logistics',
      name: 'Logistics',
      icon: '🚚',
      solutions: ['Fleet management', 'Route optimization', 'Warehouse management']
    },
    {
      id: 'education',
      name: 'Education',
      icon: '🎓',
      solutions: ['Learning management systems', 'Student portals', 'Assessment tools']
    }
  ];

  const caseStudies = [
    {
      industry: 'Manufacturing',
      client: 'Industrial Equipment Manufacturer',
      challenge: 'Manual production planning leading to 30% waste and frequent delays',
      solution: 'Custom ERP system with real-time inventory tracking, automated scheduling, and predictive maintenance',
      results: [
        '40% reduction in waste',
        '25% faster production cycles',
        '$500K annual cost savings',
        '99.5% system uptime'
      ],
      tech: ['Python', 'React', 'PostgreSQL', 'AWS']
    },
    {
      industry: 'Healthcare',
      client: 'Multi-location Clinic Network',
      challenge: 'Disconnected patient records across 15 locations causing inefficiencies',
      solution: 'Cloud-based patient management system with centralized records, appointment scheduling, and billing',
      results: [
        '60% faster patient check-in',
        '100% centralized patient data',
        '35% increase in appointment capacity',
        'HIPAA compliant'
      ],
      tech: ['Node.js', 'Vue.js', 'MongoDB', 'Azure']
    },
    {
      industry: 'Logistics',
      client: 'Regional Delivery Company',
      challenge: 'Inefficient route planning costing $2M annually in fuel and overtime',
      solution: 'AI-powered route optimization platform with real-time tracking and dynamic rerouting',
      results: [
        '$1.2M annual savings',
        '30% reduction in fuel costs',
        '20% more deliveries per day',
        '95% on-time delivery rate'
      ],
      tech: ['Python', 'React Native', 'PostgreSQL', 'Google Cloud']
    }
  ];

  const pricingModels = [
    {
      model: 'Fixed Price',
      icon: DollarSign,
      bestFor: 'Well-defined projects with clear requirements',
      pricing: '$25,000 - $200,000',
      includes: [
        'Detailed project scope',
        'Fixed timeline',
        'Predictable budget',
        'Milestone-based payments',
        'Full ownership of code'
      ]
    },
    {
      model: 'Time & Materials',
      icon: Clock,
      bestFor: 'Evolving projects with changing requirements',
      pricing: '$75 - $150/hour',
      includes: [
        'Flexible scope',
        'Agile methodology',
        'Pay for actual hours',
        'Weekly sprints',
        'Ongoing collaboration'
      ]
    },
    {
      model: 'Dedicated Team',
      icon: Users,
      bestFor: 'Long-term projects requiring full-time resources',
      pricing: '$15,000 - $50,000/month',
      includes: [
        'Dedicated developers',
        'Team scalability',
        'Direct communication',
        'Monthly billing',
        'Flexible contracts'
      ]
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Faster Time to Market',
      description: 'Launch your software 40% faster with our agile development process'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with encryption, penetration testing, and compliance'
    },
    {
      icon: Gauge,
      title: 'Scalable Architecture',
      description: 'Built to handle 10x growth without performance degradation'
    },
    {
      icon: Lock,
      title: 'Full Code Ownership',
      description: 'You own 100% of the source code, databases, and intellectual property'
    },
    {
      icon: Globe,
      title: 'Cloud-Native Solutions',
      description: 'Leverage AWS, Azure, or Google Cloud for maximum reliability'
    },
    {
      icon: TrendingUp,
      title: 'ROI-Focused',
      description: 'Average 300% ROI within 18 months of deployment'
    }
  ];

  return (
    <div className={styles.customSoftwarePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <Settings size={14} />
            Custom Software Development
          </div>
          <h1 className={styles.heroTitle}>
            Tailored Software Solutions
            <span className={styles.gradient}> Built for Your Business</span>
          </h1>
          <p className={styles.heroDescription}>
            From business process automation to enterprise systems, we build custom software 
            that perfectly fits your workflow, scales with your growth, and delivers measurable ROI.
          </p>
          
          <div className={styles.heroButtons}>
            <button className={styles.primaryBtn}>
              Start Your Project
              <ArrowRight size={20} />
            </button>
            <button className={styles.secondaryBtn}>
              <Clock size={18} />
              Schedule Consultation
            </button>
          </div>

          <div className={styles.trustBadges}>
            <div className={styles.trustItem}>
              <Award size={18} />
              <span>ISO 27001 Certified</span>
            </div>
            <div className={styles.trustItem}>
              <Shield size={18} />
              <span>SOC 2 Compliant</span>
            </div>
            <div className={styles.trustItem}>
              <CheckCircle2 size={18} />
              <span>100+ Projects Delivered</span>
            </div>
          </div>
        </div>

        <div className={styles.heroBackground}>
          <div className={styles.gridPattern}></div>
          <div className={styles.gradientOrb} style={{ '--orb-color': '#06b6d4' }}></div>
          <div className={styles.gradientOrb} style={{ '--orb-color': '#0ea5e9' }}></div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefitsSection}>
        <div className={styles.container}>
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

      {/* Solutions Section */}
      <section className={styles.solutionsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Custom Software Solutions</h2>
            <p className={styles.sectionDescription}>
              Comprehensive solutions tailored to your unique business needs
            </p>
          </div>

          <div className={styles.solutionsGrid}>
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <div key={index} className={styles.solutionCard}>
                  <div className={styles.solutionHeader}>
                    <div className={styles.solutionIcon}>
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className={styles.solutionTitle}>{solution.title}</h3>
                      <p className={styles.solutionDescription}>{solution.description}</p>
                    </div>
                  </div>

                  <div className={styles.solutionFeatures}>
                    <h4>Key Features</h4>
                    <ul>
                      {solution.features.map((feature, i) => (
                        <li key={i}>
                          <CheckCircle2 size={16} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.solutionUseCases}>
                    <h4>Use Cases</h4>
                    <div className={styles.useCaseTags}>
                      {solution.useCases.map((useCase, i) => (
                        <span key={i} className={styles.useCaseTag}>{useCase}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className={styles.techStackSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Technology Stack</h2>
            <p className={styles.sectionDescription}>
              We use cutting-edge technologies to build scalable, secure software
            </p>
          </div>

          <div className={styles.techStackGrid}>
            {techStack.map((category, index) => (
              <div key={index} className={styles.techCategory}>
                <h3 className={styles.techCategoryTitle}>{category.category}</h3>
                <div className={styles.techList}>
                  {category.technologies.map((tech, i) => (
                    <div key={i} className={styles.techItem}>
                      <span className={styles.techIcon}>{tech.icon}</span>
                      <span className={styles.techName}>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Development Process</h2>
            <p className={styles.sectionDescription}>
              A proven methodology that ensures quality and on-time delivery
            </p>
          </div>

          <div className={styles.processTimeline}>
            {developmentProcess.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div key={index} className={styles.processPhase}>
                  <div className={styles.phaseNumber}>{index + 1}</div>
                  <div className={styles.phaseContent}>
                    <div className={styles.phaseHeader}>
                      <div className={styles.phaseIcon}>
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className={styles.phaseName}>{phase.phase}</h3>
                        <span className={styles.phaseDuration}>
                          <Clock size={14} />
                          {phase.duration}
                        </span>
                      </div>
                    </div>
                    <ul className={styles.phaseActivities}>
                      {phase.activities.map((activity, i) => (
                        <li key={i}>
                          <CheckCircle2 size={14} />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {index < developmentProcess.length - 1 && (
                    <div className={styles.phaseConnector}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className={styles.industriesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Industries We Serve</h2>
            <p className={styles.sectionDescription}>
              Deep expertise across multiple sectors
            </p>
          </div>

          <div className={styles.industriesGrid}>
            {industries.map((industry, index) => (
              <div 
                key={industry.id} 
                className={`${styles.industryCard} ${selectedIndustry === industry.id ? styles.selected : ''}`}
                onClick={() => setSelectedIndustry(industry.id)}
              >
                <span className={styles.industryIcon}>{industry.icon}</span>
                <h3 className={styles.industryName}>{industry.name}</h3>
                <ul className={styles.industrySolutions}>
                  {industry.solutions.map((solution, i) => (
                    <li key={i}>{solution}</li>
                  ))}
                </ul>
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
              Real results from real custom software projects
            </p>
          </div>

          <div className={styles.caseStudiesGrid}>
            {caseStudies.map((study, index) => (
              <div key={index} className={styles.caseStudyCard}>
                <div className={styles.caseStudyIndustry}>{study.industry}</div>
                <h3 className={styles.caseStudyClient}>{study.client}</h3>
                
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

                  <div className={styles.caseStudyTech}>
                    <h4>Tech Stack</h4>
                    <div className={styles.techTags}>
                      {study.tech.map((tech, i) => (
                        <span key={i} className={styles.techTag}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Models */}
      <section className={styles.pricingSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Flexible Pricing Models</h2>
            <p className={styles.sectionDescription}>
              Choose the engagement model that works best for your project
            </p>
          </div>

          <div className={styles.pricingGrid}>
            {pricingModels.map((model, index) => {
              const Icon = model.icon;
              return (
                <div key={index} className={styles.pricingCard}>
                  <div className={styles.pricingIcon}>
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className={styles.pricingModel}>{model.model}</h3>
                  <div className={styles.pricingAmount}>{model.pricing}</div>
                  <p className={styles.pricingBestFor}>{model.bestFor}</p>
                  
                  <ul className={styles.pricingIncludes}>
                    {model.includes.map((item, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={styles.pricingButton}>
                    Discuss This Model
                    <ArrowRight size={16} />
                  </button>
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
            <h2>Ready to Build Your Custom Software?</h2>
            <p>
              Schedule a free consultation to discuss your project requirements, timeline, 
              and budget. Get a detailed proposal within 48 hours.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryBtn}>
                Start Your Project
                <ArrowRight size={20} />
              </button>
              <button className={styles.secondaryBtn}>
                <FileCode size={18} />
                Download Our Portfolio
              </button>
            </div>
            
            <div className={styles.ctaStats}>
              <div className={styles.ctaStat}>
                <Code2 size={20} />
                <span>100+ Projects Delivered</span>
              </div>
              <div className={styles.ctaStat}>
                <Award size={20} />
                <span>98% Client Satisfaction</span>
              </div>
              <div className={styles.ctaStat}>
                <TrendingUp size={20} />
                <span>$10M+ Business Value Created</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.ctaBackground}>
          <div className={styles.gradientOrb} style={{ '--orb-color': '#06b6d4' }}></div>
          <div className={styles.gradientOrb} style={{ '--orb-color': '#0ea5e9' }}></div>
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

export default CustomSoftware;