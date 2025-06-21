// components/StudentDirectory.tsx
import React, { useState, useEffect } from "react";
import { FaFilter, FaSort } from "react-icons/fa";

import { lazy, Suspense } from "react";
const StudentModal = lazy(() => import("./StudentModal"));

type Student = {
  rollNo: number;
  name: string;
  className: string;
  profilePic: string;
  cumulativeScore: string;
  total:string;
  grade: string;
};

interface StudentDirectoryProps {
  heading: string;
  subheading: string;

  students: Student[];
}

const AnalyticsDirectory: React.FC<StudentDirectoryProps> = ({
  heading,
  subheading,

  students,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <div className="p-6 bg-[#F5F5F7] mt-4 font-sans rounded-xl mr-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-[1.5rem] font-[600]">{heading}</h1>
          <p className="text-[0.9rem] font-[400] text-[#363636]">
            {subheading}
          </p>
        </div>
        <div className="flex gap-4">
          <button className="underline text-[0.9rem] text-black font-medium">
            Download as PDF
          </button>

          <button className="bg-[#702DFF] text-white p-2 rounded-md text-[1rem] h-fit font-semibold">
            Download as CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex gap-3">
          {["Class", "Section", "Exam Type"].map((label) => (
            <button
              key={label}
              className="flex items-center gap-2 bg-black text-white border px-4 py-2 rounded-md text-[0.88rem] font-[500]"
            >
              <FaFilter /> {label}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-md border w-4/5 bg-black text-white"
          />
          <button className="flex items-center gap-2 bg-black text-white border px-4 py-2 rounded-md text-sm font-medium w-3/5">
            <FaSort /> Sort by
          </button>
        </div>
      </div>

      {/* Stats */}

      {/* Student Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full text-left table-auto">
          <thead className="border-b border-black bg-white text-[0.88rem] font-[600]">
            <tr>
              <th className="p-4">Roll No.</th>
              <th className="p-4">Name</th>
              <th className="p-4">Class</th>
              <th className="p-4">Cumulative Score</th>
              <th className="p-4">Total</th>
              <th className="p-4">Grade</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td className="p-4">{student.rollNo}</td>
                <td className="p-4 flex items-center gap-2 text-[0.88rem] font-[500]">
                  <img
                    src={student.profilePic}
                    alt={student.name}
                    className="w-8 h-8 rounded-full"
                  />
                  {student.name}
                </td>
                <td className="p-4 text-[0.88rem] font-[500]">{student.className}</td>
                <td className="p-4 text-[0.88rem] font-[500]">{student.cumulativeScore}</td>
                <td className="p-4 text-[0.88rem] font-[500]">{student.total}</td>
                <td className="p-4 text-[0.88rem] font-[500]">{student.grade}</td>
                <td
                  className="p-4 text-[#0085D8] cursor-pointer hover:underline"
                  onClick={() => handleViewDetails(student)}
                >
                  View Details
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStudents.length === 0 && (
          <div className="text-center text-gray-500 p-4">No students found.</div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedStudent && (
        <Suspense
          fallback={<div className="text-center p-4">Loading modal...</div>}
        >
          <StudentModal
            student={selectedStudent}
            onClose={() => setIsModalOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
};

export default AnalyticsDirectory;
