import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface ChartData {
  month: string;
  hours: number;
  shortMonth: string;
}

const Barchart: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

  const monthlyData: ChartData[] = [
    { month: "Math", shortMonth: "Jan", hours: 140 },
    { month: "Science", shortMonth: "Feb", hours: 100 },
    { month: "English", shortMonth: "Mar", hours: 200 },
    { month:"Science", shortMonth: "Apr", hours: 125 },
    { month: "hindi", shortMonth: "May", hours: 170 },
    { month: "Computer", shortMonth: "Jun", hours: 220 },
    { month: "Computer", shortMonth: "Jun", hours: 220 },
    
  ];

  const periods = ["Monthly", "Weekly", "Daily"];
  const maxHours = 250;
  const chartHeight = 90;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getBarHeight = (hours: number) => {
    return (hours / maxHours) * chartHeight;
  };

  return (
    <div className="w-[23rem] mx-auto bg-gray-50 p-2 py-6 rounded-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-black text-[0.9rem] font-bold">
          Grades
        </h2>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-[#4318FF] text-white px-2 py-1 rounded-[0.3rem] text-[0.5rem] font-[600] flex items-center gap-2 max-w-[95px] max-h-[20px] justify-center hover:bg-purple-700 transition-colors duration-200"
          >
            {selectedPeriod}
            <ChevronDown
              className={`w-2 h-2 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[140px] overflow-hidden">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => {
                    setSelectedPeriod(period);
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-150 text-gray-700"
                >
                  {period}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart Container */}
      <div className="rounded-xl px-4 pt-4 pb-2">
        <div className="flex gap-4">
          {/* Y-Axis Labels */}
          <div
            className="flex flex-col justify-between pr-2"
            style={{ height: `${chartHeight + 40}px` }}
          >
            {[100,80,60,40,20,0].map((val) => (
              <span
                key={val}
                className="text-xs text-gray-500 text-right min-h-[20px]"
              >
                {val}
              </span>
            ))}
          </div>

          {/* Chart Area */}
          <div className="flex-1 relative overflow-x-auto">
            <div
              className="grid grid-cols-12 gap-1 min-w-[28rem]  items-end"
              style={{ height: `${chartHeight + 40}px` }}
            >
              {monthlyData.map((data, index) => (
                <div
                  key={data.month}
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
                          ? `${getBarHeight(data.hours)}px`
                          : "0px",
                        transitionDelay: `${index * 100}ms`,
                        minHeight: "6px",
                      }}
                    >
                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                        {data.hours}h
                      </div>
                    </div>
                  </div>

                  {/* Month Label */}
                  <div className="text-[0.5rem] text-black text-center">
                    <div className="hidden lg:block">{data.month}</div>
                    <div className="lg:hidden">{data.shortMonth}</div>
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

export default Barchart;