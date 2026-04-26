"use client";

import Image from "next/image";
import { memo } from "react";

const TeamSection = memo(function TeamSection({ duplicatedMembers = [] }) {
  const validMembers = Array.isArray(duplicatedMembers)
    ? duplicatedMembers.filter(
        (member) => member && member.image && member.name
      )
    : [];

  return (
    <section className="relative overflow-hidden">
      <div>
        <div>
          <ul className="marquee-track">
            {validMembers.map((member, index) => (
              <li key={`${member.name}-${index}`} className="list-none shrink-0">
                <figure className="w-32 shrink-0">
                  <div className="relative h-32 w-32 overflow-hidden rounded-full">
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
});

export default TeamSection;