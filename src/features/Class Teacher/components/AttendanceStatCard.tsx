import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";

interface AttendanceStatCardProps {
  value: number | string;
  label: string;
  icon: React.ReactNode;
  iconBg: string;              // e.g., "bg-green-200"
  differenceText: string;
  differenceColor: string;     // e.g., "text-red-500"
  differenceBg: string;        // e.g., "bg-red-100"
}

const AttendanceStatCard: React.FC<AttendanceStatCardProps> = ({
  value,
  label,
  icon,
  iconBg,
  differenceText,
  differenceColor,
  differenceBg,
}) => {
  return (
    <div className="bg-[#F5F5F7] rounded-xl px-4 py-3 flex items-center justify-between w-full max-w-xs">
      {/* Left Section */}
      <div>
        <h2 className="text-[2.3rem] font-[600] text-black">{value}</h2>
        <p className="text-[#606060] font-[600] text-[1rem]">{label}</p>
        <div className={`flex items-center font-[500] mt-2 text-[0.75rem] ${differenceColor}`}>
          <div className={`rounded-full p-1 mr-1 ${differenceBg}`}>
            <AiOutlineArrowDown size={12} />
          </div>
          {differenceText}
        </div>
      </div>

      {/* Right Icon */}
      <div className={`rounded-full p-3 ${iconBg}`}>
        {icon}
      </div>
    </div>
  );
};

export default AttendanceStatCard;
