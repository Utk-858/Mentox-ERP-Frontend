// components/RequestPermissionModal.tsx
import React, { useState } from "react";
import PermissionPopup from "./PermissionPopup";

interface RequestPermissionModalProps {
  onClose: () => void;
}

const RequestPermissionModal: React.FC<RequestPermissionModalProps> = ({ onClose }) => {
  const [to, setTo] = useState("Admin");
  const [requestType, setRequestType] = useState("Change For Marks");
  const [reason, setReason] = useState("");
 const [showSuccess, setShowSuccess] = useState(false);
  const handleSubmit = () => {
    if (!to || !requestType || !reason.trim()) {
      alert("Please fill all the fields.");
      return;
    }

    console.log("Request submitted:", { to, requestType, reason });
    
    setShowSuccess(true);
    
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 bg-opacity-40 z-50 flex justify-center items-center">
      <div className="relative bg-[#F5F5F7] p-6 rounded-lg w-[400px] max-w-full shadow-xl border">

        {/* Close Button (×) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-[1.5rem] text-[#606060] hover:text-black font-bold"
        >
          ×
        </button>

        <h2 className="text-[1.25rem] font-[600] mb-4">Request Permission</h2>

        {/* To */}
        <label className="block mb-1 font-[500] text-[1.05rem] text-[#606060]">
          To<span className="text-red-500">*</span>
        </label>
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full border mb-4 border-gray-300 rounded px-3 py-2 text-[#00000080] font-[500] text-[1.05rem]"
        >
          <option value="Admin">Admin</option>
          <option value="Principal">Principal</option>
        </select>

        {/* Request */}
        <label className="block mb-1 font-[500] text-[1.05rem] text-[#606060]">
          Request<span className="text-red-500">*</span>
        </label>
        <select
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
          className="w-full border mb-4 border-gray-300 rounded px-3 py-2 text-[#00000080] font-[500] text-[1.05rem]"
        >
          <option value="Change For Marks">Change For Marks</option>
          <option value="Edit Submission">Edit Submission</option>
        </select>

        {/* Reason */}
        <label className="block mb-1 font-[500] text-[1.05rem] text-[#606060]">Reason</label>
        <textarea
          placeholder="Select Exam Type"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-6 font-[500] text-[1.05rem] text-[#00000080]"
          rows={3}
        />

        {/* Submit */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-2 rounded text-sm"
          >
            Submit
          </button>
        </div>
      </div>
      {showSuccess && (
        <PermissionPopup
          
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default RequestPermissionModal;
