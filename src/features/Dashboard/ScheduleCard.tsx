import React from 'react';

const tasks = [
  { time: '01:00 PM – 02:00 PM', title: 'Meet w/ Simmpmple' },
  { time: '02:00 PM – 03:00 PM', title: 'Fitness Training' },
  { time: '03:00 PM – 04:00 PM', title: 'Reading time' },
];

const ScheduleCard = () => {
  return (
    <div className="bg-white shadow-md p-4 rounded-2xl">
      <h2 className="text-lg font-semibold mb-2">27 May</h2>
      {tasks.map((task, index) => (
        <div key={index} className="mb-2">
          <p className="text-sm text-gray-700 font-medium">{task.title}</p>
          <p className="text-xs text-purple-500">{task.time}</p>
        </div>
      ))}
      <p className="text-sm text-blue-600 mt-2 cursor-pointer">View all Tasks →</p>
    </div>
  );
};

export default ScheduleCard;