// src/app/components/home/brand/index.tsx
"use client";

import Slider from "react-infinite-logo-slider";
import SingleBrand from "./SingleBrand";

function UXUIToolsBrands({ brandList }) {
  return (
    <section>
      <div className="w-full flex items-center justify-center">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-col gap-4">

            {/* Section title */}
            <div className="flex justify-center text-center py-4 relative">
              <p
                className="
                  relative px-2 text-[#a7a2a2]
                  md:before:absolute md:before:right-[-150px] md:before:top-1/2
                  md:before:h-[1px] md:before:w-36
                  md:before:bg-gradient-to-r md:before:from-gray-800/20 md:before:to-transparent
                  md:after:absolute md:after:left-[-150px] md:after:top-1/2
                  md:after:h-[1px] md:after:w-36
                  md:after:bg-gradient-to-l md:after:from-gray-800/20 md:after:to-transparent
                "
              >
                We Let Our Work Talk
              </p>
            </div>

            {/* Logos marquee with SCREEN-EDGE CURVE MASK */}
            {brandList && brandList.length > 0 && (
              <div
                className="py-6 overflow-hidden"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
                }}
              >
                <Slider
                  width="160px"
                  duration={25}
                  pauseOnHover
                  blurBorders={false}
                >
                  {brandList.map((items, index) => (
                    <SingleBrand key={index} brand={items} />
                  ))}
                </Slider>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

export default UXUIToolsBrands;
