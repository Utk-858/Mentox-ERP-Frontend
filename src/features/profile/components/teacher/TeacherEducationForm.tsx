import React from 'react';
import type { TeacherEducationDetails } from '../../types/teacher';
import FormInput from '../../components/ui/FormInput';
import FormSelect from '../../components/ui/FormSelect';
import FileUpload from '../../components/ui/FileUpload';

interface Props {
  formData: TeacherEducationDetails;
  setFormData: (update: Partial<TeacherEducationDetails>) => void;
}

const TeacherEducationForm: React.FC<Props> = ({ formData, setFormData }) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };
  
  const handleFileSelected = (file: File) => {
      const tempUrl = URL.createObjectURL(file);
      setFormData({
        certificateFile: file,
        certificateUrl: tempUrl
      });
  }

  const handleDownload = () => {
    if (formData.certificateUrl) {
      window.open(formData.certificateUrl, '_blank');
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
      <FormSelect 
        label="Highest Qualification" 
        id="highestQualification" // ID added
        name="highestQualification" 
        value={formData.highestQualification} 
        onChange={handleChange} 
        options={[{ value: 'Post-Graduate', label: 'Post-Graduate' }, { value: 'Graduate', label: 'Graduate' }]} 
        required 
      />
      <FormInput label="University/Board Name" id="university" name="university" value={formData.university} onChange={handleChange} required />
      <FormInput label="Year of Passing" id="yearOfPassing" name="yearOfPassing" value={formData.yearOfPassing} onChange={handleChange} type="number" required />
      <FormInput label="Percentage/Grade" id="percentage" name="percentage" value={formData.percentage} onChange={handleChange} required />
      <FormInput label="Specialization/Major" id="specialization" name="specialization" value={formData.specialization} onChange={handleChange} />
      <FormInput label="Additional Degrees" id="additionalDegrees" name="additionalDegrees" value={formData.additionalDegrees} onChange={handleChange} />
      <FormSelect 
        label="Professional Qualifications"
        id="professionalQualifications" // ID added 
        name="professionalQualifications" 
        value={formData.professionalQualifications} 
        onChange={handleChange}
        options={[{value: "N/A", label: "N/A"}, {value: "B.Ed", label: "B.Ed"}, {value: "M.Ed", label: "M.Ed"}]}
      />
      <FormSelect 
        label="Research Qualifications" 
        id="researchQualifications" // ID added
        name="researchQualifications" 
        value={formData.researchQualifications} 
        onChange={handleChange}
        options={[{value: "N/A", label: "N/A"}, {value: "Ph.D.", label: "Ph.D."}]}
      />

      <FileUpload
        label="Diploma/Certificates"
        fileStatus={formData.certificateFile?.name || (formData.certificateUrl ? "Submitted" : "No file chosen")}
        onFileSelect={handleFileSelected}
        onDownloadClick={handleDownload}
        hasExistingFile={!!formData.certificateUrl}
        required
      />
    </div>
  );
};

export default TeacherEducationForm;