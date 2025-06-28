import React from 'react';
 // Using Lucide for consistency

interface ConfirmationModalProps {
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onClose }) => {
  return (

    <div className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm flex items-center justify-center z-50">
      
      {/* Modal Content Box */}
      <div className="relative bg-white rounded-2xl w-full max-w-md p-8 text-center flex flex-col items-center shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Thank You</h2>
        <p className="text-lg text-gray-600 mb-8">Profile Changes have been Updated</p>
        <div className="mb-6">
          <img src="/greentick.svg" className="text-green-500"/>
        </div>
        
        <button
          onClick={onClose}
          className="bg-black text-white font-semibold rounded-lg px-10 py-3 transition-colors hover:bg-gray-800"
        >
          Back To Profile
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;