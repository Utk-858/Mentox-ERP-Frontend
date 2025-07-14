import React from "react";

interface QuickAccessCardProps {
  label: string;
  title: string;
  buttonText: string;
  onClick?: () => void;
}

const StudentBanner: React.FC<QuickAccessCardProps> = ({
  label,
  title,
  buttonText,
  onClick,
}) => {
  return (
    <div className="relative bg-[#F7F7F7] p-6 rounded-xl overflow-hidden flex items-center justify-between shadow-sm w-full ">
      <div>
        <p className="text-[0.75rem] text-[#000000] uppercase tracking-wider font-[400] mb-1">
          {label}
        </p>
        <h2 className="text-[1.25rem] font-[600] text-[#702DFF]">{title}</h2>
      </div>

      <button
        onClick={onClick}
        className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium shadow hover:bg-gray-800 transition"
      >
        {buttonText}
      </button>

      {/* Background stars/pattern (optional SVG stars to simulate effect) */}
      
    </div>
  );
};

export default StudentBanner;
