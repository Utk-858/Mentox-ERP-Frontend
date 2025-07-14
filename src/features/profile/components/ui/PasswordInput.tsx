import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, id, value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-dimgray-100 mb-2">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={showPassword ? 'text' : 'password'}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueviolet pr-12"
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-0 mr-4 text-gray-500 hover:text-gray-700"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;