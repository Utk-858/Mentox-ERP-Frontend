import React from 'react';
import { Copy, Trash2, TicketX } from 'lucide-react'; // Added TicketX icon
import { useScholarships } from '../context/ScholarshipContext';

const IssuedDiscountsTable: React.FC = () => {
  const { coupons, deleteCoupon } = useScholarships();

  const generalDiscounts = coupons.filter(c => c.isGeneral);

  // If there are no discounts, display a helpful message
  if (generalDiscounts.length === 0) {
    return (
        <div className="text-center bg-gray-50 p-8 rounded-lg">
            <TicketX className="mx-auto text-gray-400" size={40} />
            <h4 className="mt-4 text-lg font-semibold text-gray-700">No General Discounts Issued</h4>
            <p className="mt-1 text-sm text-gray-500">Create a new general discount to see it listed here.</p>
        </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Overview of Active General Discounts</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 font-semibold">Coupon Code</th>
              <th className="p-3 font-semibold">Waiver (%)</th>
              <th className="p-3 font-semibold">Expiry Date</th>
              <th className="p-3 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {generalDiscounts.map((code) => (
              <tr key={code.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <div className="flex items-center gap-2 text-blue-600 font-medium">
                    <span>{code.couponCode}</span>
                    <Copy size={14} className="cursor-pointer hover:text-blue-800" />
                  </div>
                </td>
                <td className="p-3">{code.waiverPercentage}%</td>
                <td className="p-3">{code.expiryDate}</td>
                <td className="p-3 text-center">
                  <button onClick={() => deleteCoupon(code.id)} className="text-red-500 hover:text-red-700 font-medium"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssuedDiscountsTable;