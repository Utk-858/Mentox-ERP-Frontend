import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import { Send, UsersRound } from "lucide-react";
import SubmissionPanel from "../component/SubmissionPanel";

interface AssignmentData {
  title: string;
  points: number;
  assignedAgo: string;
  dueDate: string;
  description: string;
  comments: { name: string; text: string; avatar: string }[];
}

const fallbackData: AssignmentData = {
  title: "Late Submission: Simulink Onramp Course Certificate",
  points: 15,
  assignedAgo: "Assigned 4 days ago",
  dueDate: "2025-06-18T23:59:59",
  description:
    "Please submit the certificate. Only those students who missed the submission due to valid reasons should submit it.",
  comments: [
    {
      name: "Mr. Hemish Morgan",
      text: "Ok Sir Got it!",
      avatar:
        "https://res.cloudinary.com/dikylfimn/image/upload/v1750360390/Frame_1000001783_lgorcv.png",
    },
  ],
};

const Submission: React.FC = () => {
  const [submittedFile, setSubmittedFile] = useState<File | null>(null);
  const [assignment, setAssignment] = useState<AssignmentData>(fallbackData);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const res = await fetch("/api/assignment"); 
        if (!res.ok) throw new Error("API failed");
        const data = await res.json();
        setAssignment(data);
      } catch (error) {
        setAssignment(fallbackData);
      }
    };

    fetchAssignment();
  }, []);

  return (
    <div className="min-h-screen max-w-screen bg-white text-gray-800 font-sans w-full flex">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex w-full flex-col">
        <main className="w-full px-4 md:px-10 py-10 flex flex-col items-start justify-start space-y-12">
          {/* Top Search Bar */}
          <div className="relative flex w-full justify-center z-10 text-center">
            <SearchBar />
          </div>

          {/* Assignment and Submission Panels */}
          <div className="w-full flex flex-row justify-between gap-8">
            {/* Left: Assignment Info */}
            <div className="w-full lg:w-2/3 bg-white p-6">
              <div className="flex gap-4">
                <img
                  src={assignment.comments[0]?.avatar}
                  className="w-12 h-12 mt-3"
                  alt=""
                />
                <div>
                  <h2 className="text-xl xl:text-3xl font-semibold text-[#4D4E50]">
                    {assignment.title}
                  </h2>
                  <p className="text-xs xl:text-sm text-gray-500 mt-1">
                    {assignment.points} Points · {assignment.assignedAgo} · Due{" "}
                    {new Date(assignment.dueDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                  <div className="w-full bg-gray-200 mt-5 h-[1px]" />
                  <p className="mt-4 text-gray-600">{assignment.description}</p>
                  <div className="w-full bg-gray-200 mt-5 h-[1px]" />

                  {/* Class Comments */}
                  <div className="mt-6">
                    <div className="flex items-center text-[#702DFF] font-medium mb-4">
                      <UsersRound className="mr-2 h-5 w-5" />
                      <span>{assignment.comments.length} Class comments</span>
                    </div>

                    {/* Existing Comments */}
                    {assignment.comments.map((comment, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-3 mb-4"
                      >
                        <img
                          src={comment.avatar}
                          alt="User"
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {comment.name}
                          </p>
                          <p className="text-sm text-gray-600">{comment.text}</p>
                        </div>
                      </div>
                    ))}

                    {/* Add Comment Input */}
                    <div className="flex items-center mt-4 space-x-2">
                      <div className="w-8 h-8 rounded-full bg-purple-200 text-purple-800 font-bold flex items-center justify-center">
                        P
                      </div>
                      <input
                        type="text"
                        placeholder="Add class comment..."
                        className="flex-grow p-2 pl-4 border border-gray-300 rounded-full focus:outline-none focus:ring"
                      />
                      <Send className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Submission Panel */}
            <div className="xl:w-1/3 w-full">
              <SubmissionPanel dueDate={assignment.dueDate} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Submission;
