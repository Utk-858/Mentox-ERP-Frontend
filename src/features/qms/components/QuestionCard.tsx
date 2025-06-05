import { IoFlagOutline } from "react-icons/io5";
import { MdOutlineTimer } from "react-icons/md";
import { useState, useEffect } from "react";

type Props = {
  question: string;
  options?: string[];
  selected?: number | null;
  onSelect: (index: number) => void;
  marks: string;
  onNext: () => void;
  onSkip: () => void;
  startTimeSeconds: number;
  onTimeUp: () => void;
  questionType: "mcq" | "subjective";
  subjectiveAnswer?: string;
  onSubjectiveChange?: (text: string) => void;
};

const QuestionCard = ({
  question,
  options = [],
  selected,
  onSelect,
  marks,
  onNext,
  onSkip,
  startTimeSeconds,
  onTimeUp,
  questionType,
  subjectiveAnswer = "",
  onSubjectiveChange = () => {},
}: Props) => {
  const [timeLeft, setTimeLeft] = useState(startTimeSeconds);

  useEffect(() => {
    setTimeLeft(startTimeSeconds);
    if (startTimeSeconds === 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timerId);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [startTimeSeconds, onTimeUp]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="rounded sm:w-[40rem] lg:w-[45rem] xl:w-[55rem] mt-[3rem]">
      <div className="bg-[#F5F5F7] p-4">
        <div className="flex justify-between mb-2">
          <div className="font-[800] text-[#000] text-[1.8rem]">Q1</div>
          <div className="text-red-500 font-[600] text-[1.2rem] flex gap-2">
            <span className="mt-[0.4rem]">
              <MdOutlineTimer />
            </span>{" "}
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm bg-[#702DFF] text-white p-1 rounded-[3rem] w-[6rem] text-center h-[1.7rem]">
            {marks} Marks
          </div>
        </div>
        <p className="mb-4 text-[1.3rem] font-[400]">{question}</p>
      </div>

      {questionType === "mcq" ? (
        <div className="grid grid-cols-2 gap-4 mt-5">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              className={`p-3 rounded-lg text-left flex items-center gap-3 font-bold cursor-pointer ${
                selected === idx
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  selected === idx
                    ? "bg-white text-purple-600"
                    : "bg-black text-white"
                }`}
              >
                {String.fromCharCode(65 + idx)}
              </div>
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <textarea
          className="w-full mt-6 p-4 rounded-lg bg-gray-100 text-black resize-none h-32 focus:outline-none"
          placeholder="Write your answer here"
          value={subjectiveAnswer}
          onChange={(e) => onSubjectiveChange(e.target.value)}
        />
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={onSkip}
          className="border px-4 py-2 rounded-[0.5rem] w-[6rem] flex gap-2 font-bold hover:bg-[#702DFF] hover:text-white cursor-pointer"
        >
          <span className="mt-1">
            <IoFlagOutline />
          </span>{" "}
          Skip
        </button>
        <button
          onClick={onNext}
          className="bg-[#702DFF] font-[600] text-white px-4 py-2 rounded-[0.5rem] cursor-pointer"
        >
          Next Question{" "}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
