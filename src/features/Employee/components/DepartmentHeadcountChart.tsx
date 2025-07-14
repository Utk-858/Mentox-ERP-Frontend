import React from "react";

const DepartmentHeadcountChart: React.FC = () => {
  const totalHeadcount = 100;
  const departmentData = [
    { department: "Admin", count: 55 },
    { department: "Teaching", count: 40 },
    { department: "Cleaning", count: 80 },
    { department: "Library", count: 50 },
    { department: "Sports", count: 65 },
    { department: "Lab", count: 85 },
    { department: "Counselling", count: 20 },
  ];

  // Generate labels from 100 down to 0 in steps of 20
  const yAxisLabels = Array.from({ length: 6 }, (_, i) => 100 - i * 20);

  return (
    <div className="w-[400px] bg-[#F5F5F7] p-4 rounded-xl shadow-sm font-sans">
      {/* Header */}
      <div className="mb-4">
        <h2 className="font-semibold text-2xl ml-2 text-black">Department <br />Headcount</h2>
      </div>

      {/* Chart container with Y-axis */}
      <div className="flex">
        {/* Y-Axis labels */}
        <div className="flex flex-col justify-between h-40 mr-4 mt-2">
          {yAxisLabels.map((label, idx) => (
            <span
              key={idx}
              className="text-xs text-gray-600"
              style={{ transform: "translateY(50%)" }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Chart */}
        <div className="flex items-end justify-between h-40 mt-10 px-1 w-full">
          {departmentData.map((entry, idx) => (
            <div key={idx} className="flex flex-col items-center w-8">
              {/* Bar container */}
              <div className="relative h-40 w-full flex items-end justify-center">
                {/* Background bar - Total Headcount */}
                <div className="absolute bottom-0 w-3 bg-gray-200 h-full rounded-full" />
                {/* Foreground bar - Department count */}
                <div
                  className="w-3 bg-[#702DFF] rounded-full z-10"
                  style={{
                    height: `${(entry.count / totalHeadcount) * 100}%`,
                  }}
                />
              </div>
              {/* Label */}
              <span className="text-xs mt-2 text-gray-600 text-center break-words">
                {entry.department}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentHeadcountChart;
