import React, { lazy } from "react";
import { useState } from "react";
const QuestionCard = lazy(() => import("../components/QuestionCard"));
const Sidebar = lazy(() => import("../../../components/Sidebar"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
const QuestionNavigation = lazy(
  () => import("../components/QuestionNavigation")
);
const Quizattempt: React.FC = () => {
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
  // const [subjectiveAnswer, setSubjectiveAnswer] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>(
    () => Array(quizData.questions.length).fill(null)
  );

  const selectedOption = selectedOptions[currentIndex];

  const [subjectiveAnswers, setSubjectiveAnswers] = useState<string[]>(
    new Array(quizData.questions.length).fill("")
  );
  const [attempted, setAttempted] = useState<boolean[]>(
    new Array(quizData.questions.length).fill(false)
  );

  const handleSelectOption = (index: number) => {
    const updated = [...selectedOptions];
    updated[currentIndex] = index;
    setSelectedOptions(updated);
  };

  const goToNext = () => {
    const currentQuestion = quizData.questions[currentIndex];

    if (
      (currentQuestion.questionType === "mcq" && selectedOption !== null) ||
      (currentQuestion.questionType === "subjective" &&
        subjectiveAnswers[currentIndex]?.trim())
    ) {
      const updated = [...attempted];
      updated[currentIndex] = true;
      setAttempted(updated);
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const handleSkip = () => {
    const updated = [...selectedOptions];
    updated[currentIndex] = null;
    setSelectedOptions(updated);
    goToNext();
  };

  return (
    <div className="min-h-screen max-w-screen flex ">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col max-w-6xl">
        <div className="relative flex w-full justify-center z-10 text-center mt-8 mb-4">
            <Searchbar />
          </div>
        <div className="mt-[2rem] ml-[4.5rem]">
          <div className="sm:text-[2.2rem] lg:text-[2.5rem] xl:text-[3rem]  font-[600] leading-[1.3rem] ">
            {quizData.title}
          </div>
          <div className="flex gap-3">
            <div>
              <QuestionCard
                question={quizData.questions[currentIndex].question}
                options={quizData.questions[currentIndex].options}
                selected={selectedOption}
                marks={String(quizData.questions[currentIndex].marks)}
                onSelect={handleSelectOption}
                onNext={goToNext}
                onSkip={handleSkip}
                startTimeSeconds={90}
                onTimeUp={() => alert("Time is up! Moving to next question.")}
                questionType={
                  quizData.questions[currentIndex].questionType as
                    | "mcq"
                    | "subjective"
                }
                subjectiveAnswer={subjectiveAnswers[currentIndex]}
                onSubjectiveChange={(text) => {
                  const updated = [...subjectiveAnswers];
                  updated[currentIndex] = text;
                  setSubjectiveAnswers(updated);
                }}
              />
            </div>
            <div>
              <QuestionNavigation
                totalQuestions={quizData.questions.length}
                currentIndex={currentIndex}
                onJumpToQuestion={(index) => setCurrentIndex(index)}
                answered={attempted}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Quizattempt;
