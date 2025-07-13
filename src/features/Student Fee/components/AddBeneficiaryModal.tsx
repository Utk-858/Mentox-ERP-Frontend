import React, { useState } from 'react';
import { X } from 'lucide-react';
import { mockStudents } from '../data/mockData';
import { useScholarships } from '../context/ScholarshipContext';

interface AddBeneficiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  programTitle: string;
  programId: string;
}

const AddBeneficiaryModal: React.FC<AddBeneficiaryModalProps> = ({ isOpen, onClose, programTitle, programId }) => {
  const { addBeneficiary } = useScholarships();
  const [selectedStudentId, setSelectedStudentId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) {
        alert('Please select a student.');
        return;
    }
    addBeneficiary(programId, selectedStudentId);
    onClose();
  };

  return (
    <>
      <div 
        onClick={onClose} 
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      />
      <div 
        role="dialog"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="flex justify-between items-start mb-2">
              <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Add Beneficiary</h2>
                  <p className="text-sm text-gray-500">to "{programTitle}"</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-6">Search and select a student to add to this program.</p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student*
              </label>
              <select 
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
              >
                  <option value="">Select Student</option>
                  {mockStudents.map(student => (
                      <option key={student.id} value={student.id}>{student.name} ({student.id})</option>
                  ))}
              </select>
            </div>

            <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
              {/* The change is here */}
              <button type="button" onClick={onClose} className="px-6 py-2.5 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                Cancel
              </button>
              <button type="submit" className="px-6 py-2.5 bg-[#702DFF] text-white font-semibold rounded-lg hover:opacity-90">
                Add to Program
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBeneficiaryModal;