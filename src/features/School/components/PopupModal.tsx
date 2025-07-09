import React from "react";

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  fields: {
    label: string;
    placeholder: string;
    type: "input" | "textarea" | "select";
    required?: boolean;
    name: string;
    options?: string[];
    value: string;
    onChange: (value: string) => void;
  }[];
  onAdd: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  fields,
  onAdd,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm  flex justify-center items-center">
      <div className="bg-white rounded-lg w-[340px] sm:w-[400px] p-6">
        <h2 className="text-[1.1rem] font-bold">{title}</h2>
        <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
        <form className="space-y-4">
          {fields.map((field, index) => (
            <div key={index}>
              <label className="block text-sm font-medium">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>
              {field.type === "input" && (
                <input
                  type="text"
                  placeholder={field.placeholder}
                  className="w-full mt-1 border rounded px-3 py-2"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
              {field.type === "textarea" && (
                <textarea
                  placeholder={field.placeholder}
                  className="w-full mt-1 border rounded px-3 py-2"
                  rows={3}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
              {field.type === "select" && (
                <select
                  className="w-full mt-1 border rounded px-3 py-2"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  <option>Select</option>
                  {field.options?.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </form>

        <div className="flex justify-end gap-2 mt-6">
          <button
            className="bg-[#702DFF] text-white px-6 py-1.5 rounded-md hover:bg-purple-700"
            onClick={onAdd}
          >
            Add
          </button>
          <button
            className="bg-black text-white px-6 py-1.5 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
