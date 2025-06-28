// components/StatCard.tsx
import React from "react";
import type { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: IconType;
  iconBg: string;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  trend,
}) => {
  return (
    <div className="flex justify-between p-4 rounded-xl bg-[#F5F5F7]  w-full mr-6 ">
      
      <div className="flex flex-col items-start ">
        <span className="text-[0.9rem] font-[600] text-[#202224] opacity-[0.7]">{title}</span>
        <span className="text-[1.5rem] font-[700] text-[#202224]">{value}</span>
        <div className="flex gap-1">
        <span className="text-xs text-green-600 mt-1">{trend}</span>
        <span className="text-xs text-gray-400 mt-1">{subtitle}</span></div>
      </div>
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}
      >
        <Icon className="text-white text-xl" />
      </div>
    </div>
  );
};

export default StatCard;
