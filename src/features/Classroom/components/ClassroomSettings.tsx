import React, { useState } from 'react';
import { Clipboard } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const teachersList = ['Hemish Morgan', 'Himanshu Sharma'];
const classOptions = ['6', '7', '8', '9', '10', '11', '12'];
const sectionOptions = ['A', 'B', 'C', 'D'];
const subjectOptions = [
  'Mathematics',
  'Science',
  'English',
  'Social Studies',
  'Computer Science',
  'Physics',
  'Chemistry',
  'Biology',
];

const ClassroomSettings: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname === '/classroom/settings/admin';

  const [classValue, setClassValue] = useState('10');
  const [section, setSection] = useState('A');
  const [subject, setSubject] = useState('Mathematics');
  const [description, setDescription] = useState('');
  const [teachers, setTeachers] = useState<string[]>(teachersList);
  const [defaultMarks, setDefaultMarks] = useState(0);
  const [applyDraft, setApplyDraft] = useState(true);
  const [streamOption, setStreamOption] = useState('Students can post and comment');

  return (
    <div className="max-w-screen-lg mx-auto p-6 space-y-8 text-sm text-gray-800">
      <h2 className="text-2xl font-semibold">Classroom Settings</h2>

      {/* Class Details */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center text-[#606060]">Class Details</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-base text-[#606060]">Class</label>
            <select
              value={classValue}
              onChange={(e) => setClassValue(e.target.value)}
              className="w-32 border bg-gray-100 rounded px-3 py-2"
            >
              {classOptions.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-base text-[#606060]">Section</label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-32 border bg-gray-100 rounded px-3 py-2"
            >
              {sectionOptions.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-base text-[#606060]">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-48 border bg-gray-100 rounded px-3 py-2"
            >
              {subjectOptions.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col relative">
          <label className="mb-1 font-semibold text-base text-[#606060]">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={100}
            className="border bg-gray-100 rounded p-2 h-20 resize-none"
            placeholder="Add a short Description"
          />
          <span className="absolute bottom-2 right-2 text-xs text-gray-500">
            {description.length}/100
          </span>
        </div>

        {/* Teachers */}
        <div className="flex">
          <label className="mr-5 font-semibold text-base mt-0.5 text-[#606060]">Teacher:</label>
          <div className="flex gap-2 flex-wrap">
            {teachers.map((teacher) => (
              <div
                key={teacher}
                className="flex items-center border-2 border-[#60606067]  bg-gray-50 px-3 py-1 rounded-sm gap-2"
              >
                <span>{teacher}</span>
                <button className="text-[#606060] text-sm">×</button>
              </div>
            ))}
            <button className="text-purple-600 text-xl font-bold">+</button>
          </div>
        </div>
      </div>

      {/* General Settings */}
      <div className="space-y-4">
        <h3 className="text-xl text-[#606060]  text-center font-semibold">General Settings</h3>

        {/* Invitation Codes */}
        <div className="space-y-2">
          <h1 className='text-lg mt-2 text-[#606060]  font-semibold'>Invitation Codes</h1>
          <div className="flex justify-between items-center">
            <div className='mt-5'>
              <label className="font-semibold text-base text-[#606060]">Manage invitation codes</label>
              <p className="text-sm text-[#606060]">
                Settings apply to both invitation links and class codes
              </p>
            </div>

            {isAdmin ? (
              <select className="text-sm font-medium text-[#702DFF] bg-transparent">
                <option>Turned on</option>
                <option>Turn Off</option>
                <option>Reset</option>
              </select>
            ) : (
              <div className="text-sm font-medium text-[#702DFF] flex items-center gap-1 cursor-default">
                Turned on
                <span className="text-xs">▼</span>
              </div>
            )}
          </div>

          <div className="space-y-3 mt-5">
            <div className='flex justify-between'>
              <label className="text-base font-semibold text-[#606060]">Invitation link</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  readOnly
                  className="text-[#606060] px-2 py-1 w-[360px] rounded text-sm truncate"
                  value="https://mentox.in/c/Neg7kMXtMNjiONDY4b7jc-4eZvDvb"
                />
                <button className="text-gray-500 hover:text-gray-700">
                  <Clipboard size={16} />
                </button>
              </div>
            </div>

            <div className='flex justify-between'>
              <label className="text-base font-semibold text-[#606060]">Class Code</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  readOnly
                  className="text-[#606060] px-2 py-1 w-[360px] rounded text-sm text-right"
                  value="reokgnfk"
                />
                <button className="text-gray-500 hover:text-gray-700">
                  <Clipboard size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stream Settings */}
        <div className="flex flex-col">
          <h1 className='text-xl text-[#606060] font-semibold'>Stream and Classwork</h1>
          <div className='flex justify-between items-center mt-5'>
            <label className="text-base text-[#606060] font-semibold">Stream</label>
            <select
              value={streamOption}
              onChange={(e) => isAdmin && setStreamOption(e.target.value)}
              disabled={!isAdmin}
              className={`w-80 border rounded px-4 py-2 ${isAdmin ? 'bg-gray-100' : 'bg-gray-50 text-gray-500 cursor-not-allowed'}`}
            >
              <option>Students can post and comment</option>
              <option>Only teachers can post and comment</option>
              <option>Students can only comment</option>
            </select>
          </div>
        </div>
      </div>

      {/* Marking */}
      <div className="space-y-4">
        <h3 className="text-xl text-center text-[#606060] font-semibold">Marking</h3>
        <h1 className="text-lg text-[#606060] font-semibold">Draft mark for missing assignments</h1>
        <p className="text-sm text-[#606060]">
          When a student hasn’t turned in their submission by the due date or you have marked
          the submission as missing, it will automatically receive a draft mark. Students
          won’t see this mark until you return it.
        </p>

        <div className="flex items-center justify-between">
          <label className="font-medium text-[#606060]">
            Automatically apply a draft mark to missing assignments
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={applyDraft}
              onChange={() => setApplyDraft(!applyDraft)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#702DFF] rounded-full peer dark:bg-gray-700 peer-checked:bg-[#702DFF] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" />
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-base text-[#606060]">Default Marks</label>
          <div className='border flex justify-between bg-gray-100 rounded px-2 w-50 py-1'>
            <input
              type="number"
              value={defaultMarks}
              onChange={(e) => setDefaultMarks(Number(e.target.value))}
              min={0}
              max={100}
              className="bg-gray-100 outline-none w-full"
            />
            <span className="text-base text-[#606060]">%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomSettings;
