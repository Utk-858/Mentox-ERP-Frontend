import React from "react";

interface SetGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SetGoal: React.FC<SetGoalModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-none"
      onClick={onClose}
    >
      <div
        className="bg-white p-14 rounded-lg w-full max-w-2xl  shadow-lg "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-2 text-[#32415C]">Set a Goal</h2>

        <div className="border px-6 py-2 rounded-lg mb-4 bg-[#F4F6F9]">
          <p className="font-semibold mb-4 text-[#3D4E6A]">
            Reminder: DBMS Course - Master the Fundamentals and Advanced
            Concepts
          </p>
          <p className="text-xs text-[#5E6980] font-medium">
            Course: DBMs Course - Master the Fundamentals and Advanced Concept
          </p>
          <div className="flex items-center w-full">
            <input
              type="text"
              className="z-10 bg-white outline-none w-[80%]  text-sm text-gray-700 px-4 py-2 rounded-lg mt-4"
              placeholder="Select a time, duration and frequency to view estimated time."
            />
          </div>
        </div>

        {/* Days Selector */}
        <div className="mb-4 gap-6">
          <p className=" text-[#637084]">Mark the days you want to study:</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <button
                key={day}
                className="px-3 py-1 rounded hover:bg-purple-700 text-sm  bg-[#18181A] text-white"
              >
                {day}
              </button>
            ))}
          </div>
          <label className="block text-sm mt-3 text-[#97A3B8]">
            <input type="checkbox" className="mr-2 " />
            Mark all days
          </label>
        </div>

        {/* Time Selector */}
        <div className="mb-4">
          <label className="block text-sm  mb-1 text-[#637084]">
            When do you want to study?
          </label>
          <input
            type="time"
            defaultValue="12:00"
            className="w-fit border rounded px-6 py-2 text-[#757F92]"
          />
        </div>

        {/* Duration Selector */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-[#637084]">
            For how long?
          </label>
          <div className="flex flex-wrap gap-2">
            {["15 min", "30 min", "1 hr", "2 hr", "3 hr"].map((duration) => (
              <button
                key={duration}
                className="px-3 py-1 bg-[#18181A] text-white rounded hover:bg-[#702DFF] text-sm "
              >
                {duration}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button className="w-fit px-5 text-sm  bg-[#702DFF] text-white rounded-lg py-3 hover:bg-purple-700">
          Set Reminder
        </button>
      </div>
    </div>
  );
};

export default SetGoal;
