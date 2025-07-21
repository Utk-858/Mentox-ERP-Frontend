import React, { useState, useEffect } from "react";
import axiosInstance from "@/api/axios";
import SubjectModal from "./SubjectModal";

interface SubjectEntry {
  name: string;
  type: string;
}

interface SubjectRow {
  year: number;
  class: number;
  strength: number;
  subjectCount?: number;
  sections: number;
  subjects?: SubjectEntry[];
}

const CreateSubjectsDatabase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [readOnlyMode, setReadOnlyMode] = useState(false);
  const [rows, setRows] = useState<SubjectRow[]>([]);

  // ✅ Fetch data from backend
  const fetchRows = async () => {
    try {
      const res = await axiosInstance.get("/subjects-db");
      setRows(res.data); // assume data is an array of SubjectRow
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const filtered = rows.filter((item) =>
    item.class.toString().includes(searchQuery)
  );

  const handleOpenModal = (classNum: number, readOnly: boolean) => {
    setSelectedClass(classNum);
    setReadOnlyMode(readOnly);
    setShowModal(true);
  };

  const handleSaveSubjects = async (classNum: number, subjects: SubjectEntry[]) => {
    try {
      const updatedRow = rows.find((item) => item.class === classNum);
      if (!updatedRow) return;

      const updatedData = {
        ...updatedRow,
        subjects,
        subjectCount: subjects.length,
      };

      // ✅ Update backend
      await axiosInstance.put(`/subjects-db/${classNum}`, updatedData);

      // ✅ Update frontend state
      setRows((prev) =>
        prev.map((item) =>
          item.class === classNum ? updatedData : item
        )
      );
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="bg-[#F5F5F7] p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-[1.5rem] font-[600]">Create Subjects Database</h2>
          <p className="text-[0.9rem] font-[400] text-[#363636]">Add Subjects Here</p>
        </div>
        <input
          type="text"
          placeholder="Search Class..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 rounded-md border bg-black text-white text-sm w-[220px]"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2 min-w-[800px]">
          <thead className="bg-gray-100 text-[#616188] text-[1rem] font-[600] sticky top-0 z-10">
            <tr>
              <th className="p-2">Academic Year</th>
              <th className="p-2">Class</th>
              <th className="p-2">Class Strength</th>
              <th className="p-2">Subject Count</th>
              <th className="p-2">Sections</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => (
              <tr key={idx} className="bg-white text-[0.9rem] font-[400] text-[#000]">
                <td className="p-2 rounded-l-lg">{item.year}</td>
                <td className="p-2">{item.class}</td>
                <td className="p-2">{item.strength}</td>
                <td className="p-2">{item.subjectCount ?? "-"}</td>
                <td className="p-2">{item.sections}</td>
                <td className="p-2 rounded-r-lg flex items-center gap-3">
                  {item.subjectCount ? (
                    <span
                      className="text-[#702DFF] font-medium hover:underline cursor-pointer"
                      onClick={() => handleOpenModal(item.class, true)}
                    >
                      View
                    </span>
                  ) : (
                    <button
                      onClick={() => handleOpenModal(item.class, false)}
                      className="bg-[#702DFF] text-white text-sm px-5 py-1 rounded font-semibold"
                    >
                      Create
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Subject Modal */}
      {showModal && selectedClass !== null && (
        <SubjectModal
          selectedClass={selectedClass}
          readOnly={readOnlyMode}
          existingSubjects={
            rows.find((item) => item.class === selectedClass)?.subjects || []
          }
          onClose={() => setShowModal(false)}
          onSaveSubjects={(subjects) => {
            handleSaveSubjects(selectedClass, subjects);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default CreateSubjectsDatabase;
