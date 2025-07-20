import React, { useState } from 'react';
import { Search, User } from 'lucide-react';

interface Student {
  name: string;
  class: string;
  section: string;
  rollNo: string;
  admNo: string;
  parentsName: string;
  parentsContact: string;
}
interface CreateGatePassProps {
  onClose: () => void;
}

const CreateGatePass: React.FC<CreateGatePassProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    rollNumber: '',
    class: '',
    section: '',
    parentGuardianName: '',
    parentGuardianContact: '',
    reason: '',
    parentApproval: 'approved'
  });

  // Mock student data
  const mockStudent: Student = {
    name: 'Hemish Jain',
    class: '6',
    section: 'A',
    rollNo: '2',
    admNo: '145676',
    parentsName: 'Hemish Morgan',
    parentsContact: '+91 7888831648'
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Mock search - in real app, this would be an API call
      setSelectedStudent(mockStudent);
      setFormData({
        ...formData,
        rollNumber: mockStudent.rollNo,
        class: mockStudent.class,
        section: mockStudent.section,
        parentGuardianName: mockStudent.parentsName,
        parentGuardianContact: mockStudent.parentsContact
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreate = () => {
    console.log('Creating gate pass with data:', formData);
    // Handle form submission logic here
  };

  const handleCancel = () => {
    setFormData({
      rollNumber: '',
      class: '',
      section: '',
      parentGuardianName: '',
      parentGuardianContact: '',
      reason: '',
      parentApproval: 'approved'
    });
    setSelectedStudent(null);
    setSearchTerm('');
     onClose(); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Create Gate Pass</h2>
          <p className="text-sm text-gray-600">Create Gate Pass For Student</p>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Student By Adm No.<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Eg. STUD2354"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-2 p-1 hover:bg-gray-100 rounded"
            >
              <Search className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Student Info Display */}
        {selectedStudent && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <div className="font-medium text-gray-800">{selectedStudent.name}</div>
                <div className="text-sm text-gray-600">
                  Class: {selectedStudent.class} | Section: {selectedStudent.section}
                </div>
                <div className="text-sm text-gray-600">
                  Roll No: {selectedStudent.rollNo} | Adm. No: {selectedStudent.admNo}
                </div>
                <div className="text-sm text-gray-600">
                  Parents Name: {selectedStudent.parentsName}
                </div>
                <div className="text-sm text-gray-600">
                  Parents Contact: {selectedStudent.parentsContact}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Roll Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Roll Number<span className="text-red-500">*</span>
            </label>
            <select
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500"
            >
              <option value="">Select Class</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          {/* Class and Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class<span className="text-red-500">*</span>
              </label>
              <select
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500"
              >
                <option value="">Select Class</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section<span className="text-red-500">*</span>
              </label>
              <select
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500"
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
          </div>

          {/* Parent/Guardian Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent/Guardian Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="parentGuardianName"
              placeholder="Eg. Hemish Jain"
              value={formData.parentGuardianName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Parent/Guardian Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent/Guardian Contact<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="parentGuardianContact"
              placeholder="Eg. Hemish Jain"
              value={formData.parentGuardianContact}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason<span className="text-red-500">*</span>
            </label>
            <textarea
              name="reason"
              placeholder="Brief description of the Scholarship and its criteria"
              value={formData.reason}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Parent Approval */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parent Approval<span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, parentApproval: 'approved' }))}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  formData.parentApproval === 'approved'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Approved
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, parentApproval: 'denied' }))}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  formData.parentApproval === 'denied'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Denied
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCreate}
            className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors font-medium"
          >
            Create
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGatePass;