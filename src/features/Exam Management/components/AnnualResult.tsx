import React, { useState } from "react";
import AnnualResultModal from "./AnnualResultModal"; // adjust path if needed

const AnnualResult: React.FC = () => {
  const [session, setSession] = useState("");
  const [className, setClassName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    if (!session || !className) {
      alert("Please select all fields.");
      return;
    }

    console.log("Viewing result for:", { session, className });
    setShowModal(true); // Show modal
  };

  return (
    <>
      <div className="p-6 bg-[#F5F5F7] rounded-xl w-full font-sans text-sm max-w-xl border">
        <h2 className="text-[1.5rem] font-[600] mb-4">Exam Annual Result</h2>

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

          {/* Class Dropdown */}
          <div className="w-full">
            <label className="block font-[500] text-[1.05rem] mb-1 text-[#606060]">
              Class<span className="text-red-500">*</span>
            </label>
            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full border font-[500] text-[1.05rem] rounded px-3 py-2 focus:outline-none text-[#606060] border-[#606060]"
            >
              <option value="">Enter Class</option>
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
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

      {/* Modal */}
      {showModal && <AnnualResultModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default AnnualResult;
