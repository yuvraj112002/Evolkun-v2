"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState({});
  const observerRefs = useRef({});

  useEffect(() => {
    const observers = {};
    
    Object.keys(observerRefs.current).forEach((key) => {
      if (observerRefs.current[key]) {
        observers[key] = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({ ...prev, [key]: true }));
            }
          },
          { threshold: 0.1 }
        );
        observers[key].observe(observerRefs.current[key]);
      }
    });

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, []);

  const stats = [
    { number: "150+", label: "Projects Delivered", suffix: "" },
    { number: "50+", label: "Happy Clients", suffix: "" },
    { number: "8+", label: "Years Experience", suffix: "" },
    { number: "98%", label: "Client Satisfaction", suffix: "" },
  ];

  const values = [
    {
      icon: "⚡",
      title: "Innovation First",
      description: "We leverage cutting-edge technologies and creative solutions to keep your business ahead of the curve.",
    },
    {
      icon: "🎯",
      title: "Results Driven",
      description: "Every project is measured by tangible outcomes. We focus on ROI and meaningful business impact.",
    },
    {
      icon: "🤝",
      title: "Partnership Approach",
      description: "We're not just vendors—we're your strategic partners invested in your long-term success.",
    },
    {
      icon: "✨",
      title: "Quality Excellence",
      description: "Meticulous attention to detail and rigorous quality standards in everything we deliver.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/images/team/ceo.jpg",
      bio: "15+ years leading digital transformation",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "/images/team/cto.jpg",
      bio: "Tech visionary with expertise in AI & cloud",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      image: "/images/team/design.jpg",
      bio: "Award-winning UX/UI designer",
    },
    {
      name: "David Kim",
      role: "Lead Developer",
      image: "/images/team/dev.jpg",
      bio: "Full-stack expert, 10+ years experience",
    },
  ];

  const milestones = [
    {
      year: "2017",
      title: "Company Founded",
      description: "Started with a vision to transform businesses through technology",
    },
    {
      year: "2019",
      title: "Reached 50 Clients",
      description: "Expanded team and service offerings across multiple industries",
    },
    {
      year: "2021",
      title: "Award Recognition",
      description: "Won Best Digital Agency award for innovative solutions",
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Pioneered AI-powered automation services for clients",
    },
    {
      year: "2025",
      title: "Global Expansion",
      description: "Serving clients across 15+ countries with 24/7 support",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-50 via-white to-zinc-50 pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.05),transparent_50%)]" />
        
        <div className="relative mx-auto max-w-7xl px-6">
          <div
            ref={(el) => (observerRefs.current["hero"] = el)}
            className={`text-center transition-all duration-1000 ${
              isVisible["hero"]
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/60 px-4 py-2 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-sm font-medium text-zinc-700">About Evolkun</span>
            </div>

            <h1 className="mb-6 text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
              Building Tomorrow's
              <br />
              <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
                Digital Experiences
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-zinc-600">
              We're a team of passionate innovators, designers, and developers dedicated to 
              transforming businesses through cutting-edge digital solutions and AI-powered automation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/survey-page"
                className="inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-zinc-800 hover:shadow-lg hover:shadow-black/20"
              >
                Start Your Project
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-8 py-4 text-sm font-semibold text-zinc-900 transition-all duration-200 hover:bg-zinc-50"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-zinc-100 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div
            ref={(el) => (observerRefs.current["stats"] = el)}
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  isVisible["stats"]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-2 text-4xl font-bold text-zinc-900 lg:text-5xl">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-zinc-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div
              ref={(el) => (observerRefs.current["story-text"] = el)}
              className={`flex flex-col justify-center transition-all duration-1000 ${
                isVisible["story-text"]
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
            >
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-zinc-100 px-4 py-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                  Our Story
                </span>
              </div>

              <h2 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 lg:text-5xl">
                Turning Vision Into Reality Since 2025
              </h2>

              <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                <p>
                  What started as a small team of passionate developers has grown into a 
                  full-service digital agency serving clients globally. Our journey has been 
                  driven by one core belief: technology should empower businesses, not complicate them.
                </p>
                <p>
                  Today, we combine strategic thinking with technical expertise to deliver 
                  solutions that don't just meet expectations—they exceed them. From startups 
                  finding their footing to enterprises scaling new heights, we've been there 
                  every step of the way.
                </p>
                <p className="font-medium text-zinc-900">
                  We're not just building websites and apps. We're building partnerships, 
                  trust, and lasting success stories.
                </p>
              </div>
            </div>

            <div
              ref={(el) => (observerRefs.current["story-image"] = el)}
              className={`relative transition-all duration-1000 ${
                isVisible["story-image"]
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
            >
              <div className="relative h-[500px] overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200">
                {/* Placeholder for team image */}
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4 text-6xl">🚀</div>
                    <p className="text-sm font-medium text-zinc-500">
                      [Team collaboration image placeholder]
                    </p>
                  </div>
                </div>
                {/* Uncomment when you have the image */}
                {/* <Image
                  src="/images/about/team-collaboration.jpg"
                  alt="Evolkun team collaboration"
                  fill
                  className="object-cover"
                /> */}
              </div>

              {/* Floating stats card */}
              <div className="absolute -bottom-6 -right-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-2xl">
                <div className="mb-2 text-3xl font-bold text-zinc-900">150+</div>
                <div className="text-sm text-zinc-600">Successful Projects</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-zinc-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div
            ref={(el) => (observerRefs.current["values-header"] = el)}
            className={`mb-16 text-center transition-all duration-1000 ${
              isVisible["values-header"]
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                Our Values
              </span>
            </div>
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 lg:text-5xl">
              What Drives Us Forward
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-600">
              Our core principles guide every decision, project, and partnership
            </p>
          </div>

          <div
            ref={(el) => (observerRefs.current["values"] = el)}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 transition-all duration-700 hover:shadow-xl hover:shadow-zinc-900/5 ${
                  isVisible["values"]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 text-5xl transition-transform duration-300 group-hover:scale-110">
                  {value.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-zinc-900">{value.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-600">{value.description}</p>

                {/* Hover gradient effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-zinc-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div
            ref={(el) => (observerRefs.current["timeline-header"] = el)}
            className={`mb-16 text-center transition-all duration-1000 ${
              isVisible["timeline-header"]
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                Our Journey
              </span>
            </div>
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 lg:text-5xl">
              Key Milestones
            </h2>
          </div>

          <div
            ref={(el) => (observerRefs.current["timeline"] = el)}
            className="relative"
          >
            {/* Timeline line */}
            <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-zinc-200 via-zinc-300 to-zinc-200 md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex gap-8 transition-all duration-700 ${
                    isVisible["timeline"]
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Year badge */}
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-white bg-zinc-900 text-sm font-bold text-white shadow-lg md:relative md:z-10">
                    {milestone.year}
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                    <h3 className="mb-2 text-xl font-bold text-zinc-900">{milestone.title}</h3>
                    <p className="text-sm text-zinc-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-zinc-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div
            ref={(el) => (observerRefs.current["team-header"] = el)}
            className={`mb-16 text-center transition-all duration-1000 ${
              isVisible["team-header"]
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                Leadership Team
              </span>
            </div>
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 lg:text-5xl">
              Meet the Minds Behind Evolkun
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-600">
              Experienced leaders passionate about innovation and client success
            </p>
          </div>

          <div
            ref={(el) => (observerRefs.current["team"] = el)}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {team.map((member, index) => (
              <div
                key={index}
                className={`group transition-all duration-700 ${
                  isVisible["team"]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
                  {/* Image placeholder */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200">
                    <div className="flex h-full items-center justify-center">
                      <div className="text-6xl">👤</div>
                    </div>
                    {/* Uncomment when you have images */}
                    {/* <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    /> */}
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="mb-1 text-lg font-bold text-zinc-900">{member.name}</h3>
                    <p className="mb-2 text-sm font-medium text-zinc-600">{member.role}</p>
                    <p className="text-xs text-zinc-500">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-zinc-900 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.1),transparent_50%)]" />
        
        <div
          ref={(el) => (observerRefs.current["cta"] = el)}
          className={`relative mx-auto max-w-4xl px-6 text-center transition-all duration-1000 ${
            isVisible["cta"] ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white lg:text-5xl">
            Ready to Build Something Amazing?
          </h2>
          <p className="mb-10 text-lg text-zinc-300">
            Let's transform your vision into reality. Start your project with us today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/survey-page"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-900 transition-all duration-200 hover:bg-zinc-100 hover:shadow-lg hover:shadow-white/20"
            >
              Get Started Now
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-full border border-zinc-600 bg-transparent px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-800"
            >
              Browse Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}