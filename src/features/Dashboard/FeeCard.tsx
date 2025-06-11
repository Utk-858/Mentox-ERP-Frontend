import React from 'react';

const FeeCard = () => {
  return (
    <div className="bg-white shadow-md p-4 rounded-2xl">
      <h2 className="text-sm text-gray-500 mb-2">Fee Payment</h2>
      <p className="text-2xl font-bold mb-1">RS. 4000</p>
      <button className="bg-purple-600 text-white text-sm px-4 py-2 rounded-lg mb-1">Pay</button>
      <p className="text-xs text-gray-400">Last Fee Payment RS 4500</p>
    </div>
  );
};

export default FeeCard;