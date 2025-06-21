import React from "react";

interface MarksAssignFilterBarProps {
  startDate: string;
  endDate: string;
  showAverage: boolean;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onToggleAverage: () => void;
  onSave: () => void;
}

const MarksAssignFilterBar: React.FC<MarksAssignFilterBarProps> = ({
  startDate,
  endDate,
  showAverage,
  onStartDateChange,
  onEndDateChange,
  onToggleAverage,
  onSave,
}) => {
  return (
    <div className=" p-4 rounded-lg bg-[#F5F5F7] ">
      {/* Inputs Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-2">
        <div className="flex items-end justify-end  gap-10">
          {/* Start Date */}
          <div>
            <label className="text-[1.13rem] font-[500] text-[#606060]">
              Start Date<span className="text-red-500">*</span>:
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="border border-[#606060] bg-[#D2D2D233] rounded px-3 py-1 ml-2 text-sm"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="text-[1.13rem] font-[500] text-[#606060]">
              End Date<span className="text-red-500">*</span>:
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="border border-[#606060] bg-[#D2D2D233] rounded px-3 py-1 ml-2 text-sm"
            />
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-2 mt-1">
            <label className="text-[1.13rem] font-[500] text-[#606060]">Show Avg. marks:</label>
            <input
              type="checkbox"
              checked={showAverage}
              onChange={onToggleAverage}
              className="w-5 h-5"
            />
          </div>
        </div>

        {/* Save Button */}
        
      </div>

      {/* Note */}
      <div className="flex justify-between items-center">
      <p className="text-[0.75rem] text-[#606060CC] font-[400]">
        <span className="font-[500]">Note:</span> Marks can only be submitted between the
        Start and End Date. After the End Date, submission is blocked unless special
        permission is obtained from the administration.
      </p>
      <button
            onClick={onSave}
            className="bg-[#702DFF] text-white font-medium px-6 py-2 rounded-md text-sm "
          >
            Save
          </button>
      </div>
    </div>
  );
};

export default MarksAssignFilterBar;
