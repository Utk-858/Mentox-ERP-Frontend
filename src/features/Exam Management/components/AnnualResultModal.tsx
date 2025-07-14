// components/AnnualResultModal.tsx
import React from "react";

interface Props {
  onClose: () => void;
}

const AnnualResultModal: React.FC<Props> = ({ onClose }) => {
  const subjects = [
    { name: "Mathematics", theory: 40, practical: 35, total: 75, max: 100, grade: "A+" },
    { name: "Science", theory: 45, practical: 25, total: 70, max: 100, grade: "B" },
    { name: "Social Science", theory: 59, practical: 31, total: 90, max: 100, grade: "A+" },
    { name: "Hindi", theory: 49, practical: 21, total: 70, max: 100, grade: "B" },
    { name: "English", theory: 54, practical: 16, total: 70, max: 100, grade: "B" },
  ];

  const totalMarks = subjects.reduce((acc, subj) => acc + subj.total, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
      <div className="bg-[#F5F5F7] rounded-lg w-[95%] max-w-4xl p-6 shadow-xl font-sans">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-[2rem] font-[600] text-[#606060]">Result</h2>
            <p className="text-[1rem] font-[400] text-[#60606099]">Annual Result</p>
          </div>
          <button
            onClick={onClose}
            className="text-3xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Student Info */}
        <div className="flex justify-between gap-2 text-[1.25rem] mb-6">
          <div><span className="font-[600]">Name:</span> Alex Johnson</div>
          <div><span className="font-semibold">Roll No.:</span> 23</div>
          <div><span className="font-semibold">Class:</span> 11-B</div>
          <div><span className="font-semibold">Academic Year:</span> 2024–25</div>
        </div>

        {/* Subject Table */}
        <div className="overflow-auto">
          <table className="w-full text-left border-separate border-spacing-y-2 text-sm">
            <thead className="text-[#606060] text-[1.15rem] font-[700] bg-white py-2 rounded-[0.7rem]">
              <tr>
                <th className="p-2 rounded-l-[0.7rem]">Subject Name</th>
                <th className="p-2">Theory marks(60%)</th>
                <th className="p-2">Practical marks(40%)</th>
                <th className="p-2">Total marks</th>
                <th className="p-2">Max. Marks</th>
                <th className="p-2 rounded-r-[0.7rem]">Grade</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subj, idx) => (
                <tr
                  key={idx}
                  className="bg-white rounded-[0.7rem] text-[#606060CC] text-[1rem] font-[500]"
                >
                  <td className="py-3 px-2 rounded-l-[0.7rem]">{subj.name}</td>
                  <td className="py-3 px-2">{subj.theory}</td>
                  <td className="py-3 px-2">{subj.practical}</td>
                  <td className="py-3 px-2">{subj.total}</td>
                  <td className="py-3 px-2">{subj.max}</td>
                  <td className="py-3 px-2 rounded-r-[0.7rem]">{subj.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Remarks and Total */}
       <div className="flex justify-between items-center mt-4 bg-white p-4 rounded-[0.8rem] text-[#606060CC] text-[1rem] font-medium">
  {/* Remarks */}
  <div>
    <strong className="">Remarks:</strong> Excellent
  </div>

  {/* Total Marks and Grade */}
  <div className="flex gap-6 items-center">
    <div className="flex items-center gap-2">
      <strong className="">Total Marks:</strong>
      <span>{totalMarks}</span>
      <span>/ 500</span>
    </div>
    <div className="flex items-center gap-2">
      <strong >Grade:</strong>
      <span>A</span>
    </div>
  </div>
</div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
          <p>❓ Need help with your result? <a href="#" className="text-[#702DFF] underline">Contact Support</a></p>
          <button className="bg-[#702DFF] text-white px-4 py-2 rounded hover:opacity-90 text-sm font-semibold">
            Download Result
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnualResultModal;