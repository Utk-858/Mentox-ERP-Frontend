import React, { useState } from "react";

interface Section {
  name: string;
  capacity: number;
  isEditing?: boolean;
}

interface AddSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  className: string;
  academicYear: string;
  onSaveSections: (sections: { name: string; capacity: number }[]) => void;
}

const AddSectionModal: React.FC<AddSectionModalProps> = ({
  isOpen,
  onClose,
  className,
  academicYear,
  onSaveSections,
}) => {
  const [sections, setSections] = useState<Section[]>([]);

  const handleAddRow = () => {
    setSections([
      ...sections,
      { name: "", capacity: 20, isEditing: true }
    ]);
  };

  const handleEdit = (index: number) => {
    const updated = [...sections];
    updated[index].isEditing = true;
    setSections(updated);
  };

  const handleDelete = (index: number) => {
    const updated = [...sections];
    updated.splice(index, 1);
    setSections(updated);
  };

  const handleSaveRow = (index: number) => {
    const updated = [...sections];
    updated[index].isEditing = false;
    setSections(updated);
  };

  const handleInputChange = (
  index: number,
  field: keyof Section,
  value: string | number
) => {
  const updated = [...sections];

  if (field === "capacity") {
    updated[index][field] = Number(value) as Section[typeof field];
  } else if (field === "name") {
    updated[index][field] = value as Section[typeof field];
  }

  setSections(updated);
};

  const handleFinalSave = () => {
    const cleaned = sections.map(({ name, capacity }) => ({ name, capacity }));
    onSaveSections(cleaned);
    onClose(); // Optional: Close modal after saving all
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#F5F5F7] rounded-lg p-6 w-[500px]">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-[1.5rem] font-[600]">Add Section</h2>
            <p className="text-[0.9rem] font-[400] text-[#606060]">
              View and Assign Subject Teachers
            </p>
          </div>
          <button onClick={onClose} className="text-xl font-bold">×</button>
        </div>

        <div className="mb-4 text-[1.1rem] flex font-[500]">
          <div className="mr-6">
            Academic Year: <span className="font-[400]">{academicYear}</span>
          </div>
          <div>
            Class: <span className="font-[400]">{className}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 text-sm font-semibold border-b pb-2 mb-2 text-[#616188]">
          <span>Section Name</span>
          <span>Section Capacity</span>
          <span>Actions</span>
        </div>

        {sections.map((section, index) => (
          <div
            className="grid grid-cols-3 gap-2 mb-2 rounded-[0.5rem] items-center bg-white p-2"
            key={index}
          >
            {section.isEditing ? (
              <>
                <input
                  className="border px-2 py-1 rounded"
                  value={section.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                />
                <input
                  className="border px-2 py-1 rounded"
                  type="number"
                  value={section.capacity}
                  onChange={(e) =>
                    handleInputChange(index, "capacity", e.target.value)
                  }
                />
                <button
                  onClick={() => handleSaveRow(index)}
                  className="bg-[#702DFF] text-white px-2 py-2 w-[5rem] rounded-md font-semibold"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{section.name}</span>
                <span>{section.capacity}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-[#FFE493] text-black px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-[#FFE3E3] text-black px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        <div className="flex justify-between mt-4">
          <button
            onClick={handleAddRow}
            className="bg-black text-white px-5 py-2 rounded-md font-semibold"
          >
            Add Sections
          </button>
          <button
            onClick={handleFinalSave}
            className="bg-[#702DFF] text-white px-5 py-2 rounded-md font-semibold"
          >
            Save All
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSectionModal;
