// components/TimetableAssignment.tsx
import React from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const periods = [
  { label: "Period 1", time: "7:00AM - 7:40AM" },
  { label: "Period 2", time: "7:50AM - 8:30AM" },
  { label: "Period 3", time: "8:40AM - 9:20AM" },
  { label: "Period 4", time: "9:20AM - 10:00AM" },
  { label: "Period 5", time: "10:00AM - 10:40AM" },
  { label: "Period 6", time: "10:50AM - 11:30AM" },
];

const TimetableAssignment: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Timetable Assignment</h2>

      {/* Class & Section Select */}
      <div className="flex justify-end gap-4 mb-4">
        <select className="border border-gray-300 rounded px-4 py-2 text-sm">
          <option disabled selected>Select Class</option>
          <option>Class 1</option>
          <option>Class 2</option>
          <option>Class 3</option>
        </select>
        <select className="border border-gray-300 rounded px-4 py-2 text-sm">
          <option disabled selected>Select Section</option>
          <option>Section A</option>
          <option>Section B</option>
          <option>Section C</option>
        </select>
      </div>

      {/* Header Row */}
      <div className="grid grid-cols-[100px_repeat(6,1fr)] gap-2 bg-gray-100 py-3 px-2 rounded-t-md">
        <div className="text-sm font-medium text-gray-600">Day/Period</div>
        {periods.map((p) => (
          <div key={p.label} className="text-sm font-medium text-center text-indigo-700">
            {p.label} <br />
            <span className="text-xs text-gray-500">{p.time}</span>
          </div>
        ))}
      </div>

      {/* Rows for each day */}
      {days.map((day) => (
        <div key={day} className="grid grid-cols-[100px_repeat(6,1fr)] gap-2 py-2 border-b items-start">
          <div className="pt-3 font-medium text-sm text-gray-800">
            {day}
            {day === "Saturday" && <div className="text-xs text-gray-500">Full Day</div>}
          </div>
          {periods.map((p, i) => (
            <div
              key={`${day}-${p.label}`}
              className="flex flex-col items-center border border-gray-300 rounded px-2 py-2 min-h-[60px] bg-white"
            >
              {p.label === "Period 4" ? (
                <div className="text-gray-500 text-xs flex flex-col items-center">
                  <span>🍱 Lunch Break</span>
                </div>
              ) : (
                <>
                  <select className="text-sm border border-gray-300 rounded w-full px-2 py-1 mb-1">
                    <option>Select Subject</option>
                    <option>Math</option>
                    <option>Science</option>
                    <option>English</option>
                  </select>
                  <div className="text-xs text-gray-500">Subject Teacher</div>
                </>
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Next Button */}
      <div className="flex justify-end mt-6">
        <button className="bg-[#702DFF] hover:bg-[#5a23cc] text-white font-semibold px-6 py-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default TimetableAssignment;
