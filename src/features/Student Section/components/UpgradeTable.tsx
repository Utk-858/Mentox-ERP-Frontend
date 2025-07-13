"use client";

import { useState } from "react";

interface Student {
  id: string;
  admissionNo: string;
  name: string;
  currentClass: number;
  marks: string;
  currentSection: string;
  finalAction?: string;
}

const tabs = ["All Students", "Promoted", "Retained", "Alumni"];

const initialStudents: Student[] = [
  { id: "1", admissionNo: "STU001", name: "Aarav Sharma", currentClass: 10, marks: "97%", currentSection: "A" },
  { id: "2", admissionNo: "STU002", name: "Diya Patel", currentClass: 10, marks: "97%", currentSection: "A" },
  { id: "3", admissionNo: "STU003", name: "Advik Singh", currentClass: 10, marks: "97%", currentSection: "A" },
  { id: "4", admissionNo: "STU004", name: "Ananya Khan", currentClass: 10, marks: "97%", currentSection: "A" },
  { id: "5", admissionNo: "STU005", name: "Kabir Kumar", currentClass: 10, marks: "97%", currentSection: "A" },
  { id: "6", admissionNo: "STU006", name: "Kabir Kumar", currentClass: 10, marks: "97%", currentSection: "A" },
];

export default function ClassAssignment() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [activeFilter, setActiveFilter] = useState<string>("All Students");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  // Update a single student's finalAction
  const handleActionChange = (studentId: string, action: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, finalAction: action } : s))
    );
  };

  // Select or deselect individual students
  const handleStudentSelect = (studentId: string, checked: boolean) => {
    setSelectedStudents((prev) =>
      checked ? [...prev, studentId] : prev.filter((id) => id !== studentId)
    );
  };

  // Select all or clear selection
  const handleSelectAll = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map((s) => s.id));
    }
  };

  // Bulk action to set finalAction for all selected students
  const bulkUpdateFinalAction = (action: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        selectedStudents.includes(s.id) ? { ...s, finalAction: action } : s
      )
    );
  };

  // Handle clicks on top action buttons
  const handleActionClick = (action: string) => {
    setSelectedAction(action);
    if (action === "Select All") {
      handleSelectAll();
    } else {
      bulkUpdateFinalAction(action);
    }
  };

  // Filter students by current active filter
  const filteredStudents =
    activeFilter === "All Students"
      ? students
      : students.filter((s) => s.finalAction === activeFilter);

  return (
    <div className="p-6 bg-gray-50 rounded-md">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Class Assignment
          </h1>
          <p className="text-gray-600">
            Assign students to sections for the new academic year.
          </p>
        </div>

        <div className="flex justify-between gap-4">
          {/* Top filter buttons */}
          <div className="flex flex-wrap gap-2 bg-black p-1 w-[57vw] xl:w-[29vw] rounded-lg mb-6">
            {tabs.map((tab) => {
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-0.5 xl:px-4 xl:py-2 rounded-lg font-medium text-center transition-colors ${
                    isActive
                      ? "bg-[#702DFF] text-white"
                      : "text-gray-200 hover:bg-gray-800"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-6">
            <button
              className={`px-4 py-0.5 xl:px-4 xl:py-2 text-xs xl:text-sm font-medium rounded-md transition-colors ${
                selectedAction === "Select All"
                  ? "bg-[#702DFF] text-white"
                  : "bg-black text-white hover:bg-gray-700"
              }`}
              onClick={() => handleActionClick("Select All")}
            >
              Select All
            </button>
            <button
              className={`px-4 py-0.5 xl:px-4 xl:py-2 text-xs xl:text-sm font-medium rounded-md transition-colors ${
                selectedAction === "Promote"
                  ? "bg-[#702DFF] text-white"
                  : "bg-black text-white hover:bg-gray-700"
              }`}
              onClick={() => handleActionClick("Promote")}
            >
              Promote Selected
            </button>
            <button
              className={`px-4 py-0.5 xl:px-4 xl:py-2 text-xs xl:text-sm font-medium rounded-md transition-colors ${
                selectedAction === "Retain"
                  ? "bg-[#702DFF] text-white"
                  : "bg-black text-white hover:bg-gray-700"
              }`}
              onClick={() => handleActionClick("Retain")}
            >
              Retain Selected
            </button>
            <button
              className={`px-4 py-0.5 xl:px-4 xl:py-2 text-xs xl:text-sm font-medium rounded-md transition-colors ${
                selectedAction === "Alumni"
                  ? "bg-[#702DFF] text-white"
                  : "bg-black text-white hover:bg-gray-700"
              }`}
              onClick={() => handleActionClick("Alumni")}
            >
              Mark as Alumni
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-12 px-4 py-3 text-left"></th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Admission No.
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Student Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Current Class
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Marks
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Current Section
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Final Section
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={(e) =>
                        handleStudentSelect(student.id, e.target.checked)
                      }
                      className="accent-[#702DFF] w-4 h-4"
                      aria-label={`Select ${student.name}`}
                    />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {student.admissionNo}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {student.currentClass}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {student.marks}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {student.currentSection}
                  </td>
                  <td className="px-4 py-4">
                    <select
                      className="w-36 bg-gray-800 text-white border border-gray-800 rounded px-2 py-1 text-sm"
                      value={student.finalAction || ""}
                      onChange={(e) =>
                        handleActionChange(student.id, e.target.value)
                      }
                      aria-label={`Select action for ${student.name}`}
                    >
                      <option value="">Select Action</option>
                      <option value="Promote">Promote</option>
                      <option value="Retain">Retain</option>
                      <option value="Alumni">Alumni</option>
                      <option value="Section A">Section A</option>
                      <option value="Section B">Section B</option>
                      <option value="Section C">Section C</option>
                    </select>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-500 py-6">
                    No students found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
