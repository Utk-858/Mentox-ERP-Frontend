type QuestionNavigationProps = {
  totalQuestions: number;
  currentIndex: number;
  onJumpToQuestion: (index: number) => void;
  answered: boolean[];
};

const QuestionNavigation = ({
  totalQuestions,
  currentIndex,
  onJumpToQuestion,
  answered,
}: QuestionNavigationProps) => (
  <div className="bg-gray-100 p-4 rounded shadow mt-[3rem] sm:w-[18rem] lg:w-[20rem] xl:w-[25rem]">
    <h3 className="font-[700] text-[1.5rem] mb-2">Quiz Navigation</h3>
    <div className="grid grid-cols-5 gap-y-4">
      {Array.from({ length: totalQuestions }).map((_, idx) => {
        const isCurrent = idx === currentIndex;
        const isAnswered = answered[idx]; // since answered is boolean[]

        let bgColor = "bg-[#D9D9D9]"; // default: unanswered

        if (isAnswered) {
          bgColor = "bg-green-500";
        }

        if (isCurrent) {
          bgColor = "bg-[#17A1FA]"; // current always overrides
        }

        return (
          <button
            key={idx}
            onClick={() => onJumpToQuestion(idx)}
            className={`w-10 h-10 rounded font-bold shadow text-white ${bgColor}`}
          >
            {idx + 1}
          </button>
        );
      })}
    </div>
  </div>
);

export default QuestionNavigation;
