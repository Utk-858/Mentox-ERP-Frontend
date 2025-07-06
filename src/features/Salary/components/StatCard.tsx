import React from 'react';

// Define the props the component will accept
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => {
  return (
    // Using #F5F5F7 for the background as per your color palette
    <div className="bg-[#F5F5F7] p-4 rounded-lg shadow-sm flex items-center gap-4">
      
      {/* Using #E6EAF5 for the light purple icon background */}
      <div className="p-3 bg-[#E6EAF5] rounded-full">
        {icon}
      </div>
      
      <div>
        {/* Using the specific text colors from your design system */}
        <p className="text-sm text-[#606060] font-semibold">{label}</p>
        <p className="text-2xl font-bold text-[#18181A]">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;