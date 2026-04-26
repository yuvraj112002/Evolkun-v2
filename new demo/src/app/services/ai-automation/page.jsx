"use client";
import React, { useState } from 'react';
import { 
  Bot, Zap, Brain, Cpu, Sparkles, TrendingUp, Clock,
  CheckCircle2, ArrowRight, Users, BarChart3, Award,
  MessageSquare, FileText, Mail, Shield, Target, Workflow,
  Database, Cloud, Code2, GitBranch, Layers, Settings,
  Globe, DollarSign, ChevronRight, Star, Lightbulb
} from 'lucide-react';
import Link from 'next/link';
import styles from './AIAutomation.module.scss';

const AIAutomation = () => {
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const aiSolutions = [
    {
      icon: MessageSquare,
      title: 'AI Chatbots & Virtual Assistants',
      description: 'Intelligent conversational AI that understands and responds like a human',
      features: [
        '24/7 customer support automation',
        'Multi-language support',
        'Context-aware conversations',
        'Sentiment analysis',
        'CRM & database integration',
        'Human handoff when needed',
        'Learning from interactions',
        'Custom personality & voice'
      ],
      useCases: ['Customer service', 'Lead qualification', 'Sales assistance'],
      roi: '70% reduction in support costs'
    },
    {
      icon: Workflow,
      title: 'Process Automation',
      description: 'Automate repetitive tasks and streamline complex workflows with AI',
      features: [
        'Document processing & OCR',
        'Data entry automation',
        'Invoice & receipt processing',
        'Email categorization',
        'Workflow orchestration',
        'Task prioritization',
        'Automated reporting',
        'Error detection & correction'
      ],
      useCases: ['Finance operations', 'HR processes', 'Data management'],
      roi: '80% time savings on manual tasks'
    },
    {
      icon: Brain,
      title: 'Predictive Analytics',
      description: 'AI-powered forecasting and insights to make better business decisions',
      features: [
        'Sales forecasting',
        'Demand prediction',
        'Customer churn prediction',
        'Inventory optimization',
        'Price optimization',
        'Risk assessment',
        'Trend analysis',
        'Anomaly detection'
      ],
      useCases: ['Sales planning', 'Supply chain', 'Risk management'],
      roi: '35% improvement in forecast accuracy'
    },
    {
      icon: Target,
      title: 'Personalization Engines',
      description: 'Deliver hyper-personalized experiences to each customer',
      features: [
        'Product recommendations',
        'Content personalization',
        'Dynamic pricing',
        'Email personalization',
        'Search personalization',
        'Customer segmentation',
        'A/B testing automation',
        'Journey optimization'
      ],
      useCases: ['E-commerce', 'Marketing', 'Content delivery'],
      roi: '45% increase in conversion rates'
    },
    {
      icon: FileText,
      title: 'Content Generation',
      description: 'AI-powered content creation at scale with brand consistency',
      features: [
        'Blog post generation',
        'Product descriptions',
        'Social media content',
        'Email copywriting',
        'Ad copy creation',
        'SEO optimization',
        'Multi-language content',
        'Brand voice training'
      ],
      useCases: ['Marketing content', 'E-commerce', 'SEO'],
      roi: '90% faster content production'
    },
    {
      icon: Database,
      title: 'Computer Vision',
      description: 'Visual AI for image and video analysis and processing',
      features: [
        'Object detection & recognition',
        'Facial recognition',
        'Quality inspection',
        'Image classification',
        'OCR & document scanning',
        'Video analysis',
        'Medical image analysis',
        'Defect detection'
      ],
      useCases: ['Manufacturing', 'Healthcare', 'Security'],
      roi: '95% accuracy in quality control'
    }
  ];

  const aiCapabilities = [
    {
      icon: Zap,
      stat: '10x',
      label: 'Faster Processing',
      description: 'AI handles tasks in seconds that would take hours manually'
    },
    {
      icon: TrendingUp,
      stat: '40%',
      label: 'Cost Reduction',
      description: 'Average savings on operational costs with AI automation'
    },
    {
      icon: Target,
      stat: '99%',
      label: 'Accuracy Rate',
      description: 'AI precision in data processing and decision making'
    },
    {
      icon: Clock,
      stat: '24/7',
      label: 'Always Available',
      description: 'AI systems work around the clock without breaks'
    }
  ];

  const useCaseExamples = [
    {
      title: 'Customer Support Automation',
      industry: 'E-commerce',
      challenge: 'Handling 10,000+ monthly support tickets with limited staff',
      solution: 'AI chatbot handling tier 1 support, smart routing, automated responses',
      implementation: [
        'Trained AI on 50K historical tickets',
        'Integrated with Zendesk & Shopify',
        'Created escalation workflows',
        'Deployed across web, mobile, WhatsApp'
      ],
      results: {
        'Response Time': '< 10 seconds',
        'Tickets Resolved': '75% automated',
        'Customer Satisfaction': '4.8/5 rating',
        'Cost Savings': '$180K annually'
      },
      icon: MessageSquare
    },
    {
      title: 'Invoice Processing System',
      industry: 'Finance',
      challenge: 'Processing 5,000+ invoices monthly with 20% error rate',
      solution: 'AI-powered OCR and validation system with automated data entry',
      implementation: [
        'Document classification AI',
        'Data extraction & validation',
        'ERP integration',
        'Exception handling workflow'
      ],
      results: {
        'Processing Time': '3 min → 30 sec',
        'Accuracy': '99.2%',
        'Manual Work': '85% reduction',
        'ROI': '450% in year 1'
      },
      icon: FileText
    },
    {
      title: 'Sales Lead Qualification',
      industry: 'B2B SaaS',
      challenge: 'Sales team spending 60% of time on unqualified leads',
      solution: 'AI lead scoring and automated qualification system',
      implementation: [
        'ML model trained on 2 years of data',
        'Integration with CRM & marketing',
        'Automated email sequences',
        'Real-time lead scoring'
      ],
      results: {
        'Qualified Leads': '+180%',
        'Sales Efficiency': '+65%',
        'Conversion Rate': '2.1% → 5.8%',
        'Revenue Impact': '+$2.4M'
      },
      icon: Target
    }
  ];

  const aiTechStack = [
    {
      category: 'AI Frameworks',
      technologies: [
        { name: 'OpenAI GPT', icon: '🤖' },
        { name: 'TensorFlow', icon: '🧠' },
        { name: 'PyTorch', icon: '🔥' },
        { name: 'LangChain', icon: '⛓️' },
        { name: 'Hugging Face', icon: '🤗' },
        { name: 'Claude AI', icon: '💬' }
      ]
    },
    {
      category: 'ML & Data',
      technologies: [
        { name: 'Scikit-learn', icon: '📊' },
        { name: 'Pandas', icon: '🐼' },
        { name: 'NumPy', icon: '🔢' },
        { name: 'Keras', icon: '🎯' },
        { name: 'XGBoost', icon: '🚀' },
        { name: 'Apache Spark', icon: '⚡' }
      ]
    },
    {
      category: 'Computer Vision',
      technologies: [
        { name: 'OpenCV', icon: '👁️' },
        { name: 'YOLO', icon: '🎥' },
        { name: 'Tesseract OCR', icon: '📝' },
        { name: 'Detectron2', icon: '🔍' },
        { name: 'MediaPipe', icon: '🖐️' },
        { name: 'Azure Vision', icon: '☁️' }
      ]
    },
    {
      category: 'Deployment',
      technologies: [
        { name: 'Docker', icon: '🐳' },
        { name: 'Kubernetes', icon: '☸️' },
        { name: 'AWS SageMaker', icon: '📦' },
        { name: 'Google Cloud AI', icon: '🌐' },
        { name: 'Azure ML', icon: '🔷' },
        { name: 'FastAPI', icon: '⚡' }
      ]
    }
  ];

  const implementationProcess = [
    {
      phase: 'Discovery & Analysis',
      duration: '1-2 weeks',
      activities: [
        'Identify automation opportunities',
        'Analyze current processes',
        'Define success metrics',
        'Assess data availability',
        'Create project roadmap'
      ]
    },
    {
      phase: 'Data Preparation',
      duration: '2-3 weeks',
      activities: [
        'Data collection & cleaning',
        'Labeling & annotation',
        'Feature engineering',
        'Data pipeline setup',
        'Quality validation'
      ]
    },
    {
      phase: 'AI Model Development',
      duration: '4-8 weeks',
      activities: [
        'Model selection & training',
        'Hyperparameter tuning',
        'Testing & validation',
        'Performance optimization',
        'Accuracy improvement'
      ]
    },
    {
      phase: 'Integration & Deployment',
      duration: '2-4 weeks',
      activities: [
        'System integration',
        'API development',
        'Security implementation',
        'Load testing',
        'Production deployment'
      ]
    },
    {
      phase: 'Monitoring & Optimization',
      duration: 'Ongoing',
      activities: [
        'Performance monitoring',
        'Model retraining',
        'User feedback analysis',
        'Continuous improvement',
        'Feature updates'
      ]
    }
  ];

  const pricingPackages = [
    {
      id: 'starter',
      name: 'AI Starter',
      price: '$2,999',
      period: '/month',
      description: 'Perfect for automating your first AI use case',
      features: [
        '1 AI automation project',
        'Chatbot OR process automation',
        'Up to 10,000 monthly operations',
        'Basic analytics dashboard',
        'Email support',
        'Monthly model retraining',
        '2 integration points'
      ],
      popular: false
    },
    {
      id: 'business',
      name: 'AI Business',
      price: '$7,999',
      period: '/month',
      description: 'Scale AI across multiple business processes',
      features: [
        '3 AI automation projects',
        'Advanced chatbots & automation',
        'Up to 50,000 monthly operations',
        'Custom ML models',
        'Advanced analytics & insights',
        'Priority support',
        'Weekly model optimization',
        'Unlimited integrations',
        'Dedicated AI specialist'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'AI Enterprise',
      price: 'Custom',
      period: '',
      description: 'Enterprise-grade AI solutions at scale',
      features: [
        'Unlimited AI projects',
        'Custom AI development',
        'Unlimited operations',
        'Advanced computer vision',
        'Predictive analytics',
        'Real-time monitoring',
        '24/7 dedicated support',
        'Custom infrastructure',
        'On-premise deployment option',
        'Dedicated AI team',
        'SLA guarantees'
      ],
      popular: false
    }
  ];

  const industries = [
    { id: 'ecommerce', name: 'E-commerce', icon: '🛍️' },
    { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
    { id: 'finance', name: 'Finance', icon: '💰' },
    { id: 'manufacturing', name: 'Manufacturing', icon: '🏭' },
    { id: 'logistics', name: 'Logistics', icon: '🚚' },
    { id: 'retail', name: 'Retail', icon: '🏪' }
  ];

  return (
    <div className={styles.aiAutomationPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <Sparkles size={14} />
            AI & Automation Solutions
          </div>
          <h1 className={styles.heroTitle}>
            Unlock Business Growth with
            <span className={styles.gradient}> Intelligent Automation</span>
          </h1>
          <p className={styles.heroDescription}>
            Transform your business with cutting-edge AI solutions. From intelligent chatbots 
            to predictive analytics, we build custom AI systems that learn, adapt, and deliver 
            measurable ROI.
          </p>
          
          <div className={styles.heroButtons}>
            <button className={styles.primaryBtn}>
              <Zap size={18} />
              Start AI Transformation
              <ArrowRight size={20} />
            </button>
            <button className={styles.secondaryBtn}>
              <BarChart3 size={18} />
              See AI in Action
            </button>
          </div>

          <div className={styles.trustBadges}>
            <div className={styles.trustItem}>
              <Bot size={18} />
              <span>100+ AI Models Deployed</span>
            </div>
            <div className={styles.trustItem}>
              <Award size={18} />
              <span>AWS AI Partner</span>
            </div>
            <div className={styles.trustItem}>
              <CheckCircle2 size={18} />
              <span>Enterprise-Grade Security</span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Capabilities */}
      <section className={styles.capabilitiesSection}>
        <div className={styles.container}>
          <div className={styles.capabilitiesGrid}>
            {aiCapabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div key={index} className={styles.capabilityCard}>
                  <div className={styles.capabilityIcon}>
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <div className={styles.capabilityStat}>{capability.stat}</div>
                  <div className={styles.capabilityLabel}>{capability.label}</div>
                  <p className={styles.capabilityDescription}>{capability.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Solutions */}
      <section className={styles.solutionsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>AI-Powered Solutions</h2>
            <p className={styles.sectionDescription}>
              Comprehensive AI services tailored to your business needs
            </p>
          </div>

          <div className={styles.solutionsGrid}>
            {aiSolutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <div key={index} className={styles.solutionCard}>
                  <div className={styles.solutionHeader}>
                    <div className={styles.solutionIcon}>
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <div className={styles.solutionBadge}>{solution.roi}</div>
                  </div>
                  
                  <h3 className={styles.solutionTitle}>{solution.title}</h3>
                  <p className={styles.solutionDescription}>{solution.description}</p>
                  
                  <div className={styles.solutionFeatures}>
                    <h4>Features</h4>
                    <ul>
                      {solution.features.slice(0, 6).map((feature, i) => (
                        <li key={i}>
                          <CheckCircle2 size={16} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.solutionUseCases}>
                    {solution.useCases.map((useCase, i) => (
                      <span key={i} className={styles.useCaseTag}>{useCase}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Case Examples */}
      <section className={styles.useCasesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Real-World AI Implementations</h2>
            <p className={styles.sectionDescription}>
              See how we've transformed businesses with AI automation
            </p>
          </div>

          <div className={styles.useCaseTabs}>
            {useCaseExamples.map((useCase, index) => (
              <button
                key={index}
                className={`${styles.useCaseTab} ${activeUseCase === index ? styles.active : ''}`}
                onClick={() => setActiveUseCase(index)}
              >
                {useCase.title}
              </button>
            ))}
          </div>

          <div className={styles.useCaseContent}>
            {useCaseExamples.map((useCase, index) => {
              const Icon = useCase.icon;
              return activeUseCase === index && (
                <div key={index} className={styles.useCaseDetails}>
                  <div className={styles.useCaseLeft}>
                    <div className={styles.useCaseIndustry}>
                      <Globe size={16} />
                      {useCase.industry}
                    </div>
                    <h3>{useCase.title}</h3>
                    
                    <div className={styles.useCaseSection}>
                      <h4>Challenge</h4>
                      <p>{useCase.challenge}</p>
                    </div>

                    <div className={styles.useCaseSection}>
                      <h4>AI Solution</h4>
                      <p>{useCase.solution}</p>
                    </div>

                    <div className={styles.useCaseSection}>
                      <h4>Implementation</h4>
                      <ul>
                        {useCase.implementation.map((step, i) => (
                          <li key={i}>
                            <ChevronRight size={16} />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={styles.useCaseRight}>
                    <div className={styles.resultsHeader}>
                      <Icon size={32} />
                      <h4>Results</h4>
                    </div>
                    <div className={styles.resultsGrid}>
                      {Object.entries(useCase.results).map(([key, value]) => (
                        <div key={key} className={styles.resultCard}>
                          <div className={styles.resultValue}>{value}</div>
                          <div className={styles.resultLabel}>{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className={styles.techStackSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Cutting-Edge AI Technology</h2>
            <p className={styles.sectionDescription}>
              We use the latest AI frameworks and tools
            </p>
          </div>

          <div className={styles.techStackGrid}>
            {aiTechStack.map((category, index) => (
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

      {/* Implementation Process */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our AI Implementation Process</h2>
            <p className={styles.sectionDescription}>
              From concept to deployment in 8-16 weeks
            </p>
          </div>

          <div className={styles.processTimeline}>
            {implementationProcess.map((phase, index) => (
              <div key={index} className={styles.processPhase}>
                <div className={styles.phaseNumber}>{index + 1}</div>
                <div className={styles.phaseContent}>
                  <div className={styles.phaseHeader}>
                    <h3>{phase.phase}</h3>
                    <span className={styles.phaseDuration}>
                      <Clock size={14} />
                      {phase.duration}
                    </span>
                  </div>
                  <ul className={styles.phaseActivities}>
                    {phase.activities.map((activity, i) => (
                      <li key={i}>
                        <CheckCircle2 size={14} />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
                {index < implementationProcess.length - 1 && (
                  <div className={styles.phaseConnector}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={styles.pricingSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>AI Automation Packages</h2>
            <p className={styles.sectionDescription}>
              Flexible pricing for businesses of all sizes
            </p>
          </div>

          <div className={styles.pricingGrid}>
            {pricingPackages.map((pkg) => (
              <div 
                key={pkg.id}
                className={`${styles.pricingCard} ${pkg.popular ? styles.popular : ''}`}
              >
                {pkg.popular && (
                  <div className={styles.popularBadge}>
                    <Star size={14} />
                    Most Popular
                  </div>
                )}
                
                <h3 className={styles.packageName}>{pkg.name}</h3>
                <div className={styles.packagePrice}>
                  {pkg.price}
                  <span className={styles.packagePeriod}>{pkg.period}</span>
                </div>
                <p className={styles.packageDescription}>{pkg.description}</p>

                <ul className={styles.packageFeatures}>
                  {pkg.features.map((feature, i) => (
                    <li key={i}>
                      <CheckCircle2 size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`${styles.packageButton} ${pkg.popular ? styles.primary : ''}`}>
                  {pkg.id === 'enterprise' ? 'Contact Sales' : 'Get Started'}
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaIcon}>
              <Lightbulb size={48} />
            </div>
            <h2>Ready to Automate Your Business with AI?</h2>
            <p>
              Book a free AI consultation and discover how custom AI solutions can transform 
              your operations, reduce costs, and unlock new revenue streams.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryBtn}>
                <Zap size={18} />
                Schedule AI Consultation
                <ArrowRight size={20} />
              </button>
              <button className={styles.secondaryBtn}>
                <FileText size={18} />
                Download AI Guide
              </button>
            </div>
            
            <div className={styles.ctaStats}>
              <div className={styles.ctaStat}>
                <Bot size={20} />
                <span>100+ AI Models Deployed</span>
              </div>
              <div className={styles.ctaStat}>
                <TrendingUp size={20} />
                <span>$50M+ Value Created</span>
              </div>
              <div className={styles.ctaStat}>
                <Users size={20} />
                <span>98% Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Services */}
      <div className={styles.backToServices}>
        <div className={styles.container}>
          <Link href="/services" className={styles.backLink}>
            ← Back to All Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AIAutomation;