import React, { useState } from "react";

const ApplyLeaveForm: React.FC = () => {
  const [leaveType, setLeaveType] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fileName, setFileName] = useState("");
  const [reason, setReason] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = () => {
    console.log({
      leaveType,
      numberOfDays,
      fromDate,
      toDate,
      fileName,
      reason,
    });
  };

  const handleCancel = () => {
    setLeaveType("");
    setNumberOfDays("");
    setFromDate("");
    setToDate("");
    setFileName("");
    setReason("");
  };

  return (
    <div className="min-w-[55rem] mx-auto  bg-white  ">
      <h2 className="text-[1.63rem] font-[600] mb-4 text-[#32415C]">Apply Leave</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[1.15rem] font-[500] text-[#606060]">Leave Type<span className="text-red-500">*</span></label>
          <select
            className="w-full mt-1 p-2 border border-[#606060] bg-[#F5F5F7] rounded-[0.3rem]"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Sick Leave">Casual Leave (CL)</option>
            <option value="Casual Leave">   Medical Leave (ML)</option>
            <option value="Earned Leave">    Earned Leave (EL)</option>
            <option value="Earned Leave">        Half Day</option>
            <option value="Earned Leave">        Maternity/Paternity Leave</option>
            <option value="Earned Leave">        Special Leave (On Duty / Training / Exam Invigilation)</option>
             <option value="Earned Leave">           Leave Without Pay (LWP)</option>
          </select>
        </div>

        <div>
          <label className="block text-[1.15rem] font-[500] text-[#606060]">Number of Days<span className="text-red-500">*</span></label>
          <input
            type="number"
            className="w-full mt-1 p-2 border border-[#606060] bg-[#F5F5F7] rounded-[0.3rem] font-[500] text-[1.1rem]"
            value={numberOfDays}
            onChange={(e) => setNumberOfDays(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[1.15rem] font-[500] text-[#606060]">From<span className="text-red-500">*</span></label>
          <input
            type="date"
            className="w-full mt-1 p-2 border border-[#606060] bg-[#F5F5F7] rounded-[0.3rem] font-[500] text-[1rem] text-[#606060]"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-[1.15rem] font-[500] text-[#606060]">To<span className="text-red-500">*</span></label>
          <input
            type="date"
            className="w-full mt-1 p-2 border border-[#606060] bg-[#F5F5F7] rounded-[0.3rem] font-[500] text-[1rem] text-[#606060]"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex-grow">
          <label className="block text-[1.15rem] font-[500] text-[#606060]">Upload Document</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full mt-1 p-2 border border-[#606060] bg-[#F5F5F7] rounded-[0.3rem] font-[500] text-[1rem] text-[#606060]"
          />
        </div>
        <button
          className="h-fit mt-7 px-4 py-2 bg-[#702DFF] text-white rounded"
          type="button"
        >
          Submit
        </button>
      </div>

      <div className="mb-4 relative">
      <label className="block text-[1.15rem] font-[500] text-[#606060] mb-1">
        Reason
      </label>
      <input
        type="text"
        maxLength={30}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Reason"
        className="w-full pr-16 mt-1 p-2 border border-[#606060] bg-[#F5F5F7] rounded-[0.3rem] font-[500] text-[1.25rem]"
      />
      <div className="absolute bottom-3 right-3 text-sm text-gray-500">
        {reason.length}/30
      </div>
    </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-[#702DFF] text-white rounded-[0.45rem]"
        >
          Apply
        </button>
        <button
          onClick={handleCancel}
          className="px-6 py-2 bg-[#702DFF] text-white rounded-[0.45rem]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ApplyLeaveForm;
