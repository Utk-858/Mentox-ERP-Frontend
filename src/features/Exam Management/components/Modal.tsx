import React, { useState } from "react";

type SubjectEntry = {
  id: number;
  subject: string;
  examType: string;
  className: string;
  date: string;
  time: string;
  isEditing?: boolean;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  examType: string;
  className: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, examType, className }) => {
  const [entries, setEntries] = useState<SubjectEntry[]>([
    {
      id: 1,
      subject: "Hindi",
      examType,
      className,
      date: "2024-06-01",
      time: "09:00",
    },
  ]);

  const [showInputRow, setShowInputRow] = useState(false);
  const [newSubject, setNewSubject] = useState("Math");
  const [newDate, setNewDate] = useState("2025-07-07");
  const [newTime, setNewTime] = useState("12:08");

  if (!isOpen) return null;

  const handleAdd = () => {
    const newEntry: SubjectEntry = {
      id: Date.now(),
      subject: newSubject,
      examType,
      className,
      date: newDate,
      time: newTime,
    };
    setEntries([...entries, newEntry]);
    setShowInputRow(false);
  };

  const handleDelete = (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const handleEdit = (id: number) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, isEditing: true } : entry
      )
    );
  };

  const handleSave = (id: number) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, isEditing: false } : entry
      )
    );
  };

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-[#F5F5F7] rounded-xl shadow-xl w-[90%] max-w-4xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✖
        </button>

        {/* Modal Header */}
        <div className="mb-4">
          <h2 className="text-[1.5rem] font-[600] text-black">
            Create Datesheet
          </h2>
          <p className="text-[0.9rem] font-[400] text-[#363636]">
            Datesheet for {className} ({examType})
          </p>
        </div>

        {/* Table Section */}
        <div className="space-y-3">
          {/* Header Row */}
          <div className="grid grid-cols-6 gap-4 text-[1rem] font-[600] text-[#616188] border-b border-[#E7E8EE] pb-2">
            <div>Subjects</div>
            <div>Exam Type</div>
            <div>Class</div>
            <div>Date</div>
            <div>Time</div>
            <div>Action</div>
          </div>

          {/* Entries */}
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="grid grid-cols-6 gap-4 items-center bg-white text-[0.9rem] font-[400] rounded-lg p-2"
            >
              {entry.isEditing ? (
                <>
                  <input
                    value={entry.subject}
                    onChange={(e) =>
                      setEntries((prev) =>
                        prev.map((el) =>
                          el.id === entry.id
                            ? { ...el, subject: e.target.value }
                            : el
                        )
                      )
                    }
                    className="border px-2 py-1 rounded"
                  />
                  <div>{entry.examType}</div>
                  <div>{entry.className}</div>
                  <input
                    type="date"
                    value={entry.date}
                    onChange={(e) =>
                      setEntries((prev) =>
                        prev.map((el) =>
                          el.id === entry.id
                            ? { ...el, date: e.target.value }
                            : el
                        )
                      )
                    }
                    className="border px-2 py-1 rounded"
                  />
                  <input
                    type="time"
                    value={entry.time}
                    onChange={(e) =>
                      setEntries((prev) =>
                        prev.map((el) =>
                          el.id === entry.id
                            ? { ...el, time: e.target.value }
                            : el
                        )
                      )
                    }
                    className="border px-2 py-1 rounded"
                  />
                  <button
                    onClick={() => handleSave(entry.id)}
                    className="bg-[#702DFF] text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div>{entry.subject}</div>
                  <div>{entry.examType}</div>
                  <div>{entry.className}</div>
                  <div>{new Date(entry.date).toLocaleDateString("en-GB")}</div>
                  <div>
                    {new Date(`1970-01-01T${entry.time}`).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="bg-[#FFE493] px-3 py-1 rounded"
                      onClick={() => handleEdit(entry.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-[#FFE3E3] px-3 py-1 rounded text-black"
                      onClick={() => handleDelete(entry.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* New Entry Row */}
          {showInputRow && (
            <div className="grid grid-cols-6 gap-4 items-center bg-white rounded-lg p-2">
              <select
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="border rounded px-2 py-1 text-sm bg-[#D2D2D233]"
              >
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
              </select>
              <div>{examType}</div>
              <div>{className}</div>
              <input
                type="date"
                className="border rounded px-2 py-1 text-sm bg-[#D2D2D233]"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
              <input
                type="time"
                className="border rounded px-2 py-1 text-sm bg-[#D2D2D233]"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
              <button
                className="bg-[#702DFF] text-white px-4 py-1 rounded"
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
          )}

          {/* Add Subjects Button */}
          {!showInputRow && (
            <div className="flex justify-end pt-2">
              <button
                className="bg-[#702DFF] text-white px-4 py-2 rounded"
                onClick={() => setShowInputRow(true)}
              >
                Add Subjects
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
