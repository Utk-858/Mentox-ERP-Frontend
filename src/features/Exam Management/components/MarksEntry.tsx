import React, { useState } from "react";

const MarksEntry: React.FC = () => {
  const [session, setSession] = useState("");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [examType, setExamType] = useState("");

  const handleSubmit = () => {
    if (!session || !className || !section || !subject || !examType) {
      alert("Please select all fields.");
      return;
    }

    console.log("Viewing analytics for:", {
      session,
      className,
      section,
      subject,
      examType,
    });
  };

  return (
    <div className="p-6 bg-[#F5F5F7] rounded-xl w-full font-sans text-sm mr-4">
      <h2 className="text-[1.25rem] font-[600] mb-4">Marks Entry and View</h2>

      <div className="flex flex-col gap-4 mb-6">
        {/* Session */}
        <div className="w-full">
          <label className="block mb-1 font-[500] text-[1.05rem] text-[#606060]">
            Session<span className="text-red-500">*</span>
          </label>
          <select
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="w-full border border-[#606060] font-[500] text-[1.05rem] rounded px-3 py-2 text-gray-700 focus:outline-none"
          >
            <option value="">Select Academic Year</option>
            <option value="2022-2023">2022–2023</option>
            <option value="2023-2024">2023–2024</option>
            <option value="2024-2025">2024–2025</option>
          </select>
        </div>

        {/* Class */}
        <div className="flex gap-4 w-full">
            <div className="w-full">
          <label className="block mb-1 font-[500] text-[1.05rem] text-[#606060]">
            Select Class<span className="text-red-500">*</span>
          </label>
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full border border-[#606060] font-[500] text-[1.05rem] rounded px-3 py-2 text-gray-700 focus:outline-none"
          >
            <option value="">Select Class</option>
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
          </select>
        </div>

        {/* Section */}
        <div className="w-full">
          <label className="block mb-1 font-[500] text-[1.05rem] text-[#606060]">
            Section
          </label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full border border-[#606060] font-[500] text-[1.05rem] rounded px-3 py-2 text-gray-700 focus:outline-none"
          >
            <option value="">Select Section</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
          </select>
        </div>
</div>
        {/* Subject */}
        <div className="w-full flex gap-4">
            <div className="w-full">
          <label className="block mb-1 font-[500] text-[1.05rem] text-[#606060]">
            Subject<span className="text-red-500">*</span>
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border border-[#606060] font-[500] text-[1.05rem] rounded px-3 py-2 text-gray-700 focus:outline-none"
          >
            <option value="">Subject</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
          </select>
        </div>

        {/* Exam Type */}
        <div className="w-full">
          <label className="block mb-1 font-[500] text-[1.05rem] text-[#606060]">
            Exam Type<span className="text-red-500">*</span>
          </label>
          <select
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            className="w-full border border-[#606060] font-[500] text-[1.05rem] rounded px-3 py-2 text-gray-700 focus:outline-none"
          >
            <option value="">Select Exam Type</option>
            <option value="Midterm">Midterm</option>
            <option value="Final">Final</option>
            <option value="Unit Test">Unit Test</option>
          </select>
        </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-5 py-2 rounded font-medium text-[0.95rem] hover:opacity-90"
        >
          View Analytics
        </button>
      </div>
    </div>
  );
};

export default MarksEntry;
