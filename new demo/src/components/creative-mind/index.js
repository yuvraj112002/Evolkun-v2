"use client";

import React, { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import HowEvolkunDecides from "../Home/HowEvolkunDecides";

const TEAM = [
  { image: "/images/home/creative/1.png", name: "Shubham Semwal", position: "Lead Developer" },
  { image: "/images/home/creative/200.webp", name: "Yuvraj Singh Thapa", position: "CEO & Founder" },
  { image: "/images/home/creative/3.png", name: "Jai Singh Tomar", position: "Marketing Head" },
  { image: "/images/home/creative/4.png", name: "Ajay Thapa", position: "Senior Advisor" },
  { image: "/images/home/creative/5.png", name: "Neelam Thapa", position: "Stakeholder" },
  { image: "/images/home/creative/6.png", name: "Vidhi Thakuri", position: "3D Designer" },
];

function CreativeMind() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  // 2x is enough for seamless marquee
  const items = useMemo(() => [...TEAM, ...TEAM], []);

  return (
    <section
      className="relative py-20 bg-white overflow-hidden rounded-b-[4rem]"
      style={{
        // huge win for scroll performance
        contentVisibility: "auto",
        containIntrinsicSize: "800px",
      }}
    >
      <div ref={ref} className="flex flex-col items-center gap-12">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-[2.4rem] md:text-[3.2rem] font-bold text-center"
        >
          Meet Our Creative Minds <span className="italic font-normal">of Evolkun</span>
        </motion.h2>

        <div className="relative w-full max-w-6xl px-6 overflow-hidden mx-auto">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

          <ul className="marquee-track" aria-label="Evolkun team members">
            {items.map((member, i) => (
              <li key={`${member.name}-${i}`} className="shrink-0">
                <figure className="flex flex-col items-center w-[160px] select-none">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden ring-1 ring-gray-200 bg-gray-50">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="mt-3 text-center">
                    <p className="text-sm font-semibold">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.position}</p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <HowEvolkunDecides />

      <style jsx>{`
        .marquee-track {
          display: flex;
          gap: 3rem;
          width: max-content;

          will-change: transform;
          transform: translate3d(0, 0, 0);

          animation: marquee 22s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}

export default React.memo(CreativeMind);
