import React from "react";

type Student = {
  rollNo: number;
  name: string;
  className: string;
  profilePic: string;
  cumulativeScore: string; // e.g., "370/500"
  grade: string;
};

interface StudentModalProps {
  student: Student;
  onClose: () => void;
  showStudentInfo?: boolean;
  academicYear?: string;
}

const StudentModal: React.FC<StudentModalProps> = ({
  student,
  onClose,
  showStudentInfo = false,
  academicYear = "2024–25",
}) => {
  const subjects = [
    { name: "Mathematics", obtained: 90, total: 100, average: 52 },
    { name: "Science", obtained: 90, total: 100, average: 65 },
    { name: "English", obtained: 90, total: 100, average: 45 },
    { name: "History", obtained: 90, total: 100, average: 46 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
      <div className="bg-white rounded-lg w-[90%] max-w-[780px] shadow-xl p-6 font-sans relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-3xl text-gray-500 hover:text-black"
        >
          ×
        </button>

        {/* Header */}
        <h2 className="text-[1.5rem] font-[600] mb-1">{student.name}</h2>
        <p className="text-sm text-gray-500 mb-4">Detailed Performance</p>

        {/* Top Student Info Row (Conditional) */}
        {showStudentInfo && (
          <div className="grid grid-cols-4 sm:grid-cols-4  text-[1rem] text-black mb-6">
            <div>
              <span className="font-[600]">Name:</span> {student.name}
            </div>
            <div>
              <span className="font-semibold">Roll No.:</span> {student.rollNo}
            </div>
            <div>
              <span className="font-semibold">Class:</span> {student.className}
            </div>
            <div>
              <span className="font-semibold">Academic Year:</span> {academicYear}
            </div>
          </div>
        )}

        {/* Exam Summary */}
        <div className="bg-white rounded-lg p-4 grid sm:grid-cols-3 gap-6 text-left mb-6 border border-gray-200">
          <div>
            <p className="text-gray-500 font-medium text-[1.1rem]">Exam Type</p>
            <h4 className="text-lg font-semibold border-b mt-1">
              Mid-Term Examination
            </h4>
          </div>
          <div>
            <p className="text-gray-500 font-medium text-[1.1rem]">Overall Score</p>
            <h4 className="text-lg font-semibold border-b mt-1">
              {student.cumulativeScore}
            </h4>
          </div>
          <div>
            <p className="text-gray-500 font-medium text-[1.1rem]">Average</p>
            <h4 className="text-lg font-semibold border-b mt-1">
              {(() => {
                const [obt] = student.cumulativeScore.split("/").map(Number);
                return Math.round(obt / (subjects.length || 1));
              })()}
            </h4>
          </div>
        </div>

        {/* Subject-wise Table */}
        <h3 className="text-lg font-semibold mb-4">Subject-wise Performance</h3>
        <table className="w-full text-sm text-left border-separate border-spacing-y-2">
          <thead className="text-[#616188] font-semibold">
            <tr>
              <th className="pb-2">Subject</th>
              <th className="pb-2">Marks</th>
              <th className="pb-2">Total</th>
              <th className="pb-2">Average Marks</th>
              <th className="pb-2">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subj, idx) => {
              const percentage = Math.round((subj.obtained / subj.total) * 100);
              const barColor =
                percentage >= 80
                  ? "bg-purple-600"
                  : percentage >= 50
                  ? "bg-yellow-500"
                  : "bg-red-500";

              return (
                <tr
                  key={idx}
                  className="bg-[#F5F5F7] rounded-[0.7rem] text-sm font-medium text-[#363636]"
                >
                  <td className="py-3 px-2 rounded-l-[0.7rem]">{subj.name}</td>
                  <td className="py-3 px-2">{subj.obtained}</td>
                  <td className="py-3 px-2">{subj.total}</td>
                  <td className="py-3 px-2">{subj.average}</td>
                  <td className="py-3 px-2 rounded-r-[0.7rem] w-1/4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 ${barColor} rounded-full`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-700 font-semibold">
                        {percentage}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Support */}
        <div className="mt-4 text-sm text-gray-600">
          <span>❓ Need help with your result? </span>
          <a href="#" className="text-[#702DFF] underline">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;
