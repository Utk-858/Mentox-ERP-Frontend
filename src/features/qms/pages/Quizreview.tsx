import React from "react";
import SummaryStats from "../components/Summarystats";
import QuestionReviewCard from "../components/QuestionReviewCard";
import QuestionReviewNavigation from "../components/QuestionReviewNavigation";
import MentoxBanner from "../components/MentoxBanner";

const quizData = {
  title: "Science & Technology Quiz",
  questions: [
    {
      question:
        "Which energy source cannot be replenished naturally on a human timescale?",
      questionType: "mcq",
      options: [
        "Solar Power",
        "Wind Power",
        "Natural Gas",
        "Hydroelectric Power",
      ],
      marks: 5,
    },
    {
      question: "Explain the working of a nuclear reactor.",
      questionType: "subjective",
      marks: 10,
    },
    {
      question: "Which planet is known as the Red Planet?",
      questionType: "mcq",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      marks: 5,
    },
    {
      question: "Describe the greenhouse effect in detail.",
      questionType: "subjective",
      marks: 8,
    },
    {
      question: "Which gas is most abundant in Earth's atmosphere?",
      questionType: "mcq",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      marks: 5,
    },
  ],
};

const userAnswers = [
  "Natural Gas", // Q1 (correct)
  "Answer about nuclear reactor...", // Q2
  "Mars", // Q3 (correct)
  "Some greenhouse explanation", // Q4
  "Oxygen", // Q5 (wrong)
];

const evaluatedAnswers = [
  { correctAnswer: "Natural Gas", marksAwarded: 5 },
  { expectedAnswer: "Expected answer...", marksAwarded: 6 },
  { correctAnswer: "Mars", marksAwarded: 5 },
  { expectedAnswer: "Greenhouse gases explanation", marksAwarded: 4 },
  { correctAnswer: "Nitrogen", marksAwarded: 0 },
];

const QuizReviewPage: React.FC = () => {
  const totalMarks = evaluatedAnswers.reduce(
    (sum, a) => sum + a.marksAwarded,
    0
  );
  const maxMarks = quizData.questions.reduce((sum, q) => sum + q.marks, 0);

  return (
    <div className="min-h-screen w-full flex px-8 ">
      <div className=" w-[13rem]"></div>
      <div className="w-full">
        <h1 className="sm:text-[2.2rem] lg:text-[2.2rem] xl:text-[2.5rem] font-bold text-center">
          {quizData.title}
        </h1>
        <div className="flex gap-2">
          <div className="flex flex-col">
            <div>
            <SummaryStats
              totalMarks={totalMarks}
              maxMarks={maxMarks}
              time="12 min"
              averageMarks="15/30"
              topScore="30/30"
            />
            </div>
            <div className="flex  ">
          <div className="flex-1 space-y-2">
            {quizData.questions.map((q, idx) => (
              <QuestionReviewCard
                key={idx}
                index={idx}
                question={{
                  ...q,
                  questionType: q.questionType as "mcq" | "subjective",
                }}
                userAnswer={userAnswers[idx]}
                evaluated={evaluatedAnswers[idx]}
              />
            ))}
          </div>
        </div>

          </div>
          <div className="flex flex-col gap-8">
            <div>
              <QuestionReviewNavigation
                totalQuestions={quizData.questions.length}
                questionStatuses={evaluatedAnswers.map((ea) => {
                  if (ea.marksAwarded === undefined) return "unanswered";
                  return ea.marksAwarded > 0 ? "correct" : "wrong";
                })}
                onJumpToQuestion={() => {}}
                currentIndex={-1}
              />
            </div>
            <div>
              <MentoxBanner />
            </div>
          </div>
        </div>
        {/* <SummaryStats
          totalMarks={totalMarks}
          maxMarks={maxMarks}
          time="12 min"
          averageMarks="15/30"
          topScore="30/30"
        /> */}

        {/* <div className="flex  ">
          <div className="flex-1 space-y-2">
            {quizData.questions.map((q, idx) => (
              <QuestionReviewCard
                key={idx}
                index={idx}
                question={{
                  ...q,
                  questionType: q.questionType as "mcq" | "subjective",
                }}
                userAnswer={userAnswers[idx]}
                evaluated={evaluatedAnswers[idx]}
              />
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default QuizReviewPage;
