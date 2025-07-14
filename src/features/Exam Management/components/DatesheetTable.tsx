import React, { useState } from "react";
import Modal from "./Modal";

type DatesheetItem = {
  academicYear: string;
  examType: string;
  className: string;
  subjectCount: number;
  createdOn: string;
};

type DatesheetTableProps = {
  data: DatesheetItem[];
};

const DatesheetTable: React.FC<DatesheetTableProps> = ({ data }) => {
  const [datesheets, setDatesheets] = useState<DatesheetItem[]>(data);
  const [viewItem, setViewItem] = useState<DatesheetItem | null>(null);
  const [showAddRow, setShowAddRow] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<DatesheetItem | null>(null);
  const [newClass, setNewClass] = useState<Partial<DatesheetItem>>({
    academicYear: "2024-25",
    examType: "Mid-Term",
    className: "",
    subjectCount: 5,
    createdOn: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  });

  const handleAdd = () => {
    if (!newClass.className || newClass.subjectCount == null) return;
    const newItem: DatesheetItem = {
      academicYear: newClass.academicYear || "",
      examType: newClass.examType || "",
      className: newClass.className || "",
      subjectCount: newClass.subjectCount,
      createdOn: newClass.createdOn || "",
    };
    setDatesheets([...datesheets, newItem]);
    setShowAddRow(false);
    resetForm();
  };

  const handleDelete = (index: number) => {
    const updated = datesheets.filter((_, i) => i !== index);
    setDatesheets(updated);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditedItem(datesheets[index]);
  };

  const handleSaveEdit = (index: number) => {
    if (!editedItem) return;
    const updated = [...datesheets];
    updated[index] = editedItem;
    setDatesheets(updated);
    setEditIndex(null);
    setEditedItem(null);
  };

  const resetForm = () => {
    setNewClass({
      academicYear: "2024-25",
      examType: "Mid-Term",
      className: "",
      subjectCount: 5,
      createdOn: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });
  };

  return (
    <div className="p-4 bg-[#F5F5F7] rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-[1.5rem] font-[600]">Datesheet</h2>
          <p className="text-[0.9rem] font-[400] text-[#363636]">
            Datesheet Made till now
          </p>
        </div>
        <button
          onClick={() => setShowAddRow(true)}
          className="bg-[#702DFF] hover:bg-purple-700 text-white px-4 py-2 rounded-md"
        >
          Add Class
        </button>
      </div>

      <table className="w-full table-fixed text-left border-separate border-spacing-y-2">
        <colgroup>
          {[...Array(6)].map((_, i) => (
            <col key={i} className="w-1/6" />
          ))}
        </colgroup>
        <thead className="bg-gray-100 text-[#616188] text-[1rem] font-[600]">
          <tr>
            <th className="p-2">Academic Year</th>
            <th className="p-2">Exam Type</th>
            <th className="p-2">Class</th>
            <th className="p-2">Subject Count</th>
            <th className="p-2">Created On</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {datesheets.map((item, idx) => {
            const isEditing = editIndex === idx;

            return (
              <tr key={idx} className="bg-white text-[0.9rem] font-[400]">
                <td className="p-2 rounded-l-[0.5rem]">
                  {isEditing && editedItem ? (
                    <select
                      className="w-full border rounded px-2 py-1"
                      value={editedItem.academicYear}
                      onChange={(e) =>
                        setEditedItem({
                          ...editedItem,
                          academicYear: e.target.value,
                        })
                      }
                    >
                      <option value="2024-25">2024-25</option>
                      <option value="2025-26">2025-26</option>
                    </select>
                  ) : (
                    item.academicYear
                  )}
                </td>
                <td className="p-2">
                  {isEditing && editedItem ? (
                    <select
                      className="w-full border rounded px-2 py-1"
                      value={editedItem.examType}
                      onChange={(e) =>
                        setEditedItem({
                          ...editedItem,
                          examType: e.target.value,
                        })
                      }
                    >
                      <option value="Mid-Term">Mid-Term</option>
                      <option value="Final-Term">Final-Term</option>
                    </select>
                  ) : (
                    item.examType
                  )}
                </td>
                <td className="p-2">
                  {isEditing && editedItem ? (
                    <input
                      className="w-full border rounded px-2 py-1"
                      value={editedItem.className}
                      onChange={(e) =>
                        setEditedItem({
                          ...editedItem,
                          className: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.className
                  )}
                </td>
                <td className="p-2">
                  {isEditing && editedItem ? (
                    <input
                      type="number"
                      className="w-full border rounded px-2 py-1"
                      value={editedItem.subjectCount}
                      onChange={(e) =>
                        setEditedItem({
                          ...editedItem,
                          subjectCount: parseInt(e.target.value),
                        })
                      }
                    />
                  ) : (
                    item.subjectCount
                  )}
                </td>
                <td className="p-2">{item.createdOn}</td>
                <td className="p-2 space-x-2 rounded-r-[0.5rem]">
                  {isEditing ? (
                    <>
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => handleSaveEdit(idx)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-300 px-2 py-1 rounded"
                        onClick={() => {
                          setEditIndex(null);
                          setEditedItem(null);
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="text-[#702DFF] hover:underline"
                        onClick={() => setViewItem(item)}
                      >
                        View
                      </button>
                      <button
                        className="bg-[#FFE493] px-2 py-1 rounded"
                        onClick={() => handleEdit(idx)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-[#FFE3E3] px-2 py-1 rounded"
                        onClick={() => handleDelete(idx)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}

          {showAddRow && (
            <tr className="bg-white text-[0.9rem] font-[400]">
              <td className="p-2">
                <select
                  className="w-full border rounded px-2 py-1"
                  value={newClass.academicYear}
                  onChange={(e) =>
                    setNewClass({ ...newClass, academicYear: e.target.value })
                  }
                >
                  <option value="2024-25">2024-25</option>
                  <option value="2025-26">2025-26</option>
                </select>
              </td>
              <td className="p-2">
                <select
                  className="w-full border rounded px-2 py-1"
                  value={newClass.examType}
                  onChange={(e) =>
                    setNewClass({ ...newClass, examType: e.target.value })
                  }
                >
                  <option value="Mid-Term">Mid-Term</option>
                  <option value="Final-Term">Final-Term</option>
                </select>
              </td>
              <td className="p-2">
                <input
                  className="w-full border rounded px-2 py-1"
                  value={newClass.className}
                  onChange={(e) =>
                    setNewClass({ ...newClass, className: e.target.value })
                  }
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  min={1}
                  className="w-full border rounded px-2 py-1"
                  value={newClass.subjectCount}
                  onChange={(e) =>
                    setNewClass({
                      ...newClass,
                      subjectCount: parseInt(e.target.value),
                    })
                  }
                />
              </td>
              <td className="p-2">{newClass.createdOn}</td>
              <td className="p-2 space-x-2">
                <button
                  className="bg-[#702DFF] text-white px-3 py-1 rounded"
                  onClick={handleAdd}
                >
                  Add
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
                  onClick={() => setShowAddRow(false)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* View Modal */}
     {viewItem && (
  <Modal
    isOpen={true}
    onClose={() => setViewItem(null)}
    examType={viewItem.examType}
    className={viewItem.className}
  />
)}


    </div>
  );
};

export default DatesheetTable;
