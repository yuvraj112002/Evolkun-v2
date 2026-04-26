"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/lib/utils";
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";

const reviews = [
  {
    name: "Rahul Mehta",
    username: "@rahul.in",
    body: "Clean build, clear pricing—our site went live in 3 weeks.",
    img: "/images/avatars/avatar-1.svg",
  },
  {
    name: "Priya Nair",
    username: "@priyanair",
    body: "Loved the survey flow—no back-and-forth, just decisions.",
    img: "/images/avatars/avatar-2.svg",
  },
  {
    name: "Emily Carter",
    username: "@emily.uk",
    body: "Smart branding and a fast handoff—smooth experience.",
    img: "/images/avatars/avatar-3.svg",
  },
  {
    name: "Saurabh Sharma",
    username: "@saurabh",
    body: "E-com, wishlist, custom form—done right, on time.",
    img: "/images/avatars/avatar-4.svg",
  },
  {
    name: "David Johnson",
    username: "@david.usa",
    body: "Transparent scope, quick iterations, zero drama.",
    img: "/images/avatars/avatar-5.svg",
  },
  {
    name: "Ananya Singh",
    username: "@ananya",
    body: "They refined content and UX without slowing delivery.",
    img: "/images/avatars/avatar-6.svg",
  },
  {
    name: "Lucas Martin",
    username: "@lucas.de",
    body: "Great comms across time zones, crisp UI.",
    img: "/images/avatars/avatar-7.svg",
  },
  {
    name: "Fatima Khan",
    username: "@fatima",
    body: "Pricing was upfront; the demo matched the final site.",
    img: "/images/avatars/avatar-8.svg",
  },
];

const ReviewCard = React.memo(function ReviewCard({ img, name, username, body }) {
  return (
    <figure
      className={cn(
        "relative w-64 shrink-0 overflow-hidden rounded-xl border p-4",
        "border-gray-950/10 bg-white md:hover:bg-gray-100",
        "transition-colors duration-200",
        "transform-gpu will-change-transform"
      )}
      style={{
        // isolate paints inside the card
        contain: "layout paint",
      }}
    >
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          <Image
            src={img}
            alt={name}
            width={32}
            height={32}
            className="h-8 w-8 object-cover"
            loading="lazy"
            // SVGs are tiny; keep default optimization
          />
        </div>

        <div className="min-w-0">
          <figcaption className="text-sm font-medium text-black truncate">
            {name}
          </figcaption>
          <p className="text-xs text-black/40 truncate">{username}</p>
        </div>
      </div>

      <blockquote className="mt-3 text-sm text-gray-600">{body}</blockquote>
    </figure>
  );
});

function FadeEdges({ bg = "#ffffff" }) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
        style={{ background: `linear-gradient(to right, ${bg}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
        style={{ background: `linear-gradient(to left, ${bg}, transparent)` }}
      />
    </>
  );
}

function useNearScreen(
  ref,
  { rootMargin = "300px 0px 300px 0px", threshold = 0.01 } = {}
) {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { root: null, threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, threshold]);

  return near;
}

export default function ClientMarquee() {
  const ref = useRef(null);
  const near = useNearScreen(ref);

  const { firstRow, secondRow } = useMemo(() => {
    const half = Math.ceil(reviews.length / 2);
    const r1 = reviews.slice(0, half);
    const r2 = reviews.slice(half);

    // duplicate for seamless loop
    return {
      firstRow: [...r1, ...r1],
      secondRow: [...r2, ...r2],
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative mt-16 md:mt-24 py-20"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "600px",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-12 text-center text-4xl font-bold text-black">
          Words That Inspire Us.
        </h2>

        {/* Row 1 */}
        <div className="relative">
          <Marquee
            pauseOnHover
            className="overflow-hidden"
            // keep mounted; pause when not near screen
            style={{ animationPlayState: near ? "running" : "paused" }}
          >
            {firstRow.map((r, idx) => (
              <ReviewCard key={`${r.username}-${idx}`} {...r} />
            ))}
          </Marquee>
          <FadeEdges bg="#ffffff" />
        </div>

        {/* Row 2 */}
        <div className="relative mt-6">
          <Marquee
            reverse
            pauseOnHover
            className="overflow-hidden"
            style={{ animationPlayState: near ? "running" : "paused" }}
          >
            {secondRow.map((r, idx) => (
              <ReviewCard key={`${r.username}-${idx}`} {...r} />
            ))}
          </Marquee>
          <FadeEdges bg="#ffffff" />
        </div>
      </div>
    </section>
  );
}
