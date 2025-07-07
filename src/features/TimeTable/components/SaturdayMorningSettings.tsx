import React, { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

const SaturdaySettings: React.FC = () => {
  const [isSaturdayWorking, setIsSaturdayWorking] = useState(false);
  const [morningBreakEnabled, setMorningBreakEnabled] = useState(true);
 const [breakStart, setBreakStart] = useState<string | null>("07:00");
const [breakEnd, setBreakEnd] = useState<string | null>("12:30");

  return (
    <div className="flex flex-row border rounded-lg overflow-hidden shadow-md gap-4 mx-auto">
      {/* Saturday Settings */}
      <div className="flex-[40%] p-4 border-r flex flex-col justify-center">
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-gray-700">Saturday Settings</span>
        </div>
        <div className="flex items-center mt-4 space-x-2">
          <button
            onClick={() => setIsSaturdayWorking((v) => !v)}
            className="focus:outline-none"
            aria-label="Toggle Saturday Working"
          >
            {isSaturdayWorking ? (
              <FaToggleOn className="text-blue-600 text-2xl" />
            ) : (
              <FaToggleOff className="text-gray-400 text-2xl" />
            )}
          </button>
          <span className="text-sm text-gray-600">Is Saturday Working?</span>
        </div>
      </div>

      {/* Morning Break */}
      <div className="flex-[60%] p-4 flex flex-col justify-center">
        <div className="flex items-center space-x-2 mb-2">
          <span className="font-semibold text-gray-700">Morning Break</span>
          <button
            onClick={() => setMorningBreakEnabled((v) => !v)}
            className="focus:outline-none"
            aria-label="Toggle Morning Break"
          >
            {morningBreakEnabled ? (
              <FaToggleOn className="text-blue-600 text-xl" />
            ) : (
              <FaToggleOff className="text-gray-400 text-xl" />
            )}
          </button>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Break Start</label>
            <TimePicker
              onChange={setBreakStart}
              value={breakStart}
              disableClock
              className="w-28"
              format="h:mm a"
              clearIcon={null}
              clockIcon={null}
              disabled={!morningBreakEnabled}
            />
          </div>
          <div className="flex items-center mt-6">
            <span className="w-4 h-4 border-2 border-pink-400 rounded-full mr-2"></span>
            <label className="text-xs text-gray-500 mr-2">Break End</label>
            <TimePicker
              onChange={setBreakEnd}
              value={breakEnd}
              disableClock
              className="w-28"
              format="h:mm a"
              clearIcon={null}
              clockIcon={null}
              disabled={!morningBreakEnabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaturdaySettings;
