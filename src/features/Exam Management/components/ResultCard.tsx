import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { IoNewspaper } from "react-icons/io5";

export type ExamStatus = "Unit Test" | "Mid-Term" | "End-Term";

export interface Exam {
  title: string;
  className: string;
  subject: string;
  dueDate: string;
  status: "Completed";
  type: ExamStatus;
}

type FilterType = "All" | ExamStatus;

interface ExamCardListProps {
  exams: Exam[];
}

const ResultCard: React.FC<ExamCardListProps> = ({ exams }) => {
  const [filter, setFilter] = useState<FilterType>("All");
  const [search, setSearch] = useState("");

  const filteredExams = exams.filter((exam) => {
    const matchType = filter === "All" || exam.type === filter;
    const matchSearch =
      exam.title.toLowerCase().includes(search.toLowerCase()) ||
      exam.subject.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="p-6 bg-[#F5F5F7] rounded-xl font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[1.5rem] font-[600]">Recent Exams</h2>
        <p className="font-[500] text-[1.25rem]">
          Academic Year : <span className=" text-[#363636]">2024–25</span>
        </p>
      </div>

      {/* Tabs + Search */}
      <div className="flex justify-between flex-wrap items-center mb-6 gap-2">
        <div className="flex bg-black p-1 rounded-[0.5rem] text-white">
          {["All", "Unit Test", "Mid-Term", "End-Term"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as FilterType)}
              className={`px-4 py-1 text-sm font-semibold rounded-md ${
                filter === tab ? "bg-[#702DFF]" : "bg-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative">
          <IoSearch className="absolute top-3 left-3 text-white text-lg" />
          <input
            type="text"
            placeholder="Search Exams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-md bg-black text-white text-sm w-64"
          />
        </div>
      </div>

      {/* Cards */}
      {filteredExams.map((exam, index) => (
        <div
          key={index}
          className="bg-white flex justify-between items-center p-4 rounded-md mb-4"
        >
          <div className="flex items-start gap-4">
            <div className="bg-black text-white p-3 rounded-full text-xl">
              <IoNewspaper />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-[1.25rem] font-[600]">{exam.title}</h3>
                <span className="bg-[#22C55E] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {exam.status}
                </span>
              </div>
              <p className="text-[0.75rem] font-[400] text-[#696969]">
                <strong>Class:</strong> {exam.className} &nbsp;{" "}
                <strong>Subject:</strong> {exam.subject} &nbsp;
                <strong>Due Date:</strong> {exam.dueDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="bg-black text-white px-4 py-2 rounded text-sm font-semibold">
              View Result
            </button>
            <div className="p-2 border border-black rounded text-lg cursor-pointer">
              <HiDotsVertical />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultCard;
