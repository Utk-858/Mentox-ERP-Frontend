// src/features/teacher-profile/components/TeacherDocumentsForm.tsx

import React from 'react';
import type { TeacherDocumentDetails } from '../../types/teacher';
import FormInput from '../../components/ui/FormInput';
import FileUpload from '../../components/ui/FileUpload';

interface Props {
  formData: TeacherDocumentDetails;
  // Allows the parent component to update this specific "slice" of the state
  setFormData: (update: Partial<TeacherDocumentDetails>) => void;
}

const TeacherDocumentsForm: React.FC<Props> = ({ formData, setFormData }) => {

  // Handles changes for the text inputs (Aadhaar and PAN numbers)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  // Handles when the Aadhaar file is selected
  const handleAadhaarFileSelect = (file: File) => {
    setFormData({
      aadhaarFile: file,
      aadhaarUrl: URL.createObjectURL(file) // Create a temporary local URL
    });
  };
  
  // Handles when the PAN file is selected
  const handlePanFileSelect = (file: File) => {
    setFormData({
      panFile: file,
      panUrl: URL.createObjectURL(file) // Create a temporary local URL
    });
  };

  // Opens the Aadhaar file URL for download/preview
  const handleAadhaarDownload = () => {
    if (formData.aadhaarUrl) {
      window.open(formData.aadhaarUrl, '_blank');
    }
  };

  // Opens the PAN file URL for download/preview
  const handlePanDownload = () => {
    if (formData.panUrl) {
      window.open(formData.panUrl, '_blank');
    }
  };

  return (
    // We use a simple flex column layout with spacing between children
    <div className="flex flex-col space-y-8">

      {/* Aadhaar Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-full md:w-1/3">
          <FormInput
            label="Aadhar Card Number"
            id="aadhaarNumber"
            name="aadhaarNumber"
            value={formData.aadhaarNumber}
            onChange={handleChange}
            placeholder="XXXX-XXXX-XXXX"
            required
          />
        </div>
        <div className="w-full md:flex-1">
          <FileUpload
            label="Upload Aadhar Card"
            fileStatus={formData.aadhaarFile?.name || (formData.aadhaarUrl ? "Submitted" : "No file chosen")}
            onFileSelect={handleAadhaarFileSelect}
            onDownloadClick={handleAadhaarDownload}
            hasExistingFile={!!formData.aadhaarUrl}
            required
          />
        </div>
      </div>

      {/* PAN Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-full md:w-1/3">
          <FormInput
            label="PAN Number"
            id="panNumber"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
            placeholder="XXXXXXXXXX"
            required
          />
        </div>
        <div className="w-full md:flex-1">
          <FileUpload
            label="Upload Pan Card"
            fileStatus={formData.panFile?.name || (formData.panUrl ? "Submitted" : "No file chosen")}
            onFileSelect={handlePanFileSelect}
            onDownloadClick={handlePanDownload}
            hasExistingFile={!!formData.panUrl}
            required
          />
        </div>
      </div>
      
    </div>
  );
};

export default TeacherDocumentsForm;