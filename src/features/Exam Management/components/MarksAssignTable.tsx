import React, { useState } from "react";
import AssignPopup from "./AssignPopup"; // 👈 Import the modal

interface AssignItem {
  className: string;
  subjectCount: number;
  sections: number;
}

interface MarksAssignTableProps {
  academicYear: string;
  examType: string;
  rows: AssignItem[];
  onAssign?: (item: AssignItem) => void;
}

const MarksAssignTable: React.FC<MarksAssignTableProps> = ({
  academicYear,
  examType,
  rows,
  onAssign,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<AssignItem | null>(null);

  const handleAssignClick = (item: AssignItem) => {
    setSelectedRow(item);
    setModalOpen(true);
    if (onAssign) onAssign(item);
  };

  return (
    <div className="bg-[#F5F5F7] p-4 rounded-xl mt-4 mr-4 relative">
      <p className="text-[1.5rem] font-[600] mb-1">Assign</p>
      <p className="text-[0.9rem] font-[400] text-[#363636] mb-4">Here you will Find All the classes</p>

      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 bg-[#F5F5F5] text-[1rem] font-[600] text-[#616188] px-4 py-3 rounded-md">
        <div>Academic Year</div>
        <div>Exam Type</div>
        <div>Class</div>
        <div>Subject Count</div>
        <div>Sections</div>
        <div>Action</div>
      </div>

      {/* Table Rows */}
      <div className="mt-2 space-y-3">
        {rows.length > 0 ? (
          rows.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-6 gap-4 bg-white p-3 rounded-md shadow-sm text-[0.9rem] font-[400]"
            >
              <div>{academicYear}</div>
              <div>{examType}</div>
              <div>{item.className}</div>
              <div>{item.subjectCount}</div>
              <div>{item.sections}</div>
              <div>
                <button
                  onClick={() => handleAssignClick(item)}
                  className="bg-[#702DFF] text-white px-4 py-1 rounded-[0.2rem] cursor-pointer"
                >
                  Assign
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">No classes available.</div>
        )}
      </div>

      {/* Modal Integration */}
      <AssignPopup
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        academicYear={academicYear}
        examType={examType}
        selectedRow={selectedRow}
      />
    </div>
  );
};

export default MarksAssignTable;
