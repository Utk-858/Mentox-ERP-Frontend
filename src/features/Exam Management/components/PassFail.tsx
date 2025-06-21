import React from "react";

type PassFailData = {
  passPercentage: number; // e.g. 75
  trendChange: number; // e.g. 8.5 for +8.5%
};

const PassFail: React.FC<{ data: PassFailData }> = ({ data }) => {
//   const failPercentage = 100 - data.passPercentage;
//   const strokeDasharray = `${data.passPercentage}, ${100}`;
  const isPositive = data.trendChange >= 0;
  const trendColor = isPositive ? "text-[#00B69B]" : "text-red-500";
//   const trendIcon = isPositive ? "↑" : "↓";
  const trendText = `${isPositive ? "+" : ""}${data.trendChange}%`;

  return (
    <div className="bg-[#F5F5F7] rounded-[1rem] p-5 w-full flex relative">
      {/* Title */}
      <div className="flex flex-col">
        <div className="font-[500] text-black text-[1.1rem]">
          Pass–Fail Distribution
        </div>
        <div className="text-[0.63rem] font-[600] text-[#8A8A8A] mt-1 mb-4 leading-tight">
          Showing the performance of the student
        </div>
        <div className="flex gap-4 text-[10px] font-medium text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-[10px] h-[10px] rounded-full bg-[#702DFF]"></span>
            <span>Pass</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-[10px] h-[10px] rounded-full bg-gray-300"></span>
            <span>Fail</span>
          </div>
        </div>
      </div>
      {/* Donut + Legend */}
      <div className="flex items-center justify-between">
        {/* Donut Chart */}
       {/* Donut Chart */}
<div className="relative w-[170px] h-[180px] group">
  <svg viewBox="-5 -5 45 42" className="w-full h-full">
    {/* Fail background */}
    <path
      className="text-gray-300"
      stroke="currentColor"
      strokeWidth={12}
      fill="none"
      d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    {/* Pass (purple) */}
    <path
      className="text-[#702DFF]"
      stroke="currentColor"
      strokeWidth={12}
      strokeDasharray={`${data.passPercentage}, ${100}`}
      strokeLinecap="butt"
      fill="none"
      d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
    />
  </svg>

  {/* Tooltip on hover */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="bg-white px-2 py-[2px] rounded text-[10px] font-bold text-gray-600 shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      Pass : {data.passPercentage}%
    </div>
  </div>
</div>


        {/* Legend */}
      </div>

      {/* Trend Indicator */}
      <div className="mt-4 text-[0.9rem] font-[400] flex items-center gap-2 absolute bottom-2">
        <span className={`font-bold flex items-center gap-1 ${trendColor}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[14px] h-[14px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isPositive ? "M5 12l5 5L20 7" : "M5 12l5-5 10 10"}
            />
          </svg>
          {trendText}
        </span>
        <span className="text-[#606060] text-[0.9rem] font-[400]">Up from previous month</span>
      </div>
    </div>
  );
};

export default PassFail;
