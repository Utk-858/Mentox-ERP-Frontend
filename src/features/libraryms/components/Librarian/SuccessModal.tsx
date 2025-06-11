import type React from "react"

interface SuccessModalProps {
  onClose: () => void
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1E1E2E] text-white p-6 rounded-lg shadow-lg text-center max-w-xs w-full">
        <h2 className="text-xl font-bold mb-2">Thank You</h2>
        <p className="mb-6">Book have been returned!</p>

        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>

        <button
          onClick={onClose}
          className="bg-purple-600 text-white py-2 px-4 rounded-md w-full hover:bg-purple-700 transition-colors"
        >
          Back to Main Page
        </button>
      </div>
    </div>
  )
}

export default SuccessModal
