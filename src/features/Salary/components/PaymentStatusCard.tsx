import React from 'react';
import { Play } from 'lucide-react';
// 1. Import Link from react-router-dom
import { Link } from 'react-router-dom';

const PaymentStatusCard: React.FC = () => {
  return (
    <div 
      className="relative p-6 rounded-xl shadow-lg text-white bg-[#702DFF] overflow-hidden"
    >
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/card-background.svg')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center right'
        }}
      />
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
            Salary Management
          </p>
          <h3 className="text-2xl font-bold mt-1">Payment Status Report</h3>
          <p className="text-sm mt-2 opacity-90 max-w-xs uppercase">
            View and export salary payment status reports.
          </p>
        </div>
        
        {/* 2. Replace the <button> with the <Link> component */}
        {/* 3. We'll point this to "process" as well for now. */}
        <Link
          to="/salary/report"
          className="mt-8 bg-black text-white font-semibold py-2.5 px-5 rounded-full self-start hover:bg-gray-800 transition-all flex items-center gap-3 text-sm"
        >
          <span>Report Page</span>
          <div className="bg-white rounded-full p-0.5">
            <Play size={14} className="text-black fill-black" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PaymentStatusCard;