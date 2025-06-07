import React from "react";

interface QuestionReviewNavigationProps {
  totalQuestions: number;
  currentIndex: number;
  onJumpToQuestion: (index: number) => void;
  questionStatuses: ("correct" | "wrong" | "unanswered")[];
}

const QuestionReviewNavigation: React.FC<QuestionReviewNavigationProps> = ({
  totalQuestions,
  currentIndex,
  onJumpToQuestion,
  questionStatuses,
}) => {
  return (
    <div className="p-4 w-[16.5rem] rounded-xl bg-[#F5F5F7] mt-6">
      <h2 className="text-[1.5rem] font-[700] mb-3 ">Quiz Navigation</h2>
      <div className="grid grid-cols-5 gap-2 mb-4">
        {Array.from({ length: totalQuestions }).map((_, index) => {
  let bgColor = "bg-gray-300 text-black";

  if (questionStatuses[index] === "correct") {
    bgColor = "bg-green-600 text-white";
  } else if (questionStatuses[index] === "wrong") {
    bgColor = "bg-red-500 text-white";
  } else if (questionStatuses[index] === "unanswered") {
    bgColor = "bg-gray-300 text-black";
  }

  if (index === currentIndex) {
    bgColor += " ring-2 ring-black"; // optional highlight
  }

  return (
    <button
      key={index}
      onClick={() => onJumpToQuestion(index)}
      className={`w-[2.5rem] h-[2.6rem] rounded-[0.7rem] text-[1.2rem] font-[700] ${bgColor}`}
    >
      {index + 1}
    </button>
  );
})}

      </div>

      <div className="text-xs text-blue-600 underline cursor-pointer mb-2">
        Show One Page At A Time
      </div>
      <div className="text-xs text-blue-600 underline cursor-pointer">
        Finish Review
      </div>
    </div>
  );
};

export default QuestionReviewNavigation;
