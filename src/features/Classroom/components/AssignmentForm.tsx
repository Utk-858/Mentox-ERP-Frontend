import React, { useState, useRef } from "react";
import {
  Bold, Italic, Underline, List, Paperclip, Video, Plus,
  Link, Upload, CalendarDays, Clock
} from "lucide-react";

const ToggleSwitch: React.FC<{
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-[16px] text-gray-700 font-medium">{label}</span>
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-[24px] w-[44px] rounded-full transition-colors duration-200 ease-in-out 
        ${checked ? "bg-[#702DFF]" : "bg-gray-300"}`}
      role="switch"
      aria-checked={checked}
      title={`Toggle ${label}`}
    >
      <span
        className={`inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow transition duration-200 ease-in-out 
          ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  </div>

);const AssignmentForm: React.FC = () => {  const [title, setTitle] = useState("");  const [instruction, setInstruction] = useState("");  const [description, setDescription] = useState("");  const [marks, setMarks] = useState(1000);
  const [dueEnabled, setDueEnabled] = useState(false);
  const [unmarked, setUnmarked] = useState(false);
  const [dueDate, setDueDate] = useState("2028-07-07");
  const [dueTime, setDueTime] = useState("12:08");
  const [closeAfterDue, setCloseAfterDue] = useState(true);
  const [assignTo, setAssignTo] = useState("All Student");
  const [numQuestions, setNumQuestions] = useState(10);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleSubmit = () => {
    const formData = {
      title,
      instruction,
      description,
      marks: unmarked ? null : marks,
      dueEnabled,
      dueDate: dueEnabled ? dueDate : null,
      dueTime: dueEnabled ? dueTime : null,
      closeAfterDue: dueEnabled ? closeAfterDue : false,
      assignTo,
      numQuestions,
      uploadedFiles: uploadedFiles.map((file) => file.name),
    };
    console.log("Assignment Data:", formData);
    alert("Assignment created successfully!");
  };

  return (
    <div className="w-full max-w-screen mx-auto bg-white p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel */}
        <div className="bg-[#F5F5F7] flex-1 space-y-6 p-5 rounded-xl">
          {/* Title */}
          <div className="bg-white p-5 rounded-xl space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-1 border rounded-md px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#702DFF]"
                placeholder="Add title"
              />
              <p className="text-xs text-gray-500 mt-1">*Required</p>
            </div>

            {/* Instruction */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Instruction (optional)</label>
              <div className="rounded-lg overflow-hidden bg-[#F5F5F7]">
                <textarea
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  rows={3}
                  placeholder="Instruction (optional)"
                  className="w-full p-3 bg-[#F5F5F7] border-none resize-none focus:outline-none"
                />
                <div className="flex gap-3 p-2 bg-[#F5F5F7]">
                  {[Bold, Italic, Underline, List].map((Icon, i) => (
                    <button key={i} type="button" className="text-gray-600" title={['Bold', 'Italic', 'Underline', 'List'][i]}>
                      <Icon size={16} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <div className="rounded-lg overflow-hidden bg-[#F5F5F7]">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Description..."
                  className="w-full p-3 bg-[#F5F5F7] border-none resize-none focus:outline-none"
                />
                <div className="flex gap-3 p-2 bg-[#F5F5F7]">
                  {[Bold, Italic, Underline, List].map((Icon, i) => (
                    <button key={i} type="button" className="text-gray-600" title={['Bold', 'Italic', 'Underline', 'List'][i]}>
                      <Icon size={16} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
                    {/* Bottom Toolbar */}
<div className="flex justify-center gap-4 pt-4">

  {/* Paperclip Icon */}
  <button
    type="button"
    title="Attach file"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 shadow-sm hover:bg-gray-100 transition"
  >
    <img src="/Group (2).png" alt="Paperclip" className="w-5 h-5" />
  </button>

  {/* YouTube Icon */}
  <button
    type="button"
    title="Add YouTube video"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-sm hover:bg-gray-100 transition"
  >
   <img src="/mdi_youtube.png" alt="YouTube" className="w-5 h-5" />
  </button>

  {/* Plus Icon */}
  <button
    type="button"
    title="Add item"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 shadow-sm hover:bg-gray-100 transition"
  >
    <Plus size={18} />
  </button>

  {/* Link Icon */}
  <button
    type="button"
    title="Add link"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 shadow-sm hover:bg-gray-100 transition"
  >
   <img src="/material-symbols_link-rounded.png" alt="Link" className="w-5 h-5" />
  </button>

  {/* Upload Icon */}
  <button
    type="button"
    title="Upload file"
    onClick={handleFileUpload}
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 shadow-sm hover:bg-gray-100 transition"
  >
    <Upload size={18} />
  </button>
   <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} multiple />
  </div>
       

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-3">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-white rounded-md shadow-sm border border-gray-200 p-2"
                  >
                    <div className="w-12 h-12 flex-shrink-0 rounded bg-gray-200 flex items-center justify-center">
                      <span className="text-xs font-semibold text-gray-600 uppercase">
                        {file.name.split(".").pop()}
                      </span>
                    </div>
                    <div className="flex-1 ml-4">
                      <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{file.type || "Unknown Type"}</p>
                    </div>
                    <select 
                      className="text-sm border border-gray-300 rounded px-2 py-1 mr-2"
                      title="File permission settings"
                      aria-label="File permission settings"
                    >
                      <option>Student can view the file</option>
                      <option>Student can edit the file</option>
                    </select>
                    <button
                      type="button"
                      title="Remove file"
                      onClick={() =>
                        setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
                      }
                      className="text-gray-400 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              title="Create assignment"
              className="mt-4 px-5 py-2 bg-[#702DFF] text-white rounded hover:bg-[#5e23d9] transition"
            >
              Create Assignment
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-80 bg-[#F5F5F7] rounded-lg p-6 space-y-6">
          {/* Assign To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" id="assign-to-label">Assign to</label>
            <select
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#702DFF]"
              aria-labelledby="assign-to-label"
              title="Select who to assign to"
            >
              <option value="All Student">All Student</option>
              <option value="Group A">Group A</option>
              <option value="Group B">Group B</option>
              <option value="Individual">Individual</option>
            </select>
          </div>

          {/* Unmarked */}
          <ToggleSwitch label="Unmarked" checked={unmarked} onChange={setUnmarked} />

          {/* Marks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marks<span className="text-red-500">*</span></label>
            <input
              type="number"
              value={marks}
              disabled={unmarked}
              onChange={(e) => setMarks(parseInt(e.target.value) || 0)}
              className={`w-full px-3 py-2 border rounded ${
                unmarked ? "bg-gray-100 text-gray-400" : "border-gray-300 focus:ring-2 focus:ring-[#702DFF]"
              }`}
            />
          </div>

          {/* Due */}
          <ToggleSwitch label="Due" checked={dueEnabled} onChange={setDueEnabled} />

          {(
            <>
              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-[#702DFF]"
                  />
                  <CalendarDays className="absolute right-3 top-2.5 text-gray-400" size={16} />
                </div>
              </div>

              {/* Due Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <div className="relative">
                  <input
                    type="time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-[#702DFF]"
                  />
                  <Clock className="absolute right-3 top-2.5 text-gray-400" size={16} />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={closeAfterDue}
                  onChange={(e) => setCloseAfterDue(e.target.checked)}
                  className="accent-[#702DFF] w-5 h-5"
                />
                <label className="text-sm text-gray-700 cursor-pointer">
                  Close submissions after due date
                </label>
              </div>
            </>
          )}

          {/* Number of Questions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">No. of Questions</label>
            <input
              type="number"
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#702DFF]"
            />
          </div>
        </div>
      </div>
    </div>
  );};
export default AssignmentForm;
