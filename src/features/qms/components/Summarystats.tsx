import React from "react";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";
import { MdOutlinePeople } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";


interface SummaryStatsProps {
  totalMarks: number;
  maxMarks: number;
  time: string;
  averageMarks: string;
  topScore: string;
}

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}


const SummaryStats: React.FC<SummaryStatsProps> = ({
  totalMarks,
  maxMarks,
  time,
  averageMarks,
  topScore,
}) => (
  <div className="grid sm:grid-cols-4 text-center sm:w-[44rem] lg:w-[50rem] xl:w-[60rem] mt-8 h-[6rem] gap-4">
    <StatCard label="Total Marks" value={`${totalMarks}/${maxMarks}`} icon={<IoBookOutline />} />
    <StatCard label="Time Taken" value={time} icon={<MdOutlineCalendarToday />} />
    <StatCard label="Average Marks" value={averageMarks} icon={<MdOutlinePeople />} />
    <StatCard label="Top Score" value={topScore} icon={<VscGraph />} />
  </div>
);


const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => (
  <div className="bg-gray-100 rounded-xl p-3 shadow text-lg sm:w-[10rem] lg:w-[12rem] xl:w-[13rem] flex justify-between items-center space-x-3">
    
    <div>
      <div className="font-[600] text-[#71717A] text-[0.8rem]">{label}</div>
      <div className="text-[#000] text-[1.6rem] font-[700]">{value}</div>
    </div>
    <div className="text-[1.5rem] text-white rounded-full bg-[#000] p-2">{icon}</div>
  </div>
);


export default SummaryStats;
