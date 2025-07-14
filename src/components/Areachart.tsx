import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Settings } from 'lucide-react';

// Define the type of each data point
interface BookActivityData {
  date: string;
  booksIssued: number;
  booksReturned: number;
}

// Mock data
const mockData = {
  daily: [
    { date: '01 Aug', booksIssued: 60, booksReturned: 40 },
    { date: '02 Aug', booksIssued: 70, booksReturned: 50 },
    { date: '03 Aug', booksIssued: 65, booksReturned: 45 },
    { date: '04 Aug', booksIssued: 80, booksReturned: 60 },
    { date: '05 Aug', booksIssued: 75, booksReturned: 55 },
    { date: '06 Aug', booksIssued: 85, booksReturned: 65 },
    { date: '07 Aug', booksIssued: 90, booksReturned: 70 },
    { date: '08 Aug', booksIssued: 60, booksReturned: 50 },
    { date: '09 Aug', booksIssued: 65, booksReturned: 55 },
    { date: '10 Aug', booksIssued: 70, booksReturned: 60 },
    { date: '11 Aug', booksIssued: 80, booksReturned: 65 },
    { date: '12 Aug', booksIssued: 75, booksReturned: 55 },
    { date: '13 Aug', booksIssued: 65, booksReturned: 50 },
    { date: '14 Aug', booksIssued: 70, booksReturned: 60 },
    { date: '15 Aug', booksIssued: 85, booksReturned: 70 },
  ],
  weekly: [
    { date: 'Week 1', booksIssued: 400, booksReturned: 300 },
    { date: 'Week 2', booksIssued: 420, booksReturned: 320 },
    { date: 'Week 3', booksIssued: 450, booksReturned: 350 },
    { date: 'Week 4', booksIssued: 430, booksReturned: 340 },
  ],
  monthly: [
    { date: 'January', booksIssued: 1800, booksReturned: 1500 },
    { date: 'February', booksIssued: 1900, booksReturned: 1600 },
    { date: 'March', booksIssued: 2000, booksReturned: 1700 },
    { date: 'April', booksIssued: 2100, booksReturned: 1800 },
  ],
};

const AreaChartLibrary: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  return (
    <div className="w-full h-96 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {/* Left Side: Title */}
        <h2 className="text-xl font-semibold text-gray-800">Daily Book Activity</h2>

        {/* Right Side: Time Range + Settings */}
        <div className="flex items-center space-x-6">
          {/* Time Ranges */}
          <div className="flex items-center space-x-6">
            {(['daily', 'weekly', 'monthly'] as const).map((range) => (
              <div
                key={range}
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setSelectedRange(range)}
              >
                <div
                  className={`w-3 h-3 rounded-full border-2 ${
                    selectedRange === range 
                      ? 'bg-purple-600 border-purple-600' 
                      : 'bg-transparent border-gray-400'
                  }`}
                >
                  {selectedRange === range && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
                <span className={`text-sm capitalize ${
                  selectedRange === range ? 'text-purple-600 font-medium' : 'text-gray-600'
                }`}>
                  {range}
                </span>
              </div>
            ))}
          </div>

          {/* Settings Icon */}
          <button
            className="p-1 rounded hover:bg-gray-100"
            title="Settings"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end space-x-6 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-0.5 bg-purple-600"></div>
          <span className="text-sm text-purple-600 font-medium">Books Issued</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-0.5 bg-purple-300"></div>
          <span className="text-sm text-purple-300 font-medium">Books Returned</span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={mockData[selectedRange]} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="booksIssuedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="booksReturnedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c4b5fd" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#c4b5fd" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: '#666' }}
            tickLine={false}
            axisLine={false}
            interval={0}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#666' }}
            tickLine={false}
            axisLine={false}
            domain={[0, 'auto']}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            labelStyle={{ fontWeight: 'bold', color: '#333' }}
          />
          <Area
            type="monotone"
            dataKey="booksIssued"
            name="Books Issued"
            stroke="#7c3aed"
            strokeWidth={3}
            fill="url(#booksIssuedGradient)"
            dot={{ r: 4, fill: '#7c3aed', stroke: '#7c3aed' }}
            activeDot={{ r: 6, fill: '#7c3aed', stroke: '#7c3aed' }}
          />
          <Area
            type="monotone"
            dataKey="booksReturned"
            name="Books Returned"
            stroke="#c4b5fd"
            strokeWidth={3}
            fill="url(#booksReturnedGradient)"
            dot={{ r: 4, fill: '#c4b5fd', stroke: '#c4b5fd' }}
            activeDot={{ r: 6, fill: '#c4b5fd', stroke: '#c4b5fd' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartLibrary;