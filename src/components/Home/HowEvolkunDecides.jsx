"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const principles = [
  { id: 1, number: "01", title: "Systems before solutions", description: "We map the entire ecosystem before touching a single pixel. Understanding how parts connect reveals what actually matters." },
  { id: 2, number: "02", title: "AI amplifies intent", description: "We use machine learning to remove repetitive decisions and keep teams focused on outcomes that matter." },
  { id: 3, number: "03", title: "Clarity compounds", description: "Simple systems scale. Complex ones break. We choose the path that's easiest to understand, maintain, and evolve." },
  { id: 4, number: "04", title: "Measure what moves the needle", description: "Vanity metrics are noise. We track signals that reveal whether we're building something that lasts." },
  { id: 5, number: "05", title: "Long bets over quick wins", description: "We optimize for the business you'll be in three years from now, not only the one you're running today." },
];

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const centerVariants = {
  hidden: { scale: 0.92, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function HowEvolkunDecides() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-24"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "900px",
        // Cheap, pretty background (no blur filters)
        backgroundImage: `
          radial-gradient(600px 300px at 80% 10%, rgba(59,130,246,0.10), transparent 60%),
          radial-gradient(600px 300px at 20% 90%, rgba(168,85,247,0.10), transparent 60%),
          linear-gradient(to bottom right, rgba(249,250,251,1), rgba(239,246,255,0.35), rgba(250,245,255,0.35))
        `,
      }}
    >
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            How Evolkun Decides
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Principles that guide every project, partnership, and product we build.
          </p>
        </motion.div>

        {/* Desktop */}
        <div className="hidden lg:block relative min-h-[600px]">
          <div
            className="grid grid-cols-3 grid-rows-3 gap-8 h-full"
            style={{
              gridTemplateAreas: `
                'card1 center card2'
                'card1 center card2'
                'card3 card4 card5'
              `,
            }}
          >
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={centerVariants}
              className="relative z-20"
              style={{ gridArea: "center", placeSelf: "center" }}
            >
              <div className="relative w-64 h-64 rounded-full bg-white border border-gray-100 shadow-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">Evolkun</div>
                  <div className="text-gray-600 font-medium">Decision Engine</div>
                </div>

                {/* Optional rings - cheap (no blur) */}
                {!reduceMotion && isInView && (
                  <>
                    <div className="absolute -inset-4 rounded-full border border-blue-100/60" />
                    <div className="absolute -inset-8 rounded-full border border-purple-100/40" />
                  </>
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} style={{ gridArea: "card1", alignSelf: "start", justifySelf: "end" }}>
              <PrincipleCard principle={principles[0]} />
            </motion.div>

            <motion.div variants={itemVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} style={{ gridArea: "card2", alignSelf: "start", justifySelf: "start" }}>
              <PrincipleCard principle={principles[1]} />
            </motion.div>

            <motion.div variants={itemVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} style={{ gridArea: "card3", alignSelf: "end", justifySelf: "end" }}>
              <PrincipleCard principle={principles[2]} />
            </motion.div>

            <motion.div variants={itemVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} style={{ gridArea: "card4", alignSelf: "end", justifySelf: "center" }}>
              <PrincipleCard principle={principles[3]} />
            </motion.div>

            <motion.div variants={itemVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} style={{ gridArea: "card5", alignSelf: "end", justifySelf: "start" }}>
              <PrincipleCard principle={principles[4]} />
            </motion.div>

            {/* If you REALLY want lines: keep them static (no motion) */}
            {/* <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <line x1="25%" y1="20%" x2="50%" y2="50%" stroke="rgba(99,102,241,0.18)" strokeWidth="1.5" strokeDasharray="4 4" />
              ...
            </svg> */}
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden space-y-4">
          <div className="flex justify-center mb-8">
            <motion.div
              variants={centerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative w-40 h-40 rounded-full bg-white border border-gray-100 shadow-lg flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">Evolkun</div>
                <div className="text-gray-600 text-sm">Decision Engine</div>
              </div>
            </motion.div>
          </div>

          {principles.map((principle) => (
            <motion.div key={principle.id} variants={itemVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
              <PrincipleCard principle={principle} mobile />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrincipleCard({ principle, mobile = false }) {
  return (
    <div
      className={`
        relative rounded-2xl p-6 bg-white
        border border-gray-100 shadow-sm hover:shadow-md
        transition-shadow duration-300
        ${mobile ? "max-w-full" : "max-w-xs"}
      `}
      style={{
        // prevents huge repaint scope
        contain: "layout paint",
      }}
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-50/40 to-purple-50/40 -z-10" />
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-700">{principle.number}</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">{principle.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{principle.description}</p>
        </div>
      </div>
    </div>
  );
}
