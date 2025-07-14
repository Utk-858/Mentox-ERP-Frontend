import React from "react";
import { ClipboardList, Clock, Calendar, MoreVertical } from "lucide-react";

interface QuizCardProps {
  title: string;
  status: "Active" | "Upcoming" | "Completed";
  description: string;
  questions: number;
  duration: string;
  date: string;
  metaRight: string;
  buttonLabel: string;
  badgeColor: string;
  buttonColor: string;
}

const QuizCard: React.FC<QuizCardProps> = ({
  title,
  status,
  description,
  questions,
  duration,
  date,
  metaRight,
  buttonLabel,
  badgeColor,
  buttonColor,
}) => {
  return (
    <div className="flex justify-between items-start gap-4 p-4 rounded-xl bg-white shadow">
      {/* Icon */}
      <div className="flex-shrink-0 mt-1">
        <div className="bg-black text-white p-2 rounded-full">
          <ClipboardList size={20} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-lg">{title}</h2>
          <span
            className={`text-white text-xs font-medium px-2 py-0.5 rounded-full ${badgeColor}`}
          >
            {status}
          </span>
        </div>
        <p className="text-sm text-gray-500">{description}</p>

        {/* Meta info */}
        <div className="flex items-center gap-6 text-sm text-gray-400 pt-2 flex-wrap">
          <span className="flex items-center gap-1">
            <ClipboardList size={14} /> {questions} Questions
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {duration}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {date}
          </span>
          <span className="text-black font-medium">{metaRight}</span>
        </div>
      </div>

      {/* Button + Options */}
      <div className="flex flex-col items-end gap-2">
        <button
          className={`text-white px-4 py-1 text-sm rounded-md font-medium ${buttonColor}`}
        >
          {buttonLabel}
        </button>
        <MoreVertical size={20} className="text-gray-500 cursor-pointer" />
      </div>
    </div>
  );
};

const QuizList: React.FC = () => {
  return (
    <div className="p-3 space-y-4 bg-gray-100 ">
      {/* Announcement Box */}
      <div className="bg-white rounded-xl p-4 shadow flex items-center gap-3 text-gray-600 font-medium">
        <div className="bg-purple-200 text-purple-800 w-8 h-8 rounded-full flex items-center justify-center font-semibold">
          P
        </div>
        Announce something to your class
      </div>

      {/* Quiz Cards */}
      <QuizCard
        title="Science Mid-term Quiz"
        status="Active"
        description="Assess your understanding of core Physics, Chemistry, and Biology concepts from the first half of the term through MCQs, short answers, and diagrams."
        questions={15}
        duration="20 min"
        date="15 March"
        metaRight="Start Time – 2:00 pm"
        buttonLabel="Attempt"
        badgeColor="bg-green-500"
        buttonColor="bg-purple-600"
      />
      <QuizCard
        title="Mathematics Weekly Test"
        status="Upcoming"
        description="Assess your understanding of core Physics, Chemistry, and Biology concepts from the first half of the term through MCQs, short answers, and diagrams."
        questions={15}
        duration="20 min"
        date="15 March"
        metaRight="Start Time – 2:00 pm"
        buttonLabel="Instruction"
        badgeColor="bg-black"
        buttonColor="bg-black"
      />
      <QuizCard
        title="Mathematics Weekly Test"
        status="Completed"
        description="Assess your understanding of core Physics, Chemistry, and Biology concepts from the first half of the term through MCQs, short answers, and diagrams."
        questions={15}
        duration="20 min"
        date="15 March"
        metaRight="Grade – 10/15"
        buttonLabel="Review"
        badgeColor="bg-sky-500"
        buttonColor="bg-sky-500"
      />
    </div>
  );
};

export default QuizList;
