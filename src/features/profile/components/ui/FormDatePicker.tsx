import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

// You need to add this CSS import.
// It provides the default layout for the calendar pop-up.
import 'react-datepicker/dist/react-datepicker.css';

interface FormDatePickerProps {
  label: string;
  id: string;
  value: Date | null | undefined;
  onSelect: (date?: Date) => void;
  required?: boolean;
}

// This is a custom button that will trigger the date picker.
// It's designed to look exactly like your app's other inputs.
const CustomInput = forwardRef<HTMLButtonElement, { value?: string; onClick?: () => void }>(
  ({ value, onClick }, ref) => (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="w-full flex justify-between items-center px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blueviolet"
    >
      <span>{value}</span>
      <CalendarIcon className="h-4 w-4 text-gray-500 ml-5" />
    </button>
  )
);

const FormDatePicker: React.FC<FormDatePickerProps> = ({ label, id, value, onSelect, required = false }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-dimgray-100 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <DatePicker
        selected={value}
        onChange={(date) => onSelect(date || undefined)}
        customInput={<CustomInput />}
        dateFormat="PPP" // This uses date-fns to format the date in the input
        
        // These props enable the year and month dropdowns you needed
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
      />
    </div>
  );
};

export default FormDatePicker;