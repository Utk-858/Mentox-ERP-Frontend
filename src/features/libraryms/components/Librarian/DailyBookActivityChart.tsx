import React, { useState } from 'react';
import {
  LineChart,
  Line,
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

const DailyBookActivityChart: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  return (
    <div className="bg-white rounded-xl p-6 shadow-md w-full h-96">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        {/* Left Side: Title */}
        <h2 className="text-lg font-semibold">Daily Book Activity</h2>

        {/* Right Side: Time Range + Settings */}
        <div className="flex items-center space-x-6">
          {/* Time Ranges */}
          <div className="flex items-center space-x-4">
            {(['daily', 'weekly', 'monthly'] as const).map((range) => (
              <div
                key={range}
                className="flex items-center space-x-1 cursor-pointer"
                onClick={() => setSelectedRange(range)}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    selectedRange === range ? 'bg-purple-700' : 'bg-gray-400'
                  }`}
                ></span>
                <span className="text-sm text-gray-600 capitalize">{range}</span>
              </div>
            ))}
          </div>

          {/* Settings Icon */}
          <button
            className="p-2 rounded-full hover:bg-gray-200"
            title="Settings"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="95%">
        <LineChart data={mockData[selectedRange]}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            domain={[0, 'auto']}
          />
          <Tooltip
            contentStyle={{ fontSize: '12px' }}
            labelStyle={{ fontWeight: 'bold' }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: '10px' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="booksIssued"
            name="Books Issued"
            stroke="#7B61FF"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="booksReturned"
            name="Books Returned"
            stroke="#C5B3FF"
            strokeWidth={3}
            dot={{ r: 4, stroke: '#C5B3FF', fill: '#C5B3FF' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyBookActivityChart;
