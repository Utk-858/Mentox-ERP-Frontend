import React, { useState } from "react";
import StudentModal from "./StudentModal"; // Update path if needed

const AnnualResult: React.FC = () => {
  const [session, setSession] = useState("");
  const [className, setClassName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    if (!session || !className) {
      alert("Please select all fields.");
      return;
    }

    console.log("Viewing result for:", { session, className });
    setIsModalOpen(true);
  };

  const student = {
    rollNo: 123,
    name: "Garvit Jain",
    className: "10",
    profilePic: "/profile.jpg",
    cumulativeScore: "370/500",
    grade: "B+",
  };

  return (
    <>
      <div className="p-6 bg-[#F5F5F7] rounded-xl w-full font-sans text-sm max-w-xl border">
        <h2 className="text-[1.5rem] font-[600] mb-4">View Exam-Wise Result</h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          {/* Session Dropdown */}
          <div className="w-full">
            <label className="block font-[500] text-[1.05rem] mb-1 text-[#606060]">
              Session<span className="text-red-500">*</span>
            </label>
            <select
              value={session}
              onChange={(e) => setSession(e.target.value)}
              className="w-full border font-[500] text-[1.05rem] rounded px-3 py-2 focus:outline-none text-[#606060] border-[#606060]"
            >
              <option value="">Select Academic Year</option>
              <option value="2022-2023">2022–2023</option>
              <option value="2023-2024">2023–2024</option>
              <option value="2024-2025">2024–2025</option>
            </select>
          </div>

          {/* Exam Type Dropdown */}
          <div className="w-full">
            <label className="block font-[500] text-[1.05rem] mb-1 text-[#606060]">
              Exam Type<span className="text-red-500">*</span>
            </label>
            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full border font-[500] text-[1.05rem] rounded px-3 py-2 focus:outline-none text-[#606060] border-[#606060]"
            >
              <option value="">Select Exam Type</option>
              <option value="Mid-Term Examination">Mid-Term Examination</option>
              <option value="End-Term Examination">End-Term Examination</option>
              <option value="Unit Test 1">Unit Test 1</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-5 py-2 rounded hover:opacity-90"
          >
            View Result
          </button>
        </div>
      </div>

      {/* Modal Integration */}
      {isModalOpen && (
        <StudentModal student={student} onClose={() => setIsModalOpen(false)} showStudentInfo={true}
  academicYear="2024–25" />
      )}
    </>
  );
};

export default AnnualResult;
