import React, { useState, type FunctionComponent } from 'react';
import { useScholarships } from '../context/ScholarshipContext';
import { mockStudents } from '../data/mockData';

type CouponType = 'student' | 'general';

const FormField: FunctionComponent<{ label: string; required?: boolean; children: React.ReactNode; }> = ({ label, required, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

// The props interface is updated to use the shared CouponType
interface CreateCouponFormProps {
    activeTab: CouponType;
    setActiveTab: (tab: CouponType) => void;
}

const CreateCouponForm: React.FC<CreateCouponFormProps> = ({ activeTab, setActiveTab }) => {
  const { createCoupon } = useScholarships();
  
  const initialState = {
    studentId: '',
    waiverPercentage: '',
    expiryDate: '',
    couponCode: '',
  };
  const [formData, setFormData] = useState(initialState);

  // ... (All handler functions like handleInputChange, handleSubmit remain the same) ...
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };
  
  const handleGenerateCode = () => {
    const code = 'GEN' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setFormData(prev => ({...prev, couponCode: code}));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isGeneral = activeTab === 'general';
    
    const studentName = !isGeneral 
      ? mockStudents.find(s => s.id === formData.studentId)?.name 
      : undefined;

    createCoupon({
      waiverPercentage: Number(formData.waiverPercentage),
      expiryDate: formData.expiryDate,
      couponCode: formData.couponCode,
      isGeneral: isGeneral,
      studentId: isGeneral ? undefined : formData.studentId,
      studentName: isGeneral ? undefined : studentName,
    });
    setFormData(initialState);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm h-full">
      <h3 className="text-xl font-semibold text-gray-800">Create New Code</h3>
      <p className="text-sm text-gray-500 mb-4">Create a new student-specific coupon or a general discount code.</p>

      {/* The buttons now call the unified state setter from props */}
      <div className="flex items-center gap-1 bg-black rounded-lg p-1 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('student')}
          className={`w-full px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'student' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'
          }`}
        >
          Student-Specific Coupon
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`w-full px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'general' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'
          }`}
        >
          General Discount
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ... (The rest of the form remains unchanged) ... */}
        {activeTab === 'student' && (
          <FormField label="Select Student" required>
            <select name="studentId" value={formData.studentId} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg">
                <option value="">Select Student</option>
                {mockStudents.map(student => (
                    <option key={student.id} value={student.id}>{student.name} ({student.id})</option>
                ))}
            </select>
          </FormField>
        )}
        <FormField label="Fee Waiver Percentage (%)" required>
          <input type="number" name="waiverPercentage" value={formData.waiverPercentage} onChange={handleInputChange} placeholder="Eg: 50" className="w-full p-3 border border-gray-300 rounded-lg" />
        </FormField>
        <FormField label="Expiry Date" required>
          <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg" />
        </FormField>
        <FormField label="Coupon Code">
            <div className="flex gap-3">
                <input type="text" name="couponCode" value={formData.couponCode} onChange={handleInputChange} placeholder="Generate or enter code" className="w-full p-3 border border-gray-300 rounded-lg"/>
                <button type="button" onClick={handleGenerateCode} className="px-4 py-2 bg-[#702DFF] text-white font-semibold rounded-lg whitespace-nowrap hover:opacity-90">
                    Generate Code
                </button>
            </div>
        </FormField>
        <div className="flex justify-end gap-4 pt-4">
          <button type="button" className="px-6 py-2.5 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2.5 bg-[#702DFF] text-white font-semibold rounded-lg hover:opacity-90">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCouponForm;