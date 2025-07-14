import React, { useState } from "react";
import AssignPopup from "../components/AssignModal"; // adjust path

interface SubjectRow {
  academicYear: string;
  classNum: number;
  classSections: number;
  subjectCount: number;
  status: "Not Started" | "Complete";
  showView: boolean;
  isEditing: boolean;
}

const SubjectAssign: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Not Started" | "Complete">("All");
  const [rows, setRows] = useState<SubjectRow[]>(
    Array.from({ length: 10 }, (_, idx) => ({
      academicYear: "2024–25",
      classNum: idx + 1,
      classSections: 3,
      subjectCount: 5,
      status: idx === 2 ? "Complete" : "Not Started",
      showView: idx === 2,
      isEditing: idx === 2,
    }))
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [viewOnly, setViewOnly] = useState(false);

  const filteredRows = rows.filter((row) => {
    const matchesSearch = row.classNum.toString().includes(searchQuery.trim());
    const matchesStatus = statusFilter === "All" ? true : row.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openModal = (index: number, readOnly = false) => {
    setSelectedRowIndex(index);
    setViewOnly(readOnly);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRowIndex(null);
    setViewOnly(false);
  };

  const handleAssignComplete = () => {
    if (selectedRowIndex !== null) {
      setRows((prev) =>
        prev.map((row, idx) =>
          idx === selectedRowIndex ? { ...row, status: "Complete", showView: true, isEditing: true } : row
        )
      );
      handleModalClose();
    }
  };

  return (
    <div className="p-4 bg-[#F5F5F7] rounded-lg shadow mr-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[1.5rem] font-[600]">Subjects and Teachers</h2>
          <p className="text-[0.9rem] font-[400] text-[#363636]">Subject assigning Portal</p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search Class..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-md border w-[280px] bg-black text-white text-sm"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "All" | "Not Started" | "Complete")}
            className="bg-black text-white px-4 py-2 rounded text-sm"
          >
            <option value="All">All Status</option>
            <option value="Not Started">Not Started</option>
            <option value="Complete">Completed</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-[490px] overflow-y-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead className="bg-gray-100 text-[#616188] text-[1rem] font-[600] sticky top-0 z-10">
              <tr>
                <th className="p-2">Academic Year</th>
                <th className="p-2">Class</th>
                <th className="p-2">Class Sections</th>
                <th className="p-2">Subject Count</th>
                <th className="p-2">Assign Status</th>
                <th className="p-2 ">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, idx) => {
                const actualIndex = rows.findIndex(r => r.classNum === row.classNum);
                return (
                  <tr key={idx} className="bg-white text-[0.9rem] font-[400]">
                    <td className="p-2 rounded-l-lg">{row.academicYear}</td>
                    <td className="p-2">{row.classNum}</td>
                    <td className="p-2">{row.classSections}</td>
                    <td className="p-2">{row.subjectCount}</td>
                    <td className="p-2 ">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold  ${
                          row.status === "Complete"
                            ? "bg-[#22C55E] text-white"
                            : "bg-[#606060] text-white"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="p-2 rounded-r-lg flex items-center gap-2 ">
                      {row.showView && (
                        <span
                          className="text-[#702DFF] font-medium hover:underline cursor-pointer"
                          onClick={() => openModal(actualIndex, true)}
                        >
                          View
                        </span>
                      )}
                      <button
                        className={`${
                          row.isEditing ? "bg-black  text-white" : "bg-[#702DFF] text-white"
                        } text-sm px-4 py-1 rounded font-semibold`}
                        onClick={() => openModal(actualIndex, false)}
                      >
                        {row.isEditing ? "Edit" : "Assign"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Integration */}
      <AssignPopup
        isOpen={isModalOpen}
        onClose={handleModalClose}
        academicYear="2024–25"
        examType="Half Yearly"
        selectedRow={
          selectedRowIndex !== null
            ? {
                className: `Class ${rows[selectedRowIndex].classNum}`,
                subjectCount: rows[selectedRowIndex].subjectCount,
                sections: rows[selectedRowIndex].classSections,
              }
            : null
        }
        onSave={!viewOnly ? handleAssignComplete : undefined}
        readOnly={viewOnly}
      />
    </div>
  );
};

export default SubjectAssign;