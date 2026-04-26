// import React, { useEffect } from "react";
// import { motion, useMotionValue } from "framer-motion";

// const ONE_SECOND = 1000;
// const AUTO_DELAY = ONE_SECOND * 10;
// const DRAG_BUFFER = 50;

// const SPRING_OPTIONS = {
//   type: "spring",
//   mass: 3,
//   stiffness: 400,
//   damping: 50,
// };

// export const SwipeCarousel = ({ imgs, imgIndex, setImgIndex }) => {
//   const dragX = useMotionValue(0);

//   useEffect(() => {
//     const intervalRef = setInterval(() => {
//       setImgIndex((pv) => (pv === imgs.length - 1 ? 0 : pv + 1));
//     }, AUTO_DELAY);

//     return () => clearInterval(intervalRef);
//   }, [imgs.length, setImgIndex]);

//   const onDragEnd = () => {
//     const x = dragX.get();

//     if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
//       setImgIndex(imgIndex + 1);
//     } else if (x >= DRAG_BUFFER && imgIndex > 0) {
//       setImgIndex(imgIndex - 1);
//     }
//   };

//   return (
//     <div className="relative overflow-hidden bg-neutral-950 py-8 rounded-xl  max-w-[50rem] x-auto">
//       <motion.div
//         drag="x"
//         dragConstraints={{ left: 0, right: 0 }}
//         style={{ x: dragX }}
//         animate={{ translateX: 0 }}
//         transition={SPRING_OPTIONS}
//         onDragEnd={onDragEnd}
//         className="flex cursor-grab items-center active:cursor-grabbing"
//       >
//         <motion.div
//           style={{
//             backgroundImage: `url(${imgs[imgIndex]})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//           animate={{ scale: 0.95 }}
//           transition={SPRING_OPTIONS}
//           className="aspect-video w-full rounded-xl bg-neutral-800 object-cover"
//         />
//       </motion.div>
//       <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} imgs={imgs} />
//       <GradientEdges />
//     </div>
//   );
// };

// const Dots = ({ imgIndex, setImgIndex, imgs }) => (
//   <div className="mt-4 flex w-full justify-center gap-2">
//     {imgs.map((_, idx) => (
//       <button
//         key={idx}
//         onClick={() => setImgIndex(idx)}
//         className={`h-3 w-3 rounded-full transition-colors ${
//           idx === imgIndex ? "bg-neutral-50" : "bg-neutral-500"
//         }`}
//       />
//     ))}
//   </div>
// );

// const GradientEdges = () => (
//   <>
//     <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
//     <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
//   </>
// );

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useEffect } from "react";

const ScrollAnimation = ({ images, onScrollEnd }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v >= 0.99 && typeof onScrollEnd === "function") {
        onScrollEnd();
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, onScrollEnd]);

  return (
    <div className="h-[80vh] overflow-y-scroll" ref={targetRef}>
      <div className="flex h-24 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll down
        </span>
      </div>
      <section className="relative bg-neutral-900 h-[60vh]">
        <div className="sticky top-0 flex items-center overflow-hidden h-[450px]">
          <motion.div style={{ x }} className="flex gap-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
              >
                <div
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
                ></div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      <div className="flex h-24 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll up
        </span>
      </div>
    </div>
  );
};

export default ScrollAnimation;
