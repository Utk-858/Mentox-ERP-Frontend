import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';

interface Forxlata {
  studentName: string;
  admissionNo: string;
  rollNumber: string;
  fatherName: string;
  motherName: string;
  parentsNumber: string;
  dateOfBirth: string;
  nationality: string;
  category: string;
  dateOfFirstAdmission: string;
  lastClass: string;
  lastSection: string;
  lastExamName: string;
  academicYear: string;
  examResultStatus: string;
  duesPaidStatus: string;
  totalWorkingDays: string;
  presentDays: string;
  attendance: string;
  generalConduct: string;
  reasonForLeaving: string;
  subjects: string[];
  remarks: string;
  dateOfApplication: string;
  dateOfIssue: string;
}

const examNameOptions = [
  { value: 'End Term Exam', label: 'End Term Exam' },
  { value: 'Mid Term Exam', label: 'Mid Term Exam' },
  { value: 'Unit Test Exam', label: 'Unit Test Exam' },
];

const academicYearOptions = [
  { value: '2023-24', label: '2023-24' },
  { value: '2024-25', label: '2024-25' },
  { value: '2025-26', label: '2025-26' },
];

const examResultStatusOptions = [
  { value: 'Passed', label: 'Passed' },
  { value: 'Failed', label: 'Failed' },
];

const duesPaidStatusOptions = [
  { value: 'Paid in Full', label: 'Paid in Full' },
  { value: 'Pending', label: 'Pending' },
];

const subjectOptions = [
  'Mathematics',
  'Science',
  'English',
  'History',
  'Geography',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Physical Education',
  'Art',
  'Music',
].map((subj) => ({ value: subj, label: subj }));

const selectStyles = {
  control: (base: { [key: string]: unknown }) => ({
    ...base,
    backgroundColor: 'rgba(249, 250, 251, 0.7)', 
    borderColor: '#606060',
    borderRadius: '8px',
    minHeight: '38px',
    boxShadow: 'none',
    '&:hover': { borderColor: '#606060' },
  }),
  singleValue: (base: { [key: string]: unknown }) => ({
    ...base,
    color: '#111827', 
  }),
  menu: (base: { [key: string]: unknown }) => ({
    ...base,
    backgroundColor: 'rgba(51, 51, 51, 0.9)', 
    color: '#ffffff',
    zIndex: 9999,
    borderRadius: '8px',
  }),
  option: (base: { [key: string]: unknown }, state: { isFocused: boolean }) => ({
    ...base,
    backgroundColor: state.isFocused
      ? 'rgba(68, 68, 68, 0.8)'
      : 'rgba(51, 51, 51, 0.9)',
    color: '#ffffff',
    cursor: 'pointer',
    borderBottom: '1px solid #606060',
    '&:last-child': {
      borderBottom: 'none',
    },
  }),
  dropdownIndicator: (base: { [key: string]: unknown }) => ({
    ...base,
    color: '#606060',
    '&:hover': { color: '#333333' },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};

export default function CertificateForm() {
  const [forxlata, setForxlata] = useState<Forxlata>({
    studentName: 'Student Name',
    admissionNo: 'Admission No',
    rollNumber: 'Roll No',
    fatherName: "Father's Name",
    motherName: "Mother's Name",
    parentsNumber: 'Contact No',
    dateOfBirth: 'DD/MM/YYYY',
    nationality: 'Nationality',
    category: 'Category',
    dateOfFirstAdmission: 'DD/MM/YYYY',
    lastClass: 'Class',
    lastSection: 'Section',
    lastExamName: 'End Term Exam',
    academicYear: '2023-24',
    examResultStatus: 'Passed',
    duesPaidStatus: 'Paid in Full',
    totalWorkingDays: 'Total Days',
    presentDays: 'Present Days',
    attendance: 'Attendance %',
    generalConduct: '',
    reasonForLeaving: '',
    subjects: ['Mathematics', 'Mathematics'],
    remarks: 'Remarks',
    dateOfApplication: 'DD/MM/YYYY',
    dateOfIssue: 'DD/MM/YYYY',
  });
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  interface SubjectOption {
    value: string;
    label: string;
  }
  
  const [selectedSubject, setSelectedSubject] = useState<SubjectOption | null>(null);

  const handleInputChange = (field: keyof Forxlata, value: string) => {
    setForxlata((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubjectRemove = (index: number) => {
    setForxlata((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== index),
    }));
  };

  const addSubject = () => {
    if (
      selectedSubject &&
      !forxlata.subjects.includes(selectedSubject.value)
    ) {
      setForxlata((prev) => ({
        ...prev,
        subjects: [...prev.subjects, selectedSubject.value],
      }));
      setSelectedSubject(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">
          Certificate Details
        </h1>
        <button onClick={handleBack} className="px-6 py-2 bg-[#702DFF] text-white rounded-lg" title="Go back">
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <Input label="Students Name" value={forxlata.studentName} onChange={(v) => handleInputChange('studentName', v)} />
        <Input label="Admission No" value={forxlata.admissionNo} onChange={(v) => handleInputChange('admissionNo', v)} />
        <Input label="Roll Number" value={forxlata.rollNumber} onChange={(v) => handleInputChange('rollNumber', v)} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <Input label="Father's Name" value={forxlata.fatherName} onChange={(v) => handleInputChange('fatherName', v)} />
        <Input label="Mother's Name" value={forxlata.motherName} onChange={(v) => handleInputChange('motherName', v)} />
        <Input label="Parents Number" value={forxlata.parentsNumber} onChange={(v) => handleInputChange('parentsNumber', v)} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mb-6">
        <Input label="Date of Birth" value={forxlata.dateOfBirth} onChange={(v) => handleInputChange('dateOfBirth', v)} />
        <Input label="Nationality" value={forxlata.nationality} onChange={(v) => handleInputChange('nationality', v)} />
        <Input label="Category" value={forxlata.category} onChange={(v) => handleInputChange('category', v)} />
        <Input label="Date of First Admission" value={forxlata.dateOfFirstAdmission} onChange={(v) => handleInputChange('dateOfFirstAdmission', v)} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mb-6">
        <Input label="Last Class" value={forxlata.lastClass} onChange={(v) => handleInputChange('lastClass', v)} />
        <Input label="Last Section" value={forxlata.lastSection} onChange={(v) => handleInputChange('lastSection', v)} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Exam Name</label>
          <Select
            value={examNameOptions.find(o => o.value === forxlata.lastExamName)}
            onChange={(opt) => handleInputChange('lastExamName', opt?.value || '')}
            options={examNameOptions}
            styles={selectStyles}
            aria-label="Last Exam Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
          <Select
            value={academicYearOptions.find(o => o.value === forxlata.academicYear)}
            onChange={(opt) => handleInputChange('academicYear', opt?.value || '')}
            options={academicYearOptions}
            styles={selectStyles}
            aria-label="Academic Year"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Exam Result Status</label>
          <Select
            value={examResultStatusOptions.find(o => o.value === forxlata.examResultStatus)}
            onChange={(opt) => handleInputChange('examResultStatus', opt?.value || '')}
            options={examResultStatusOptions}
            styles={selectStyles}
            aria-label="Exam Result Status"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dues Paid Status</label>
          <Select
            value={duesPaidStatusOptions.find(o => o.value === forxlata.duesPaidStatus)}
            onChange={(opt) => handleInputChange('duesPaidStatus', opt?.value || '')}
            options={duesPaidStatusOptions}
            styles={selectStyles}
            aria-label="Dues Paid Status"
          />
        </div>

        <Input label="Total Working Days" value={forxlata.totalWorkingDays} onChange={(v) => handleInputChange('totalWorkingDays', v)} />
        <Input label="Present Days" value={forxlata.presentDays} onChange={(v) => handleInputChange('presentDays', v)} />
        <Input label="Attendance %" value={forxlata.attendance} onChange={(v) => handleInputChange('attendance', v)} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        <Input
          label="General Conduct"
          value={forxlata.generalConduct}
          onChange={(v) => handleInputChange('generalConduct', v)}
        />

        <Input
          label="Reason for Leaving"
          value={forxlata.reasonForLeaving}
          onChange={(v) => handleInputChange('reasonForLeaving', v)}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Subjects Studied:</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {forxlata.subjects.map((subject, index) => (
            <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-md">
              <span className="text-sm">{subject}</span>
              <button
                onClick={() => handleSubjectRemove(index)}
                className="ml-2 text-gray-500 hover:text-red-500"
                title="Remove subject"
                aria-label="Remove subject"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <div className="flex gap-2">
            <Select
              value={selectedSubject}
              onChange={setSelectedSubject}
              options={subjectOptions}
              styles={selectStyles}
              placeholder="Add Subject"
              aria-label="Select Subject"
            />
            <button
              onClick={addSubject}
              className="px-3 py-2 border border-gray-600 rounded-md bg-gray-50 flex items-center"
              title="Add subject"
              aria-label="Add subject"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="remarks">Remarks</label>
        <textarea
          id="remarks"
          value={forxlata.remarks}
          onChange={(e) => handleInputChange('remarks', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 rounded-md bg-[#D2D2D233] border border-[#606060]"
          placeholder="Enter remarks"
          aria-label="Remarks"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <Input label="Date of Application" value={forxlata.dateOfApplication} onChange={(v) => handleInputChange('dateOfApplication', v)} type="date" />
        <Input label="Date of Issue" value={forxlata.dateOfIssue} onChange={(v) => handleInputChange('dateOfIssue', v)} type="date" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 invisible">
            Edit Button Placeholder
          </label>
          <Link
            to="/TC/edit-template"
            className="w-full inline-block px-3 py-2 bg-[#702DFF] text-white rounded-lg text-center"
          >
            Edit TC Template
          </Link>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button className="px-10 py-2 bg-[#702DFF] text-white rounded-lg" title="Preview TC" aria-label="Preview TC">Preview</button>
        <button className="px-10 py-2 bg-[#702DFF] text-white rounded-lg" title="Generate TC" aria-label="Generate TC">Generate TC</button>
      </div>
    </div>
  );
}

const Input = ({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={label}>
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-md bg-[#D2D2D233] border border-[#606060]"
      id={label}
      placeholder={`Enter ${label.toLowerCase()}`}
      aria-label={label}
    />
  </div>
);
