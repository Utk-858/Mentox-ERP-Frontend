import React, { useState } from "react";
// adjust path if needed
import RequestPermissionModal from "./RequestPermissionModal";

export interface StudentMarks {
  rollNumber: number;
  name: string;
  marks: number;
  grade: string;
  remarks: string;
}

interface MarksEntryProps {
  showAverage: boolean;
  students: StudentMarks[];
  onSaveDraft: (data: StudentMarks[]) => void;
  onSubmit: (data: StudentMarks[]) => void;
  onCsvUpload: () => void;
}

const MarksEntryComponent: React.FC<MarksEntryProps> = ({
  showAverage,
  students,
  onSaveDraft,
  onSubmit,
  onCsvUpload,
}) => {
  const [data, setData] = useState<StudentMarks[]>(students);
  const [maxMarks, setMaxMarks] = useState<number>(100);
  const [defaultMarks, setDefaultMarks] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleChange = <T extends keyof StudentMarks>(
    index: number,
    field: T,
    value: StudentMarks[T]
  ) => {
    const updated = [...data];
    updated[index][field] = value;
    setData(updated);
  };

  const classAvg = Math.round(data.reduce((acc, s) => acc + s.marks, 0) / data.length || 0);
  const percentage = Math.round((classAvg / maxMarks) * 100);

  const handleSaveDraft = () => {
    onSaveDraft(data);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    onSubmit(data);
  };

  return (
    <div className="p-6 font-sans bg-white rounded-xl w-full">
      <h2 className="text-[2rem] font-[600] mb-4">Exam Management</h2>

      {/* Top Controls */}
      <div className="flex flex-wrap justify-between text-[#606060] text-[1.25rem] font-[500] items-center gap-4 bg-[#F5F5F7] px-4 py-2 rounded-[0.4rem] mb-4">
        <label className="flex items-center gap-2">
          Maximum Marks:
          <input
            type="number"
            value={maxMarks}
            onChange={(e) => setMaxMarks(Number(e.target.value))}
            className="border px-2 py-1 w-40 rounded border-[#606060]"
            disabled={isSubmitted}
          />
        </label>
        <label className="flex items-center gap-2">
          Default Marks:
          <input
            type="number"
            value={defaultMarks}
            onChange={(e) => setDefaultMarks(Number(e.target.value))}
            className="border px-2 py-1 w-40 rounded border-[#606060]"
            disabled={isSubmitted}
          />
          %
        </label>
        <label className="flex items-center gap-2">
          Show Avg. marks:
          <input
            type="checkbox"
            checked={showAverage}
            readOnly
            className="accent-black"
          />
        </label>
      </div>

      {/* Marks Entry Header */}
      <div className="w-full bg-[#F5F5F7] p-4 rounded-[0.8rem]">
        <div className="flex justify-between items-center mb-2">
          <div className="flex flex-col">
            <h3 className="text-[1.5rem] font-[600]">Marks Entry</h3>
            <p className="text-[0.8rem] font-[400] text-[#363636] mb-4">
              Datesheet Made till now
            </p>
          </div>
          {isSubmitted ? (
            <div className="flex gap-4 items-center">
              <span
                onClick={() => setShowPopup(true)}
                className="text-[#702DFF] text-sm font-medium underline cursor-pointer"
              >
                Request Permission from Admin
              </span>
              <button
                className="bg-[#702DFF] text-white px-4 py-2 rounded text-sm font-semibold"
              >
                Download PDF
              </button>
            </div>
          ) : (
            <button
              onClick={onCsvUpload}
              className="bg-[#702DFF] text-white px-4 py-2 rounded text-sm font-semibold"
            >
              Upload from CSV
            </button>
          )}
        </div>

        {/* Table */}
        {/* Table with scroll for >10 rows */}
<div className="overflow-x-auto ">
  <div className="max-h-[500px] overflow-y-auto">
    <table className="w-full table-fixed border-separate border-spacing-y-2 text-sm text-left ">
      <thead className="bg-gray-100 sticky top-0 z-10 px-4">
        <tr>
          <th className="p-2 w-[15%] bg-gray-100">Roll Number</th>
          <th className="p-2 w-[15%] bg-gray-100">Student Name</th>
          <th className="p-2 w-[15%] bg-gray-100">
            Marks<span className="text-[#FE0707]">*</span>
          </th>
          
          <th className="p-2 w-[25%] bg-gray-100">Remarks</th>
        </tr>
      </thead>
      <tbody>
        {data.map((student, index) => (
          <tr
            key={student.rollNumber}
            className="bg-white rounded-[2rem] text-[0.9rem] font-[400]"
          >
            <td className="p-2">{student.rollNumber}</td>
            <td className="p-2">{student.name}</td>
            <td className="p-2">
              <input
                type="number"
                className="border border-[#606060] bg-[#D2D2D233] rounded px-2 py-1 w-20"
                value={student.marks}
                disabled={isSubmitted}
                onChange={(e) =>
                  handleChange(index, "marks", parseInt(e.target.value) || 0)
                }
              />
            </td>
           
            <td className="p-2">
              <input
                type="text"
                className="border border-[#606060] bg-[#D2D2D233] rounded px-2 py-1 w-full text-black"
                placeholder="Enter the Remarks"
                value={student.remarks}
                disabled={isSubmitted}
                onChange={(e) => handleChange(index, "remarks", e.target.value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

        {/* Footer */}
        <div className="flex justify-between">
          <div className="mt-4 text-[1rem] font-[500] text-[#606060]">
            Total Students: {data.length} &nbsp; &nbsp; Class Average: {classAvg}{" "}
            &nbsp; &nbsp; Class Average Percentage: {percentage}%
          </div>
          <div className="mt-4 flex justify-end gap-4">
            {isSubmitted ? (
              <button
                className="bg-[#702DFF] text-white px-6 py-2 rounded font-semibold"
                onClick={() => alert("Back button clicked")}
              >
                Back
              </button>
            ) : (
              <>
                <button
                  onClick={handleSaveDraft}
                  className="bg-[#696969] text-white px-6 py-2 rounded font-semibold"
                >
                  Save Draft
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-[#702DFF] text-white px-6 py-2 rounded font-semibold"
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <RequestPermissionModal
          onClose={() => {
            setShowPopup(false);
            setIsSubmitted(false); // Enable editing again
          }}
        />
      )}
    </div>
  );
};

export default MarksEntryComponent;
