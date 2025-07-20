// src/pages/TeacherSalarySlipPage.tsx
import React from 'react';
import { Download, Mail } from 'lucide-react';
// Import useParams to read the URL
import { useParams } from 'react-router-dom';

// In a real app, this data would come from your context/API
// For now, we use the same mock data as the table
const allSlipsData = [
    { 
        id: '1', 
        employeeName: 'Hemish Morgan', 
        amount: 21000,
        payPeriod: 'November 2025',
        // other slip details...
    },
    { 
        id: '2', 
        employeeName: 'Hemish Morgan',
        amount: 41000, 
        payPeriod: 'November 2025',
        // other slip details...
    },
    // Using a more detailed object for the main example
    {
        id: 'main_example',
        employeeName: 'Dr. Evelyn Reed',
        schoolName: 'Hemish Morgan School',
        payPeriod: 'July 2024',
        department: 'Academic',
        designation: 'Principal',
        employeeId: 'EMP001',
        joiningDate: '01/07/2025',
        payDate: '31/07/2025',
        totalWorkDays: 31,
        daysPaid: 31,
        earnings: [
            { label: 'Basic Pay', value: 80000 },
            { label: 'House Rent Allowance', value: 32000 },
            { label: 'D.A.', value: 5000 },
            { label: 'C.C. Allowance', value: 5000 },
            { label: 'H.A.', value: 10000 },
            { label: 'Special Allowance', value: 10000 },
            { label: 'Personal Pay', value: 10000 },
            { label: 'Other Earnings', value: 10000 },
        ],
        deductions: [
            { label: 'Provident Fund', value: 6500 },
            { label: 'E.S.I', value: 0 },
            { label: 'NPS Subscription', value: 200 },
            { label: 'Income Tax (TDS)', value: 15000 },
            { label: 'Other Deduction', value: 0 },
            { label: 'Paid leave and Leave Deduction', value: 0 },
            { label: 'Recovery', value: 0 },
        ]
    }
];
// For simplicity, we'll use one detailed slipData object for all IDs in this example
// In a real app, you would find the specific slip by its ID from the array above
const detailedSlipData = allSlipsData[2];


const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const DetailRow: React.FC<{ label: string; value: string; }> = ({ label, value }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-100">
        <span className="text-gray-500 text-[14px]">{label}</span>
        <span className='font-medium text-gray-800 text-[14px]'>{value}</span>
    </div>
);

const TeacherSalarySlipPage: React.FC = () => {
    // UPDATED: Get the slipId from the URL
    const { slipId } = useParams<{ slipId: string }>();

    // In a real app, you would use slipId to fetch data:
    // const slipData = allSlipsData.find(slip => slip.id === slipId);
    // For this example, we will render the same detailed slip for any ID.
    const slipData = detailedSlipData;

    if (!slipData || !slipData.earnings) {
        return <div className="p-8 text-center">Salary Slip not found for ID: {slipId}</div>;
    }

  const grossEarnings = slipData.earnings.reduce((sum, item) => sum + item.value, 0);
  const totalDeductions = slipData.deductions.reduce((sum, item) => sum + item.value, 0);
  const netSalary = grossEarnings - totalDeductions;

  return (
    <div className="font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Salary Slip</h1>
          <p className="text-sm text-gray-500 mt-1">Displaying Slip for ID: <span className="font-semibold text-purple-600">{slipId}</span></p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            <Download size={16} />
            <span>Download PDF</span>
          </button>
          <button className="flex items-center gap-2 bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm">
            <Mail size={16} />
            <span>Email Slip</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm text-sm">
        <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-800">{slipData.schoolName}</h2>
            <p className="text-gray-500 mt-1">Salary Slip for {slipData.payPeriod}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm border-t border-b border-gray-200 py-6 mb-6">
            <div className="space-y-3">
                <p><span className="text-gray-500">Department:</span> <strong className="text-gray-800 ml-2">{slipData.department}</strong></p>
                <p><span className="text-gray-500">Designation:</span> <strong className="text-gray-800 ml-2">{slipData.designation}</strong></p>
                <p><span className="text-gray-500">Employee ID:</span> <strong className="text-gray-800 ml-2">{slipData.employeeId}</strong></p>
                <p><span className="text-gray-500">Joining Date:</span> <strong className="text-gray-800 ml-2">{slipData.joiningDate}</strong></p>
            </div>
            <div className="space-y-3">
                <p><span className="text-gray-500">Pay Period:</span> <strong className="text-gray-800 ml-2">{slipData.payPeriod}</strong></p>
                <p><span className="text-gray-500">Salary Pay Date:</span> <strong className="text-gray-800 ml-2">{slipData.payDate}</strong></p>
                <p><span className="text-gray-500">Total Work Days:</span> <strong className="text-gray-800 ml-2">{slipData.totalWorkDays}</strong></p>
                <p><span className="text-gray-500">Days Paid:</span> <strong className="text-gray-800 ml-2">{slipData.daysPaid}</strong></p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3">Earnings</h3>
            <div className="space-y-1">
              {slipData.earnings.map(item => <DetailRow key={item.label} label={item.label} value={formatCurrency(item.value)} />)}
            </div>
            <div className="flex justify-between items-center mt-4 pt-3 border-t-2 border-gray-200">
              <span className="font-bold text-gray-800">Gross Earnings</span>
              <span className="font-bold text-gray-900">{formatCurrency(grossEarnings)}</span>
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3">Deductions</h3>
            <div className="space-y-1">
              {slipData.deductions.map(item => <DetailRow key={item.label} label={item.label} value={formatCurrency(item.value)} />)}
            </div>
            <div className="flex justify-between items-center mt-4 pt-3 border-t-2 border-gray-200">
              <span className="font-bold text-gray-800">Total Deductions</span>
              <span className="font-bold text-red-600">{formatCurrency(totalDeductions)}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
            <div className="bg-purple-50 p-6 rounded-lg flex justify-between items-center">
                <span className="text-lg font-bold text-purple-900">NET SALARY PAYABLE</span>
                <span className="text-2xl font-bold text-purple-900">{formatCurrency(netSalary)}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSalarySlipPage;