import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface AvgAttendanceCardProps {
  boysPercentage: number;
  girlsPercentage: number;
  boysCount: number;
  girlsCount: number;
}

const AvgAttendanceCard: React.FC<AvgAttendanceCardProps> = ({
  boysPercentage,
  girlsPercentage,
  boysCount,
  girlsCount,
}) => {
  return (
    <div className="bg-[#F5F5F7] rounded-2xl p-4 w-[260px] text-center shadow-sm mt-4 mr-6">
      <h2 className="text-[1.25rem] font-[500] mb-4">Avg Attendance</h2>
      <div className="relative w-[120px] h-[120px] mx-auto  ">
        {/* Outer circle for girls */}
    <CircularProgressbarWithChildren
          value={girlsPercentage}
          strokeWidth={10}
          styles={buildStyles({
            pathColor: "#87FFBA",
            trailColor: "#E0E0E6",
          })}
        >
          {/* Inner circle for boys */}
          <div className="w-[90px] h-[90px] p-1">
            <CircularProgressbarWithChildren
              value={boysPercentage}
              strokeWidth={12}
              styles={buildStyles({
                pathColor: "#FFE493",
                trailColor: "#E0E0E6",
              })}
            >
              {/* Center icon */}
              <div className="p-6"><img src="./girl-and-boy 1.png"></img></div>
            </CircularProgressbarWithChildren>
          </div>
        </CircularProgressbarWithChildren>
      </div>

      <div className="mt-4 flex justify-center items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-[#87FFBA]"></span>
          <div className="text-left">
            <div className="text-[#202020] text-[0.75rem] font-[600]">{boysCount}</div>
            <div className="text-[#696969] text-[0.75rem] font-[500]">Boys ({boysPercentage}%)</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-[#FFE493]"></span>
          <div className="text-left">
            <div className=" text-[#202020] text-[0.75rem] font-[600]">{girlsCount}</div>
            <div className="text-[#696969] text-[0.75rem] font-[500]">Girls ({girlsPercentage}%)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvgAttendanceCard;
