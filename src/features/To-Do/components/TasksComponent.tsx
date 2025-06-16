import React from 'react';

interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

interface Task {
  id: string;
  title: string;
  date: string;
  time: string;
  priority: 'High' | 'Medium' | 'Low';
  subtasks: Subtask[];
  status: 'Pending' | 'Upcoming';
}

const TasksComponent: React.FC = () => {
  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'UX Wireframes',
      date: '20/10/2025',
      time: '09:05',
      priority: 'High',
      status: 'Pending',
      subtasks: [
        { id: '1a', text: 'Prepare Figma file', completed: true },
        { id: '1b', text: 'Get materials from the client', completed: false },
        { id: '1c', text: 'Client approval', completed: false }
      ]
    },
    {
      id: '2',
      title: 'Final Presentation',
      date: '22/10/2025',
      time: '14:30',
      priority: 'Medium',
      status: 'Upcoming',
      subtasks: [
        { id: '2a', text: 'Create slides', completed: false },
        { id: '2b', text: 'Practice pitch', completed: false },
        { id: '2c', text: 'Team review', completed: false }
      ]
    }
  ];

  const pendingTasks = mockTasks.filter(task => task.status === 'Pending');
  const upcomingTasks = mockTasks.filter(task => task.status === 'Upcoming');

  const TaskCard: React.FC<{ task: Task }> = ({ task }) => (
    <div className="bg-white rounded-xl  w-full h-[40vh]">
      <div className="mb-4">
        <div className="text-sm text-gray-500 mt-[-10px] mb-5">Date: {task.date} | Time: {task.time}</div>
        <h3 className="font-bold text-2xl text-gray-800 mb-1">{task.title}</h3>
        
        <div className="text-sm text-gray-500">
          Priority:{' '}
          <span
            className={`font-semibold ${
              task.priority === 'High'
                ? 'text-red-500'
                : task.priority === 'Medium'
                ? 'text-yellow-500'
                : 'text-green-500'
            }`}
          >
            {task.priority}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-base font-semibold text-gray-700 mb-1">Subtasks:</div>
        {task.subtasks.map((subtask) => (
          <div key={subtask.id} className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                subtask.completed
                  ? 'bg-[#702DFF] text-white'
                  : 'border-2 border-gray-300'
              }`}
            >
              {subtask.completed && (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <span
              className={`text-sm ${
                subtask.completed
                  ? 'bg-purple-100 text-purple-800 px-2 py-0.5 rounded'
                  : 'text-gray-800'
              }`}
            >
              {subtask.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const TaskSection: React.FC<{ title: string; tasks: Task[]; titleColor: string }> = ({
    title,
    tasks,
    titleColor
  }) => (
    <div className="flex-1 bg-white p-6 rounded-xl w-full min-w-[320px]">
      <div className="flex items-center gap-3 mb-5">
        <h2 className={`text-3xl font-extrabold ${titleColor}`}>{title}</h2>
        <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
      </div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 h-full rounded-xl bg-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Tasks Overview</h1>
        <button className="text-purple-600 text-sm font-medium hover:underline">
          View All Tasks
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <TaskSection title="Pending" tasks={pendingTasks} titleColor="text-red-500" />
        <TaskSection title="Upcoming" tasks={upcomingTasks} titleColor="text-gray-800" />
      </div>
    </div>
  );
};

export default TasksComponent;
