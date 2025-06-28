// src/components/ui/FormTextArea.tsx
import React from 'react';

interface FormTextAreaProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  rows = 4,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  );
};

export default FormTextArea;