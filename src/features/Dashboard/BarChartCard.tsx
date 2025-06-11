import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
  { subject: 'Maths', score: 50 },
  { subject: 'Science', score: 35 },
  { subject: 'English', score: 70 },
  { subject: 'Social Science', score: 45 },
  { subject: 'Hindi', score: 60 },
  { subject: 'Physical Education', score: 85 },
  { subject: 'Computer', score: 15 },
];

const BarChartCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 w-full h-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-md font-bold">Your statistics</h2>
        <select className="bg-[#702DFF] text-white text-sm px-3 py-1 rounded-lg z-10">
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <p className="text-sm text-gray-700 mb-3">Grades</p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Bar dataKey="score" fill="#4F46E5" radius={[8, 8, 0, 0]} barSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;