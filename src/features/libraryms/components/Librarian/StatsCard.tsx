import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  statLabel: string;
  statChange: string;
  isPositive: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  statLabel,
  statChange,
  isPositive,
}) => {
  return (
    <div className="bg-gray-100 rounded-2xl shadow-md px-6 py-4 w-full max-w-xs">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          <p className="text-sm text-gray-500 mt-1">{title}</p>
        </div>
        <div className="text-violet-600 bg-violet-100 p-2 rounded-full">
          {icon}
        </div>
      </div>
      <div className="flex items-center mt-4 space-x-2 text-sm">
        <span className={`flex items-center font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {statChange}
        </span>
        <span className="text-gray-400">{statLabel}</span>
      </div>
    </div>
  );
};

export default StatsCard;
