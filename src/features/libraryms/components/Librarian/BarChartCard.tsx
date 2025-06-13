import React from "react";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type TimeRange = "Daily" | "Weekly" | "Monthly" | "Annually";

interface CategoryDemand {
  category: string;
  demand: number; // percentage (0–100)
}

const MOCK_DATA: CategoryDemand[] = [
  { category: "Fiction", demand: 60 },
  { category: "Non-Fiction", demand: 30 },
  { category: "Science & Technology", demand: 80 },
  { category: "Academic & Reference", demand: 50 },
  { category: "History", demand: 65 },
  { category: "Arts", demand: 85 },
  { category: "Moral Education", demand: 25 },
];

const BarChartCard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimeRange>("Weekly");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [data, setData] = useState<CategoryDemand[]>([]);
  const chartHeight = 140;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setData([]); // Reset for loading animation
    fetch(`/api/library/book-demand?range=${selectedPeriod.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        console.error(err);
        setData(MOCK_DATA); // fallback
      });
  }, [selectedPeriod]);

  const getBarHeight = (demand: number) => {
    return Math.max((demand / 100) * chartHeight, 4); // minimum height of 4px
  };

  const timeRanges: TimeRange[] = ["Daily", "Weekly", "Monthly", "Annually"];

  return (
    <div className="w-full max-w-lg bg-gray-100 p-4 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-gray-800 font-semibold text-lg">Book Demand by Category</h2>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-[#702DFF] text-white px-3 py-1 rounded-md text-sm font-medium flex items-center gap-2"
          >
            {selectedPeriod}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[140px] overflow-hidden">
              {timeRanges.map((period) => (
                <button
                  key={period}
                  onClick={() => {
                    setSelectedPeriod(period);
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-gray-700"
                >
                  {period}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex gap-3">
        {/* Y Axis Labels */}
        <div
          className="flex flex-col justify-between text-xs text-gray-500 py-2"
          style={{ height: `${chartHeight}px` }}
        >
          {[100, 80, 60, 40, 20, 0].map((val) => (
            <div key={val} className="flex items-center h-0">
              <span>{val}%</span>
            </div>
          ))}
        </div>

        {/* Chart Area */}
        <div className="flex-1 relative">
          {/* Grid Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[100, 80, 60, 40, 20, 0].map((val, index) => (
              <div
                key={val}
                className="absolute w-full border-t border-gray-300 opacity-30"
                style={{ top: `${(index / 5) * 100}%` }}
              />
            ))}
          </div>

          {/* Bars Container */}
          <div className="flex items-end justify-between gap-2 h-full px-1" style={{ height: `${chartHeight}px` }}>
            {data.map((item, index) => (
              <div key={item.category} className="flex flex-col items-center group flex-1 min-w-0">
                {/* Bar */}
                <div className="relative w-full max-w-[13px] mx-auto">
                  {/* Background Bar */}
                  <div
                    className="bg-gray-200 rounded-full w-full"
                    style={{ height: `${chartHeight}px` }}
                  />
                  {/* Actual Bar */}
                  <div
                    className="bg-[#702DFF] rounded-full   cursor-pointer absolute bottom-0 w-full"
                    style={{
                      height: animationStarted ? `${getBarHeight(item.demand)}px` : "0px",
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      {item.demand}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Category Labels */}
          <div className="flex items-start justify-between gap-2 mt-3 px-1">
            {data.map((item) => (
              <div key={item.category} className="flex-1 min-w-0 text-center">
                <div className="text-xs text-gray-600 break-words leading-tight">
                  {item.category.length > 8 ? item.category.slice(0, 8) + "…" : item.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChartCard;