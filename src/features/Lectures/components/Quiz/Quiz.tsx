import React, { useState } from "react";
import { AlignJustify, Clock, ExternalLink, Home, RefreshCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { questions } from "./questions/questions";



const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});

  const handleOptionClick = (index: number) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQuestion + 1]: index + 1 }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      alert("Quiz Completed!");
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const question = questions[currentQuestion];
  const selectedOption = selectedAnswers[question.id];
  const correctAnswer = question.answer;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="bg-purple-200 w-20 flex flex-col items-center py-4 space-y-6">
        <img src="/test6.png" alt="Logo" className="w-16 h-16" />
        <Home className="text-purple-900 w-6 h-6" />
        <div className="space-y-4 text-sm font-medium text-purple-900">
          {questions.map((_, idx) => (
            <p key={idx}>Q{idx + 1}</p>
          ))}
        </div>
        <RefreshCcw className="mt-auto text-purple-900 w-6 h-6" />
      </aside>

      <div className="flex-1">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium">QUIZ</span>
              </div>
              <span className="text-gray-400">Challenge 1 - DBMS</span>
            </div>

            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm">
                <Clock className="w-4 h-4" />
                <span>00:04:16</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm">
                <AlignJustify className="w-4 h-4" />
                <span>Course Content</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm">
                <ExternalLink className="w-4 h-4" />
                <span>Exit Challenge</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <span className="bg-purple-200 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
              QUIZ
            </span>
            <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">
              Single Choice Question
            </span>
            <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">
              Easy
            </span>
          </div>

          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {question.id}. Topics | DBMs - Introduction - {question.id}
            </h2>
            <p className="text-gray-700 mb-6">{question.question}</p>

            <div className="space-y-3">
              {question.options.map((option, index) => {
                const optionNumber = index + 1;
                const isCorrect = correctAnswer === optionNumber;
                const isSelected = selectedOption === optionNumber;

                return (
                  <div
                    key={index}
                    className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                      isSelected
                        ? isCorrect
                          ? 'bg-green-100 border-green-300'
                          : 'bg-red-100 border-red-300'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                    onClick={() => handleOptionClick(index)}
                  >
                    <div className="flex-1">
                      <p className="text-gray-700">{option}</p>
                    </div>
                    <div className="ml-4">
                      {isSelected && isCorrect ? (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ) : isSelected ? (
                        <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pagination Navigation */}
          <div className="flex justify-center items-center space-x-4">
            <button
              className="bg-purple-100 p-2 rounded cursor-pointer"
              onClick={handlePrev}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="text-purple-600" />
            </button>
            <div className="text-sm font-medium text-gray-700">
              {question.id} / {questions.length}
            </div>
            <button
              className="bg-purple-100 p-2 rounded cursor-pointer"
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1}
            >
              <ChevronRight className="text-purple-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
