"use client";

import Image from "next/image";

export default function StatCard({
  title,
  value,
  leftImages = [],
  rightImages = [],
  highlight = false,
  className = "",
}) {
  return (
    <div
      className={`relative rounded-[20px] p-4 shadow-sm transition ${highlight
          ? "bg-gradient-to-r from-[#868CFF] to-[#4318FF] text-white"
          : "bg-white"
        } ${className}`}
    >
      <div className="flex items-center justify-between">
        {/* Left icons */}
        {leftImages.length > 0 && (
          <div className="flex items-center gap-2 mr-3">
            {leftImages.map((img, idx) => (
              <div key={idx} className="flex-shrink-0">
                <Image
                  src={img.src}
                  alt={img.alt || `left-icon-${idx}`}
                  width={img.width || 42}
                  height={img.height || 38}
                  className={img.className || ""}
                />
              </div>
            ))}
          </div>
        )}

        {/* Text content */}
        <div className="flex-1 flex flex-col">
          <p className={`text-sm sm:text-xs lg:text-sm ${highlight ? "opacity-80 text-white" : "opacity-80 text-secondary-grey-600 font-medium"}`}>
            {title}
          </p>
          <h3 className={`mt-1 text-[24px] leading-[32px] font-bold ${highlight ? "text-white" : "text-secondary-darkGrey-900"}`}>
            {value}
          </h3>
        </div>

        {/* Right icons */}
        {rightImages.length > 0 && (
          <div className="flex items-center gap-2 ml-3">
            {rightImages.map((img, idx) => (
              <div key={idx} className="flex-shrink-0">
                <Image
                  src={img.src}
                  alt={img.alt || `right-icon-${idx}`}
                  width={img.width || 58}
                  height={img.height || 28}
                  className={img.className || ""}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
