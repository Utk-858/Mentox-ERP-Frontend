import React, { useState } from "react";
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

  const [rows, setRows] = useState<SubjectRow[]>([
    { year: 2024, class: 1, strength: 120, sections: 3 },
    { year: 2024, class: 2, strength: 120, subjectCount: 5, sections: 3 },
    { year: 2024, class: 3, strength: 120, subjectCount: 5, sections: 3 },
    { year: 2024, class: 4, strength: 120, subjectCount: 5, sections: 3 },
    { year: 2024, class: 5, strength: 120, subjectCount: 5, sections: 3 },
    { year: 2024, class: 6, strength: 120, subjectCount: 5, sections: 3 },
    { year: 2024, class: 7, strength: 120, sections: 3 },
    { year: 2024, class: 8, strength: 120, sections: 3 },
    { year: 2024, class: 9, strength: 120, sections: 3 },
    { year: 2024, class: 10, strength: 130, sections: 3 },
  ]);

  const filtered = rows.filter((item) =>
    item.class.toString().includes(searchQuery)
  );

  const handleOpenModal = (classNum: number, readOnly: boolean) => {
    setSelectedClass(classNum);
    setReadOnlyMode(readOnly);
    setShowModal(true);
  };

  const handleSaveSubjects = (classNum: number, subjects: SubjectEntry[]) => {
    setRows((prev: SubjectRow[]) =>
      prev.map((item) =>
        item.class === classNum
          ? { ...item, subjectCount: subjects.length, subjects }
          : item
      )
    );
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
