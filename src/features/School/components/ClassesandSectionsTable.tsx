import React, { useState } from "react";
import AddClassModal from "./AddClassModal";
import AddSectionModal from "./AddSectionModal";

type ClassItem = {
  className: string;
  numOfSections?: string;
  totalSeats?: string;
  createdOn: string;
  sections?: { name: string; capacity: number }[];
  isEditing?: boolean;
};

const ClassesAndSectionsTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [classes, setClasses] = useState<ClassItem[]>([
    { className: "1", numOfSections: "3", totalSeats: "50", createdOn: "2 Jun 2025" },
    { className: "2", numOfSections: "3", totalSeats: "50", createdOn: "2 Jun 2025" },
    { className: "3", numOfSections: "3", totalSeats: "50", createdOn: "2 Jun 2025" },
    { className: "4", numOfSections: "3", totalSeats: "50", createdOn: "2 Jun 2025" },
    { className: "5", numOfSections: "3", totalSeats: "50", createdOn: "2 Jun 2025" },
    { className: "6", numOfSections: "3", totalSeats: "50", createdOn: "2 Jun 2025" },
    { className: "7", numOfSections: "3", totalSeats: "50", createdOn: "2 Jun 2025" },
    { className: "8", numOfSections: "3", totalSeats: "50", createdOn: "2 Jun 2025" },
  ]);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");

  const handleCreateClass = () => {
  if (!selectedClass) return;

  const isDuplicate = classes.some(cls => cls.className === selectedClass);
  if (isDuplicate) {
    alert(`Class "${selectedClass}" already exists.`);
    return;
  }

  setClasses((prev) => [
    ...prev,
    {
      className: selectedClass,
      numOfSections: "-",
      totalSeats: "-",
      createdOn: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    },
  ]);
  setSelectedClass("");
  setIsModalOpen(false);
};


  const handleEditToggle = (idx: number) => {
    setClasses((prev) =>
      prev.map((cls, i) => (i === idx ? { ...cls, isEditing: !cls.isEditing } : cls))
    );
  };

  const handleUpdateClass = (idx: number, field: keyof ClassItem, value: string) => {
    setClasses((prev) =>
      prev.map((cls, i) => (i === idx ? { ...cls, [field]: value } : cls))
    );
  };

  const handleDeleteClass = (idx: number) => {
    setClasses((prev) => prev.filter((_, i) => i !== idx));
  };

  const filteredClasses = classes.filter((cls) =>
    cls.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#F5F5F7] p-5 rounded-[0.9rem] border-[#A7A7A7] mr-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-[1.5rem] font-[600] text-black">Classes and Sections</h2>
          <p className="text-[0.9rem] font-[400] text-[#363636]">
            View and edit each class and its sections
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search class..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1.5 rounded-md border bg-black text-white text-sm w-[220px]"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#702DFF] hover:bg-purple-700 text-white text-sm px-6 py-2 rounded-md font-semibold"
          >
            Add Class
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-[460px] overflow-y-auto">
          <table className="w-full table-fixed border-separate border-spacing-y-3 min-w-[700px]">
            <thead className="sticky top-0 bg-[#F8F8FC] text-[#616188] font-[600] text-[1rem] text-left z-10">
              <tr>
                <th className="p-3 w-[20%]">Class</th>
                <th className="p-3 w-[20%]">No. Of Section</th>
                <th className="p-3 w-[20%]">Total Seats</th>
                <th className="p-3 w-[20%]">Created On</th>
                <th className="p-3 w-[20%]">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map((cls, idx) => {
                const showAddSection =
                  !cls.numOfSections ||
                  !cls.totalSeats ||
                  cls.numOfSections === "-" ||
                  cls.totalSeats === "-";

                return (
                  <tr key={idx} className="bg-white text-[#000] text-[0.9rem] font-[400] rounded-lg">
                    <td className="p-3 rounded-l-md truncate">
                      {cls.isEditing ? (
                        <input
                          value={cls.className}
                          onChange={(e) => handleUpdateClass(idx, "className", e.target.value)}
                          className="border rounded px-2 py-1"
                        />
                      ) : (
                        cls.className
                      )}
                    </td>
                    <td className="p-3 truncate">{cls.numOfSections || "-"}</td>
                    <td className="p-3 truncate">{cls.totalSeats || "-"}</td>
                    <td className="p-3 truncate">{cls.createdOn}</td>
                    <td className="p-3 space-x-2 rounded-r-md">
                      {showAddSection ? (
                        <button
                          onClick={() => {
                            setCurrentClass(cls.className);
                            setIsSectionModalOpen(true);
                          }}
                          className="bg-[#702DFF] text-white px-4 py-1 rounded text-sm font-semibold"
                        >
                          Add Sections
                        </button>
                      ) : cls.isEditing ? (
                        <>
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                            onClick={() => handleEditToggle(idx)}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                            onClick={() => handleEditToggle(idx)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditToggle(idx)}
                            className="bg-[#FFE493] text-[#000] px-3 py-1 rounded text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClass(idx)}
                            className="bg-[#FFE3E3] text-[#000] px-3 py-1 rounded text-sm"
                          >
                            Deleted
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AddClassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateClass}
        selectedClass={selectedClass}
        onSelectClass={setSelectedClass}
      />
      <AddSectionModal
        isOpen={isSectionModalOpen}
        onClose={() => setIsSectionModalOpen(false)}
        className={currentClass}
        academicYear="2024–25"
        onSaveSections={(sections) => {
          setClasses((prev) =>
            prev.map((cls) =>
              cls.className === currentClass
                ? {
                    ...cls,
                    sections: sections,
                    numOfSections: sections.length.toString(),
                    totalSeats: sections.reduce((sum, sec) => sum + sec.capacity, 0).toString(),
                  }
                : cls
            )
          );
          setIsSectionModalOpen(false);
        }}
      />
    </div>
  );
};

export default ClassesAndSectionsTable;