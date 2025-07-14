import React, { useState } from "react";

interface Student {
  name: string;
  avatar: string;
  className: string;
  timeTaken: string;
  score: string;
  lastActive: string;
}

interface StudentDirectoryProps {
  students: Student[];
  onViewQuiz: (index: number) => void;
}

const StudentDirectory: React.FC<StudentDirectoryProps> = ({
  students,
  onViewQuiz,
}) => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All Students");
  const [sortField, setSortField] = useState<keyof Student | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const filteredStudents = students
    .filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase());
      const matchesClass = activeTab === "All Students" || student.className === activeTab;
      return matchesSearch && matchesClass;
    })
    .sort((a, b) => {
      if (!sortField) return 0;

      const valueA = a[sortField];
      const valueB = b[sortField];

      if (sortField === "timeTaken") {
        const numA = parseInt(valueA.split(" ")[0]);
        const numB = parseInt(valueB.split(" ")[0]);
        return sortDirection === "desc" ? numB - numA : numA - numB;
      }

      if (sortField === "score") {
        const numA = parseInt(valueA.replace("%", ""));
        const numB = parseInt(valueB.replace("%", ""));
        return sortDirection === "desc" ? numB - numA : numA - numB;
      }

      if (valueA < valueB) {
        return sortDirection === "desc" ? 1 : -1;
      }
      if (valueA > valueB) {
        return sortDirection === "desc" ? -1 : 1;
      }
      return 0;
    });

  const handleSort = (field: keyof Student) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "desc" ? "asc" : "desc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

 

  return (
    <div className="bg-[#F5F5F7] rounded-lg border mt-6 p-4 max-w-[85rem] mb-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-[1.8rem] font-[600]">Student Directory</h2>
          <p className="text-[1rem] font-[400] text-[#A1A1AA]">
            View and manage all your students
          </p>
        </div>
        <button className="bg-[#702DFF] text-white px-4 py-2 rounded-[0.4rem] hover:bg-purple-700">
          Download Result
        </button>
      </div>

      {/* Tabs */}
      <div className="flex justify-between">
      <div className="flex gap-2 mb-4 bg-black w-fit p-2 rounded-[0.6rem]">
  {["All Students", "10A", "10B"].map((tab) => (
    <button
      key={tab}
      className={`px-4 py-1 rounded-[0.6rem] text-sm font-medium ${
        activeTab === tab ? "bg-[#702DFF] text-white" : "text-white hover:bg-[#702DFF]"
      }`}
      onClick={() => setActiveTab(tab)}
    >
      {tab}
    </button>
  ))}
</div>


      {/* Search + Sort */}
      <div className="flex gap-2 mb-4">
  <div className="flex items-center border rounded-md overflow-hidden bg-black px-3">
    <span className="text-white mr-2">🔍</span>
    <input
      type="text"
      placeholder="Search students..."
      className="bg-black text-white text-sm outline-none py-2 w-full"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
  
  <select
    className="bg-black text-white px-4 py-2 rounded-[0.6rem] text-sm w-[10rem]"
    onChange={(e) => handleSort(e.target.value as keyof Student)}

  >
    <option className="bg-[#4b4848]" value="name">Name</option>
    <option className="bg-[#4b4848]" value="score">Score</option>
    <option className="bg-[#4b4848]" value="timeTaken">Time Taken</option>
  </select>
</div>
</div>


      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-[1rem] text-left border-t bg-white rounded-[0.6rem]">
          <thead>
            <tr className="text-[#000] font-[600] border-b border-[#000]">
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Class</th>
              <th className="py-2 px-3">Time Taken</th>
              <th className="py-2 px-3">Score</th>
              <th className="py-2 px-3">Last Active</th>
              <th className="py-2 px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr
                key={index}
                className="transition-colors"
              >
                <td className="py-2 px-3 font-[500] flex items-center gap-2">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {student.name}
                </td>
                <td className="py-2 px-3">{student.className}</td>
                <td className="py-2 px-3">{student.timeTaken}</td>
                <td className="py-2 px-3">{student.score}</td>
                <td className="py-2 px-3">{student.lastActive}</td>
                <td
                  className="py-2 px-3 text-[#0085D8] font-[500] hover:underline cursor-pointer"
                  onClick={() => onViewQuiz(index)}
                >
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

export default StudentDirectory;