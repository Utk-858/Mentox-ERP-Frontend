import React, { useState } from "react";
import Sidebar from "@/components/SidebarTeacher";
import SearchBar from "@/components/SearchBar";

const ClassShift: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState("STU1002 Hemish Morgan");
  const [newClass, setNewClass] = useState("6");
  const [newSection, setNewSection] = useState("B");
  const [reason, setReason] = useState("");

  return (
    <div className="flex w-full max-w-screen relative bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4 md:p-10">
        {/* Search Bar */}
        <div className="flex justify-center z-10 mt-2 mb-6">
          <SearchBar />
        </div>

        {/* Title */}
        <h1 className="text-xl md:text-3xl font-semibold mt-5 mb-1 px-5">Class Shift</h1>
        <p className="text-base text-gray-500 mb-6  px-5">
          Shift one or more students to a new class and section.
        </p>

        {/* Card */}
        <div className="px-5 rounded-lg  max-w-screen ">
          {/* Top Fields: Student, Arrow, Class & Section */}
          <div className="mb-6 flex flex-wrap gap-6 items-end">
            {/* Student Select */}
            <div className="flex flex-col w-full md:w-1/3">
              <label className="block text-sm font-medium mb-2" htmlFor="student-select">
                Select Student(s)
              </label>
              <select
                id="student-select"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full bg-[#D2D2D233] border border-[#606060] rounded-md px-4 py-2 text-sm"
                title="Select student"
              >
                <option value="STU1002 Hemish Morgan">STU1002 Hemish Morgan</option>
                {/* Add more students here */}
              </select>
            </div>

            {/* Arrow Icon */}
            <div className="hidden md:flex w-[290px] text-6xl text-gray-500 items-center justify-center">
              →
            </div>

            {/* New Class */}
            <div className="flex flex-col w-1/2 md:w-1/6">
              <label className="block text-sm font-medium mb-2" htmlFor="class-select">
                New Class<span className="text-red-500">*</span>
              </label>
              <select
                id="class-select"
                value={newClass}
                onChange={(e) => setNewClass(e.target.value)}
                className="bg-[#D2D2D233] border border-[#606060] rounded-md px-4 py-2 text-sm"
                title="Select new class"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* New Section */}
            <div className="flex flex-col w-1/2 md:w-1/6">
              <label className="block text-sm font-medium mb-2" htmlFor="section-select">
                New Section<span className="text-red-500">*</span>
              </label>
              <select
                id="section-select"
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
                className="bg-[#D2D2D233] border border-[#606060] rounded-md px-4 py-2 text-sm "
                title="Select new section"
              >
                {["A", "B", "C", "D"].map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reason Textarea */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="reason-textarea">
              Reason for shift
            </label>
            <textarea
              id="reason-textarea"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="E.g., Change of Subjects, Parent request, etc."
              className="w-full bg-[#D2D2D233] border border-[#606060] rounded-md px-4 py-3 text-sm min-h-[120px] placeholder-gray-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button className="px-5 py-2.5 text-sm rounded-sm bg-black text-white hover:bg-gray-800">
              Cancel
            </button>
            <button className="px-5 py-2.5 text-sm rounded-sm bg-[#702DFF] text-white hover:bg-[#5e21cc]">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassShift;
