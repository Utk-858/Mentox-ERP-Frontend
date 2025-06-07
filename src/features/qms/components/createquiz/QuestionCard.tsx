// QuestionCard.tsx
import React, { useEffect, useState } from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
type Option = { text: string; isCorrect: boolean };
type QuestionType = 'Multiple Choice' | 'Single Choice' | 'True/False' | 'Short Answer';

type Props = {
  index: number;
  onDelete: () => void;
};

const QuestionCard: React.FC<Props> = ({ index, onDelete }) => {
  const [questionText, setQuestionText] = useState('');
  const [marks, setMarks] = useState(10);
  const [questionType, setQuestionType] = useState<QuestionType>('Multiple Choice');
  const [options, setOptions] = useState<Option[]>([{ text: '', isCorrect: false }]);
  const [expectedAnswer, setExpectedAnswer] = useState('');
  const [negativeMarking, setNegativeMarking] = useState(false);
  const [timeToAttempt, setTimeToAttempt] = useState(0);

  useEffect(() => {
    if (questionType === 'True/False') {
      setOptions([
        { text: 'True', isCorrect: false },
        { text: 'False', isCorrect: false },
      ]);
    } else if (questionType === 'Short Answer') {
      setOptions([]);
    } else {
      setOptions([{ text: '', isCorrect: false }]);
    }
  }, [questionType]);

  const updateOption = (i: number, key: keyof Option, value: string | boolean) => {
    const updated = [...options];
    updated[i][key] = value as never;
    setOptions(updated);
  };

  const addOption = () => {
    if (questionType !== 'True/False') {
      setOptions([...options, { text: '', isCorrect: false }]);
    }
  };

  const removeOption = (i: number) => {
    if (questionType !== 'True/False') {
      setOptions(options.filter((_, idx) => idx !== i));
    }
  };

  return (
    <div className="bg-[#F5F5F7] p-5 rounded-xl border shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[1.5rem] font-[600]">Question {index + 1}</h3>
        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <label className="text-[1.25rem] font-[600]">Marks</label>
            <input
              type="number"
              className="border bg-white border-[#000] rounded-[0.75rem] px-3 py-1.5 focus:outline-none w-[6rem]"
              value={marks}
              onChange={(e) => setMarks(Number(e.target.value))}
            />
          </div>
          <select
            className="border bg-white border-[#000] rounded-[0.75rem] px-3 py-1.5 focus:outline-none"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as QuestionType)}
          >
            <option>Multiple Choice</option>
            <option>Single Choice</option>
            <option>True/False</option>
            <option>Short Answer</option>
          </select>
          <button onClick={onDelete} className="text-red-500 hover:text-red-700 text-[1.5rem]"><span><RiDeleteBinLine/></span></button>
        </div>
      </div>

      <label className="block text-[1.25rem] font-[500] mb-1">Question Text</label>
      <textarea
        className="w-full text-[1.25rem] font-[500] border bg-white rounded-md px-3 py-2 resize-none focus:outline-none min-h-[7.5rem]"
        placeholder="Enter Question Text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />

      {questionType === 'Short Answer' ? (
        <>
          <div className="text-[1.25rem] font-[500] text-[#000] mt-4 mb-2">Answer Options</div>
          <textarea
            placeholder="Enter Expected Answer"
            className="w-full text-[1.25rem] font-[500] border bg-white rounded-md px-3 py-2 resize-none focus:outline-none min-h-[6rem]"
            value={expectedAnswer}
            onChange={(e) => setExpectedAnswer(e.target.value)}
          />
        </>
      ) : (
        <>
          <div className="flex justify-between items-center text-[1.25rem] font-[500] text-[#000] mt-4 mb-2">
            <div>Answer Options</div>
            <div>Correct Answer</div>
          </div>
          {options.map((option, i) => (
            <div key={i} className="flex justify-between items-center gap-2 mb-2 border px-2 py-2 rounded-md hover:shadow-sm bg-white">
              <input
                type="text"
                placeholder={`Enter Option ${i + 1}`}
                className="flex-1 px-2 py-1 rounded-md focus:outline-none"
                value={option.text}
                onChange={(e) => updateOption(i, 'text', e.target.value)}
              />
              <input
                type="checkbox"
                className="accent-purple-500 w-5 h-5"
                checked={option.isCorrect}
                onChange={(e) => updateOption(i, 'isCorrect', e.target.checked)}
              />
              {questionType !== 'True/False' && (
                <button className="text-red-500 hover:text-red-700 text-[1.5rem]" onClick={() => removeOption(i)}><span><RiDeleteBinLine/></span></button>
              )}
            </div>
          ))}
          {questionType !== 'True/False' && (
            <div
              onClick={addOption}
              className="mt-3 border-dashed border-2 border-[#363636] bg-white rounded-md py-2 text-center text-[#000] text-[1.25rem] font-[600] hover:bg-gray-100 cursor-pointer"
            >
              + Add Option
            </div>
          )}
        </>
      )}

      <div className="mt-6 flex justify-between items-center bg-white p-3 rounded-[0.9rem]">
        <label className="flex items-center gap-2 text-[1.25rem] font-[300]">
          Negative Marking:
          <input
            type="text"
            checked={negativeMarking}
            onChange={(e) => setNegativeMarking(e.target.checked)}
            className="w-16 rounded-[0.7rem] border border-[#000] h-6 bg-[#F5F5F7] text-[0.8rem] text-center"
          />
        </label>
        <label className="flex items-center gap-2 text-[1.25rem] font-[300]">
          Time to Attempt:
          <input
            type="text"
            className="w-16 rounded-[0.7rem] border border-[#000] h-6 bg-[#F5F5F7] text-[0.8rem] text-center focus:outline-none"
            value={timeToAttempt}
            onChange={(e) => setTimeToAttempt(Number(e.target.value))}
          />
          s
        </label>
      </div>
    </div>
  );
};

export default QuestionCard;
