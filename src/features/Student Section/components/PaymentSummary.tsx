import { useState } from "react"
import PaymentSuccessModal from "./PaymentSuccessModal"

interface FeeItem {
  name: string
  amount: number
}

export default function PaymentSummary() {
  const [couponCode, setCouponCode] = useState("")
  const [isApplied, setIsApplied] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const fees: FeeItem[] = [
    { name: "Admission Fee", amount: 8000 },
    { name: "Tuition Fee", amount: 8000 },
    { name: "Lab Fee", amount: 3200 },
    { name: "Library Fee", amount: 5000 },
    { name: "Sports Fee", amount: 5000 },
    { name: "Transport Fee", amount: 1000 },
    { name: "Others", amount: 1000 },
    { name: "Late Fee", amount: 0 },
  ]

  const totalAmount = fees.reduce((sum, fee) => sum + fee.amount, 0)

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}.00`
  }

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      setIsApplied(true)
      console.log("Applying coupon:", couponCode)
    }
  }

  const handlePayment = () => {
    setShowSuccessModal(true)
    console.log("Processing payment for:", formatCurrency(totalAmount))
  }

  const handleCloseModal = () => {
    setShowSuccessModal(false)
  }

  return (
    <div className="max-w-2xl mx-auto ">
      {/* Card */}
      <div className="bg-[#F5F5F7] px-7 border border-gray-200 shadow-lg rounded-xl overflow-hidden">
        {/* Card Header */}
        <div className="text-center py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Payment Summary</h2>
          <p className="text-sm text-gray-600 mt-1">You are paying for the current academic term.</p>
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-6">

          {/* Fee Items */}
          <div className="space-y-3">
            {fees.map((fee, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-700 text-sm">{fee.name}</span>
                <span className="text-gray-800 font-medium">{formatCurrency(fee.amount)}</span>
              </div>
            ))}
          </div>

          {/* Coupon Code Section */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-gray-700 text-sm mb-3">Have a Coupon Code?</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-3 py-2 mx-4 rounded border border-gray-300 text-sm "
                disabled={isApplied}
              />
              <button
                onClick={handleApplyCoupon}
                className={`px-4 py-2 rounded text-white text-sm font-medium ${
                  isApplied || !couponCode.trim()
                    ? "bg-[#702DFF] cursor-not-allowed"
                    : "bg-[#702DFF] "
                }`}
                disabled={isApplied || !couponCode.trim()}
              >
                {isApplied ? "Applied" : "Apply"}
              </button>
            </div>
            {isApplied && (
              <p className="text-green-600 text-sm mt-2">Coupon code applied successfully!</p>
            )}
          </div>

          {/* Total Amount */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-semibold">Amount to Pay</span>
              <span className="text-green-600 font-bold text-lg">{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            className="w-full bg-[#702DFF] text-white py-3 text-base font-medium rounded"
          >
            Pay {formatCurrency(totalAmount)} with RazorPay
          </button>
        </div>
      </div>

      {/* Success Modal */}
      <PaymentSuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        amount={formatCurrency(totalAmount)}
      />
    </div>
  )
}
