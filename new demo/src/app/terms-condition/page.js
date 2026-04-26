"use client"
import React from 'react';
import  Link  from 'next/link';
import { ArrowLeft, Shield, FileText, Users, Clock, Mail, Phone, Database, Lock, Globe, CheckCircle, AlertTriangle } from 'lucide-react';
import styles from '@/styles/modules/TermsAndConditions.module.scss';

const TermsAndConditions = () => {
  return (
    <div className={styles.termsContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Link href="/" className={styles.backButton}>
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </Link>
            <h1 className={styles.heroTitle}>Terms & Conditions</h1>
            <p className={styles.heroSubtitle}>
              Your privacy and data security are our priority. Please read these terms carefully before using our survey platform.
            </p>
            <div className={styles.lastUpdated}>
              <Clock size={16} />
              <span>Last updated: June 16, 2025</span>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop" 
              alt="Professional workspace with laptop showing survey interface"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.contentWrapper}>
        <div className={styles.contentGrid}>
          {/* Table of Contents */}
          <aside className={styles.tableOfContents}>
            <h3>Quick Navigation</h3>
            <nav className={styles.tocNav}>
              <a href="#acceptance" className={styles.tocLink}>1. Acceptance of Terms</a>
              <a href="#services" className={styles.tocLink}>2. Survey Services</a>
              <a href="#user-accounts" className={styles.tocLink}>3. User Accounts & OAuth</a>
              <a href="#data-collection" className={styles.tocLink}>4. Data Collection & APIs</a>
              <a href="#prohibited-uses" className={styles.tocLink}>5. Prohibited Uses</a>
              <a href="#survey-content" className={styles.tocLink}>6. Survey Content</a>
              <a href="#data-processing" className={styles.tocLink}>7. Data Processing</a>
              <a href="#privacy" className={styles.tocLink}>8. Privacy Policy</a>
              <a href="#termination" className={styles.tocLink}>9. Termination</a>
              <a href="#disclaimer" className={styles.tocLink}>10. Disclaimer</a>
              <a href="#limitation" className={styles.tocLink}>11. Limitation of Liability</a>
              <a href="#governing-law" className={styles.tocLink}>12. Governing Law</a>
              <a href="#changes" className={styles.tocLink}>13. Changes to Terms</a>
              <a href="#contact" className={styles.tocLink}>14. Contact Information</a>
            </nav>
          </aside>

          {/* Main Content */}
          <main className={styles.mainContent}>
            {/* Introduction */}
            <section className={styles.introSection}>
              <div className={styles.introCard}>
                <div className={styles.introIcon}>
                  <FileText size={32} />
                </div>
                <div className={styles.introText}>
                  <h2>Welcome to Our Survey Platform</h2>
                  <p>
                    Our platform specializes in collecting valuable insights through surveys across various domains 
                    including web development, app development, and many other fields. These terms govern your use 
                    of our survey services and data processing capabilities.
                  </p>
                </div>
              </div>
            </section>

            {/* Terms Sections */}
            <section id="acceptance" className={styles.termsSection}>
              <div className={styles.sectionHeader}>
                <Shield className={styles.sectionIcon} />
                <h2>1. Acceptance of Terms</h2>
              </div>
              <div className={styles.sectionContent}>
                <p>
                  By accessing and using our survey platform, you accept and agree to be bound by these terms. 
                  If you do not agree to these terms, please do not use our services.
                </p>
                <div className={styles.highlightBox}>
                  <strong>Important:</strong> Your participation in any survey or use of our OAuth login 
                  constitutes acceptance of these terms and our data processing practices.
                </div>
              </div>
            </section>

            <section id="services" className={styles.termsSection}>
              <div className={styles.sectionHeader}>
                <Database className={styles.sectionIcon} />
                <h2>2. Survey Services</h2>
              </div>
              <div className={styles.sectionContent}>
                <p>
                  Our platform provides comprehensive survey services across multiple domains:
                </p>
                <ul className={styles.serviceList}>
                  <li>Web Development surveys and assessments</li>
                  <li>Mobile App Development feedback collection</li>
                  <li>Technology trend analysis surveys</li>
                  <li>User experience and interface research</li>
                  <li>Market research and industry insights</li>
                  <li>Custom survey creation and deployment</li>
                </ul>
                <div className={styles.serviceImage}>
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop" 
                    alt="Person completing survey on laptop"
                  />
                </div>
                <p>
                  Upon survey completion, we utilize OpenAI APIs to process and analyze responses, 
                  providing detailed insights and comprehensive reports.
                </p>
              </div>
            </section>

            <section id="user-accounts" className={styles.termsSection}>
              <div className={styles.sectionHeader}>
                <Users className={styles.sectionIcon} />
                <h2>3. User Accounts & OAuth Authentication</h2>
              </div>
              <div className={styles.sectionContent}>
                <p>
                  Our platform supports secure authentication through Gmail OAuth integration. 
                  When you create an account or sign in, you agree to provide accurate information.
                </p>
                <div className={styles.responsibilityGrid}>
                  <div className={styles.responsibilityItem}>
                    <h4>OAuth Security</h4>
                    <p>We use secure OAuth 2.0 protocols for Gmail authentication, ensuring your credentials remain protected.</p>
                  </div>
                  <div className={styles.responsibilityItem}>
                    <h4>Account Information</h4>
                    <p>Basic profile information from your Gmail account may be used to personalize your experience.</p>
                  </div>
                  <div className={styles.responsibilityItem}>
                    <h4>Data Access</h4>
                    <p>We only access the minimum required information necessary for authentication and service provision.</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="data-collection" className={styles.termsSection}>
              <div className={styles.sectionHeader}>
                <Globe className={styles.sectionIcon} />
                <h2>4. Data Collection & API Integration</h2>
              </div>
              <div className={styles.sectionContent}>
                <p>
                  Our platform integrates with OpenAI APIs to enhance survey analysis and provide intelligent insights:
                </p>
                <div className={styles.highlightBox}>
                  <CheckCircle size={20} style={{display: 'inline', marginRight: '8px', color: '#22c55e'}} />
                  <strong>Data Processing:</strong> Survey responses are processed through secure API calls to generate 
                  detailed analysis and recommendations.
                </div>
                <ul>
                  <li>Survey responses are encrypted during transmission to external APIs</li>
                  <li>API processing enhances the quality and depth of survey insights</li>
                  <li>No personal identification data is shared without explicit consent</li>
                  <li>All API integrations comply with data protection regulations</li>
                </ul>
                <div className={styles.workspaceImage}>
                  <img 
                    src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop" 
                    alt="Data analysis dashboard showing survey insights"
                  />
                </div>
              </div>
            </section>

            <section id="prohibited-uses" className={styles.termsSection}>
              <div className={styles.sectionHeader}>
                <AlertTriangle className={styles.sectionIcon} />
                <h2>5. Prohibited Uses</h2>
              </div>
              <div className={styles.sectionContent}>
                <p>You may not use our survey platform for:</p>
                <ul className={styles.prohibitedList}>
                  <li>Collecting sensitive personal data without proper disclosure</li>
                  <li>Creating surveys with misleading or deceptive content</li>
                  <li>Attempting to bypass our OAuth security measures</li>
                  <li>Submitting false or fraudulent survey responses</li>
                  <li>Using our APIs for unauthorized data scraping</li>
                  <li>Violating any applicable laws or regulations</li>
                </ul>
              </div>
            </section>

            <section id="survey-content" className={styles.termsSection}>
              <div className={styles.sectionHeader}>
                <FileText className={styles.sectionIcon} />
                <h2>6. Survey Content & Responses</h2>
              </div>
              <div className={styles.sectionContent}>
                <p>
                  When participating in surveys or creating survey content, you are responsible for 
                  ensuring accuracy and appropriateness of your contributions.
                </p>
                <div className={styles.contentGuidelines}>
                  <h4>Response Guidelines</h4>
                  <p>Please provide honest, thoughtful responses that contribute to meaningful research and insights.</p>
                </div>
                <div className={styles.responsibilityGrid}>
                  <div className={styles.responsibilityItem}>
                    <h4>Web Development Surveys</h4>
                    <p>Share your technical expertise and experience in web technologies, frameworks, and best practices.</p>
                  </div>
                  <div className={styles.responsibilityItem}>
                    <h4>App Development Surveys</h4>
                    <p>Contribute insights about mobile development, user experience, and application performance.</p>
                  </div>
                  <div className={styles.responsibilityItem}>
                    <h4>Industry Research</h4>
                    <p>Provide valuable feedback on industry trends, tools, and emerging technologies.</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="data-processing" className={styles.termsSection}>
              <div className={styles.sectionHeader}>
                <Lock className={styles.sectionIcon} />
                <h2>7. Data Processing & Security</h2>
              </div>
              <div className={styles.sectionContent}>
                <p>
                  Your survey data is processed securely through our integration with OpenAI APIs to provide 
                  enhanced analysis and insights.
                </p>
                <div className={styles.highlightBox}>
                  <strong>Security Measures:</strong> All data transmission is encrypted, and we follow 
                  industry-standard security practices for API integration and data handling.
                </div>
                <div className={styles.serviceImage}>
                  <img 
                    src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop" 
                    alt="Secure data processing visualization"
                  />
                </div>
              </div>
            </section>

            <section id="privacy" className={styles.termsSection}>
              <div className={styles.sectionHeader}>
                <Shield className={styles.sectionIcon} />
                <h2>8. Privacy Policy</h2>
              </div>
              <div className={styles.sectionContent}>
                <p>
                  Your privacy is fundamental to our service. Our Privacy Policy details how we collect, 
                  use, and protect your information in conjunction with OAuth authentication and API processing.
                </p>
                <div className={styles.responsibilityGrid}>
                  <div className={styles.responsibilityItem}>
                    <h4>OAuth Data</h4>
                    <p>We only access basic profile information necessary for authentication purposes.</p>
                  </div>
                  <div className={styles.responsibilityItem}>
                    <h4>Survey Responses</h4>
                    <p>Your responses are anonymized when processed through external APIs for analysis.</p>
                  </div>
                  <div className={styles.responsibilityItem}>
                    <h4>Data Retention</h4>
                    <p>We retain data only as long as necessary to provide our services and insights.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Remaining sections */}
            <section id="termination" className={styles.termsSection}>
              <div className={styles.sectionHeader}>
                <h2>9. Termination</h2>
              </div>
              <div className={styles.sectionContent}>
                <p>
                  We may terminate or suspend your account immediately if you violate these terms, 
                  compromise survey integrity, or misuse our OAuth authentication system.
                </p>
              </div>
            </section>

            <section id="disclaimer" className={styles.termsSection}>
              <div className={styles.sectionHeader}>
                <h2>10. Disclaimer</h2>
              </div>
              <div className={styles.sectionContent}>
                <p>
                  Our survey platform and API integrations are provided "as is." We strive for accuracy 
                  in our analysis and insights but cannot guarantee the completeness or accuracy of all results.
                </p>
              </div>
            </section>

            <section id="limitation" className={styles.termsSection}>
              <div className={styles.sectionHeader}>
                <h2>11. Limitation of Liability</h2>
              </div>
              <div className={styles.sectionContent}>
                <p>
                  Our liability is limited regarding survey data processing, API integrations, and OAuth 
                  authentication services. We are not liable for any indirect damages resulting from service use.
                </p>
              </div>
            </section>

            <section id="governing-law" className={styles.termsSection}>
              <div className={styles.sectionHeader}>
                <h2>12. Governing Law</h2>
              </div>
              <div className={styles.sectionContent}>
                <p>
                  These Terms are governed by applicable data protection and privacy laws, particularly 
                  regarding survey data collection and OAuth authentication practices.
                </p>
              </div>
            </section>

            <section id="changes" className={styles.termsSection}>
              <div className={styles.sectionHeader}>
                <h2>13. Changes to Terms</h2>
              </div>
              <div className={styles.sectionContent}>
                <p>
                  We may update these terms to reflect changes in our survey services, API integrations, 
                  or authentication methods. Users will be notified of material changes.
                </p>
              </div>
            </section>

            <section id="contact" className={styles.termsSection}>
              <div className={styles.sectionHeader}>
                <h2>14. Contact Information</h2>
              </div>
              <div className={styles.sectionContent}>
                <p>For questions about these Terms, our survey platform, or data processing practices:</p>
                <div className={styles.contactInfo}>
                  <div className={styles.contactItem}>
                    <Mail size={20} />
                    <span>info@evolkun.com</span>
                  </div>
                  {/* <div className={styles.contactItem}>
                    <Phone size={20} />
                    <span>+1 (555) 123-4567</span>
                  </div> */}
                  <div className={styles.contactItem}>
                    <Globe size={20} />
                    <span>Data Protection Officer: info@evolkun.com</span>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
