"use client"

import { useEffect } from "react"
import { Check } from "lucide-react"

interface PaymentSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  amount?: string
}

export default function PaymentSuccessModal({ isOpen, onClose, amount }: PaymentSuccessModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEsc)
    } else {
      document.removeEventListener("keydown", handleEsc)
    }
    return () => document.removeEventListener("keydown", handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#908c8c34]"
      onClick={onClose}
    >
      <div
        className="bg-[#606060ec] text-white max-w-sm w-full mx-4 rounded-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-white text-xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {/* Modal Content */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-2">Thank You</h2>
          <p className="text-lg mb-6">Payment Successful!</p>

          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          </div>

          {/* Success Message */}
          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            Your fee payment has been processed successfully. You can download the receipt from your dashboard.
          </p>


          {/* Back to Dashboard Button */}
          <button
            onClick={() => {
              onClose()
              console.log("Navigating to dashboard...")
            }}
            className="bg-white text-gray-800 hover:bg-gray-100 px-6 py-2 rounded-full font-medium"
          >
            Back To Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
