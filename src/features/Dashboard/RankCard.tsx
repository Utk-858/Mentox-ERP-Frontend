// components/RankCard.tsx
import React from 'react';
import { ArrowDown, ArrowUp, TrendingDown, TrendingUp } from 'lucide-react';
import type { RankData } from './types';

interface Props {
  data: RankData;
}

const RankCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-neutral-100 rounded-xl shadow-md p-5 w-80  flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className='flex-1/3'>
          <h3 className="text-sm text-gray-500">Class Rank</h3>
          <h2 className="text-xl font-semibold mt-3 text-[#202224]">
            Rank: {data.rank} of {data.totalStudents}
          </h2>
          <p className="text-sm text-[#606163] mt-1.5 font-semibold">
            Term 1: {data.termScore} / {data.termTotal}
          </p>
        </div>
        <div className="bg-yellow-100 p-3 rounded-full ">
          <img src="/Icon.png" alt="icon" className="" />
        </div>
      </div>

      <div className="flex justify-between text-xs">
        <div className="flex items-center text-emerald-600 gap-1">
          <TrendingUp/>
          Top: {data.topSubject.score} 
          <div className='text-neutral-400 font-semibold'>
             in {data.lowSubject.subject}
            </div>
        </div>
        <div className="flex items-center text-red-500 gap-1">
          <TrendingDown/>
          Low: {data.lowSubject.score}
          <div className='text-neutral-400 font-semibold'>
             in {data.lowSubject.subject}
            </div>
        </div>
      </div>
    </div>
  );
};

export default RankCard;
