import React from "react";

interface Student {
  name: string;
  score: string;
  timeSpent: string;
}

interface TopStudentsProps {
  students: Student[];
  onViewQuiz: (index: number) => void;
}

const TopStudents: React.FC<TopStudentsProps> = ({ students, onViewQuiz }) => {
  return (
    <div className="bg-[#F5F5F7] border border-gray-200 rounded-lg p-4 max-w-[48.8rem] mt-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-[1.5rem] font-[600]">Top Students</h2>
          <p className="text-[0.9rem] font-[400] text-[#363636]">
            Students with highest quiz scores
          </p>
        </div>
        <button className="bg-[#702DFF] hover:bg-purple-700 text-white text-[1rem] font-[600] px-4 py-2 rounded-[0.45rem]">
          View All Results
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-[1rem] text-left bg-white rounded-[0.6rem]">
          <thead>
            <tr className="border-b border-[#000] text-[#000] font-[600]">
              <th className="py-2 px-3">S No.</th>
              <th className="py-2 px-3">Student</th>
              <th className="py-2 px-3">Score</th>
              <th className="py-2 px-3">Time Spent</th>
              <th className="py-2 px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="  text-[#000] font-[500]">
                <td className="py-2 px-3">{index + 1}</td>
                <td className="py-2 px-3">{student.name}</td>
                <td className="py-2 px-3">{student.score}</td>
                <td className="py-2 px-3">{student.timeSpent}</td>
                <td className="py-2 px-3 text-[#0085D8] cursor-pointer hover:underline"
                    onClick={() => onViewQuiz(index)}>
                  View Quiz
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopStudents;
