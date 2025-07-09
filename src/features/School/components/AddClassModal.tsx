import React from "react";

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
  selectedClass: string;
  onSelectClass: (value: string) => void;
}

const AddClassModal: React.FC<AddClassModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  selectedClass,
  onSelectClass,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm  flex justify-center items-center z-50">
      <div className="bg-[#F5F5F7] rounded-lg w-[320px] p-6 shadow-lg">
        <h2 className="text-[1.5rem] font-[600]">Class</h2>
        <p className="text-[0.9rem] font-[400] text-[#606060] mb-4">Add Class and it’s section</p>

        <label className="text-[1rem] font-[500]">
          Class <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full mt-1 mb-4 border bg-[#D2D2D233] rounded px-3 py-2"
          value={selectedClass}
          onChange={(e) => onSelectClass(e.target.value)}
        >
          <option value="">Select Class</option>
          <option value="1">Class 1</option>
          <option value="2">Class 2</option>
          <option value="3">Class 3</option>
          <option value="4">Class 4</option>
          <option value="5">Class 5</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            className="bg-[#702DFF] text-white px-6 py-1.5 rounded-md font-medium"
            onClick={onCreate}
          >
            Create
          </button>
          <button
            className="bg-black text-white px-6 py-1.5 rounded-md font-medium"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClassModal;
