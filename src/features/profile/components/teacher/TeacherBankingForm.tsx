// src/features/teacher-profile/components/TeacherBankingForm.tsx

import React from 'react';
import type { TeacherBankingDetails } from '../../types/teacher';
import FormInput from '../../components/ui/FormInput';
import FormSelect from '../../components/ui/FormSelect';

interface Props {
  formData: TeacherBankingDetails;
  // This function allows the parent component to update this specific "slice" of the state
  setFormData: (update: Partial<TeacherBankingDetails>) => void;
}

const TeacherBankingForm: React.FC<Props> = ({ formData, setFormData }) => {

  // A generic handler for all input/select changes on this form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
      <FormInput
        label="Bank Name"
        id="bankName"
        name="bankName"
        value={formData.bankName}
        onChange={handleChange}
        required
      />
      <FormInput
        label="Bank Branch"
        id="bankBranch"
        name="bankBranch"
        value={formData.bankBranch}
        onChange={handleChange}
        required
      />
      <FormInput
        label="Account Number"
        id="accountNumber"
        name="accountNumber"
        value={formData.accountNumber}
        onChange={handleChange}
        required
      />
      <FormInput
        label="Account Holder Name"
        id="accountHolderName"
        name="accountHolderName"
        value={formData.accountHolderName}
        onChange={handleChange}
        required
      />
      <FormInput
        label="IFSC Code"
        id="ifscCode"
        name="ifscCode"
        value={formData.ifscCode}
        onChange={handleChange}
        required
      />
      <FormSelect
        label="Account Type"
        id="accountType"
        name="accountType"
        value={formData.accountType}
        onChange={handleChange}
        options={[
          { value: 'Savings', label: 'Savings' },
          { value: 'Current', label: 'Current' },
        ]}
        required
      />
      <FormInput
        label="PF Number"
        id="pfNumber"
        name="pfNumber"
        value={formData.pfNumber}
        onChange={handleChange}
      />
      <FormInput
        label="PF UAN Number"
        id="pfUanNumber"
        name="pfUanNumber"
        value={formData.pfUanNumber}
        onChange={handleChange}
      />
    </div>
  );
};

export default TeacherBankingForm;