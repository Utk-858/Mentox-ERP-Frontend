import React from 'react';

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string; // This component always expects a display-ready string
  className?: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value, className }) => {
  return (
    <div className={`pt-1 ${className}`}>
      <div className="flex items-center gap-2 text-sm text-dimgray-100 mb-1">
        {icon}
        <span>{label}</span>
      </div>
      <p className="font-medium text-base text-darkslategray ml-7">
        {value}
      </p>
      <div className="mt-4 border-b border-gray-200" />
    </div>
  );
};

export default DetailItem;