import React, { useState } from 'react';
import { ChevronLeft, Plus, SmileIcon, Paperclip } from 'lucide-react';

interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

export default function TaskForm() {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [subtasks, setSubtasks] = useState<Subtask[]>([
    { id: '1', text: 'Prepare Figma file', completed: true },
    { id: '2', text: 'Get materials from the client', completed: false },
    { id: '3', text: 'Get some ideas from the team', completed: false }
  ]);

  const addSubtask = () => {
    const newSubtask: Subtask = {
      id: Date.now().toString(),
      text: '',
      completed: false
    };
    setSubtasks([...subtasks, newSubtask]);
  };

  const toggleSubtask = (id: string) => {
    setSubtasks(subtasks.map(subtask =>
      subtask.id === id ? { ...subtask, completed: !subtask.completed } : subtask
    ));
  };

  const updateSubtaskText = (id: string, text: string) => {
    setSubtasks(subtasks.map(subtask =>
      subtask.id === id ? { ...subtask, text } : subtask
    ));
  };

  const [priority, setPriority] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  return (
    <div className="max-w-2xl px-8 bg-[#F5F5F7] rounded-lg shadow-lg h-115 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Create New Task</h2>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="p-4 space-y-4 flex-1 overflow-y-auto scrollbar-hide">
        {/* Task Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Name
          </label>
          <input
            type="text"
            placeholder="Add Name..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full px-3 bg-white py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Description
          </label>
          <textarea
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 bg-white py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Formatting Options */}
        <div className="flex ml-2 items-center space-x-2 text-gray-500">
          <span className="text-2xl">Aa</span>
          <SmileIcon />
          <Paperclip />
        </div>

        {/* Subtasks and Task Priority - Responsive */}
        <div className="flex flex-col md:flex-col lg:flex-row gap-6 w-full">
          {/* Subtasks */}
          <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Subtasks:
              </label>
              <button
                onClick={addSubtask}
                className="flex items-center space-x-1 text-purple-600 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Add Subtasks</span>
              </button>
            </div>

            <div className="space-y-2">
              {subtasks.map((subtask) => (
                <div key={subtask.id} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={subtask.text}
                    onChange={(e) => updateSubtaskText(subtask.id, e.target.value)}
                    className={`flex-1 text-sm py-1 px-1 border-0 focus:outline-none ${
                      subtask.completed ? 'text-gray-500 bg-purple-100 rounded-xl' : 'text-gray-900'
                    }`}
                    placeholder="Enter subtask..."
                  />
                  <button
                    onClick={() => toggleSubtask(subtask.id)}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      subtask.completed
                        ? 'bg-[#702DFF] border-[#702DFF]'
                        : 'border-gray-300'
                    }`}
                  >
                    {subtask.completed && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Task Priority */}
          <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Task Priority
            </label>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {['Super High', 'High', 'Medium', 'Low'].map((level) => (
                <label key={level} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="priority"
                    value={level}
                    checked={priority === level}
                    onChange={() => setPriority(priority === level ? '' : level)}
                    className="w-5 h-5 rounded-full bg-[#702DFF] border-gray-300 text-white focus:ring-[#702DFF]"
                  />
                  <span className="text-sm text-gray-700">{level}</span>
                </label>
              ))}
            </div>

            {/* Schedule Task Toggle */}
            <div className="flex items-center justify-between mb-4">
              <label htmlFor="scheduleToggle" className="text-sm font-medium text-gray-700">
                Schedule Task
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="scheduleToggle"
                  className="sr-only peer"
                  checked={isScheduled}
                  onChange={() => setIsScheduled(!isScheduled)}
                />
                <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#702DFF] rounded-full peer peer-checked:bg-[#702DFF] transition-all"></div>
                <div className="absolute bg-white w-3 h-3 rounded-full transition-transform peer-checked:translate-x-5"></div>
              </label>
            </div>

            {isScheduled && (
              <div className="flex space-x-3">
                <div className="flex items-center space-x-2 w-1/2 border border-gray-300 bg-white rounded px-2 py-1">
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full text-sm text-gray-700 focus:outline-none"
                  />
                </div>

                <div className="flex items-center space-x-2 w-1/2 border border-gray-300 bg-white rounded px-2 py-1">
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full text-sm text-gray-700 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Task Button */}
      <div className="p-4 border-t border-gray-200 bg-[#F5F5F7]">
        <button className="w-full bg-[#702DFF] text-white py-3 rounded-lg font-medium transition-colors">
          Create Task
        </button>
      </div>
    </div>
  );
}
