import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';

// FIX: The props interface now correctly accepts totalAmount and paidAmount.
interface PaymentFormProps {
  pageTitle: string;
  pageSubtitle: string;
  totalAmount: number;
  paidAmount: number;
  remarksPlaceholder: string;
  onFormSubmit: (paymentAmount: number) => void;
}

const FormField: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({ label, required, children }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-600 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

export const PaymentForm: React.FC<PaymentFormProps> = ({ pageTitle, pageSubtitle, totalAmount, paidAmount, remarksPlaceholder, onFormSubmit }) => {
  // The form now correctly calculates the remaining amount to be paid.
  const remainingAmount = totalAmount - paidAmount;
  const [amountToPay, setAmountToPay] = useState(remainingAmount.toString());

  // This effect ensures the amount field updates if the props change.
  useEffect(() => {
    setAmountToPay(remainingAmount.toString());
  }, [remainingAmount]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const paymentAmount = parseFloat(amountToPay.replace(/,/g, ''));
    if (!isNaN(paymentAmount)) {
      onFormSubmit(paymentAmount);
    } else {
      alert("Please enter a valid number for the amount.");
    }
  };

  return (
    <div className="font-poppins">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">{pageTitle}</h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">{pageSubtitle}</p>
        </div>
        <div className="border border-gray-200 bg-[#F9FAFB] rounded-lg p-3 text-center w-full md:w-auto shrink-0">
          <p className="text-xs text-gray-500">Net Monthly Salary</p>
          <p className="text-lg font-semibold text-gray-800 mt-1">₹{totalAmount.toLocaleString('en-IN')}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl shadow-lg shadow-gray-100">
        <h2 className="text-xl font-semibold text-center mb-8 text-gray-700">Payment Details</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Amount to Pay (₹)" required>
              <input 
                type="text" 
                value={amountToPay}
                onChange={(e) => setAmountToPay(e.target.value)}
                className="w-full p-3 bg-[#F9FAFB] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#702DFF]/50 focus:border-[#702DFF] transition-shadow"
              />
            </FormField>
            <FormField label="Payment Date">
              <div className="relative">
                <input 
                  type="text" 
                  readOnly
                  value={new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
                />
                <CalendarIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </FormField>
          </div>
          <FormField label="Payment Mode" required>
            <div className="relative">
              <select className="w-full p-3 bg-[#F9FAFB] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#702DFF]/50 focus:border-[#702DFF] transition-shadow appearance-none">
                <option value="" disabled>Select Payment Mode</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </FormField>
          <FormField label="Remarks">
            <textarea 
              placeholder={remarksPlaceholder}
              rows={4}
              className="w-full p-3 bg-[#F9FAFB] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#702DFF]/50 focus:border-[#702DFF] transition-shadow"
            />
          </FormField>
        </div>
        <div className="flex justify-end gap-4 mt-8">
          <button type="button" className="px-8 py-3 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-8 py-3 rounded-lg text-white bg-[#702DFF] hover:bg-opacity-90 font-semibold transition-colors">
            Submit Payment
          </button>
        </div>
      </form>
    </div>
  );
};