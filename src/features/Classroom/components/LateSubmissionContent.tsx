import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Link } from "react-router-dom";

const LateSubmissionContent: React.FC = () => {
  const [comment, setComment] = useState<string>('');

  return (
    <div className="w-full max-w-4xl bg-white p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex  items-start space-x-3">
          <img src="/Frame 1000001783 (2).png" alt="" className="w-10 sm:w-auto" />
          <div className="flex-1">
            <h1 className="text-2xl  xl:text-4xl font-medium text-[#4D4E50] mb-1">
              Late Submission: Simulink Onramp Course Certificate
            </h1>
            <div className="flex items-center space-x-6 text-sm sm:text-base text-gray-500 mb-1">
              <div className="gap-4 flex">
                <span>Mr. Pushpendra Gupta</span>
                <span>Posted 10/01/2025</span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm sm:text-base text-gray-500 mt-1">
                10 Points
              </div>
              <div className="text-sm sm:text-base text-gray-500 font-medium">
                Due 15 March
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-6 text-sm ml-13 sm:text-base text-[#606060] border-t py-3 border-[#606060d6] leading-relaxed max-w-3xl">
        Complete the assigned task within the given deadline. Ensure all instructions are followed
        carefully and submit your work in the required format. Late submissions will not be
        accepted unless prior approval is granted.
      </div>

      {/* File Display */}
      <div className="flex border p-2 w-50 ml-13 rounded-sm border-[#60606068] items-center space-x-3 mb-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded flex items-center justify-center">
          {/* Optional file icon */}
        </div>
        <div className="text-sm text-gray-700 font-medium">
          Hello.pdf
          <p className='text-xs text-gray-400'>PDF</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mb-8 max-w-3xl border-t ml-13 border-[#60606098]">
        <div className="flex items-center mt-5 space-x-2 mb-4">
          <img src="/Group (1).png" alt="" className="w-5 sm:w-auto" />
          <span className="text-sm text-[#702DFF] font-medium">Add Class Comments</span>
        </div>

        <div className="flex items-start space-x-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#6f2dff97] rounded-full flex items-center justify-center text-sm font-medium">
            P
          </div>
          <div className="flex w-full max-w-4xl gap-2 sm:gap-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add class comment..."
              className="w-full p-2 text-sm text-gray-400 border rounded-sm focus:outline-none bg-transparent"
            />
            <img className='w-7 h-6 sm:w-10 sm:h-8' src="/Vector (4).png" alt="" />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end mt-8">
        <Link to="/classroom/submission/view">
          <button className="bg-[#702DFF] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm font-medium">
            Review work
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LateSubmissionContent;
