import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

import { IoNewspaper } from "react-icons/io5";

type ExamStatus = "In Progress" | "Not Started" | "Completed" | "Draft";

export interface Exam {
  title: string;
  className: string;
  subject: string;
  dueDate: string;
  status: ExamStatus;
}

interface ExamCardListProps {
  heading: string;
  subheading: string;
  exams: Exam[];
}

const statusColorMap: Record<ExamStatus, string> = {
  "In Progress": "bg-[#0085D8]",
  "Not Started": "bg-black",
  "Completed": "bg-[#22C55E]",
  "Draft": "bg-[#702DFF]",
};

const AssignedExam: React.FC<ExamCardListProps> = ({
  heading,
  subheading,
  exams,
}) => {
  const [filter, setFilter] = useState<"All" | ExamStatus>("All");
  const [search, setSearch] = useState("");

  const filteredExams = exams.filter((exam) => {
    const matchStatus = filter === "All" || exam.status === filter;
    const matchSearch =
      exam.title.toLowerCase().includes(search.toLowerCase()) ||
      exam.className.toLowerCase().includes(search.toLowerCase()) ||
      exam.subject.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const tabs: (ExamStatus | "All")[] = ["All", "In Progress", "Not Started", "Completed"];

  return (
    <div className="p-6 bg-[#F5F5F7] rounded-xl font-sans mr-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-[1.5rem] font-[600]">{heading}</h1>
        <p className="text-[0.88rem] font-[400] text-[#363636]">{subheading}</p>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-2">
        <div className="flex space-x-2 bg-black p-1 rounded-[0.5rem]">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-1 rounded-md font-semibold text-sm ${
                filter === tab
                  ? "bg-[#702DFF] text-white"
                  : "bg-black  text-white"
              }`}
              onClick={() => setFilter(tab)}
            >
              {tab === "All" ? "All Exams" : tab}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-md w-64 text-sm bg-black text-white"
        />
      </div>

      {/* Exam Cards */}
      {filteredExams.length > 0 ? (
        filteredExams.map((exam, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center mb-4"
          >
            <div className="flex items-start gap-4">
              <div className="bg-black text-white p-3 rounded-full text-xl">
                <IoNewspaper />
              </div>
              <div>
                <div className="flex gap-3 items-center mb-1">
                  <h3 className="text-[1.25rem] font-[600]">{exam.title}</h3>
                  <span
                    className={`${statusColorMap[exam.status]} text-white text-[0.75rem] font-[600] px-3 py-1 rounded-full`}
                  >
                    {exam.status}
                  </span>
                </div>
                <p className="text-[0.75rem] text-[#696969]">
                  Class: {exam.className} &nbsp;  &nbsp; Subject: {exam.subject} &nbsp;  &nbsp;
                  Due Date: {exam.dueDate}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-black text-white px-4 py-1 rounded-md text-sm font-semibold">
                Enter Marks
              </button>
              <div className="text-lg cursor-pointer border border-black p-2 rounded-md">
                <HiDotsVertical />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-sm">No exams found.</p>
      )}
    </div>
  );
};

export default AssignedExam;
