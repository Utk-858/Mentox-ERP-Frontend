import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  icon?: React.ReactNode; // Optional icon to support dynamic visuals
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = "Success",
  message = "Action completed successfully!",
  buttonText = "OK",
  onButtonClick,
  icon
}) => {
  if (!isOpen) return null;

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      style={{
        backgroundColor: 'rgba(22, 22, 22, 0.8)',
      }}
      onClick={handleBackdropClick}
    >
      <div 
        className="rounded-2xl shadow-2xl max-w-sm w-full mx-auto relative animate-in fade-in duration-300 bg-[#101010] border border-gray-700"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 transition-colors success-modal-close-btn"
          title="Close"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
                
        {/* Content */}
        <div className="px-8 rounded-2xl bg-black py-12 text-center">
          {/* Dynamic Icon */}
          <div className="flex justify-center mb-6">
            {icon ?? (
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            )}
          </div>
                    
          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-3">
            {title}
          </h2>
                    
          {/* Message */}
          <p className="text-gray-300 mb-8 text-lg">
            {message}
          </p>
                    
          {/* Action Button */}
          <button
            onClick={handleButtonClick}
            className="w-full bg-white text-gray-800 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;