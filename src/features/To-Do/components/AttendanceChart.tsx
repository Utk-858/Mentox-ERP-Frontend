import React from "react";

const AttendanceChart: React.FC = () => {
  const totalStudents = 100;
  const attendanceData = [
    { day: "Mon", present: 60 },
    { day: "Tue", present: 30 },
    { day: "Wed", present: 80 },
    { day: "Thu", present: 50 },
    { day: "Fri", present: 70 },
    { day: "Sat", present: 90 },
    { day: "Sun", present: 90 },
  ];

  return (
    <div className="w-85 bg-[#F5F5F7] p-4 rounded-xl shadow-sm font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-xl text-black">Attendance</h2>
        <button className="bg-[#702DFF] text-white px-3 py-1 rounded-md text-sm">
          Class 10A
        </button>
      </div>

      {/* Chart */}
      <div className="flex items-end justify-between h-61 mb-4 px-1">
        {attendanceData.map((entry, idx) => (
          <div key={idx} className="flex flex-col items-center w-6">
            {/* Bar container */}
            <div className="relative h-40 w-full flex items-end justify-center">
              {/* Background bar - Total Students */}
              <div className="absolute bottom-0 w-3 bg-gray-200 h-full rounded-full" />
              {/* Foreground bar - Present Students */}
              <div
                className="w-3 bg-[#702DFF] rounded-full z-10"
                style={{
                  height: `${(entry.present / totalStudents) * 100}%`,
                }}
              />
            </div>
            {/* Label */}
            <span className="text-xs mt-2 text-gray-600">{entry.day}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-gray-200 rounded-full inline-block" />
          Total Students
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#702DFF] rounded-full inline-block" />
          Total Present
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
