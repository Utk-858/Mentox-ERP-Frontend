import React, { useState, useEffect } from 'react';

interface TaskData {
  completed: number;
  inProgress: number;
  notStarted: number;
}

const CircularProgress: React.FC<{ percentage: number; color: string; size?: number }> = ({ 
  percentage, 
  color, 
  size = 120 
}) => {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="12"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="12"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      <div className="absolute flex items-center justify-center">
        <span className="text-3xl font-bold text-gray-800">{percentage}%</span>
      </div>
    </div>
  );
};

const TaskStatus: React.FC = () => {
  const [taskData, setTaskData] = useState<TaskData | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call later
  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        // TODO: Replace with actual API endpoint
        // const response = await fetch('/api/task-status');
        // const data = await response.json();
        
        // Mock data for now
        const mockData: TaskData = {
          completed: 84,
          inProgress: 46,
          notStarted: 13
        };
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setTaskData(mockData);
      } catch (error) {
        console.error('Failed to fetch task data:', error);
        // Fallback to mock data
        setTaskData({
          completed: 84,
          inProgress: 46,
          notStarted: 13
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTaskData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white border-2 border-blue-500 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Task Status</h2>
        <div className="flex justify-center items-center h-40">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (!taskData) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white border-2 border-blue-500 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Task Status</h2>
        <div className="flex justify-center items-center h-40">
          <div className="text-red-500">Failed to load data</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-[#F5F5F7]  rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Task Status</h2>
      
      <div className="flex justify-around items-center mb-8">
        <div className="flex flex-col items-center">
          <CircularProgress percentage={taskData.completed} color="#10b981" />
        </div>
        
        <div className="flex flex-col items-center">
          <CircularProgress percentage={taskData.inProgress} color="#8b5cf6" />
        </div>
        
        <div className="flex flex-col items-center">
          <CircularProgress percentage={taskData.notStarted} color="#ef4444" />
        </div>
      </div>
      
      <div className="flex justify-around">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-700 font-medium">Completed</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span className="text-gray-700 font-medium">In Progress</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-700 font-medium">Not Started</span>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <div className="inline-block bg-blue-500 text-white px-4 py-1 rounded text-sm">
          Dashboard
        </div>
      </div>
    </div>
  );
};

export default TaskStatus;