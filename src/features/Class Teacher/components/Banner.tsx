import React from "react";
import { FaPlay } from "react-icons/fa";

interface AnalyticsBannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  bgColor: string;               // e.g., 'bg-[#702DFF]'
  headingColor?: string;         // e.g., 'text-white'
  subheadingColor?: string;      // e.g., 'text-white'
  backgroundImageSrc?: string;   // Image URL or path
  onClick?: () => void;
}

const Banner: React.FC<AnalyticsBannerProps> = ({
  title,
  subtitle,
  buttonText,
  bgColor,
  headingColor = "text-white",
  subheadingColor = "text-white",
  backgroundImageSrc,
  onClick,
}) => {
  return (
    <div className={`rounded-2xl px-6 py-4 relative overflow-hidden ${bgColor}`}>
      <div className="z-10 relative">
        <p className={`uppercase text-[0.75rem] tracking-wide mb-2 font-[400] ${headingColor}`}>
          {title}
        </p>
        <h2 className={`text-[1.75rem] font-[500] leading-snug max-w-[25rem] ${subheadingColor}`}>
          {subtitle}
        </h2>

        <button
          onClick={onClick}
          className="mt-4 bg-black text-white flex items-center gap-2 px-4 py-2 rounded-full text-[0.75rem] font-[500]"
        >
          {buttonText} <FaPlay size={10} />
        </button>
      </div>

      {/* Background pattern image if provided */}
      {backgroundImageSrc && (
        <div className="absolute right-2 top-0  pointer-events-none">
          <img src={backgroundImageSrc} alt="background design" />
        </div>
      )}
    </div>
  );
};

export default Banner;
