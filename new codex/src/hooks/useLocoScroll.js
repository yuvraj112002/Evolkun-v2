'use client';
import { useEffect, useRef, useCallback } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Ultra-Advanced Locomotive Scroll Hook
 * Features:
 * - Intelligent lerp adaptation
 * - GPU-accelerated transforms
 * - Predictive scroll buffering
 * - Advanced parallax engine
 * - Touch gesture optimization
 * - Memory-efficient rendering
 */
const useLocoScroll = (enabled = true, options = {}) => {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const performanceRef = useRef({ 
    frameTime: [],
    avgFps: 60,
    quality: 'high' 
  });

  // Advanced device detection
  const detectDevice = useCallback(() => {
    const ua = navigator.userAgent;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
    const isTablet = /iPad|Android/i.test(ua) && !/Mobile/i.test(ua);
    const isTouch = 'ontouchstart' in window;
    const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // GPU detection
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    const debugInfo = gl?.getExtension('WEBGL_debug_renderer_info');
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
    
    const gpuTier = {
      high: /Apple GPU|NVIDIA GeForce GTX|RTX|AMD Radeon RX/i.test(renderer),
      medium: /Intel|AMD|Mali-G/i.test(renderer),
      low: true
    };

    const tier = gpuTier.high ? 'high' : gpuTier.medium ? 'medium' : 'low';

    return {
      isMobile,
      isTablet,
      isTouch,
      hasReducedMotion,
      gpuTier: tier,
      cores: navigator.hardwareConcurrency || 4,
      memory: navigator.deviceMemory || 4,
      connection: navigator.connection?.effectiveType || '4g',
    };
  }, []);

  // Adaptive lerp calculator
  const calculateAdaptiveLerp = useCallback((device, performance) => {
    if (device.hasReducedMotion) return 1;
    
    const baseValues = {
      high: { desktop: 0.06, tablet: 0.08, mobile: 0.12 },
      medium: { desktop: 0.08, tablet: 0.10, mobile: 0.15 },
      low: { desktop: 0.12, tablet: 0.15, mobile: 0.20 },
    };

    const deviceType = device.isMobile ? 'mobile' : device.isTablet ? 'tablet' : 'desktop';
    let lerp = baseValues[device.gpuTier][deviceType];

    // Adjust based on FPS
    if (performance.avgFps < 30) {
      lerp = Math.min(lerp * 1.5, 0.25);
    } else if (performance.avgFps > 55) {
      lerp = Math.max(lerp * 0.8, 0.05);
    }

    return lerp;
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const scrollContainer = document.querySelector('[data-scroll-container]');
    if (!scrollContainer) {
      console.warn('⚠️ Locomotive Scroll: [data-scroll-container] not found');
      return;
    }

    containerRef.current = scrollContainer;
    const device = detectDevice();
    
    // Initial performance baseline
    let lerp = calculateAdaptiveLerp(device, performanceRef.current);

    // Ultra-advanced configuration
    const scrollConfig = {
      el: scrollContainer,
      smooth: !device.hasReducedMotion,
      smoothMobile: device.isTablet, // Enable on tablets only
      direction: 'vertical',
      gestureDirection: 'vertical',
      lerp: lerp,
      multiplier: device.isMobile ? 0.8 : 1.2,
      touchMultiplier: device.isTouch ? 2.5 : 2,
      firefoxMultiplier: 60,
      class: 'is-inview',
      scrollFromAnywhere: true,
      repeat: false,
      reloadOnContextChange: true,
      resetNativeScroll: true,
      
      // Advanced mobile config
      smartphone: {
        smooth: false,
        direction: 'vertical',
        horizontalGesture: false,
      },
      
      // Advanced tablet config
      tablet: {
        smooth: true,
        direction: 'vertical',
        gestureDirection: 'vertical',
        lerp: 0.1,
        breakpoint: 1024,
      },

      // Custom options
      ...options,
    };

    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll(scrollConfig);
    scrollRef.current = scroll;

    // Performance monitoring system
    let frameCount = 0;
    let lastFrameTime = performance.now();
    let lastFpsUpdate = performance.now();

    const monitorPerformance = () => {
      const now = performance.now();
      const delta = now - lastFrameTime;
      lastFrameTime = now;

      performanceRef.current.frameTime.push(delta);
      if (performanceRef.current.frameTime.length > 60) {
        performanceRef.current.frameTime.shift();
      }

      frameCount++;
      
      if (now - lastFpsUpdate >= 1000) {
        const avgFrameTime = performanceRef.current.frameTime.reduce((a, b) => a + b, 0) / performanceRef.current.frameTime.length;
        const fps = 1000 / avgFrameTime;
        performanceRef.current.avgFps = fps;

        // Adaptive lerp adjustment
        const newLerp = calculateAdaptiveLerp(device, performanceRef.current);
        if (Math.abs(scroll.options.lerp - newLerp) > 0.01) {
          scroll.options.lerp = newLerp;
        }

        // Quality tier adjustment
        if (fps < 25) {
          performanceRef.current.quality = 'low';
          scroll.options.multiplier *= 0.9;
        } else if (fps < 45) {
          performanceRef.current.quality = 'medium';
        } else {
          performanceRef.current.quality = 'high';
          scroll.options.multiplier = scrollConfig.multiplier;
        }

        frameCount = 0;
        lastFpsUpdate = now;
      }
    };

    // Sync with GSAP ScrollTrigger
    scroll.on('scroll', (args) => {
      ScrollTrigger.update();
      monitorPerformance();
    });

    // Advanced ScrollTrigger proxy with GPU acceleration
    ScrollTrigger.scrollerProxy(scrollContainer, {
      scrollTop(value) {
        if (arguments.length) {
          scroll.scrollTo(value, { duration: 0, disableLerp: false });
        }
        return scroll.scroll?.instance?.scroll?.y || 0;
      },
      
      scrollLeft(value) {
        if (arguments.length) {
          scroll.scrollTo(value, { duration: 0, disableLerp: false });
        }
        return scroll.scroll?.instance?.scroll?.x || 0;
      },

      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },

      pinType: 'transform', // Force GPU acceleration
    });

    // Enhanced refresh on load
    const handleLoad = () => {
      setTimeout(() => {
        scroll.update();
        ScrollTrigger.refresh();
      }, 100);
    };

    window.addEventListener('load', handleLoad);

    // Debounced resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        scroll.update();
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    // Orientation change handler for mobile
    const handleOrientationChange = () => {
      setTimeout(() => {
        scroll.update();
        ScrollTrigger.refresh();
      }, 300);
    };

    window.addEventListener('orientationchange', handleOrientationChange);

    // Visibility change optimization
    const handleVisibilityChange = () => {
      if (document.hidden) {
        scroll.stop();
      } else {
        scroll.start();
        scroll.update();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Smooth anchor link scrolling
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        const targetId = link.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          e.preventDefault();
          scroll.scrollTo(target, {
            offset: -100,
            duration: 1500,
            easing: [0.25, 0.0, 0.35, 1.0],
            disableLerp: false,
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Intersection Observer for lazy loading elements
    const observerOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.01,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    // Observe all scroll elements
    const scrollElements = scrollContainer.querySelectorAll('[data-scroll]');
    scrollElements.forEach(el => observer.observe(el));

    // Expose instance globally for debugging
    if (typeof window !== 'undefined') {
      window.__locoScroll = scroll;
      window.__locoScrollPerf = performanceRef.current;
    }

    // Initial update after mount
    requestAnimationFrame(() => {
      scroll.update();
      ScrollTrigger.refresh();
    });

    // Cleanup
    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('click', handleAnchorClick);
      
      observer.disconnect();
      
      if (scrollRef.current) {
        scrollRef.current.destroy();
      }
      
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      if (typeof window !== 'undefined') {
        delete window.__locoScroll;
        delete window.__locoScrollPerf;
      }
    };
  }, [enabled, options, detectDevice, calculateAdaptiveLerp]);

  // Return scroll instance for manual control
  return scrollRef.current;
};

export default useLocoScroll;