"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Users,
  ChevronDown,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./VulcanHomePage.scss";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "What happens after I submit the quick quiz?",
    a: "Our team reviews your business details, understands your goals, checks what kind of digital solution fits best, and then prepares for a clearer discussion with you.",
  },
  {
    q: "Is this only for website development?",
    a: "No. The quiz helps us understand your business properly. Based on your requirement, we can guide you for websites, branding, UI/UX, SEO, automation, content or complete digital growth.",
  },
  {
    q: "Why should I answer the quiz before a call?",
    a: "It saves time for both sides. Instead of starting the call with basic questions, we already understand your business and can discuss better ideas, direction and execution.",
  },
  {
    q: "Will I get a final quotation instantly?",
    a: "The quiz helps us evaluate your requirement. After reviewing it, we can suggest a more accurate scope, timeline and quotation instead of giving random pricing.",
  },
];

export default function VulcanHomePage() {
  const rootRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(0);

  const goToSurvey = () => {
    gsap.to(".vulcan-page", {
      x: "-100%",
      opacity: 0,
      duration: 0.55,
      ease: "power3.inOut",
      onComplete: () => {
        window.location.href = "/survey-page";
      },
    });
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      gsap.from(".hero-badge, .hero-title, .hero-text, .hero-actions", {
        y: 45,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".hero-card", {
        scale: 0.92,
        opacity: 0,
        duration: 1,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.to(".orb-lime", {
        y: 30,
        x: -25,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: "sine.inOut",
      });

      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
          },
          y: 55,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray(".service-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
          y: 45,
          opacity: 0,
          duration: 0.75,
          delay: i * 0.08,
          ease: "power3.out",
        });
      });
    }, rootRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={rootRef} className="vulcan-page">
      <section className="hero-section">
        <div className="orb orb-lime" />

        <div className="hero-grid">
          <div>
            <div className="hero-badge">
              <Sparkles size={16} />
              Start with clarity, not confusion
            </div>

            <h1 className="hero-title">
              Let’s understand your business before we build anything.
            </h1>

            <p className="hero-text">
              Take a quick quiz and tell us what your business needs. Our team will
              evaluate your goals, understand your direction, and prepare better
              before scheduling a proper discussion with you.
            </p>

            <div className="hero-actions">
              <button onClick={goToSurvey} className="primary-btn">
                Take Quick Brand Quiz <ArrowRight size={18} />
              </button>

              <a href="#about" className="secondary-btn">
                Explore Process
              </a>
            </div>
          </div>

          <div className="hero-card">
            <div className="mock-browser">
              <div className="browser-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="mock-content">
                <div className="mini-tag">Quiz → Evaluation → Strategy Call</div>

                <h3>Your answers help us prepare smarter.</h3>

                <p>
                  We use your inputs to understand your business type, goals,
                  required services, budget direction and the best possible digital
                  roadmap before the first serious conversation.
                </p>

                <div className="stats-row">
                  <div>
                    <b>5 min</b>
                    <span>Quick business quiz</span>
                  </div>
                  <div>
                    <b>1:1</b>
                    <span>Prepared discussion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section about-section reveal">
        <div className="section-label">Why This Flow Exists</div>

        <h2>Most projects fail before they start because nobody asks the right questions.</h2>

        <p>
          Instead of jumping directly into pricing or random suggestions, we first
          understand your business, audience, goals and digital gaps. This helps us
          guide you better and avoid unnecessary confusion during execution.
        </p>

        <div className="about-grid">
          <div>
            <Zap />
            <h3>Faster understanding</h3>
            <p>
              We collect the important details before the call, so the discussion
              becomes sharper and more useful.
            </p>
          </div>

          <div>
            <Target />
            <h3>Better direction</h3>
            <p>
              Your answers help us understand whether you need a website, branding,
              SEO, automation, content or a complete digital system.
            </p>
          </div>

          <div>
            <Users />
            <h3>Prepared team</h3>
            <p>
              Our team gets context before speaking with you, so we can suggest
              practical ideas instead of generic advice.
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="section services-section">
        <div className="section-label reveal">What We Evaluate</div>

        <h2 className="reveal">
          We understand your requirement first, then suggest what actually fits.
        </h2>

        <div className="services-grid">
          {[
            "Business Type",
            "Website Requirement",
            "Brand Direction",
            "Marketing Goals",
            "Content Readiness",
            "Growth Roadmap",
          ].map((item, index) => (
            <div className="service-card" key={index}>
              <span>0{index + 1}</span>
              <h3>{item}</h3>
              <p>
                We use this information to create a cleaner scope, better execution
                direction and a more practical project discussion.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section motivation-section reveal">
        <div className="motivation-card">
          <h2>
            A good digital project does not start with code. It starts with clarity.
          </h2>

          <p>
            The quiz helps us understand what you are building, why you need it,
            who it is for, and how we can make it stronger before execution begins.
          </p>

          <button onClick={goToSurvey} className="primary-btn dark">
            Let’s Evaluate Your Business <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <section id="founder" className="section founder-section reveal">
        <div className="founder-image">
          <img
            src="/images/office.webp"
            alt="Founder - Evolkun"
            className="founder-img"
          />
        </div>

        <div>
          <div className="section-label">Founder Note</div>

          <h2>We built this process because clients deserve better conversations.</h2>

          <p>
            Many businesses approach agencies without knowing exactly what they need.
            And many agencies respond with random packages. Evolkun’s approach is
            different — we first understand, then guide, then build.
          </p>

          <p>
            Our goal is to make the first conversation more valuable, more prepared
            and more focused on your actual business growth.
          </p>
        </div>
      </section>

      <section id="faq" className="section faq-section reveal">
        <div className="section-label">FAQ</div>

        <h2>Questions before you start the quiz.</h2>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              className={`faq-item ${openFaq === index ? "active" : ""}`}
              key={index}
            >
              <button onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                {faq.q}
                <ChevronDown size={20} />
              </button>

              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section final-cta reveal">
        <h2>Ready to give us the right context?</h2>

        <p>
          Start with the quick quiz. We’ll review your answers and prepare a better
          direction before scheduling the discussion.
        </p>

        <button onClick={goToSurvey} className="primary-btn">
          Start Your Project <ArrowRight size={18} />
        </button>
      </section>
    </main>
  );
}