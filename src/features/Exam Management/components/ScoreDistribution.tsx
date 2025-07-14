import React, { useState, useEffect } from "react";


interface ChartData {
  range: string;
  value: number;
}

const ScoreDistribution: React.FC = () => {
  
  const [animationStarted, setAnimationStarted] = useState(false);

  const scoreRanges: ChartData[] = [
    { range: "0 - 10", value: 55 },
    { range: "10 - 20", value: 35 },
    { range: "20 - 30", value: 80 },
    { range: "30 - 40", value: 45 },
    { range: "40 - 50", value: 65 },
    { range: "50 - 60", value: 85 },
    { range: "60 - 70", value: 0 },
    { range: "70 - 80", value: 0 },
    { range: "80 - 90", value: 0 },
    { range: "90 - 100", value: 0 },
  ];


  const maxHours = 100; // Max value for percentage
  const chartHeight = 90;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getBarHeight = (value: number) => {
    return (value / maxHours) * chartHeight;
  };

  return (
    <div className="w-[30rem] mx-auto bg-gray-50 p-4 py-6 rounded-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-black text-[0.9rem] font-[500]">
          Score Distribution
        </h2>

        {/* Dropdown */}
        
      </div>

      {/* Chart Container */}
      <div className="rounded-xl px-4 pt-4 pb-2">
        <div className="flex gap-4">
          {/* Y-Axis Labels */}
          <div
            className="flex flex-col justify-between pr-2"
            style={{ height: `${chartHeight + 40}px` }}
          >
            {[100, 80, 60, 40, 20, 0].map((val) => (
              <span
                key={val}
                className="text-xs text-black text-right min-h-[20px]"
              >
                {val}
              </span>
            ))}
          </div>

          {/* Chart Area */}
          <div className="flex-1 relative scrollbar-hide">
            <div
              className="grid grid-cols-12 gap-1 min-w-[28rem] items-end"
              style={{ height: `${chartHeight + 40}px` }}
            >
              {scoreRanges.map((data, index) => (
                <div
                  key={data.range}
                  className="flex flex-col items-center group"
                >
                  {/* Bar */}
                  <div className="relative mb-2">
                    {/* Background bar */}
                    <div
                      className="bg-gray-200 rounded-full absolute bottom-0"
                      style={{
                        width: "10px",
                        height: `${chartHeight + 15}px`,
                      }}
                    />

                    {/* Data bar */}
                    <div
                      className="bg-[#4318FF] rounded-full transition-all duration-1000 ease-out cursor-pointer relative z-10"
                      style={{
                        width: "10px",
                        height: animationStarted
                          ? `${getBarHeight(data.value)}px`
                          : "0px",
                        transitionDelay: `${index * 100}ms`,
                        minHeight: "6px",
                      }}
                    >
                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                        {data.value}%
                      </div>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="text-[0.5rem] text-black text-center">
                    {data.range}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDistribution;
