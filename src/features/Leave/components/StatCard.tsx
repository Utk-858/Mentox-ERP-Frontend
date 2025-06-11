import React from "react";

interface StatCardProps {
  count: number;
  labelLine1: string;
  labelLine2: string;
  bgColor: string;
  textColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  count,
  labelLine1,
  labelLine2,
  bgColor,
  textColor = "text-black",
}) => {
  return (
    <div className="w-[17rem] h-[6rem] rounded-[0.3rem]  bg-[#F5F5F7] p-3 flex items-center gap-3">
      <div className={`rounded-[0.2rem] px-5 py-1 text-[2.5rem] font-semibold ${bgColor} ${textColor}`}>
        {count}
      </div>
      <div>
        <div className="text-[1.12rem] text-[#44477B] font-[600]">{labelLine1}</div>
        <div className="text-[1.12rem] text-[#44477B] font-[600]">{labelLine2}</div>
      </div>
    </div>
  );
};

export default StatCard;
