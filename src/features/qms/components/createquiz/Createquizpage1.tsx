import React from "react";
import { FaClock } from "react-icons/fa";
import { Switch } from "@headlessui/react";
import { useState } from "react";

const Createquizpage1: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [shuffleEnabled, setShuffleEnabled] = useState(true);
    const [immediateResults, setImmediateResults] = useState(true);
    const [sequential, setSequential] = useState(true);
  return (
    <div className="flex flex-row gap-6">
      {/* Quiz Details */}
      <div className="w-[40rem] bg-white p-5 rounded-lg shadow">
        <h2 className="text-[1.85rem] font-[600]">Quiz Details</h2>
        <p className="text-[1.25rem] font-[400] text-[#363636] mb-4">
          Basic information about your quiz
        </p>

        <div className="mb-3">
          <label className="block font-[500] text-[1.25rem] mb-1">
            Quiz Title
          </label>
          <input
            type="text"
            defaultValue="Computer Communication Networks Quiz 2"
            className="w-full px-3 py-2 rounded-[0.8rem] bg-[#F5F5F7] outline-none text-[1.5rem] text-[#363636] font-[500]"
          />
        </div>

        <div className="mb-3">
          <label className="block font-[500] text-[1.25rem] mb-1">
            Description
          </label>
          <textarea
            rows={5}
            className="w-full px-3 py-2 rounded-[0.8rem] bg-[#F5F5F7] text-[1.5rem] font-[400] text-[#363636] outline-none"
            defaultValue={`1. You are required to bring 1 blank sheet of paper and a pen for rough work.\n2. Calculators are allowed.\n3. Cheating in any form will result in complete debarment from the CCN course (e.g., using ChatGPT, accessing the quiz from another place, etc.).`}
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <label className="font-[500] text-[1.25rem] mb-2">
            Quiz Password
          </label>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? "bg-[#702DFF]" : "bg-gray-300"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
        <input
          type="password"
          placeholder="Enter Password"
          disabled={!enabled}
          className={`w-full px-3 py-2 rounded-md text-[1.25rem] outline-none transition-colors duration-200
          ${enabled ? "bg-[#F5F5F7] " : "bg-[#F5F5F7]  text-[#363636]"}`}
        />
      </div>

      {/* Quiz Settings */}
      <div className="w-[30rem] bg-white p-5 rounded-lg ">
        <h2 className="text-[1.85rem] font-[600]">Quiz Settings</h2>
        <p className="text-[1.25rem] font-[400] text-[#363636] mb-4">
          Configure how your quiz works
        </p>

        <div className="mb-4">
          <label className="block font-semibold text-base mb-1">
            Time Limit
          </label>
          <div className="flex items-center justify-between px-4 py-2 bg-[#F5F5F7] rounded-[0.8rem] ">
            <div className="flex items-center gap-2">
              <FaClock className=" " />
              <input
                type="number"
                defaultValue={15}
                className="w-12 bg-transparent text-center outline-none text-[1.25rem] font-[500]"
              />
            </div>
            <span className="text-[1.25rem] font-[500] text-[#363636]">
              min
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 ">
          <div>
            <p className="font-[500] text-[1.25rem]">Shuffle Questions</p>
            <p className="text-[#363636] text-[1rem] font-[500]">
              Show questions in random order
            </p>
          </div>
          <Switch
            checked={shuffleEnabled}
            onChange={setShuffleEnabled}
            className={`${shuffleEnabled ? "bg-[#702DFF]" : "bg-gray-300"} 
      relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300`}
          >
            <span
              className={`${
                shuffleEnabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>

        <div className="flex items-center justify-between mb-4 ">
          <div>
            <p className="font-[500] text-[1.25rem]">Immediate Results</p>
            <p className="text-[#363636] text-[1rem] font-[500]">
              Show results for each question
            </p>
          </div>
          <Switch
            checked={immediateResults}
            onChange={setImmediateResults}
            className={`${immediateResults ? "bg-[#702DFF]" : "bg-gray-300"} 
      relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300`}
          >
            <span
              className={`${
                immediateResults ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
        <div className="flex items-center justify-between mb-2 ">
          <div>
            <p className="text-[1.25rem] font-[500]">Attempts Allowed</p>
          </div>
          <input
            type="number"
            defaultValue={1}
            className="w-16 text-center bg-[#F5F5F7] rounded px-2 py-1 text-sm"
          />
        </div>

        <div className="flex items-center justify-between mb-4 ">
          <div>
            <p className="font-[500] text-[1.25rem]">Sequential Navigation</p>
            <p className="text-[#363636] text-[1rem] font-[500]">
              Students cant go back to a question <br></br>once they submit the answer
            </p>
          </div>
          <Switch
            checked={sequential}
            onChange={setSequential}
            className={`${sequential ? "bg-[#702DFF]" : "bg-gray-300"} 
      relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300`}
          >
            <span
              className={`${
                sequential ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Createquizpage1;
