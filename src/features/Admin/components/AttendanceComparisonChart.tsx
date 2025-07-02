import React from "react";

const AttendanceComparisonChart: React.FC = () => {
  const chartData = [
    { date: "1 Aug", planned: 100, actual: 60 },
    { date: "2 Aug", planned: 100, actual: 30 },
    { date: "3 Aug", planned: 100, actual: 90 },
    { date: "4 Aug", planned: 100, actual: 55 },
    { date: "5 Aug", planned: 100, actual: 70 },
    { date: "6 Aug", planned: 100, actual: 85 },
    { date: "7 Aug", planned: 100, actual: 0 },
    { date: "8 Aug", planned: 100, actual: 0 },
    { date: "9 Aug", planned: 100, actual: 0 },
    { date: "10 Aug", planned: 100, actual: 0 },
    { date: "11 Aug", planned: 100, actual: 60 },
    { date: "12 Aug", planned: 100, actual: 30 },
    { date: "13 Aug", planned: 100, actual: 50 },
    { date: "14 Aug", planned: 100, actual: 65 },
    { date: "15 Aug", planned: 100, actual: 90 },
    { date: "16 Aug", planned: 100, actual: 0 },
    { date: "17 Aug", planned: 100, actual: 0 },
  ];

  // Generate Y-axis labels from 100 to 0
  const yAxisLabels = Array.from({ length: 6 }, (_, i) => 100 - i * 20);

  return (
    <div className="w-full bg-gray-50 p-4 rounded-lg shadow-sm font-sans">
      {/* Header */}
      <div className="">
        <h2 className="font-semibold text-lg text-black">
          Attendance Comparison Chart
        </h2>
      </div>

      {/* Chart container */}
      <div className="flex">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between mt-8 h-43 mr-4">
          {yAxisLabels.map((label, idx) => (
            <span
              key={idx}
              className="text-xs text-gray-600"
              style={{ transform: "translateY(50%)" }}
            >
              {label}%
            </span>
          ))}
        </div>

        {/* Bars */}
        <div className="flex items-end justify-between h-50 mt-10 w-full overflow-x-auto gap-2">
          {chartData.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center w-6">
              <div className="relative h-40 w-full flex items-end justify-center">
                {/* Planned bar (background) */}
                <div
                  className="absolute bottom-0 w-3 rounded-full bg-gray-200"
                  style={{
                    height: `${(item.planned / 100) * 100}%`,
                  }}
                />
                {/* Actual bar (foreground) */}
                <div
                  className="w-3 rounded-full bg-[#702DFF] z-10"
                  style={{
                    height: `${(item.actual / 100) * 100}%`,
                  }}
                />
              </div>
              {/* Date label */}
              <span className="text-[10px] mt-2 text-gray-600 text-center break-words">
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceComparisonChart;
