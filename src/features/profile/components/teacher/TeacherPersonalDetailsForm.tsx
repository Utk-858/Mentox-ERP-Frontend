import React from 'react';
import type { TeacherPersonalDetails } from '../../types/teacher';
import FormInput from '../../components/ui/FormInput';
import FormSelect from '../../components/ui/FormSelect';
import FormDatePicker from '../../components/ui/FormDatePicker';

// --- OPTIONS FOR DROPDOWNS ---
const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Prefer not to say', label: 'Prefer not to say' },
];

const bloodGroupOptions = [
  { value: 'A+', label: 'A+' }, { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' }, { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' }, { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' }, { value: 'O-', label: 'O-' },
];

const nationalityOptions = [
  { value: 'Indian', label: 'Indian' }, { value: 'American', label: 'American' },
  { value: 'Australian', label: 'Australian' }, { value: 'British', label: 'British' },
  { value: 'Canadian', label: 'Canadian' }, { value: 'German', label: 'German' },
  { value: 'Other', label: 'Other' },
];

const maritalStatusOptions = [
    { value: 'Single', label: 'Single' },
    { value: 'Married', label: 'Married' },
];


// Reusable components (ToggleSwitch, SectionTitle) remain the same
const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void; }> = ({ checked, onChange }) => (
  <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className={`${checked ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}>
    <span aria-hidden="true" className={`${checked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
  </button>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-xl font-semibold text-gray-800 pb-2 mb-6 border-b border-gray-200 lg:col-span-3">
    {children}
  </h2>
);

interface Props {
  formData: TeacherPersonalDetails;
  setFormData: (data: TeacherPersonalDetails) => void;
}

const TeacherPersonalDetailsForm: React.FC<Props> = ({ formData, setFormData }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleAddressChange = (addressType: 'currentAddress' | 'permanentAddress', e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedAddress = { ...formData[addressType], [name]: value };
    setFormData({ ...formData, [addressType]: updatedAddress });
  };

  const handleToggleSameAddress = (isChecked: boolean) => {
    setFormData({
      ...formData,
      isPermanentSameAsCurrent: isChecked,
      permanentAddress: isChecked ? formData.currentAddress : formData.permanentAddress,
    });
  };

  const handleDateChange = (date?: Date) => {
    setFormData({ ...formData, dateOfBirth: date || null });
  };

  return (
    <div className="space-y-12">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        <SectionTitle>Personal Details</SectionTitle>
        <FormDatePicker label="Date of Birth" id="dateOfBirth" value={formData.dateOfBirth!} onSelect={handleDateChange} required />
        <FormSelect label="Gender" id="gender" name="gender" value={formData.gender} onChange={handleInputChange} options={genderOptions} required/>
        <FormSelect label="Blood Group" id="bloodGroup" name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} options={bloodGroupOptions} required/>
        <FormSelect label="Nationality" id="nationality" name="nationality" value={formData.nationality} onChange={handleInputChange} options={nationalityOptions} required/>
        <FormInput label="Email Address" id="email" name="email" value={formData.email} onChange={handleInputChange} type="email" required/>
        <FormInput label="Mobile Number" id="mobile" name="mobile" value={formData.mobile} onChange={handleInputChange} required/>
        <FormInput label="Alternate Mobile" id="alternateMobile" name="alternateMobile" value={formData.alternateMobile} onChange={handleInputChange} />
        <FormSelect label="Marital Status" id="maritalStatus" name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} options={maritalStatusOptions} required/>
        <FormInput label="Religion" id="religion" name="religion" value={formData.religion} onChange={handleInputChange} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        <SectionTitle>Family Details</SectionTitle>
        <FormInput label="Father's Name" id="fatherName" name="fatherName" value={formData.fatherName} onChange={handleInputChange} required />
        <FormInput label="Father's Occupation" id="fatherOccupation" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleInputChange} />
        <FormInput label="Father's Mobile" id="fatherMobile" name="fatherMobile" value={formData.fatherMobile} onChange={handleInputChange} />
        <FormInput label="Mother's Name" id="motherName" name="motherName" value={formData.motherName} onChange={handleInputChange} required />
        <FormInput label="Mother's Occupation" id="motherOccupation" name="motherOccupation" value={formData.motherOccupation} onChange={handleInputChange} />
        <FormInput label="Mother's Mobile" id="motherMobile" name="motherMobile" value={formData.motherMobile} onChange={handleInputChange} />
        <FormInput label="Spouse's Name" id="spouseName" name="spouseName" value={formData.spouseName} onChange={handleInputChange} />
        <FormInput label="Spouse's Occupation" id="spouseOccupation" name="spouseOccupation" value={formData.spouseOccupation} onChange={handleInputChange} />
        <FormInput label="Spouse's Mobile" id="spouseMobile" name="spouseMobile" value={formData.spouseMobile} onChange={handleInputChange} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        <SectionTitle>Current Address Details</SectionTitle>
        <FormInput label="Address Line 1" id="currentAddressLine1" name="line1" value={formData.currentAddress.line1} onChange={(e) => handleAddressChange('currentAddress', e)} required />
        <FormInput label="Address Line 2" id="currentAddressLine2" name="line2" value={formData.currentAddress.line2} onChange={(e) => handleAddressChange('currentAddress', e)} />
        <FormInput label="City" id="currentCity" name="city" value={formData.currentAddress.city} onChange={(e) => handleAddressChange('currentAddress', e)} required />
        <FormInput label="State/Province" id="currentState" name="state" value={formData.currentAddress.state} onChange={(e) => handleAddressChange('currentAddress', e)} required />
        <FormInput label="Country" id="currentCountry" name="country" value={formData.currentAddress.country} onChange={(e) => handleAddressChange('currentAddress', e)} required />
        <FormInput label="Pincode" id="currentPincode" name="pincode" value={formData.currentAddress.pincode} onChange={(e) => handleAddressChange('currentAddress', e)} required />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        <div className="lg:col-span-3 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Permanent Address Details</h2>
          <div className="flex items-center gap-2">
            <label htmlFor="sameAsCurrent" className="text-sm font-medium text-gray-700">Same as Current Address?</label>
            <ToggleSwitch checked={formData.isPermanentSameAsCurrent} onChange={handleToggleSameAddress} />
          </div>
        </div>
        <div className="lg:col-span-3 border-b border-gray-200 " />
        <FormInput label="Address Line 1" id="permanentAddressLine1" name="line1" value={formData.isPermanentSameAsCurrent ? formData.currentAddress.line1 : formData.permanentAddress.line1} onChange={(e) => handleAddressChange('permanentAddress', e)} required disabled={formData.isPermanentSameAsCurrent}/>
        <FormInput label="Address Line 2" id="permanentAddressLine2" name="line2" value={formData.isPermanentSameAsCurrent ? formData.currentAddress.line2 : formData.permanentAddress.line2} onChange={(e) => handleAddressChange('permanentAddress', e)} disabled={formData.isPermanentSameAsCurrent} />
        <FormInput label="City" id="permanentCity" name="city" value={formData.isPermanentSameAsCurrent ? formData.currentAddress.city : formData.permanentAddress.city} onChange={(e) => handleAddressChange('permanentAddress', e)} required disabled={formData.isPermanentSameAsCurrent} />
        <FormInput label="State/Province" id="permanentState" name="state" value={formData.isPermanentSameAsCurrent ? formData.currentAddress.state : formData.permanentAddress.state} onChange={(e) => handleAddressChange('permanentAddress', e)} required disabled={formData.isPermanentSameAsCurrent} />
        <FormInput label="Country" id="permanentCountry" name="country" value={formData.isPermanentSameAsCurrent ? formData.currentAddress.country : formData.permanentAddress.country} onChange={(e) => handleAddressChange('permanentAddress', e)} required disabled={formData.isPermanentSameAsCurrent} />
        <FormInput label="Pincode" id="permanentPincode" name="pincode" value={formData.isPermanentSameAsCurrent ? formData.currentAddress.pincode : formData.permanentAddress.pincode} onChange={(e) => handleAddressChange('permanentAddress', e)} required disabled={formData.isPermanentSameAsCurrent} />
      </section>
    </div>
  );
};

export default TeacherPersonalDetailsForm;