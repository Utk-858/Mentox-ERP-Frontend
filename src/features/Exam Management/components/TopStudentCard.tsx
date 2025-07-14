import React from "react";

type Student = {
  name: string;
  percentage: number;
  avatarUrl: string;
};

type TopStudentsCardProps = {
  students: Student[];
};

const TopStudentCard: React.FC<TopStudentsCardProps> = ({ students }) => {
  return (
    <div className="bg-[#f7f7f9] rounded-2xl px-6 py-4 w-full ">
      <div className="text-[1.13rem] font-[500] text-gray-900">Top Students</div>
      <div className="text-[0.9rem] text-[#363636] font-[400] mb-4">Students with highest Marks</div>
      <div className="flex flex-col gap-4">
        {students.map((student, index) => (
          <div key={index} className="flex items-center gap-3">
            {/* Rank Circle */}
            <div className="w-6 h-6 rounded-full bg-[#C2A6FFA1] flex items-center justify-center text-xs font-semibold text-gray-900">
              {index + 1}
            </div>

            {/* Avatar */}
            <img
              src={student.avatarUrl}
              alt={student.name}
              className="w-8 h-8 rounded-full object-cover"
            />

            {/* Name + Marks */}
            <div>
              <div className="text-[0.75rem] font-[500] text-black">{student.name}</div>
              <div className="text-[0.63rem] font-[400] text-[#4C4C4C]">{student.percentage}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopStudentCard;
