// QuizListSection.tsx
import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { IoBook } from "react-icons/io5";


type QuizStatus = "Active" | "Upcoming" | "Completed";

interface Quiz {
  title: string;
  desc: string;
  questions: number;
  duration: number;
  time: string;
  status: QuizStatus;
}

const quizzes: Quiz[] = [
  {
    title: "Science Mid-term Quiz",
    desc: "Basic concepts of biology for beginners",
    questions: 15,
    duration: 30,
    time: "2:00 PM",
    status: "Active",
  },
  {
    title: "Mathematics Weekly Test",
    desc: "Basic concepts of biology for beginners",
    questions: 8,
    duration: 20,
    time: "2:00 PM",
    status: "Upcoming",
  },
  {
    title: "Chemistry Quiz #3",
    desc: "Basic concepts of biology for beginners",
    questions: 12,
    duration: 25,
    time: "2:00 PM",
    status: "Completed",
  }
];

const statusColors: Record<QuizStatus, string> = {
  Active: "bg-[#22C55E] text-white",
  Upcoming: "bg-black text-white",
  Completed: "bg-[#17A1FA] text-white",
};

const buttonColors: Record<QuizStatus, string> = {
  Active: "bg-[#702DFF]",
  Upcoming: "bg-black",
  Completed: "bg-[#17A1FA]",
};

const buttonText: Record<QuizStatus, string> = {
  Active: "Attempt",
  Upcoming: "Manage",
  Completed: "Review",
};

const Quizlistsection: React.FC = () => {
  const [activeFilter, setFilter] = useState<"All" | QuizStatus>("All");
  const [search, setSearch] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filtered = quizzes.filter((quiz) => {
    const matchStatus = activeFilter === "All" || quiz.status === activeFilter;
    const matchSearch = quiz.title.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="bg-[#F5F5F7] p-6 rounded-[0.9rem] w-[68rem] space-y-6">
      <div className="flex flex-col ">
        <div className="text-[1.5rem] font-[600] ">Event Calendar</div>
        <div className="text-[0.9rem] text-[#363636] font-[400]">
          View and manage your scheduled quiz events
        </div>
        <div className="flex justify-between">
       <div className="flex bg-black rounded-[0.5rem] h-[2.5rem]  w-[22rem] mt-4 p-1">
  {["All", "Active", "Upcoming", "Completed"].map((f) => (
    <button
      key={f}
      onClick={() => setFilter(f as "All" | QuizStatus)}
      className={`px-4 py-1 text-sm font-medium transition-all duration-200
        ${activeFilter === f 
          ? "bg-purple-500 text-white" 
          : "bg-black text-white hover:bg-gray-800"} 
        rounded-[0.5rem]`}
    >
      {f}
    </button>
  ))}
</div>

        
        <div className="flex flex-col md:flex-row justify-between gap-3 text-white h-[2.5rem] mt-4">
          <input
            type="text "
            placeholder="Search events..."
            className="border text-[#FFF] bg-black px-3 rounded-[0.5rem] text-sm  "
            value={search}
            onChange={handleSearchChange}
          />
          <select className="bg-black text-white text-[0.9rem] rounded-[0.5rem] px-3 py-2 w-[12rem]">
            <option>All Quizzes</option>
            <option>My Quizzes</option>
          </select>
        </div>
      </div>
      
        </div>
      <div className="space-y-4">
  {filtered.map((quiz, i) => (
    <div
      key={i}
      className="bg-white rounded-lg p-4 flex justify-between items-center shadow-sm"
    >
      {/* Left side: quiz info */}
      <div>
        <div className="flex items-start gap-4">
  {/* Icon on the left */}
  <span className="bg-black text-white text-[1.5rem] p-2 rounded-full mt-4">
    <IoBook />
  </span>

  {/* Quiz Info on the right */}
  <div className="flex-1">
    <div className="flex gap-2 items-center mb-1">
      <h3 className="text-lg font-semibold">{quiz.title}</h3>
      <span
        className={`text-xs px-2 py-1 rounded-full ${statusColors[quiz.status]}`}
      >
        {quiz.status}
      </span>
    </div>
    <p className="text-sm text-gray-500">{quiz.desc}</p>
    <div className="flex gap-4 text-xs text-gray-400 mt-2">
      <span>📘 {quiz.questions} Questions</span>
      <span>⏱️ {quiz.duration} min</span>
      <span>🕒 Start Time: {quiz.time}</span>
    </div>
  </div>
</div>

      </div>

      {/* Right side: action button */}
      <div className="flex gap-2 items-center">
        <button
          className={`${buttonColors[quiz.status]} text-white text-sm px-4 py-1.5 rounded-md`}
        >
          {buttonText[quiz.status]}
        </button>
        <button className="border rounded-[0.5rem] w-8 h-8 flex items-center justify-center">
          <span className="text-xl font-bold">⋮</span>
        </button>
      </div>
    </div>
  ))}
</div>

      
    
    
    </div>
  );
};

export default Quizlistsection;
