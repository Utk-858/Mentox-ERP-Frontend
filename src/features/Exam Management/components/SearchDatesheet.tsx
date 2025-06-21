import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchDatesheet: React.FC = () => {
  const [session, setSession] = useState("");
  const [examType, setExamType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!session || !examType) {
      alert("Please select both Session and Exam Type.");
      return;
    }

    // Navigate to Analytics page with query parameters
    navigate(`/exam/datesheet?session=${session}&examType=${examType}`);
  };

  return (
    <div className="p-4 bg-[#F5F5F7] rounded-[0.65rem] w-full font-sans text-sm">
      <h2 className="text-[1.5rem] font-[600] mb-4">Search Datesheet</h2>
      <div className="flex justify-between gap-2">
        <div className="mb-4 w-full">
          <label className="block mb-1 font-[500] text-[1.13rem] text-[#606060]">
            Session<span className="text-red-500">*</span>
          </label>
          <select
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="w-full border border-[#606060] rounded font-[500] text-[1.13rem] px-3 py-2 text-[#606060]"
          >
            <option value="">Select Academic Year</option>
            <option value="2022-2023">2022–2023</option>
            <option value="2023-2024">2023–2024</option>
            <option value="2024-2025">2024–2025</option>
          </select>
        </div>

        <div className="mb-4 w-full">
          <label className="block mb-1 font-[500] text-[1.13rem] text-[#606060]">
            Exam Type<span className="text-red-500">*</span>
          </label>
          <select
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            className="w-full border border-[#606060] rounded font-[500] text-[1.13rem] px-3 py-2 text-[#606060]"
          >
            <option value="">Select Exam Type</option>
            <option value="midterm">Midterm</option>
            <option value="final">Final</option>
            <option value="unit-test">Unit Test</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2 rounded w-fit font-[400] text-[1rem] hover:opacity-90"
        >
          View Analytics
        </button>
      </div>
    </div>
  );
};

export default SearchDatesheet;
