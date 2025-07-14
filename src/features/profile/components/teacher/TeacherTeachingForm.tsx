import React from 'react';
import type { TeacherTeachingDetails } from '../../types/teacher';
import FormInput from '../../components/ui/FormInput';
import FormSelect from '../../components/ui/FormSelect';
import FormDatePicker from '../../components/ui/FormDatePicker';

// --- OPTIONS FOR DROPDOWNS ---
const departmentOptions = [
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'Science', label: 'Science' },
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'English', label: 'English' },
  { value: 'Social Studies', label: 'Social Studies' },
  { value: 'Physical Education', label: 'Physical Education' },
  { value: 'Arts', label: 'Arts' },
  { value: 'Music', label: 'Music' },
];

const designationOptions = [
  { value: 'Principal', label: 'Principal' },
  { value: 'Vice Principal', label: 'Vice Principal' },
  { value: 'Head of Department', label: 'Head of Department' },
  { value: 'Professor', label: 'Professor' },
  { value: 'Associate Professor', label: 'Associate Professor' },
  { value: 'Assistant Professor', label: 'Assistant Professor' },
  { value: 'Senior Teacher', label: 'Senior Teacher' },
  { value: 'Teacher', label: 'Teacher' },
  { value: 'Assistant Teacher', label: 'Assistant Teacher' },
];

const employmentTypeOptions = [
  { value: 'Permanent', label: 'Permanent' },
  { value: 'Contractual', label: 'Contractual' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Guest Faculty', label: 'Guest Faculty' },
];

interface Props {
  formData: TeacherTeachingDetails;
  setFormData: (update: Partial<TeacherTeachingDetails>) => void;
}

const TeacherTeachingForm: React.FC<Props> = ({ formData, setFormData }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleDateChange = (date?: Date) => {
    setFormData({ joiningDate: date || null });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
      <FormSelect
        label="Department"
        id="department"
        name="department"
        value={formData.department}
        onChange={handleChange}
        options={departmentOptions}
        required
      />
      <FormSelect
        label="Designation"
        id="designation"
        name="designation"
        value={formData.designation}
        onChange={handleChange}
        options={designationOptions}
        required
      />
      <FormSelect
        label="Employment Type"
        id="employmentType"
        name="employmentType"
        value={formData.employmentType}
        onChange={handleChange}
        options={employmentTypeOptions}
        required
      />
      <FormDatePicker
        label="Joining Date"
        id="joiningDate"
        value={formData.joiningDate!}
        onSelect={handleDateChange}
        required
      />
      <FormInput
        label="Subjects Taught"
        id="subjects"
        name="subjects"
        placeholder="e.g., Physics, Algebra"
        value={formData.subjects}
        onChange={handleChange}
        required
      />
      <FormInput
        label="Classes Taught"
        id="classes"
        name="classes"
        placeholder="e.g., 10-A, 10-B, 11-C"
        value={formData.classes}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default TeacherTeachingForm;