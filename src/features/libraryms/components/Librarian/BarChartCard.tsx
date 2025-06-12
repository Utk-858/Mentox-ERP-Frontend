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
  const chartHeight = 140; // increased height

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
    return (demand / 100) * chartHeight;
  };

  const timeRanges: TimeRange[] = ["Daily", "Weekly", "Monthly", "Annually"];

  return (
    <div className="w-full max-w-sm bg-gray-100 p-4 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-gray-800 font-semibold text-lg">Book Demand by Category</h2>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm font-medium flex items-center gap-2"
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

      {/* Chart */}
      <div className="flex gap-4 px-2">
        {/* Y Axis Labels */}
        <div
          className="flex flex-col justify-between pr-2 text-xs text-gray-500"
          style={{ height: `${chartHeight + 40}px` }}
        >
          {[100, 80, 60, 40, 20, 0].map((val) => (
            <span key={val}>{val}%</span>
          ))}
        </div>

        {/* Bars */}
        <div className="flex-1 overflow-x-auto">
          <div
            className="grid grid-cols-[repeat(auto-fit,_minmax(30px,_1fr))] items-end gap-[6px]"
            style={{ height: `${chartHeight + 40}px`, minWidth: "10rem" }}
          >
            {data.map((item, index) => (
              <div key={item.category} className="flex flex-col items-center group">
                {/* Bar */}
                <div className="relative mb-2">
                  <div
                    className="bg-gray-200 rounded-full absolute bottom-0"
                    style={{
                      width: "14px",
                      height: `${chartHeight + 25}px`, // increased background bar height
                    }}
                  />
                  <div
                    className="bg-purple-600 rounded-full transition-all duration-1000 ease-out hover:bg-purple-700 cursor-pointer relative z-10"
                    style={{
                      width: "14px",
                      height: animationStarted ? `${getBarHeight(item.demand)}px` : "0px",
                      transitionDelay: `${index * 100}ms`,
                      minHeight: "6px",
                    }}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      {item.demand}%
                    </div>
                  </div>
                </div>
                <div className="text-[0.6rem] text-gray-600 text-center">
                  {item.category.length > 10 ? item.category.slice(0, 10) + "…" : item.category}
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
