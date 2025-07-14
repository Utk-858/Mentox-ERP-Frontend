import React from 'react';

type AttendanceData = {
  percentage: number;
  total: number;
};

type AttendanceCardProps = {
  data: AttendanceData;
};

const Totalattendancecard: React.FC<AttendanceCardProps> = ({ data }) => {
  return (
    <div className="flex items-center bg-[#F5F5F7] rounded-lg shadow px-4 py-2 w-full">
      {/* Circle Chart */}
      <div className="relative w-12 h-12 mr-4">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="-5 -5 45 42">
          <path
            className="text-gray-200"
            stroke="currentColor"
            strokeWidth={6}
            fill="none"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-[#702DFF]"
            stroke="currentColor"
            strokeWidth={6}
            strokeDasharray={`${data.percentage}, 100`}
            fill="none"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-[10px] font-semibold text-gray-800">
          {data.percentage}%
        </div>
      </div>

      {/* Attendance Text */}
      <div className="text-[1.15rem] font-[400] text-gray-700">
        Total Attendance: <span className="font-bold">{data.total}</span>
      </div>
    </div>
  );
};

export default Totalattendancecard;
