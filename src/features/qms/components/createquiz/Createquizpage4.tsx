// Createquizpage4.tsx
import React, { useState } from 'react';
import QuestionCard from './QuestionCard';

const Createquizpage4: React.FC = () => {
  const [questions, setQuestions] = useState<number[]>([0]); // store indices or IDs

  const addQuestion = () => {
    setQuestions([...questions, questions.length]);
  };

  const removeQuestion = (indexToRemove: number) => {
    setQuestions(questions.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full mx-auto">
      <div className="mb-4">
        <h2 className="text-[1.85rem] font-[600]">Quiz Questions</h2>
        <p className="text-[#363636] text-[1.25rem] font-[400]">Create and manage your quiz questions</p>
      </div>

      {questions.map((_, index) => (
        <QuestionCard
          key={index}
          index={index}
          onDelete={() => removeQuestion(index)}
        />
      ))}

      <div
        onClick={addQuestion}
        className="mt-6 border-dashed border-2 border-[#000] bg-white rounded-md py-3 text-center text-[#000] text-[1.25rem] font-[600] hover:bg-gray-100 cursor-pointer"
      >
        + Add Question
      </div>
    </div>
  );
};

export default Createquizpage4;
