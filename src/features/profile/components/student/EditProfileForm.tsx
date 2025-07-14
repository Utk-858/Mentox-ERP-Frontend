import React, { useState, useEffect } from 'react';
import FormInput from '../../components/ui/FormInput';
import FormSelect from '../../components/ui/FormSelect';
import FormDatePicker from '../../components/ui/FormDatePicker';
import type { UserProfileData } from '../../types/user';

interface EditProfileFormProps {
  initialData: UserProfileData;
  onSave: (formData: UserProfileData) => void;
  onCancel: () => void;
}

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Prefer not to say', label: 'Prefer not to say' },
];

const nationalityOptions = [
  { value: 'Indian', label: 'Indian' }, { value: 'American', label: 'American' },
  { value: 'Australian', label: 'Australian' }, { value: 'British', label: 'British' },
  { value: 'Canadian', label: 'Canadian' }, { value: 'German', label: 'German' },
  { value: 'Other', label: 'Other' },
];

// --- NEW DATA FOR BLOOD GROUP DROPDOWN ---
const bloodGroupOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
];

const EditProfileForm: React.FC<EditProfileFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<UserProfileData>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date?: Date) => {
    if (date) {
      setFormData((prev) => ({ ...prev, dateOfBirth: date }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 mb-8">
        <FormDatePicker label="Date of Birth" id="dateOfBirth" value={formData.dateOfBirth} onSelect={handleDateChange} required />
        <FormSelect label="Gender" id="gender" name="gender" value={formData.gender} onChange={handleInputChange} options={genderOptions} required />
        
        {/* --- REPLACED FormInput WITH FormSelect --- */}
        <FormSelect label="Blood Group" id="bloodGroup" name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} options={bloodGroupOptions} required />

        <FormSelect label="Nationality" id="nationality" name="nationality" value={formData.nationality} onChange={handleInputChange} options={nationalityOptions} required />
        <FormInput label="Email Address" id="email" name="email" value={formData.email} onChange={handleInputChange} type="email" required />
        <FormInput label="Mobile Number" id="mobile" name="mobile" value={formData.mobile} onChange={handleInputChange} required />
        <FormInput label="Alternate Mobile" id="alternateMobile" name="alternateMobile" value={formData.alternateMobile} onChange={handleInputChange} />
        <FormInput label="Father's Name" id="fatherName" name="fatherName" value={formData.fatherName} onChange={handleInputChange} required />
        <FormInput label="Father's Occupation" id="fatherOccupation" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleInputChange} required />
        <FormInput label="Mother's Name" id="motherName" name="motherName" value={formData.motherName} onChange={handleInputChange} required />
        <FormInput label="Mother's Occupation" id="motherOccupation" name="motherOccupation" value={formData.motherOccupation} onChange={handleInputChange} required />
        <FormInput label="Guardian's Name" id="guardianName" name="guardianName" value={formData.guardianName} onChange={handleInputChange} required />
        <div className="lg:col-span-3">
          <FormInput label="Full Address" id="fullAddress" name="fullAddress" value={formData.fullAddress} onChange={handleInputChange} required />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button type="submit" className="bg-[#5F33C4] text-white font-medium rounded-lg px-6 py-3">
          Save Changes
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-medium rounded-lg px-6 py-3">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;