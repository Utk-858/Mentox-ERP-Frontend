import React from "react";
import { MoreVertical } from "lucide-react";

const CourseCardList: React.FC = () => {
  return (
    <div className="space-y-6 bg-gray-100 p-4 rounded-2xl w-full max-w-screen mx-auto font-sans">
      {/* Card 1 - Quiz */}
      <div className="bg-white shadow rounded-2xl p-6 flex justify-between items-start">
        <div>
          <div className="flex gap-5">
            <img src="/Frame 1000001783 (1).png" alt="Quiz Icon" className="w-11 h-11 mt-1" />
            <div>
              <h3 className="font-semibold text-xl text-gray-800 flex items-center">
                Science Mid-term Quiz
                <span className="ml-3 text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full">
                  Active
                </span>
              </h3>
              <p className="text-base text-[#8EA3C1] mt-2 max-w-xl">
                Assess your understanding of core Physics, Chemistry, and Biology concepts from the
                first half of the term through MCQs, short answers, and diagrams.
              </p>
            </div>
          </div>
          <div className="flex gap-6 ml-15 text-base text-gray-400 mt-4">
            <div>15 Questions</div>
            <div>20 min</div>
            <div>Start Time - 2:00 pm</div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
          <button className="bg-[#702DFF] text-white text-base px-5 py-2 rounded-md hover:bg-[#702DFF]">
            Attempt
          </button>
          <MoreVertical className="text-gray-400" />
        </div>
      </div>
{/* Card 2 - Course */}
<div className="bg-white shadow rounded-2xl p-6 flex justify-between items-start">
  <div className="flex gap-6">
    <div className="flex flex-col items-start gap-2">
      <div className="bg-gray-200 w-66 h-34 rounded-md flex-shrink-0" />
      <div className="text-base flex gap-20 text-gray-400">
        <p>4.6 Rating</p>
        <p>166.1k Enrolled</p> 
      </div>
    </div>
    <div>
      <h3 className="font-semibold text-lg text-gray-800 max-w-lg">
        Python Course for Beginners with Certifications: Mastering Essentials
      </h3>
      <p className="text-base text-[#8EA3C1] mt-2 line-clamp-2 max-w-lg">
        Welcome to the free Python course with certificate for beginners, designed to help you
        kickstart your programming journey. This comprehensive Python course online offers a...
      </p>
      <div className="flex gap-6 text-base text-gray-400 mt-4 items-center">
        <div>12 Modules</div>
        <div>95 Lessons</div>
      </div>
      <p className="text-base text-gray-400 mt-1">By Rahul Janghu</p>
    </div>
  </div>
  <div className="flex flex-col items-end gap-3">
    <button className="bg-[#702DFF] text-white text-base px-5 py-2 rounded-md hover:bg-[#702DFF]">
      Start learning
    </button>
    <MoreVertical className="text-gray-400" />
  </div>
</div>

      {/* Card 3 - Assignment */}
      <div className="bg-white shadow rounded-2xl p-6 flex justify-between items-start">
        <div>
          <div className="flex gap-5">
            <img src="/Frame 1000001783 (2).png" alt="Assignment Icon" className="w-11 h-11 mt-1" />
            <div>
              <h3 className="font-semibold text-xl text-gray-800 flex items-center">
                Science Assignment
                <span className="ml-3 text-sm bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
                  Pending
                </span>
              </h3>
              <p className="text-base text-[#8EA3C1] mt-2 max-w-xl">
                Assess your understanding of core Physics, Chemistry, and Biology concepts from the
                first half of the term through MCQs, short answers, and diagrams.
              </p>
            </div>
          </div>
          <div className="flex ml-16 gap-6 text-base text-gray-400 mt-4">
            <div>15 Questions</div>
            <div>Due March 15</div>
            <div>15 Points</div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
          <button className="bg-[#702DFF] text-white text-base px-5 py-2 rounded-md hover:bg-[#702DFF]">
            Submit
          </button>
          <MoreVertical className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default CourseCardList;
