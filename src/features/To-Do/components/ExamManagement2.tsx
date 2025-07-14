import React, { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

interface Exam {
  id: string;
  title: string;
  className: string;
  students: string;
  Type: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Pending' | 'Today\'s Task' | 'Completed';
  assignedBy: string;
  points: number;
  selected?: boolean;
}

interface Task {
  id: string;
  title: string;
  priority: 'Very High' | 'High' | 'Medium' | 'Low';
  date: string;
  time: string;
  status: 'Upcoming' | 'Pending' | 'Today\'s Task';
  selected?: boolean;
  subtasks: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

const ExamManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All Tasks' | 'Pending' | 'Upcoming' | 'Completed'>('All Tasks');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDropdown, setFilterDropdown] = useState(false);

  const [exams, setExams] = useState<Exam[]>([
    {
      id: '1',
      title: 'DBMs Course - Master the Fundamentals and Advanced Concepts',
      className: 'Class 10th',
      students: '6th Students',
      Type: 'Assignment',
      date: '20/10/2025',
      time: '09:05',
      status: 'Upcoming',
      assignedBy: 'Ms Pooja',
      points: 15,
      selected: false
    },
    {
      id: '2',
      title: 'DBMs Course - Master the Fundamentals and Advanced Concepts',
      className: 'Class 10th',
      students: '6th Students',
      Type: 'Assignment',
      date: '20/10/2025',
      time: '09:05',
      status: 'Today\'s Task',
      assignedBy: 'Admin',
      points: 15,
      selected: false
    },
    {
      id: '3',
      title: 'DBMs Course - Master the Fundamentals and Advanced Concepts',
      className: 'Class 10th',
      students: '6th Students',
      Type: 'Assignment',
      date: '20/10/2025',
      time: '09:05',
      status: 'Pending',
      assignedBy: 'Admin',
      points: 15,
      selected: false
    }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '4',
      title: 'UX Wireframes',
      priority: 'High',
      date: '20/10/2025',
      time: '09:05',
      status: 'Upcoming',
      selected: false,
      subtasks: [
        { id: '1', title: 'Prepare Figma file', completed: true },
        { id: '2', title: 'Get materials from the client', completed: false },
        { id: '3', title: 'Get materials from the client', completed: false }
      ]
    },
    {
      id: '5',
      title: 'UX Wireframes',
      priority: 'High',
      date: '20/10/2025',
      time: '09:05',
      status: 'Pending',
      selected: false,
      subtasks: [
        { id: '4', title: 'Prepare Figma file', completed: true },
        { id: '5', title: 'Get materials from the client', completed: true },
        { id: '6', title: 'Get materials from the client', completed: true }
      ]
    },
    {
      id: '6',
      title: 'UX Wireframes',
      priority: 'High',
      date: '20/10/2025',
      time: '09:05',
      status: 'Today\'s Task',
      selected: false,
      subtasks: [
        { id: '7', title: 'Prepare Figma file', completed: true },
        { id: '8', title: 'Get materials from the client', completed: false },
        { id: '9', title: 'Get materials from the client', completed: false }
      ]
    }
  ]);

  const handleUploadMarks = async (examId: string) => {
    alert('Marks uploaded successfully!');
  };

 const handleExamSelect = (examId: string) => {
  setExams(prevExams =>
    prevExams.map(exam =>
      exam.id === examId
        ? { 
            ...exam, 
            selected: !exam.selected,
            status: !exam.selected ? 'Completed' : exam.status
          }
        : exam
    )
  );
};

  const handleTaskSelect = (taskId: string) => {
  const task = tasks.find(t => t.id === taskId);
  if (task && areAllSubtasksCompleted(task)) {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { 
              ...task, 
              selected: !task.selected,

              status: !task.selected ? "Today's Task" : task.status
            }
          : task
      )
    );
  }
};

  const handleSubtaskToggle = (taskId: string, subtaskId: string) => {
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

  const areAllSubtasksCompleted = (task: Task) => {
    return task.subtasks.every(subtask => subtask.completed);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Very High':
        return 'text-red-500';
      case 'High':
        return 'text-orange-500';
      case 'Medium':
        return 'text-yellow-500';
      default:
        return 'text-green-500';
    }
  };

  const filteredExams = exams.filter(exam => {
    if (activeTab === 'All Tasks') return true;
    return exam.status === activeTab;
  });

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'All Tasks') return true;
    return task.status === activeTab;
  });

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">All Tasks</h1>
          
        </div>

        <div className="bg-[#F5F5F7] rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className=" mb-6">
            <div className='flex justify-between'>
                <div> <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
              <p className="text-sm text-gray-500">Your all tasks</p></div>
             
              <button className="bg-[#702DFF] hover:bg-purple-700 text-white px-6 py-1 rounded-lg font-medium">
            Create Tasks
          </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex bg-black text-gray-200 rounded-lg p-1">
              {(['All Tasks', 'Pending', 'Upcoming', 'Completed'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-0 px-4 xl:py-2 rounded-md text-xs xl:text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-[#702DFF] text-white'
                      : 'text-gray-100 hover:text-gray-400'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative ml-10">
                <Search className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className=" pl-10 pr-4 text-sm xl:text-base w-[150px] xl:w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-black text-white placeholder-gray-400"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setFilterDropdown(!filterDropdown)}
                  className="flex w-[150px] xl:w-full text-sm xl:text-base  items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-black text-white hover:bg-gray-800"
                >
                  <Filter className="w-4 h-4" />
                  <span>All Exams</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map((exam) => (
              <div key={exam.id} className="shadow-md rounded-lg bg-white relative overflow-hidden">
                <div className="p-4 rounded-lg relative flex transition-all duration-200 cursor-pointer bg-white">
                 
                  
                  <div className="w-1 bg-[#702DFF] rounded-full mt-10 mb-10 mr-3"></div>
                  
                  <div className="flex-1 relative z-20">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{exam.status}</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExamSelect(exam.id);
                        }}
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                          exam.selected
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                         {/* Grey overlay when selected */}
                  {exam.selected && (
                    <div className="absolute bg-[#f5f5f771] inset-0 rounded-lg z-10"></div>
                  )}
                        {exam.selected && (
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </div>

                    <p className="text-sm text-gray-500 mb-2">Date: {exam.date} Time: {exam.time}</p>

                    <div className="mb-4">
                      <span className={`text-xs font-medium text-gray-500}`}>
                        {exam.Type}
                      </span>
                      <h4 className="font-medium text-gray-900 mt-1">{exam.title}</h4>
                    </div>

                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <p>By {exam.assignedBy}</p>
                      <p>Points: {exam.points} points</p>
                      
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUploadMarks(exam.id);
                      }}
                      className="w-full bg-[#702DFF] hover:bg-purple-700 text-white py-2 rounded-lg font-medium"
                    >
                      Upload Marks
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredTasks.map((task) => {
              const allSubtasksCompleted = areAllSubtasksCompleted(task);
              return (
                <div key={task.id} className="shadow-md rounded-lg bg-white relative overflow-hidden">
                  <div className="p-4 rounded-lg relative transition-all duration-200 cursor-pointer bg-white">
                    {/* Grey overlay when selected */}
                    {task.selected && (
                      <div className="absolute bg-[#f5f5f771] inset-0 rounded-lg z-10"></div>
                    )}
                    
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{task.status}</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTaskSelect(task.id);
                        }}
                        disabled={!allSubtasksCompleted}
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                          task.selected
                            ? 'bg-[#702DFF] border-[#702DFF]'
                            : allSubtasksCompleted
                            ? 'border-gray-300 hover:border-gray-400 cursor-pointer'
                            : 'border-gray-200 cursor-not-allowed opacity-50'
                        }`}
                      >
                        {task.selected && (
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </div>

                    <p className="text-sm text-gray-500 mb-3">Date: {task.date} Time: {task.time}</p>

                    <div className="mb-4">
                      <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <h4 className="font-medium text-gray-900 mt-1">{task.title}</h4>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Subtasks: {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
                       
                      </p>
                      <div className="space-y-2">
                        {task.subtasks.map((subtask) => (
                          <div key={subtask.id} className="flex items-center space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSubtaskToggle(task.id, subtask.id);
                              }}
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                subtask.completed
                                  ? 'bg-[#702DFF] border-[#702DFF]'
                                  : 'border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              {subtask.completed && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                            <span className={`text-sm ${subtask.completed ? 'bg-purple-100 text-purple-800 px-2 py-0.5 rounded ' : 'text-gray-700'}`}>
                              {subtask.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamManagement;