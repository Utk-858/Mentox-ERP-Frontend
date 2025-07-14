import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";

interface AssignItem {
  className: string;
  subjectCount: number;
  sections: number;
}

interface AssignPopupProps {
  isOpen: boolean;
  onClose: () => void;
  academicYear: string;
  examType: string;
  selectedRow: AssignItem | null;
}

/* ----- static data ----- */
const sampleSubjects = ["Mathematics", "Science", "English", "History", "Geography"];
const teachers = ["Sunil Panday", "Himanshu Sharma", "Rishabh Shrivastava", "Anita Mehra"];
const sections = ["Section-A", "Section-B", "Section-C"];

const AssignPopup: React.FC<AssignPopupProps> = ({
  isOpen,
  onClose,
  academicYear,
  examType,
  selectedRow,
}) => {
  /* ---------- step control ---------- */
  const [sectionIndex, setSectionIndex] = useState(0);
  const selectedSection = sections[sectionIndex];

  /* ---------- assignments: section ➜ { subject ➜ teacher } ---------- */
  const [assignments, setAssignments] = useState<{
    [section: string]: { [subject: string]: string };
  }>(() => {
    const init: { [section: string]: { [subject: string]: string } } = {};
    sections.forEach((sec) => {
      init[sec] = {};
      sampleSubjects.forEach((subj) => {
        init[sec][subj] = teachers[0]; // default teacher
      });
    });
    return init;
  });

  /* reset to Section-A each time popup opens */
  useEffect(() => {
    if (isOpen) setSectionIndex(0);
  }, [isOpen]);

  /* ---------- handlers ---------- */
  const handleTeacherChange = (subject: string, teacher: string) => {
    setAssignments((prev) => ({
      ...prev,
      [selectedSection]: {
        ...prev[selectedSection],
        [subject]: teacher,
      },
    }));
  };

  const handleNext = () => setSectionIndex((idx) => idx + 1);

  const handleSave = () => {
    console.log("All assignments:", assignments);
    onClose();
  };

  /* ---------- guard ---------- */
  if (!isOpen || !selectedRow) return null;

  /* ---------- UI ---------- */
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#F5F5F7] rounded-2xl p-6 w-[480px] max-w-full shadow-xl relative">
        {/* header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[1.5rem] font-[600]">Subject–Section</h2>
            <p className="text-[0.9rem] font-[400] text-[#606060]">
              View and Assign Subject Teachers
            </p>
          </div>

          {/* read-only section pill with filter icon for aesthetics */}
          <div className="relative">
            <span className="border rounded-md px-3 py-1 bg-black text-white flex items-center gap-1">
              <FaFilter className="text-gray-300" /> {selectedSection}
            </span>
          </div>
        </div>

        {/* info grid */}
        <div className="grid grid-cols-2 text-[1.1rem] gap-y-2 mb-4">
          <p>
            <span className="font-semibold">Academic Year :</span> {academicYear}
          </p>
          <p>
            <span className="font-semibold">Class :</span> {selectedRow.className}
          </p>
          <p>
            <span className="font-semibold">Section :</span> {selectedSection.split("-")[1]}
          </p>
          <p>
            <span className="font-semibold">Exam Name :</span> {examType}
          </p>
        </div>

        {/* subject-teacher table */}
        <div>
          <div className="grid grid-cols-2 text-[#616188] text-[1rem] font-[600] mb-2 border-b border-[#E7E8EE] p-3">
            <span>Subject</span>
            <span>Teacher</span>
          </div>

          {sampleSubjects.map((subject) => (
            <div
              key={subject}
              className="grid grid-cols-2 gap-4 items-center mb-3 bg-white p-2 rounded-[0.25rem]"
            >
              <div className="text-[1rem] font-[500] text-[#363636]">{subject}</div>
              <select
                className="w-full border border-[#606060] px-2 py-1 rounded-[0.15rem] font-[500] bg-[#D2D2D233] text-[#00000080] text-[0.9rem]"
                value={assignments[selectedSection][subject]}
                onChange={(e) => handleTeacherChange(subject, e.target.value)}
              >
                {teachers.map((teacher) => (
                  <option key={teacher} value={teacher}>
                    {teacher}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* action button */}
        <div className="text-right mt-6">
          {sectionIndex < sections.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-[#702DFF] text-white px-6 py-2 rounded-md text-sm"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-[#702DFF] text-white px-6 py-2 rounded-md text-sm"
            >
              Save
            </button>
          )}
        </div>

        {/* close “×” */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-xl font-bold text-gray-400"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default AssignPopup;
