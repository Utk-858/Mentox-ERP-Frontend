import { useEffect, useState } from "react";
import { TrendingUp } from 'lucide-react';
interface AttendanceData {
  percentage: number;
  increaseFromLastMonth: number;
  absentDays: number;
}

const MOCK_DATA: AttendanceData = {
  percentage: 67,
  increaseFromLastMonth: 8.5,
  absentDays: 18,
};

const AttendanceCard: React.FC = () => {
  const [data, setData] = useState<AttendanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/student/attendance")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json: AttendanceData) => setData(json))
      .catch((err) => {
        console.error("Attendance fetch error:", err);
        setData(MOCK_DATA);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-[#F5F5F7] rounded-xl p-4 shadow-md flex items-center justify-center h-40">
        <span className="text-sm text-gray-500">Loading...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-[#F5F5F7] rounded-xl p-4 shadow-md flex items-center justify-center h-40">
        <span className="text-sm text-red-500">Error loading data</span>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F7] rounded-xl p-4 shadow-md w-full max-w-xs h-50 flex items-center justify-between">
      {/* Left: Text */}
      <div>
        <p className="text-gray-500 font-semibold text-lg">Monthly Attendance</p>
        <p className="text-sm text-gray-500 mt-1">
          Absent for {data.absentDays} days this year
        </p>

        <div className="mt-6 text-sm text-[#00B69B] flex gap-1">
        
        <TrendingUp/> <div> {data.increaseFromLastMonth}% <span className="text-gray-500 text-xs  "> Up from previous month</span></div>
        </div>
      </div>

      {/* Right: Circular Progress */}
      <div className="relative w-48 h-48 ml-2">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="-5 -5 45 42">
          <path
            className="text-gray-200"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-[#702DFF]"
            stroke="currentColor"
            strokeWidth="12"
            strokeDasharray={`${data.percentage}, 100`}
            fill="none"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
            
            
          />
        </svg>
        <div className="absolute mt-1 inset-0 flex flex-col items-center justify-center text-lg  font-bold text-gray-800">
          {data.percentage}% 
          <span className="text-[10px] inset-0 mt-[-0.5rem] font-normal text-gray-500">Attendance</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;
