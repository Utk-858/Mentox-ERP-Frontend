import React, { useState } from 'react';
import SaturdayMorningSettings from './SaturdayMorningSettings';
import TimetableAssignment from './TimetableAssignment';

interface TimeTableProps {}

const TimeTable: React.FC<TimeTableProps> = () => {
  const [activeTab, setActiveTab] = useState("tickets");
  const [morningBreakEnabled1, setMorningBreakEnabled1] = useState(true);
  const [morningBreakEnabled2, setMorningBreakEnabled2] = useState(true);
  const [saturdayWorking1, setSaturdayWorking1] = useState(false);
  const [saturdayWorking2, setSaturdayWorking2] = useState(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [selectedDays1, setSelectedDays1] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  const [selectedDays2, setSelectedDays2] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);

  const toggleDay = (day: string, section: 1 | 2) => {
    if (section === 1) {
      setSelectedDays1(prev =>
        prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
      );
    } else {
      setSelectedDays2(prev =>
        prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Time Table</h1>

        <div className="flex bg-black rounded-md overflow-hidden w-fit p-1 mb-6">
          {["tickets", "chat"].map((tab) => (
            <button
              key={tab}
              className={`px-5 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
                activeTab === tab ? "bg-[#702DFF] text-white" : "bg-black text-white"
              }`}
              onClick={() => {
                setActiveTab(tab as any);
              }}
            >
              {tab === "tickets" ? "Configuration" : "Edit Time Table"}
            </button>
          ))}
        </div>

        {/* Two Column Layout */}

        {
          activeTab === "tickets" &&
          <>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - General Settings */}
          <div className="flex-1 space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">General Settings (Class 1-2)</h2>

              {/* Working Days */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Working Days</label>
                <div className="flex flex-wrap gap-2">
                  {days.map(day => (
                    <button
                      key={day}
                      onClick={() => toggleDay(day, 1)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        selectedDays1.includes(day)
                          ? 'bg-[#702DFF] text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shift System */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Shift System</label>
                <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm font-medium">
                  Single
                </button>
              </div>

              {/* Period Duration, Saturday Periods, Lunch Break */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Period Duration</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option>40 Minutes</option>
                    <option>45 Minutes</option>
                    <option>50 Minutes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">No. of Periods on Saturday</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option>5 Periods</option>
                    <option>6 Periods</option>
                    <option>7 Periods</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lunch Break Duration</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option>40 Minutes</option>
                    <option>45 Minutes</option>
                    <option>60 Minutes</option>
                  </select>
                </div>
              </div>

              {/* Lunch Break Timing */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lunch Break Start</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option>7:00 AM</option>
                    <option>12:00 PM</option>
                    <option>1:00 PM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lunch Break End</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option>12:30 PM</option>
                    <option>1:00 PM</option>
                    <option>1:30 PM</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - School Timings and Morning Break */}
          <div className="w-full max-w-sm space-y-8">
            {/* School Timings */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">School Timings</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Summer Start Time</label>
                  <input
                    type="time"
                    defaultValue="07:00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Summer End Time</label>
                  <input
                    type="time"
                    defaultValue="14:30"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Winter Start Time</label>
                  <input
                    type="time"
                    defaultValue="07:00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Winter End Time</label>
                  <input
                    type="time"
                    defaultValue="14:30"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
       <div className="flex flex-col lg:flex-row gap-8 mt-10">
          {/* Left Column - General Settings */}
          <div className="flex-1 space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">General Settings (Class 1-2)</h2>

              {/* Working Days */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Working Days</label>
                <div className="flex flex-wrap gap-2">
                  {days.map(day => (
                    <button
                      key={day}
                      onClick={() => toggleDay(day, 1)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        selectedDays1.includes(day)
                          ? 'bg-[#702DFF] text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shift System */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Shift System</label>
                <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm font-medium">
                  Single
                </button>
              </div>

              {/* Period Duration, Saturday Periods, Lunch Break */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Period Duration</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option>40 Minutes</option>
                    <option>45 Minutes</option>
                    <option>50 Minutes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">No. of Periods on Saturday</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option>5 Periods</option>
                    <option>6 Periods</option>
                    <option>7 Periods</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lunch Break Duration</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option>40 Minutes</option>
                    <option>45 Minutes</option>
                    <option>60 Minutes</option>
                  </select>
                </div>
              </div>

              {/* Lunch Break Timing */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lunch Break Start</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option>7:00 AM</option>
                    <option>12:00 PM</option>
                    <option>1:00 PM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lunch Break End</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option>12:30 PM</option>
                    <option>1:00 PM</option>
                    <option>1:30 PM</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - School Timings and Morning Break */}
          <div className="w-full max-w-sm space-y-8">
            {/* School Timings */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">School Timings</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Summer Start Time</label>
                  <input
                    type="time"
                    defaultValue="07:00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Summer End Time</label>
                  <input
                    type="time"
                    defaultValue="14:30"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Winter Start Time</label>
                  <input
                    type="time"
                    defaultValue="07:00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Winter End Time</label>
                  <input
                    type="time"
                    defaultValue="14:30"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
        }
 

{activeTab === "chat" && <TimetableAssignment />}
      </div>
    </div>
  );
};

export default TimeTable;
