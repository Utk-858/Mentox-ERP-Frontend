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
  
  // Responsive chart height
  const getChartHeight = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 120; // sm
      if (window.innerWidth < 768) return 140; // md
      return 160; // lg+
    }
    return 140;
  };
  
  const [chartHeight, setChartHeight] = useState(getChartHeight());

  useEffect(() => {
    const handleResize = () => {
      setChartHeight(getChartHeight());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setData([]); // Reset for loading animation
    // Simulate API call
    const timer = setTimeout(() => {
      setData(MOCK_DATA);
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedPeriod]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (dropdownOpen && !target.closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const getBarHeight = (demand: number) => {
    return Math.max((demand / 100) * chartHeight, 4); // minimum height of 4px
  };

  const getBarWidth = () => {
    const dataLength = data.length;
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile: narrower bars
        return Math.max(8, Math.min(12, (width - 120) / dataLength / 2));
      } else if (width < 768) {
        // Tablet
        return Math.max(10, Math.min(16, (width - 150) / dataLength / 2));
      }
    }
    // Desktop
    return 18;
  };

  const getTruncatedLabel = (label: string) => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile: very short labels
        return label.length > 4 ? label.slice(0, 4) + "…" : label;
      } else if (width < 768) {
        // Tablet: medium labels
        return label.length > 6 ? label.slice(0, 6) + "…" : label;
      }
    }
    // Desktop: longer labels
    return label.length > 10 ? label.slice(0, 10) + "…" : label;
  };

  const timeRanges: TimeRange[] = ["Daily", "Weekly", "Monthly", "Annually"];

  return (
    <div className="w-full max-w-lg md:max-w-2xl bg-gray-100 p-4 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-gray-800 font-semibold text-lg">Book Demand by Category</h2>

        <div className="relative dropdown-container">
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
      <div className="flex gap-2 sm:gap-3">
        {/* Y Axis Labels */}
        <div
          className="flex flex-col justify-between text-xs text-gray-500 py-2 min-w-[24px] sm:min-w-[32px]"
          style={{ height: `${chartHeight}px` }}
        >
          {[100, 80, 60, 40, 20, 0].map((val) => (
            <div key={val} className="flex items-center h-0">
              <span className="text-[10px] sm:text-xs">{val}%</span>
            </div>
          ))}
        </div>

        {/* Chart Area */}
        <div className="flex-1 relative min-w-0">
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

          {/* Loading State */}
          {data.length === 0 && (
            <div 
              className="flex items-center justify-center text-gray-500 text-sm"
              style={{ height: `${chartHeight}px` }}
            >
              Loading...
            </div>
          )}

          {/* Bars Container */}
          {data.length > 0 && (
            <div 
              className="flex items-end justify-between gap-1 sm:gap-2 h-full px-1" 
              style={{ height: `${chartHeight}px` }}
            >
              {data.map((item, index) => (
                <div key={item.category} className="flex flex-col items-center group flex-1 min-w-0">
                  {/* Bar */}
                  <div className="relative mx-auto" style={{ width: `${getBarWidth()}px` }}>
                    {/* Background Bar */}
                    <div
                      className="bg-gray-200 rounded-full w-full"
                      style={{ height: `${chartHeight}px` }}
                    />
                    {/* Actual Bar */}
                    <div
                      className="bg-[#702DFF] rounded-full cursor-pointer absolute bottom-0 w-full transition-all duration-700 ease-out hover:bg-[#5a24cc]"
                      style={{
                        height: animationStarted ? `${getBarHeight(item.demand)}px` : "0px",
                        transitionDelay: `${index * 100}ms`,
                      }}
                    >
                      {/* Tooltip */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        {item.category}: {item.demand}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Category Labels */}
          {data.length > 0 && (
            <div className="flex items-start justify-between gap-1 sm:gap-2 mt-2 sm:mt-3 px-1">
              {data.map((item) => (
                <div key={item.category} className="flex-1 min-w-0 text-center">
                  <div 
                    className="text-[10px] sm:text-xs text-gray-600 break-words leading-tight"
                    title={item.category} // Show full text on hover
                  >
                    {getTruncatedLabel(item.category)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarChartCard;