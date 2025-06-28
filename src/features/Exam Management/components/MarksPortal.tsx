import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MarksPortal: React.FC = () => {
  const [session, setSession] = useState("");
   const navigate = useNavigate();
  const [examType, setExamType] = useState("");

  const handleSubmit = () => {
    if (!session ||  !examType) {
      alert("Please select all fields.");
      return;
    }
      navigate("/exam/teacher-assigned-marks", {
      state: {
        session,
        examType,
      },
    });
    
  };

  return (
    <div className="p-4 bg-[#F5F5F7] rounded-[0.65rem] w-full font-sans text-sm">
      <h2 className="text-[1.5rem] font-[600] mb-4">Marks Assigning Portal</h2>

      {/* Session Dropdown */}
      <div className="mb-4">
        <label className="block mb-1 font-[500] text-[1.13rem] text-[#606060]">
          Session<span className="text-red-500">*</span>
        </label>
        <select
          value={session}
          onChange={(e) => setSession(e.target.value)}
          className="w-full border border-[#606060] rounded font-[500] text-[1.13rem] px-3 py-2 text-[#606060] focus:outline-none"
        >
          <option value="">Select Academic Year</option>
          <option value="2022-2023">2022–2023</option>
          <option value="2023-2024">2023–2024</option>
          <option value="2024-2025">2024–2025</option>
        </select>
      </div>

      {/* Class Dropdown */}

      {/* Exam Type Dropdown */}
      <div className="mb-4">
        <label className="block mb-1 font-[500] text-[1.13rem] text-[#606060]">
          Exam Type<span className="text-red-500">*</span>
        </label>
        <select
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
          className="w-full border border-[#606060] rounded font-[500] text-[1.13rem] px-3 py-2 text-[#606060] focus:outline-none"
        >
          <option value="">Select Exam Type</option>
          <option value="midterm">Midterm</option>
          <option value="final">Final</option>
          <option value="unit-test">Unit Test</option>
        </select>
      </div>
      <div className="flex  justify-end items-center mb-16">
        
        {/* Submit Button */}
        <div className="w-[9rem] ">
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded w-full font-[400] text-[1rem] hover:opacity-90"
          >
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarksPortal;
