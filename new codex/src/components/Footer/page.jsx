"use client";
import React from 'react';
import { Instagram, Linkedin, X, Mail, ArrowUpRight } from 'lucide-react';
import styles from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'Instagram', 
      icon: Instagram, 
      href: 'https://www.instagram.com/evolkun_officials/', 
      color: '#E4405F',
      hoverColor: '#d62976'
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      href: 'https://www.linkedin.com/in/evolkun-pvt-65680b36a', 
      color: '#0A66C2',
      hoverColor: '#004182'
    },
    { 
      name: 'X', 
      icon: X, 
      href: 'https://x.com/Evolkun_7', 
      color: '#000000',
      hoverColor: '#14171A'
    },
  ];

  const quickLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Case Studies', href: '/case-studies' },
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      {/* Decorative top accent */}
      <div className={styles.accentLine}></div>
      
      <div className={styles.container}>
        {/* Main footer content */}
        <div className={styles.mainContent}>
          {/* Brand section */}
          <div className={styles.brandSection}>
            <div className={styles.logoContainer}>
              <h2 className={styles.logo}>EVOLKUN</h2>
              <div className={styles.logoBadge}>Digital Studio</div>
            </div>
            <p className={styles.tagline}>
              Crafting emotionally engaging, AI-powered digital experiences 
              that drive real business results.
            </p>
            
            {/* Social links */}
            <div className={styles.socials}>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={social.name} 
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    style={{ '--hover-color': social.hoverColor }}
                    aria-label={social.name}
                  >
                    <Icon size={20} strokeWidth={1.5} />
                    <span className={styles.socialTooltip}>{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links section */}
          <div className={styles.linksGrid}>
            <div className={styles.linkColumn}>
              <h3 className={styles.linkTitle}>Quick Links</h3>
              <ul className={styles.linkList}>
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className={styles.link}>
                      {link.name}
                      <ArrowUpRight size={14} className={styles.linkIcon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h3 className={styles.linkTitle}>Company</h3>
              <ul className={styles.linkList}>
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className={styles.link}>
                      {link.name}
                      <ArrowUpRight size={14} className={styles.linkIcon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h3 className={styles.linkTitle}>Get in Touch</h3>
              <div className={styles.contactInfo}>
                <a href="mailto:contact@evolkun.com" className={styles.contactLink}>
                  <Mail size={18} />
                  <span>contact@evolkun.com</span>
                </a>
                <p className={styles.locationText}>
                  Dehradun IT Park, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            <p>
              © {currentYear} <span className={styles.brandName}>EVOLKUN</span>
              <span className={styles.separator}>•</span>
              All rights reserved
            </p>
          </div>

          <div className={styles.legalLinks}>
            <a href="#privacy" className={styles.legalLink}>Privacy Policy</a>
            <span className={styles.dot}>·</span>
            <a href="#terms" className={styles.legalLink}>Terms of Service</a>
            <span className={styles.dot}>·</span>
            <button onClick={scrollToTop} className={styles.backToTop}>
              Back to top ↑
            </button>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className={styles.bgDecoration}>
        <div className={styles.gradientOrb} style={{ '--orb-color': '#60a5fa' }}></div>
        <div className={styles.gradientOrb} style={{ '--orb-color': '#a78bfa' }}></div>
        <div className={styles.gradientOrb} style={{ '--orb-color': '#ec4899' }}></div>
      </div>
    </footer>
  );
};

export default Footer;