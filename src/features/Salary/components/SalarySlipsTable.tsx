// src/components/SalarySlipsTable.tsx
import React from 'react';
import { Download, Search, ChevronDown, Filter } from 'lucide-react';
// Import Link for navigation
import { Link } from 'react-router-dom';

// (SlipRecord type, mockSlips data, helper functions remain the same...)
type SlipRecord = {
  id: string;
  empId: string;
  name: string;
  date: string;
  amount: number;
  mode: 'UPI' | 'Cash' | 'Cheque' | 'Net Ban.';
  transactionId: string;
};

const mockSlips: SlipRecord[] = [
    { id: '1', empId: 'EMP1200', name: 'Hemish Morgan', date: '06/11/2025', amount: 21000, mode: 'UPI', transactionId: 'RRTGFCV' },
    { id: '2', empId: 'EMP1200', name: 'Hemish Morgan', date: '11/11/2025', amount: 41000, mode: 'UPI', transactionId: 'REF09GA7CVwhy287722wh' },
    { id: '3', empId: 'EMP1200', name: 'Hemish Morgan', date: '02/12/2025', amount: 31000, mode: 'Cash', transactionId: '-' },
    { id: '4', empId: 'EMP1200', name: 'Hemish Morgan', date: '02/12/2025', amount: 81000, mode: 'Cheque', transactionId: 'GEFVGEWVG' },
    { id: '5', empId: 'EMP1200', name: 'Hemish Morgan', date: '06/12/2025', amount: 21000, mode: 'Net Ban.', transactionId: 'CSHCEWVG' },
];

const getModeClasses = (mode: SlipRecord['mode']) => {
    switch(mode) {
        case 'UPI':
            return 'bg-purple-100 text-purple-800';
        case 'Cash':
            return 'bg-orange-100 text-orange-800';
        case 'Cheque':
            return 'bg-blue-100 text-blue-800';
        case 'Net Ban.':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

const formatAmount = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
}


const SalarySlipsTable: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-auto">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            placeholder="Search Teachers..."
            className="w-full md:w-80 bg-[#111111] text-white border-gray-700 rounded-lg pl-11 pr-4 py-2.5 text-sm placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="relative w-full md:w-auto">
          <Filter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <select className="w-full md:w-36 appearance-none bg-[#111111] text-white border-gray-700 rounded-lg pl-10 pr-8 py-2.5 text-sm focus:ring-2 focus:ring-purple-500">
            <option>All Mode</option>
            <option>UPI</option>
            <option>Cash</option>
            <option>Cheque</option>
          </select>
          <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="text-gray-500">
            <tr className='border-b-2 border-gray-100'>
              <th className="p-4 font-semibold">Emp. Id</th>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Amount(₹)</th>
              <th className="p-4 font-semibold">Mode</th>
              <th className="p-4 font-semibold">Trans. Id/Cheque No.</th>
              <th className="p-4 font-semibold text-center">Receipts</th>
            </tr>
          </thead>
          <tbody className='text-gray-800'>
            {mockSlips.map((slip) => (
              <tr key={slip.id} className="border-b last:border-none border-gray-100 bg-white hover:bg-gray-50 transition-colors">
                <td className="p-4 text-gray-600">{slip.empId}</td>
                <td className="p-4 font-medium">{slip.name}</td>
                <td className="p-4 text-gray-600">{slip.date}</td>
                <td className="p-4 font-medium">{formatAmount(slip.amount)}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${getModeClasses(slip.mode)}`}>
                    {slip.mode}
                  </span>
                </td>
                <td className="p-4 text-gray-600">{slip.transactionId}</td>
                <td className="p-4 text-center">
                  {/* UPDATED: Button is now a Link */}
                  <Link to={`slip/${slip.id}`} className="text-gray-400 hover:text-purple-600 transition-colors inline-block">
                    <Download size={20} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalarySlipsTable;