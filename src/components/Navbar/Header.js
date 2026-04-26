"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/UserContext";
import ProfileDropdown from "@/components/ProfileDropDown";

export default function FixedHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const dropdownRefs = useRef({});
  const searchParams = useSearchParams();

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSigninClick = (redirectPage) => {
    const query = searchParams.toString();
    const currentUrl = pathname + (query ? `?${query}` : "");
    document.cookie = `redirect=${encodeURIComponent(currentUrl)}; path=/; max-age=600`;
    router.push(redirectPage);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        toggleRef.current &&
        !toggleRef.current.contains(event.target) &&
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }

      // Check if click is outside all dropdowns
      const clickedOutsideDropdowns = Object.values(dropdownRefs.current).every(
        ref => !ref || !ref.contains(event.target)
      );
      
      if (clickedOutsideDropdowns && activeDropdown) {
        setActiveDropdown(null);
      }
    };

    if (menuOpen || activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, activeDropdown]);

  // Mega menu configurations
  const megaMenus = {
    services: {
      title: "Services",
      categories: [
        {
          title: "Development",
          items: [
            { name: "Web Development", desc: "Modern & scalable websites", href: "/web-dev" },
            { name: "Mobile App Development", desc: "Android & iOS solutions", href: "/services/mobile-apps" },
            { name: "Custom Software", desc: "Tailored business software", href: "/services/custom-software" },
          ]
        },
        {
          title: "Design & Branding",
          items: [
            { name: "UI/UX Design", desc: "User-centric digital experiences", href: "/services/ui-ux" },
            { name: "Branding", desc: "Identity & brand strategy", href: "/services/branding" },
            { name: "Graphic Design", desc: "Creative visual solutions", href: "/services/graphic-design" },
          ]
        },
        {
          title: "Marketing & AI",
          items: [
            { name: "Digital Marketing", desc: "Growth-driven marketing", href: "/services/digital-marketing" },
            { name: "SEO & Performance", desc: "Rank higher & convert more", href: "/services/seo" },
            { name: "AI Automation", desc: "Smart AI-powered solutions", href: "/services/ai-automation" },
          ]
        }
      ]
    },

    solutions: {
      title: "Solutions",
      categories: [
        {
          title: "Industries",
          items: [
            { name: "Startups", desc: "Launch & scale faster", href: "/solutions/startups" },
            { name: "E-commerce", desc: "Sell smarter online", href: "/solutions/ecommerce" },
            { name: "Enterprises", desc: "Enterprise-grade solutions", href: "/solutions/enterprise" },
          ]
        },
        {
          title: "Use Cases",
          items: [
            { name: "Lead Generation", desc: "Convert visitors into clients", href: "/solutions/lead-generation" },
            { name: "Process Automation", desc: "Reduce manual work", href: "/solutions/automation" },
            { name: "Digital Transformation", desc: "Modernize your business", href: "/solutions/digital-transformation" },
          ]
        }
      ]
    }
  };

  const simpleLinks = [
    { name: "Portfolio", href: "/portfolio" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Close dropdown when mouse leaves the entire navigation area
  const handleNavMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <header 
      className={`header fixed top-0 z-10 h-16 w-full transition-all duration-300  ${
        isScrolled 
          ? 'border-b border-zinc-200/0 bg-white/5 backdrop-blur-sm shadow-sm' 
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">

        {/* Left Section - Logo & Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            className="shrink-0 focus:outline-none hover:opacity-80 transition-opacity duration-200"
            aria-label="Go to home"
          >
            <Image
              src="/images/logo2.png"
              alt="Evolkun"
              width={120}
height={40}
top-margin
              priority
  className="h-9 w-auto object-contain mt-[15px]"

            />
          </button>

          {/* Desktop Navigation - Close dropdowns when mouse leaves nav */}
          <nav 
            className="hidden lg:flex items-center gap-1" 
            onMouseLeave={handleNavMouseLeave}
          >
            {/* Services Mega Menu */}
            <div 
              className="relative" 
              ref={el => dropdownRefs.current['services'] = el}
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleDropdownToggle('services')}
                className="px-3.5 py-2 text-[12px] font-normal text-zinc-900 hover:text-zinc-600 transition-colors duration-200"
              >
                Services
              </button>

              {activeDropdown === 'services' && (
                <div className="absolute left-0 top-full pt-3">
                  <div className="w-[680px] rounded-lg border border-zinc-200 bg-white shadow-xl overflow-hidden">
                    <div className="grid grid-cols-3 divide-x divide-zinc-200">
                      {megaMenus.services.categories.map((category) => (
                        <div key={category.title} className="p-6">
                          <h3 className="mb-4 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                            {category.title}
                          </h3>
                          <div className="space-y-1">
                            {category.items.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href} 
                                onClick={() => setActiveDropdown(null)}
                                className="group block rounded-md px-3 py-2.5 transition-colors duration-150 hover:bg-zinc-50"
                              >
                                <div className="text-[14px] font-semibold text-zinc-900 mb-0.5">
                                  {item.name}
                                </div>
                                <div className="text-[13px] text-zinc-500">
                                  {item.desc}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-zinc-200 bg-zinc-50 px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[14px] font-semibold text-zinc-900">Ready to transform your business?</p>
                          <p className="text-[13px] text-zinc-500">Let's build something amazing together.</p>
                        </div>
                        <Link
                          href="/survey-page"
                          onClick={() => setActiveDropdown(null)}
                          className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-200 hover:bg-zinc-800"
                        >
                          Get Started
                          <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Mega Menu */}
            <div 
              className="relative" 
              ref={el => dropdownRefs.current['solutions'] = el}
              onMouseEnter={() => setActiveDropdown('solutions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleDropdownToggle('solutions')}
                className="px-3.5 py-2 text-[12px] font-normal text-zinc-900 hover:text-zinc-600 transition-colors duration-200"
              >
                Solutions
              </button>

              {activeDropdown === 'solutions' && (
                <div className="absolute left-0 top-full pt-3">
                  <div className="w-[540px] rounded-lg border border-zinc-200 bg-white shadow-xl overflow-hidden">
                    <div className="grid grid-cols-2 divide-x divide-zinc-200">
                      {megaMenus.solutions.categories.map((category) => (
                        <div key={category.title} className="p-6">
                          <h3 className="mb-4 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                            {category.title}
                          </h3>
                          <div className="space-y-1">
                            {category.items.map((item) => (
                              <div
                                key={item.name}
                                className="group block rounded-md px-3 py-2.5 transition-colors duration-150 hover:bg-zinc-50 cursor-default"
                              >
                                <div className="text-[14px] font-semibold text-zinc-900 mb-0.5">
                                  {item.name}
                                </div>
                                <div className="text-[13px] text-zinc-500">
                                  {item.desc}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-zinc-200 bg-zinc-50 px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[14px] font-semibold text-zinc-900">Need a custom solution?</p>
                          <p className="text-[13px] text-zinc-500">We'll tailor it to your needs.</p>
                        </div>
                        <Link
                          href="/contact"
                          onClick={() => setActiveDropdown(null)}
                          className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-200 hover:bg-zinc-800"
                        >
                          Contact Us
                          <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Simple Navigation Links */}
            {simpleLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3.5 py-2 text-[12px] font-normal text-zinc-900 hover:text-zinc-600 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Section - Auth Buttons & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => handleSigninClick("/signin")}
                  className="px-4 py-2 text-[12px] font-normal text-zinc-900 hover:text-zinc-600 transition-colors duration-200"
                >
                  Log in
                </button>
                <button
                  onClick={() => handleSigninClick("/signup")}
                  className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-[12px] font-semibold text-white transition-all duration-200 hover:bg-zinc-800"
                >
                  Sign up
                </button>
              </>
            ) : isLoading ? (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900" />
            ) : (
              <ProfileDropdown />
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            ref={toggleRef}
            onClick={() => setMenuOpen((s) => !s)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className={`lg:hidden group relative inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-200 ${
              isScrolled 
                ? 'border-zinc-200 bg-white hover:bg-zinc-50' 
                : 'border-zinc-200/40 bg-white/80 hover:bg-white backdrop-blur-sm'
            }`}
          >
            <span
              className={`absolute block h-0.5 w-5 rounded-full bg-zinc-900 transition-all duration-300 ${
                menuOpen ? "translate-y-0 rotate-45" : "translate-y-[-4px]"
              }`}
            />
            <span
              className={`absolute block h-0.5 w-5 rounded-full bg-zinc-900 transition-all duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute block h-0.5 w-5 rounded-full bg-zinc-900 transition-all duration-300 ${
                menuOpen ? "translate-y-0 -rotate-45" : "translate-y-[4px]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {menuOpen && (
        <div
          ref={navRef}
          className="lg:hidden border-t border-zinc-200 bg-white"
        >
          <div className="mx-4 my-5 space-y-1">
            {/* Mobile Navigation Links */}
            <div className="space-y-1 pb-4 border-b border-zinc-100">
              {/* Services with submenu */}
              <div className="space-y-1">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'mobile-services' ? null : 'mobile-services')}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-[12px] font-medium text-zinc-900 hover:bg-zinc-50 transition-colors"
                >
                  Services
                  <svg
                    className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === 'mobile-services' ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'mobile-services' && (
                  <div className="ml-4 space-y-1">
                    {megaMenus.services.categories.flatMap(cat => cat.items).map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => {
                          setMenuOpen(false);
                          setActiveDropdown(null);
                        }}
                        className="block rounded-md px-4 py-2.5 text-[14px] text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Solutions with submenu */}
              <div className="space-y-1">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'mobile-solutions' ? null : 'mobile-solutions')}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-[12px] font-medium text-zinc-900 hover:bg-zinc-50 transition-colors"
                >
                  Solutions
                  <svg
                    className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === 'mobile-solutions' ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'mobile-solutions' && (
                  <div className="ml-4 space-y-1">
                    {megaMenus.solutions.categories.flatMap(cat => cat.items).map((item) => (
                      <div
                        key={item.name}
                        className="block rounded-md px-4 py-2.5 text-[14px] text-zinc-600 hover:bg-zinc-50 cursor-default"
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Simple Links */}
              {simpleLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-[12px] font-medium text-zinc-900 hover:bg-zinc-50 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Auth Section */}
            {!isAuthenticated ? (
              <div className="grid gap-2.5 pt-4">
                <button
                  onClick={() => {
                    handleSigninClick("/signin");
                    setMenuOpen(false);
                  }}
                  className="rounded-lg border border-zinc-200 px-4 py-3 text-[14px] font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    handleSigninClick("/signup");
                    setMenuOpen(false);
                  }}
                  className="rounded-lg bg-black px-4 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-zinc-800"
                >
                  Sign up
                </button>
              </div>
            ) : isLoading ? (
              <div className="flex items-center gap-3 pt-4">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900" />
                <span className="text-[14px] text-zinc-600">Loading…</span>
              </div>
            ) : (
              <div className="pt-4">
                <ProfileDropdown />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
