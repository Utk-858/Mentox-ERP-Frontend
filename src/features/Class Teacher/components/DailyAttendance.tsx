import React, { useState } from "react";

interface StudentAttendance {
  rollNo: number;
  name: string;
  isPresent: boolean;
  attendancePercentage: number;
}

interface DailyAttendanceProps {
  selectedDate: string;
  initialData: StudentAttendance[];
  
  onDateChange: (newDate: string) => void;
}

const DailyAttendance: React.FC<DailyAttendanceProps> = ({
  selectedDate,
  initialData,
  
  onDateChange
}) => {
  const [students, setStudents] = useState<StudentAttendance[]>(initialData);

  const setAttendance = (rollNo: number, isPresent: boolean) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.rollNo === rollNo ? { ...student, isPresent } : student
      )
    );
  };

  const markAllPresent = () => {
    setStudents((prev) => prev.map((student) => ({ ...student, isPresent: true })));
  };

  

  return (
    <div className="p-6 bg-[#F5F5F7] rounded-xl shadow-md w-full  mt-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-[1.5rem] font-[600] mb-1">Daily Attendance</h2>
          <p className="text-[0.9rem] font-[400] text-[#363636] mb-4">
            Mark Today’s Attendance
          </p>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="border border-gray-300 px-3 py-1 rounded-md text-gray-700"
          />
          <button
            className="bg-[#702DFF] hover:bg-purple-600 text-white px-4 py-2 rounded-md text-[0.9rem] font-[400]"
            onClick={markAllPresent}
          >
            Mark all Present
          </button>
          <button
            className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md text-[0.9rem] font-[600] flex items-center gap-1"
            
          >
            <span>📅</span> Save Attendance
          </button>
        </div>
      </div>

      <table className="w-full table-auto text-left border-separate border-spacing-y-3">
        <thead className="text-[1rem] font-[600] border-b-2 border-black text-[#616188]">
          <tr>
            <th className="py-2">Roll No.</th>
            <th>Name</th>
            <th>Present</th>
            <th>Absent</th>
            <th>Attendance%</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr
              key={student.rollNo}
              className="text-left text-[0.9rem] font-[400] bg-white"
            >
              <td className="py-2 px-2">{student.rollNo}</td>
              <td className="py-2 px-0">{student.name}</td>
              <td className="py-2 px-0">
                <button
                  className={`px-3 py-1 rounded-[0.2rem] font-medium ${
                    student.isPresent
                      ? "bg-[#50E087] text-black"
                      : "bg-[#E6F8ED] text-gray-500"
                  }`}
                  onClick={() => setAttendance(student.rollNo, true)}
                >
                  Present
                </button>
              </td>
              <td className="py-2 px-1">
                <button
                  className={`px-3 py-1 rounded-[0.2rem] font-medium ${
                    !student.isPresent
                      ? "bg-[#FF5858] text-white"
                      : "bg-[#FFA3A3] text-white"
                  }`}
                  onClick={() => setAttendance(student.rollNo, false)}
                >
                  Absent
                </button>
              </td>
              <td className="py-2 px-4">
                <span className="bg-[#702DFF33] text-black px-4 py-1 rounded-[0.2rem]">
                  {student.attendancePercentage}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyAttendance;
