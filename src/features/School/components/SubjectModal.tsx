import React, { useEffect, useState } from "react";

interface SubjectModalProps {
  selectedClass: number;
  onClose: () => void;
  onSaveSubjects: (subjects: SubjectEntry[]) => void;
  existingSubjects?: SubjectEntry[];
  readOnly?: boolean; // <- Make sure this exists and is optional
}


interface SubjectEntry {
  name: string;
  type: string;
}

const SubjectModal: React.FC<SubjectModalProps> = ({
  selectedClass,
  onClose,
  onSaveSubjects,
  existingSubjects = [],
}) => {
  const [subjects, setSubjects] = useState<SubjectEntry[]>([]);
  const [editingRows, setEditingRows] = useState<SubjectEntry[]>([]);

  useEffect(() => {
    setSubjects(existingSubjects);
  }, [existingSubjects]);

  const handleAddRow = () => {
    setEditingRows([...editingRows, { name: "", type: "Extra Curricular" }]);
  };

  const handleRowChange = (index: number, field: keyof SubjectEntry, value: string) => {
    const updated = [...editingRows];
    updated[index][field] = value;
    setEditingRows(updated);
  };

  const handleSaveRow = (index: number) => {
    const row = editingRows[index];
    if (!row.name.trim()) return;
    setSubjects((prev) => [...prev, row]);
    const updated = [...editingRows];
    updated.splice(index, 1);
    setEditingRows(updated);
  };

  const handleEdit = (index: number) => {
    const row = subjects[index];
    setEditingRows([...editingRows, row]);
    setSubjects((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDelete = (index: number) => {
    setSubjects((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFinalSave = () => {
    onSaveSubjects([...subjects]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-[#F5F5F7] p-6 rounded-lg w-[600px] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-[1.5rem] font-[600]">Add Subjects</h2>
        <div className="text-[0.9rem] font-[400] text-[#606060]">Add particular subject</div>
        <p className="text-[1.1rem] font-[500] mt-2 mb-2 text-[#000]">
          Class : {selectedClass}
        </p>

        <table className="w-full mb-4 text-[1rem] border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-[#616188]">
              <th>Subject Name</th>
              <th>Subject Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, idx) => (
              <tr key={idx} className="bg-white rounded-md p-2">
                <td className="p-2">{subject.name}</td>
                <td className="p-2">{subject.type}</td>
                <td className="flex gap-2 p-2">
                  <button
                    className="bg-[#FFE493] px-3 py-1 rounded"
                    onClick={() => handleEdit(idx)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-[#FFE3E3] px-3 py-1 rounded"
                    onClick={() => handleDelete(idx)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {editingRows.map((row, idx) => (
              <tr key={`edit-${idx}`} className="bg-white rounded-md ">
                <td colSpan={3}>
                  <div className="flex items-center gap-4 p-2 rounded-[2rem]">
                    <input
                      type="text"
                      className="border p-2 rounded w-fit"
                      value={row.name}
                      placeholder="Subject Name"
                      onChange={(e) => handleRowChange(idx, "name", e.target.value)}
                    />
                    <select
                      className="border p-2 rounded w-full"
                      value={row.type}
                      onChange={(e) => handleRowChange(idx, "type", e.target.value)}
                    >
                      <option>Core</option>
                      <option>Optional</option>
                      <option>Extra Curricular</option>
                    </select>
                    <button
                      className="bg-[#702DFF] text-white px-4 py-1 rounded mr-12"
                      onClick={() => handleSaveRow(idx)}
                    >
                      Save
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <button
            className="bg-[#702DFF] text-white px-4 py-2 rounded"
            onClick={handleAddRow}
          >
            Add Subject
          </button>
          <button
            onClick={handleFinalSave}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Save All
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectModal;
