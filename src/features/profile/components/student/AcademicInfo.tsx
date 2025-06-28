import React from 'react';
import DetailItem from '../../components/ui/DetailItem';
import {
  ClipboardList, Hash, Calendar, Badge, CalendarCheck, Clipboard, Award, Percent, CheckCircle,
} from 'lucide-react';

const AcademicInfo: React.FC = () => {
  const iconProps = { size: 16, className: "text-dimgray-100" };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
      <DetailItem icon={<ClipboardList {...iconProps} />} label="Class & Section" value="V - A" />
      <DetailItem icon={<Hash {...iconProps} />} label="Roll Number" value="12" />
      <DetailItem icon={<Calendar {...iconProps} />} label="Academic Year" value="2024-25" />
      <DetailItem icon={<Badge {...iconProps} />} label="Admission ID" value="ADM788" />
      <DetailItem icon={<CalendarCheck {...iconProps} />} label="Admission Date" value="01-April-2024" />
      <DetailItem icon={<Clipboard {...iconProps} />} label="Previous Class" value="IV - A" />
      <DetailItem icon={<Award {...iconProps} />} label="Previous Year Result" value="Promoted" />
      <DetailItem icon={<Percent {...iconProps} />} label="Previous Year's Marks" value="85%" />
      <DetailItem icon={<CheckCircle {...iconProps} />} label="Last Year Attendance" value="92%" />
    </div>
  );
};

export default AcademicInfo;