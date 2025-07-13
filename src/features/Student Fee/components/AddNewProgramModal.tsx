import React, { useState, type FunctionComponent } from 'react';
import { X } from 'lucide-react';
import { useScholarships } from '../context/ScholarshipContext';

interface AddNewProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormField: FunctionComponent<{ label: string; required?: boolean; children: React.ReactNode; }> = ({ label, required, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const AddNewProgramModal: FunctionComponent<AddNewProgramModalProps> = ({ isOpen, onClose }) => {
  const { addScholarship } = useScholarships();

  const initialState = {
    title: '',
    type: 'General' as const,
    description: '',
    feeReduction: '',
    couponCode: '',
    criteria: ''
  };
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateCode = () => {
    const code = (formData.title.substring(0, 3).toUpperCase() || 'SCH') + Math.floor(100 + Math.random() * 900);
    setFormData(prev => ({ ...prev, couponCode: code }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addScholarship({
      title: formData.title,
      description: formData.description,
      type: formData.type,
      feeReduction: Number(formData.feeReduction) || 0,
      couponCode: formData.couponCode,
      criteria: formData.criteria
    });
    setFormData(initialState);
    onClose();
  };
  
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg m-4 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Add New Scholarship Program</h2>
            <button type="button" onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-6">Enter details for the new scholarship program.</p>

          <div className="space-y-5">
            <FormField label="Program Name" required>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="eg: BPL Scholarship" className="w-full p-3 border border-gray-300 rounded-lg" />
            </FormField>
            
            <FormField label="Scholarship Type" required>
              <select name="type" value={formData.type} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg">
                <option value="General">General</option>
                <option value="Merit-Based">Merit-Based</option>
                <option value="Need-Based">Need-Based</option>
              </select>
            </FormField>

            <FormField label="Description" required>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} placeholder="Brief description of the Scholarship" className="w-full p-3 border border-gray-300 rounded-lg" />
            </FormField>
            
            <FormField label="Fee Reduction Percentage (%)" required>
              <input type="number" name="feeReduction" value={formData.feeReduction} onChange={handleInputChange} placeholder="eg: 50" className="w-full p-3 border border-gray-300 rounded-lg" />
            </FormField>

            <FormField label="Coupon Code" required>
                <div className="flex gap-3">
                    <input type="text" name="couponCode" value={formData.couponCode} onChange={handleInputChange} placeholder="Generate or enter code" className="w-full p-3 border border-gray-300 rounded-lg"/>
                    <button type="button" onClick={handleGenerateCode} className="px-4 py-2 bg-[#702DFF] text-white font-semibold rounded-lg whitespace-nowrap hover:opacity-90">
                        Generate Code
                    </button>
                </div>
            </FormField>

            <FormField label="Criteria" required>
              <textarea name="criteria" value={formData.criteria} onChange={handleInputChange} rows={3} placeholder="Criteria for eligibility" className="w-full p-3 border border-gray-300 rounded-lg" />
            </FormField>
          </div>

          <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
            {/* The change is here */}
            <button type="button" onClick={onClose} className="px-6 py-2.5 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 bg-[#702DFF] text-white font-semibold rounded-lg hover:opacity-90">
              Add Program
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewProgramModal;