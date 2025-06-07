import React, { useState } from 'react';
import { Switch } from '@headlessui/react';

const Createquizpage3: React.FC = () => {
  const [bufferEnabled, setBufferEnabled] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full ">
      <h2 className="text-[1.85rem] font-[600] ">Quiz Schedule</h2>
      <p className="text-[1.25rem] font-[400] text-[#363636] mb-6">Basic information about your quiz</p>

      {/* Quiz Start */}
      <div className="mb-5">
        <label className="block text-[1.25rem] font-[500] mb-1">
          Quiz Start Date and Time
        </label>
        <input
          type="datetime-local"
          className="w-[35rem] px-3 py-2 rounded-lg text-[1.2rem] font-medium text-[#363636] bg-gray-100 outline-none"
        />
      </div>

      {/* Quiz End */}
      <div className="mb-5">
        <label className="block text-[1.25rem] font-medium mb-1">
          Quiz End Date and Time
        </label>
        <input
          type="datetime-local"
          className="w-[35rem] px-3 py-2 rounded-lg text-[1.2rem] font-medium text-[#363636] bg-gray-100 outline-none"
        />
      </div>

      {/* Buffer Time Toggle */}
      <div className="flex items-center justify-between mb-3 w-[35rem]">
        <label className="text-[1.25rem] font-medium">Buffer Time</label>
        <Switch
          checked={bufferEnabled}
          onChange={setBufferEnabled}
          className={`${
            bufferEnabled ? 'bg-purple-600' : 'bg-gray-400'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
        >
          <span
            className={`${
              bufferEnabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform bg-white rounded-full transition`}
          />
        </Switch>
      </div>

      {/* Buffer Input */}
      <div className="relative w-[35rem]">
        <input
          disabled={!bufferEnabled}
          type="number"
          placeholder="Enter Buffer Time for Late Joiners"
          className={`w-[35rem] px-3 py-2 rounded-lg text-[1.2rem] font-medium outline-none ${
            bufferEnabled
              ? 'bg-gray-100 text-black'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        />
        <span className="absolute right-[1rem] top-1/2 -translate-y-1/2 text-gray-500 text-[1.2rem] font-medium">
          min
        </span>
      </div>
    </div>
  );
};

export default Createquizpage3;
