import React, { useState } from 'react';
import { Switch } from '@headlessui/react';

const Createquizpage2: React.FC = () => {
  const [quizType, setQuizType] = useState('graded'); // track quiz type
  const [marksEnabled, setMarksEnabled] = useState(true);
  const [negativeMarking, setNegativeMarking] = useState(false);
  const [questionWiseNegative, setQuestionWiseNegative] = useState(false);

  return (
    <div className="flex justify-between gap-8 bg-white p-6 rounded-lg shadow-md w-full">
      {/* Left Column */}
      <div className="flex-1">
        <h2 className="text-[1.85rem] font-[600]">Scoring and Marking Section</h2>
        <p className="text-[1.25rem] font-[400] text-[#363636] mb-6">
          Basic information about your quiz
        </p>

        {/* Quiz Type Dropdown */}
        <div className="mb-5">
          <label className="block text-[1.25rem] font-[500] mb-1">Quiz Type</label>
          <select
            value={quizType}
            onChange={(e) => setQuizType(e.target.value)}
            className="w-full bg-[#F5F5F7] text-[#555] rounded-lg px-3 py-2 text-[1.25rem] font-[500] focus:outline-none"
          >
            <option value="graded">Graded Quiz</option>
            <option value="practice">Practice Quiz</option>
          </select>
        </div>

        {/* Conditional Options */}
        {quizType === 'graded' && (
          <>
            {/* Marks per Question Toggle */}
            <div className="flex items-center justify-between mb-3">
              <label className="text-[1.25rem] font-[500]">Marks per Question</label>
              <Switch
                checked={marksEnabled}
                onChange={setMarksEnabled}
                className={`${
                  marksEnabled ? 'bg-purple-600' : 'bg-gray-400'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
              >
                <span
                  className={`${
                    marksEnabled ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                />
              </Switch>
            </div>
            <input
              disabled={!marksEnabled}
              type="text"
              placeholder="Global Marks per Question"
              className={`w-full px-3 py-2 rounded-lg text-[1.25rem] font-[500] text-[#555] outline-none mb-4 ${
                marksEnabled ? 'bg-[#F5F5F7] text-black' : 'bg-[#F5F5F7] text-gray-400 cursor-not-allowed'
              }`}
            />

            {/* Negative Marking Toggle */}
            <div className="flex items-center justify-between mb-3">
              <label className="text-[1.25rem] font-[500]">Negative Marking</label>
              <Switch
                checked={negativeMarking}
                onChange={setNegativeMarking}
                className={`${
                  negativeMarking ? 'bg-purple-600' : 'bg-gray-400'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
              >
                <span
                  className={`${
                    negativeMarking ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                />
              </Switch>
            </div>
            <input
              disabled={!negativeMarking}
              type="text"
              placeholder="Global Deduction"
              className={`w-full px-3 py-2 rounded-lg text-[1.25rem] font-[500] text-[#555] outline-none mb-4 ${
                negativeMarking ? 'bg-[#F5F5F7] text-black' : 'bg-[#F5F5F7] text-gray-400 cursor-not-allowed'
              }`}
            />

            {/* Question-Wise Negative Marking Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-[1.25rem] font-[500]">Question-Wise Negative Marking</label>
              <Switch
                checked={questionWiseNegative}
                onChange={setQuestionWiseNegative}
                className={`${
                  questionWiseNegative ? 'bg-purple-600' : 'bg-gray-400'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
              >
                <span
                  className={`${
                    questionWiseNegative ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                />
              </Switch>
            </div>
          </>
        )}
      </div>

      {/* Right Column - Info Box */}
      <div className="w-[18rem] h-fit border border-[#000] rounded-lg px-4 py-3 text-[1rem] font-[500] text-[#363636] mt-24">
        <p className="mb-2">
          <strong>Graded Quiz</strong> : Quiz has scoring (Global / Question-wise)
        </p>
        <p>
          <strong>Practice Quiz</strong> : Quiz has no scoring, purely for self-assessment
        </p>
      </div>
    </div>
  );
};

export default Createquizpage2;
