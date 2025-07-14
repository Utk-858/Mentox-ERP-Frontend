import React, { useState } from "react";

type GradeEntry = {
  range: string;
  grade: string;
  points: string;
};

const PopupGrading: React.FC = () => {
  const [grades, setGrades] = useState<GradeEntry[]>([
    { range: "91–100", grade: "A1", points: "10" },
    { range: "81–90", grade: "A2", points: "9" },
    { range: "71–80", grade: "B1", points: "8" },
    { range: "61–70", grade: "B2", points: "7" },
    { range: "51–60", grade: "C1", points: "6" },
    { range: "41–50", grade: "C2", points: "5" },
    { range: "33–40", grade: "D", points: "4" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newGrade, setNewGrade] = useState<GradeEntry>({
    range: "",
    grade: "",
    points: "",
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedGrade, setEditedGrade] = useState<GradeEntry>({
    range: "",
    grade: "",
    points: "",
  });

  const handleAddGrade = () => {
    setShowForm(true);
  };

  const handleSave = () => {
    if (!newGrade.range || !newGrade.grade || newGrade.points <= "0") {
      alert("All fields are required and points must be positive.");
      return;
    }
    setGrades([...grades, newGrade]);
    setNewGrade({ range: "", grade: "", points: "" });
    setShowForm(false);
  };

  const handleDelete = (index: number) => {
    const updated = grades.filter((_, i) => i !== index);
    setGrades(updated);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditedGrade(grades[index]);
  };

  const handleEditSave = (index: number) => {
    const updatedGrades = [...grades];
    updatedGrades[index] = editedGrade;
    setGrades(updatedGrades);
    setEditIndex(null);
  };

  const handleEditCancel = () => {
    setEditIndex(null);
  };

  return (
    <div className="p-4 bg-[#F5F5F7] rounded-lg font-sans w-full">
      <div className="flex justify-between items-center mb-4 sticky top-0 bg-[#F5F5F7] z-10 pb-2">
        <div>
          <h2 className="text-[1.5rem] font-[600]">Grading Scheme</h2>
          <p className="text-[0.85rem] font-[400] text-[#363636]">
            View or Edit Grading Scheme
          </p>
        </div>
        <button
          onClick={handleAddGrade}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          + Add Grade
        </button>
      </div>

      <div>
        <table className="w-fit text-left border-collapse bg-white rounded-[0.6rem]">
          <thead>
            <tr className="border-b border-gray-300 text-[1rem] font-[600]">
              <th className="py-2 px-5">Range</th>
              <th className="py-2 px-5">Grade</th>
              <th className="py-2 px-5">Grade Points</th>
              <th className="py-2 px-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((entry, index) => (
              <tr
                key={index}
                className="text-[#696969] text-[1rem] font-[500] border-t text-left"
              >
                {editIndex === index ? (
                  <>
                    <td className="py-2 px-5">
                      <input
                        type="text"
                        value={editedGrade.range}
                        onChange={(e) =>
                          setEditedGrade({ ...editedGrade, range: e.target.value })
                        }
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="py-2 px-5">
                      <input
                        type="text"
                        value={editedGrade.grade}
                        onChange={(e) =>
                          setEditedGrade({ ...editedGrade, grade: e.target.value })
                        }
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="py-2 px-5">
                      <input
                        type="text"
                        value={editedGrade.points}
                        onChange={(e) =>
                          setEditedGrade({ ...editedGrade, points: e.target.value })
                        }
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="py-2 px-5 space-x-2 flex">
                      <button
                        onClick={() => handleEditSave(index)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="bg-gray-300 text-black px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-5">{entry.range}</td>
                    <td className="py-2 px-5">{entry.grade}</td>
                    <td className="py-2 px-5">{entry.points}</td>
                    <td className="py-2 px-5 space-x-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-[#FFE493] text-black font-[400] px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-[#FFE3E3] text-black font-[400] px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}

            {showForm && (
              <tr className="bg-white border-t text-[#696969] text-[1rem] font-[500]">
                <td className="py-2 px-5">
                  <input
                    type="text"
                    value={newGrade.range}
                    onChange={(e) =>
                      setNewGrade({ ...newGrade, range: e.target.value })
                    }
                    placeholder="Add Range"
                    className="border px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="py-2 px-5">
                  <input
                    type="text"
                    value={newGrade.grade}
                    onChange={(e) =>
                      setNewGrade({ ...newGrade, grade: e.target.value })
                    }
                    placeholder="Add Grade"
                    className="border px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="py-2 px-5">
                  <input
                    type="text"
                    value={newGrade.points}
                    onChange={(e) =>
                      setNewGrade({ ...newGrade, points: e.target.value })
                    }
                    placeholder="Add Grade Points"
                    className="border px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="py-2 px-5 space-x-2 flex">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="bg-gray-300 text-black px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PopupGrading;
