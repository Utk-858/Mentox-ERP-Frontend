import React from 'react';
import DetailItem from '../../components/ui/DetailItem';
import { Users, UserCheck, ShieldAlert, Accessibility, Ruler, Swords } from 'lucide-react';

const AdditionalInfo: React.FC = () => {
  const iconProps = { size: 16, className: "text-dimgray-100" };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
      <DetailItem icon={<Users {...iconProps} />} label="Social Category" value="General" />
      <DetailItem icon={<Users {...iconProps} />} label="Minority Group" value="N/A" />
      <DetailItem icon={<UserCheck {...iconProps} />} label="BPL Beneficiary" value="No" />
      <DetailItem icon={<ShieldAlert {...iconProps} />} label="EWS/Disadvantaged" value="No" />
      <DetailItem icon={<Accessibility {...iconProps} />} label="Special Needs (CWSN)" value="No" />
      <DetailItem icon={<Ruler {...iconProps} />} label="Height/Weight" value="142 cm / 35 Kg" />
      <DetailItem icon={<Swords {...iconProps} />} label="Co-curriculars" value="Science Olympiad, Chess Club" className="lg:col-span-3" />
    </div>
  );
};

export default AdditionalInfo;