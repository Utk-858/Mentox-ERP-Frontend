// src/features/teacher-profile/components/ViewTeachingDetails.tsx
import React from 'react';
import { Building, Briefcase, Clock, BookOpen, Users, Calendar } from 'lucide-react';
import DetailItem from '../../components/ui/DetailItem';
// --- FIX IS HERE ---
import type { TeacherTeachingDetails } from '../../types/teacher';
import { format } from 'date-fns';

interface Props {
  data: TeacherTeachingDetails;
}

const ViewTeachingDetails: React.FC<Props> = ({ data }) => {
  const iconProps = { size: 18, className: "text-gray-500" };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8 p-4">
      <DetailItem
        icon={<Building {...iconProps} />}
        label="Department"
        value={data.department || 'N/A'}
      />
      <DetailItem
        icon={<Briefcase {...iconProps} />}
        label="Designation"
        value={data.designation || 'N/A'}
      />
      <DetailItem
        icon={<Clock {...iconProps} />}
        label="Employment Type"
        value={data.employmentType || 'N/A'}
      />
      <DetailItem
        icon={<Calendar {...iconProps} />}
        label="Joining Date"
        value={data.joiningDate ? format(new Date(data.joiningDate), 'PPP') : 'N/A'}
      />
      <DetailItem
        icon={<BookOpen {...iconProps} />}
        label="Subjects Taught"
        value={data.subjects || 'N/A'}
      />
      <DetailItem
        icon={<Users {...iconProps} />}
        label="Classes Taught"
        value={data.classes || 'N/A'}
      />
    </div>
  );
};

export default ViewTeachingDetails;