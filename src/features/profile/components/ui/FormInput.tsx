import React from 'react';

interface FormInputProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean; // <-- 1. Add the optional 'disabled' prop here
}

const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  id, 
  name, 
  value, 
  onChange, 
  type = 'text', 
  placeholder = '', 
  required = false, 
  disabled = false // <-- 2. Get the prop value, defaulting to false
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-dimgray-100 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled} // <-- 3. Apply the disabled attribute to the HTML input
        className={
          "w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueviolet " +
          "disabled:bg-gray-100 disabled:cursor-not-allowed" // <-- 4. Add styling for the disabled state
        }
      />
    </div>
  );
};

export default FormInput;