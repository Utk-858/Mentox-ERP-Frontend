import React from "react";

const ActivityCard = () => {
  return (
    <div className="mt-4 rounded-xl p-4 py-1 bg-gradient-to-r from-violet-500 to-indigo-500 text-white">
      <div className="text-sm">Activity</div>
      <div className="text-2xl font-semibold mt-1">$540.50</div>
      <div className="mt-2">
        {/* Replace with actual SVG or chart component */}
        <svg
          className="w-full h-10"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 100 40"
        >
          <path
            d="M0,30 Q20,10 40,25 T100,20"
            stroke="white"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
};

export default ActivityCard;
