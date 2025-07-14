// components/ExamCardList.tsx
import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IoBookOutline } from "react-icons/io5";

type ExamStatus = "Active" | "Upcoming" | "Completed";

 interface Exam {
  title: string;
  className: string;
  dateRange: string;
  status: ExamStatus;
}

interface ExamCardListProps {
  heading: string;
  subheading: string;
  exams: Exam[];
  onCreateExam?: () => void;
}

const statusColorMap: Record<ExamStatus, string> = {
  Active: "bg-green-500",
  Upcoming: "bg-yellow-500",
  Completed: "bg-blue-500",
};

const ExamCard: React.FC<ExamCardListProps> = ({
  heading,
  subheading,
  exams,
  onCreateExam,
}) => {
  const [filter, setFilter] = useState<"All" | ExamStatus>("All");
  const [search, setSearch] = useState("");

  const filteredExams = exams.filter((exam) => {
    const matchStatus = filter === "All" || exam.status === filter;
    const matchSearch =
      exam.title.toLowerCase().includes(search.toLowerCase()) ||
      exam.className.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-4 bg-[#F5F5F7] mt-4 font-sans rounded-[0.9rem] mr-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[1.5rem] font-[600]">{heading}</h1>
          <p className="text-[0.9rem] font-[400] text-[#363636]">{subheading}</p>
        </div>
        <button
          onClick={onCreateExam}
          className="bg-[#702DFF] text-white px-4 py-2 rounded-md text-[1rem] font-[600]"
        >
          Create Exam
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center justify-end gap-4 mb-4">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-md border w-1/6 bg-black text-white"
        />
        <select
          className="border px-3 py-2 rounded-md bg-black text-white w-1/6"
          value={filter}
          onChange={(e) => setFilter(e.target.value as "All" | ExamStatus)}
        >
          <option value="All">All Exams</option>
          <option value="Active">Active</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Exam Cards */}
      {filteredExams.length > 0 ? (
        filteredExams.map((exam, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center mb-4"
          >
            <div className="flex gap-4 items-start">
              <div className="bg-black text-white p-3 rounded-full text-[1.2rem]">
                <IoBookOutline />
              </div>
              <div>
                <div className="flex gap-3">
                  <h3 className="text-[1.25rem] font-[600]">{exam.title}</h3>
                  <span
                    className={`${statusColorMap[exam.status]} text-white text-[0.75rem] font-[600] px-4 h-fit py-1 rounded-full`}
                  >
                    {exam.status}
                  </span>
                </div>
                <p className="text-[0.8rem] font-[400] text-[#696969]">
                  {exam.className} &nbsp;&nbsp; Date Range: {exam.dateRange}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-black text-white px-4 py-1 rounded-md text-[0.9rem] font-[600]">
                Manage
              </button>
              <div className="text-[1rem] cursor-pointer border-2 border-black p-2 rounded-[0.5rem]">
                <HiDotsVertical />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm text-center">No exams found.</p>
      )}
    </div>
  );
};

export default ExamCard;
