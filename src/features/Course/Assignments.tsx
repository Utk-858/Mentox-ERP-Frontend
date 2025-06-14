import React from "react";
import { ClipboardList, Clock, MoreVertical } from "lucide-react";

interface AssignmentProps {
  title: string;
  status: "Pending" | "Completed" | "Missing" | "Late Submission";
  buttonLabel: string;
  statusColor: string;
  buttonColor: string;
  border?: boolean;
}

const AssignmentCard: React.FC<AssignmentProps> = ({
  title,
  status,
  buttonLabel,
  statusColor,
  buttonColor,
  border = false,
}) => {
  return (
    <div
      className={`flex justify-between items-start gap-4 p-4 rounded-xl ${
        border ? "border-2 border-blue-400" : "bg-white shadow"
      }`}
    >
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
            className={`text-white text-xs font-medium px-2 py-0.5 rounded-full ${statusColor}`}
          >
            {status}
          </span>
        </div>
        <p className="text-sm text-gray-500">
          Assess your understanding of core Physics, Chemistry, and Biology
          concepts from the first half of the term through MCQs, short answers,
          and diagrams.
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-6 text-sm text-gray-400 pt-2">
          <span className="flex items-center gap-1">
            <ClipboardList size={14} /> 15 Questions
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> Due March 15
          </span>
          <span>15 Points</span>
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

const Assignments: React.FC = () => {
  return (
    <div className="p-3 space-y-4 bg-gray-100 h-fit">
      {/* Announce box */}
      <div className="bg-white rounded-xl p-4 shadow flex items-center gap-3 text-gray-600 font-medium">
        <div className="bg-purple-200 text-purple-800 w-8 h-8 rounded-full flex items-center justify-center font-semibold">
          P
        </div>
        Announce something to your class
      </div>

      {/* Assignment Cards */}
      <AssignmentCard
        title="Science Assignment"
        status="Pending"
        buttonLabel="Submit"
        statusColor="bg-yellow-400"
        buttonColor="bg-purple-600"
      />
      <AssignmentCard
        title="Science Assignment"
        status="Completed"
        buttonLabel="Review"
        statusColor="bg-green-500"
        buttonColor="bg-black"
        border
      />
      <AssignmentCard
        title="Science Assignment"
        status="Missing"
        buttonLabel="Late Submission"
        statusColor="bg-red-500"
        buttonColor="bg-gray-500"
      />
      <AssignmentCard
        title="Science Assignment"
        status="Missing"
        buttonLabel="Submit"
        statusColor="bg-red-500"
        buttonColor="bg-gray-500"
      />
    </div>
  );
};

export default Assignments;
