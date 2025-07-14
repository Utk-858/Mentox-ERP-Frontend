import React from "react";

interface CurrentDueCardProps {
  amount: number;
  nextDeadline: string; // e.g. "01/06/2025"
  onPayNow?: () => void;
}

const CurrentDueCard: React.FC<CurrentDueCardProps> = ({
  amount,
  nextDeadline,
  onPayNow,
}) => {
  return (
    <div className="w-[330px]  flex flex-col justify-between rounded-xl border border-[#702DFF] bg-[#6f2dff46] p-3">
      <div>
        <h2 className="text-[#702DFF] font-bold text-lg">Current Due</h2>
        <p className="text-sm text-[#702DFF] mt-1">
          Next payment deadline: {nextDeadline}
        </p>
      </div>
      <div className="flex flex-col ">
        <p className="text-3xl font-bold text-black mt-4">₹ {amount.toFixed(2)}</p>
        <button
          onClick={onPayNow}
          disabled={amount === 0}
          className="mt-6 w-full rounded-md  bg-white py-2 text-black border border-black "
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default CurrentDueCard;
