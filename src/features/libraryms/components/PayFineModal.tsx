import React from 'react';
import { X } from 'lucide-react';

interface PayFineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PayFineModal: React.FC<PayFineModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      onClick={handleBackdropClick}
      style={{
        backgroundColor: 'rgba(22, 22, 22, 0.8)',
      }}
    >
      <div className="relative bg-white rounded-xl p-6 w-[400px] shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          title="Close"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold text-center text-[#2d2d2d] mb-4">
          Pay Fine for the book
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          {/* Issue & Return Dates */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Issue Date<span className="text-red-500">*</span>
            </label>
            <input type="date" defaultValue="2028-07-07" className="w-full border border-gray-300 rounded-md px-2 py-1" />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Return Date<span className="text-red-500">*</span>
            </label>
            <input type="date" defaultValue="2028-07-07" className="w-full border border-gray-300 rounded-md px-2 py-1" />
          </div>

          {/* Fine Collected & Payment Mode */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Fine Collected (₹)<span className="text-red-500">*</span>
            </label>
            <input type="text" defaultValue="4.00" className="w-full border border-gray-300 rounded-md px-2 py-1" />
          </div>
          <div>
            <label htmlFor="payment-mode" className="block mb-1 font-medium text-gray-700">
              Payment mode<span className="text-red-500">*</span>
            </label>
            <select
              id="payment-mode"
              className="w-full border border-gray-300 rounded-md px-2 py-1"
            >
              <option>Cash</option>
              <option>UPI</option>
              <option>NetBanking</option>
            </select>
          </div>

          {/* Transaction ID */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium text-gray-700">
              Transaction ID
            </label>
            <input type="text" placeholder="Enter the Transaction ID" className="w-full border border-gray-300 rounded-md px-2 py-1" />
          </div>

          {/* Condition & Remarks */}
          <div>
            <label htmlFor="condition-on-return" className="block mb-1 font-medium text-gray-700">
              Condition on Return
            </label>
            <select
              id="condition-on-return"
              className="w-full border border-gray-300 rounded-md px-2 py-1"
            >
              <option>Damaged</option>
              <option>Same as Given</option>
              <option>Unknown</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Remarks</label>
            <input type="text" className="w-full border border-gray-300 rounded-md px-2 py-1" />
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-[#6b4eff] text-white font-semibold py-2 rounded-md hover:bg-[#5a3ddd] transition"
        >
          Return Book
        </button>
      </div>
    </div>
  );
};

export default PayFineModal;