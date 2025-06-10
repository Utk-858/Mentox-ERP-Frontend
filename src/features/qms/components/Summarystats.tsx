// components/SummaryStats.tsx
import React from "react";


interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface SummaryStatsProps {
  stats: StatCardProps[];
}

const SummaryStats: React.FC<SummaryStatsProps> = ({ stats }) => (
  <div className="grid sm:grid-cols-4 text-center sm:w-[44rem] lg:w-[50rem] xl:w-full  mt-8 h-[6rem] gap-4">
    {stats.map((stat, index) => (
      <StatCard
        key={index}
        label={stat.label}
        value={stat.value}
        icon={stat.icon}
      />
    ))}
  </div>
);

const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => (
  <div className="bg-gray-100 rounded-xl p-4 shadow text-lg sm:w-[10rem] lg:w-[12rem] xl:w-full min-h-[7.5rem] flex justify-between items-center space-x-4">
    <div>
      <div className="font-[600] text-[#71717A] text-[1 rem]">{label}</div>
      <div className="text-[#000] text-[1.6rem] font-[700]">{value}</div>
    </div>
    <div className="text-[1.5rem] text-white rounded-full bg-[#000] p-2">{icon}</div>
  </div>
);

export default SummaryStats;
