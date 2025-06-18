import React from 'react';
import { Link } from 'react-router-dom';

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
  const [completedSections, setCompletedSections] = React.useState<{ [key: string]: boolean }>({});
  const [tasks, setTasks] = React.useState<Task[]>([
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
  ]);

  const pendingTasks = tasks.filter(task => task.status === 'Pending');
  const upcomingTasks = tasks.filter(task => task.status === 'Upcoming');

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map(subtask =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              )
            }
          : task
      )
    );
  };

  const TaskCard: React.FC<{ task: Task }> = ({ task }) => (
    <div className="bg-white rounded-xl w-full h-[40vh] p-4">
      <div className="mb-4">
        <div className="text-sm text-gray-500 mt-[-10px] mb-5">
          Date: {task.date} | Time: {task.time}
        </div>
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
          <div 
            key={subtask.id} 
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors"
            onClick={() => toggleSubtask(task.id, subtask.id)}
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                subtask.completed
                  ? 'bg-[#702DFF] text-white'
                  : 'border-2 border-gray-300 hover:border-[#702DFF]'
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
              className={`text-sm transition-all ${
                subtask.completed
                  ? 'bg-purple-100 text-purple-800 px-2 py-0.5 rounded'
                  : 'text-gray-800 hover:text-[#702DFF]'
              }`}
            >
              {subtask.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const TaskSection: React.FC<{
    title: string;
    tasks: Task[];
    titleColor: string;
  }> = ({ title, tasks, titleColor }) => {
    const isCompleted = completedSections[title];
    const allTasksCompleted = tasks.every(task => 
      task.subtasks.every(subtask => subtask.completed)
    );

    const handleClick = () => {
      if (allTasksCompleted) {
        setCompletedSections((prev) => ({
          ...prev,
          [title]: !prev[title]
        }));
      }
    };

    return (
      <div className="relative flex-1 min-w-[320px]">
        <div className={`p-6 rounded-xl w-full transition-all duration-300 ${
          isCompleted ? 'bg-gray-50 shadow-inner' : 'bg-white shadow-md'
        }`}>
          <div className="flex items-center gap-3 mb-5">
            <h2 className={`text-3xl font-extrabold ${titleColor} transition-colors ${
              isCompleted ? 'opacity-60' : 'opacity-100'
            }`}>{title}</h2>
            <div
              onClick={handleClick}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                allTasksCompleted 
                  ? 'cursor-pointer hover:scale-110' 
                  : 'cursor-not-allowed opacity-50'
              } ${
                isCompleted 
                  ? 'bg-[#702DFF] text-white border-[#702DFF]' 
                  : allTasksCompleted
                  ? 'border-gray-300 hover:border-[#702DFF]'
                  : 'border-gray-200'
              }`}
            >
              {isCompleted && (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>

          <div className={`transition-opacity duration-300 ${
            isCompleted ? 'opacity-50' : 'opacity-100'
          }`}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 h-full rounded-xl bg-gray-100">
      <div className="flex items-center justify-between mb-8">
  <h1 className="text-2xl font-bold text-gray-800">Tasks Overview</h1>
  <Link
    to="/todo/teacher/exam-management"
    className="text-purple-600 text-sm font-medium hover:underline transition-colors"
  >
    View All Tasks
  </Link>
</div>

      <div className="flex flex-col lg:flex-row gap-10">
        <TaskSection title="Pending" tasks={pendingTasks} titleColor="text-red-500" />
        <TaskSection title="Upcoming" tasks={upcomingTasks} titleColor="text-gray-800" />
      </div>
    </div>
  );
};

export default TasksComponent;