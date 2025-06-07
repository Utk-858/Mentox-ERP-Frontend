import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

type Props = {
  index: number;
  question: {
    question: string;
    questionType: "mcq" | "subjective";
    options?: string[];
    marks: number;
  };
  userAnswer: string;
  evaluated: {
    correctAnswer?: string;
    expectedAnswer?: string;
    marksAwarded: number;
  };
};

const QuestionReviewCard: React.FC<Props> = ({ index, question, userAnswer, evaluated }) => {
  const isCorrect = question.questionType === "mcq" && evaluated.correctAnswer === userAnswer;

  return (
    <div className="bg-white p-4 rounded-xl sm:w-[45rem] lg:w-[51rem] xl:min-w-[58rem] ">
        <div className=" bg-[#F5F5F7] p-4 rounded-[0.6rem]">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-[1.7rem]">Q{index + 1}</h2>
        <div
          className={`font-[700] text-[1.8rem] ${
            isCorrect ? "text-[#000]" : "text-[#000]"
          }`}
        >
          {isCorrect ? "Correct Answer" : "Wrong Answer"}
        </div>
        <div className="text-sm bg-[#702DFF] text-white p-1 rounded-[3rem] w-[6rem] text-center h-[1.7rem]">
            {question.marks} Marks
          </div>
        {/* <div className="bg-purple-600 text-white rounded-full px-3 py-1 text-sm">
          {question.marks} Marks
        </div> */}
      </div>

      <p className="mt-2 text-gray-700 text-[1.2rem]">{question.question}</p>
        </div>
     {question.questionType === "mcq" && question.options && (
  <div className="mt-5 grid grid-cols-2 gap-3 text-[1rem] font-bold w-full">
    {question.options.map((opt, i) => {
      const isUserSelected = opt === userAnswer;
      const isCorrectAnswer = opt === evaluated.correctAnswer;

      const optionLetter = String.fromCharCode(65 + i); // A, B, C, D...

      let bgColor = "bg-gray-100";
      let borderColor = "";
      let rightIcon = null;

      if (isCorrectAnswer) {
        bgColor = "bg-green-100";
        borderColor = "border border-green-600";
        rightIcon = (
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle size={18} />
            <span className="text-sm font-medium">Correct Answer</span>
          </div>
        );
      }

      if (isUserSelected && !isCorrectAnswer) {
        bgColor = "bg-red-100";
        borderColor = "border border-red-600";
        rightIcon = (
          <div className="flex items-center gap-1 text-red-600">
            <XCircle size={18} />
            <span className="text-sm font-medium">Selected</span>
          </div>
        );
      }

      return (
        <div
          key={i}
          className={`flex justify-between items-center px-5 py-3 rounded-lg w-full h-[4.5rem] ${bgColor} ${borderColor}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-sm">
              {optionLetter}
            </div>
            <span>{opt}</span>
          </div>
          {rightIcon}
        </div>
      );
    })}
  </div>
)}



     {question.questionType === "subjective" && (
  <div className="mt-5 flex flex-col md:flex-row gap-5">
    {/* Expected Answer */}
    <div className="flex-1 bg-gray-100 rounded-lg p-4 max-h-40 overflow-y-auto shadow-sm">
      <p className="font-bold mb-1">Expected Answer :</p>
      <p className="text-gray-700 text-sm whitespace-pre-wrap">
        {evaluated.expectedAnswer}
      </p>
    </div>

    {/* Your Answer */}
    <div className="flex-1 bg-gray-100 rounded-lg p-4 max-h-40 overflow-y-auto shadow-sm">
      <p className="font-bold mb-1">Your Answer :</p>
      <p className="text-gray-700 text-sm whitespace-pre-wrap">
        {userAnswer}
      </p>
    </div>
  </div>
)}


      <div className="mt-5 flex justify-between text-gray-700 font-medium w-full bg-[#F5F5F7] h-[3rem] rounded-[0.9rem] p-2">
  <div className="text-[1.2rem] font-[400]">
    Time Taken: <span className="font-[500]">30s</span>
  </div>
  <div className="text-[1.2rem] font-[400]">
    Marks Awarded: <span className="font-[500]">{evaluated.marksAwarded}/{question.marks}</span>
  </div>
</div>
    </div>
  );
};

export default QuestionReviewCard;
