import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface LeaveBalanceChartProps {
  leaveType: string;
  leaveCount: number;
  totalLeaves: number;
  onPrev: () => void;
  onNext: () => void;
}

const LeaveBalanceChart: React.FC<LeaveBalanceChartProps> = ({
  leaveType,
  leaveCount,
  totalLeaves,
  onPrev,
  onNext,
}) => {
  const percentage = (leaveCount / totalLeaves) * 100;

  return (
    <div className="w-[17rem] bg-[#F5F5F7] p-4 rounded-[0.88rem] text-center shadow-md">
      <h3 className="text-sm font-semibold mb-2">Balance Leaves</h3>
      <div className="flex justify-center items-center gap-2">
        <FaChevronLeft
          className="cursor-pointer hover:text-gray-600"
          onClick={onPrev}
        />
        <div className="w-28 h-28 ">
          <CircularProgressbarWithChildren 
            value={percentage}
            strokeWidth={20}
            styles={buildStyles({
              pathColor: "#4ade80", // green
              trailColor: "#e5e7eb", // gray
              strokeLinecap: "round",
              
            })}
          >
            <div className="text-[1.65rem] font-[700] text-[#202224] p-8">{leaveCount}</div>
          </CircularProgressbarWithChildren>
        </div>
        <FaChevronRight
          className="cursor-pointer hover:text-gray-600"
          onClick={onNext}
        />
      </div>
      <p className="mt-2 text-[0.75rem] font-[500] text-[#202020]">{leaveType}</p>
    </div>
  );
};

export default LeaveBalanceChart;
