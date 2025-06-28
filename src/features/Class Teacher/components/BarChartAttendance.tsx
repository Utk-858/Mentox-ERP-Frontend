import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

interface ChartData {
  /** e.g. "1 Aug" */
  label: string;
  /** attendance percentage for that day (0 – 100) */
  percent: number;
}

const BarChartAttendance: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

  /* ------------- SAMPLE DAILY DATA (1 – 10 Aug) ------------- */
  const dailyData: ChartData[] = [
    { label: "1 Aug", percent: 55 },
    { label: "2 Aug", percent: 35 },
    { label: "3 Aug", percent: 80 },
    { label: "4 Aug", percent: 45 },
    { label: "5 Aug", percent: 65 },
    { label: "6 Aug", percent: 88 },
    { label: "7 Aug", percent: 0 },  // grey background only
    { label: "8 Aug", percent: 0 },
    { label: "9 Aug", percent: 0 },
    { label: "10 Aug", percent: 0 },
  ];

  const periods = ["Weekly", "Monthly", "Daily"]; // order optional
  const chartHeight = 100; // px → makes % math easy (1 px = 1 %)

  useEffect(() => {
    const timer = setTimeout(() => setAnimationStarted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  /** converts a percentage (0 – 100) to pixel height */
  const getBarHeight = (percent: number) => (percent / 100) * chartHeight;

  return (
    <div className="w-[38rem] mx-auto bg-gray-50 p-4 rounded-lg ">
      {/* ---------- header ---------- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="font-semibold text-sm text-black">
          Attendance Comparison Chart
        </h2>

        {/* period dropdown */}
        <div className="relative mr-8">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-[#4318FF] hover:bg-purple-700 transition-colors duration-200
                       text-white font-semibold text-xs rounded-md px-3 py-1 flex items-center gap-1"
          >
            {selectedPeriod}
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 min-w-[120px] bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => {
                    setSelectedPeriod(period);
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700
                             hover:bg-gray-50 transition-colors duration-150"
                >
                  {period}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ---------- chart ---------- */}
      <div className="mt-4 flex gap-4">
        {/* Y-axis */}
        <div
          className="flex flex-col justify-between pr-2"
          style={{ height: chartHeight + 30 }}
        >
          {[100, 80, 60, 40, 20, 0].map((val) => (
            <span
              key={val}
              className="text-xs text-gray-500 text-right min-h-[20px]"
            >
              {val}%
            </span>
          ))}
        </div>

        {/* bars */}
        <div className="flex-1 overflow-x-auto">
          <div
            /* dynamic column count so Tailwind’s fixed grid-cols-N isn’t needed */
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${dailyData.length}, minmax(0, 1fr))`,
              height: chartHeight + 30,
              gap: "0.25rem",
            }}
            className="items-end"
          >
            {dailyData.map((d, idx) => (
              <div key={d.label} className="flex flex-col items-center group">
                {/* bar wrapper */}
                <div className="relative mb-2">
                  {/* background bar (light grey) */}
                  <div
                    className="absolute bottom-0 w-[14px] bg-gray-200 rounded-full"
                    style={{ height: chartHeight + 20 }}
                  />

                  {/* actual value bar */}
                  <div
                    className={`relative z-10 w-[14px] rounded-full transition-all
                                duration-1000 ease-out cursor-pointer
                                ${d.percent ? "bg-[#702DFF] hover:bg-purple-700" : "bg-transparent"}`}
                    style={{
                      height: animationStarted
                        ? `${getBarHeight(d.percent)}px`
                        : "0px",
                      transitionDelay: `${idx * 80}ms`,
                      minHeight: d.percent ? "8px" : "0", // tiny stub for non-zero values
                    }}
                  >
                    {/* tooltip */}
                    {d.percent > 0 && (
                      <div className="absolute z-20 -top-8 left-1/2 -translate-x-1/2 px-2 py-[2px]
                                      text-xs text-white bg-gray-800 rounded opacity-0
                                      group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        {d.percent}%
                      </div>
                    )}
                  </div>
                </div>
                {/* X-axis label */}
                <span className="text-[0.5rem] text-gray-600">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChartAttendance;
