import React, { useEffect, useState } from 'react';

const StudentDemographicsChart: React.FC = () => {
  const [data, setData] = useState({
    boysCount: 45414,
    girlsCount: 40270,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/student-demographics');
        if (!res.ok) throw new Error('Network response was not ok');
        const result = await res.json();
        setData({
          boysCount: result.boysCount,
          girlsCount: result.girlsCount,
        });
      } catch (error) {
        console.warn('Using fallback data due to fetch error:', error);
      }
    };

    fetchData();
  }, []);

  const total = data.boysCount + data.girlsCount;
  const boysPercent = ((data.boysCount / total) * 100).toFixed(2);
  const girlsPercent = ((data.girlsCount / total) * 100).toFixed(2);

  return (
    <div className="w-64 h-90 bg-[#F5F5F7] rounded-xl p-6 font-sans">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Students</h1>

      {/* Chart Container */}
      <div className="flex justify-center mb-8">
        <div className="relative w-40 h-40">
          {/* Outer Ring - Background */}
          <svg className="w-full h-full absolute" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="70" fill="none" stroke="#e5e7eb" strokeWidth="20" />
          </svg>

          {/* Boys Ring (Green) - Outer */}
          <svg className="w-full h-full absolute" viewBox="0 0 160 160">
            <circle
              cx="80"
    cy="80"
    r="70"
    fill="none"
    stroke="#4ade80"
    strokeWidth="20"
    strokeDasharray={`${+boysPercent * 4.4} 440`}
    strokeDashoffset="0"
    transform="rotate(90 80 80)"
            />
          </svg>

          {/* Inner Ring - Background */}
          <svg className="w-full h-full absolute" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="40" fill="none" stroke="#e5e7eb" strokeWidth="16" />
          </svg>

          {/* Girls Ring (Yellow) - Inner */}
          <svg className="w-full h-full absolute" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r="40"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="16"
              strokeDasharray={`${+girlsPercent * 2.51} 251`}
              strokeDashoffset="0"
              transform="rotate(-90 80 80)"
            />
          </svg>

          {/* Center Icons */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-1">
              {/* Girl Icon (Yellow) */}
              <div className="w-4 h-4 bg-yellow-400 rounded-full relative">
                <div className="w-2 h-3 bg-yellow-400 absolute top-4 left-1 rounded-b"></div>
              </div>
              {/* Boy Icon (Green) */}
              <div className="w-4 h-4 bg-green-400 rounded-full relative">
                <div className="w-2 h-3 bg-green-400 absolute top-4 left-1 rounded-b"></div>
                <div className="w-3 h-1 bg-green-400 absolute top-6 left-0.5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-between items-center">
        {/* Boys */}
        <div className="text-center">
          <div className="w-4 h-4 bg-green-400 rounded-full mx-auto mb-2"></div>
          <div className="text-lg font-bold text-gray-800">{data.boysCount.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Boys ({boysPercent}%)</div>
        </div>

        {/* Girls */}
        <div className="text-center">
          <div className="w-4 h-4 bg-yellow-400 rounded-full mx-auto mb-2"></div>
          <div className="text-lg font-bold text-gray-800">{data.girlsCount.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Girls ({girlsPercent}%)</div>
        </div>
      </div>

   
    </div>
  );
};

export default StudentDemographicsChart;
