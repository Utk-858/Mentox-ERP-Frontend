import React from 'react';
import type { TeacherEducationDetails } from '../../types/teacher';
import DetailItem from '../../components/ui/DetailItem';
import { Award, University, Calendar, Percent, Book, Star, FileText, Briefcase, TestTube2 } from 'lucide-react';

interface Props {
  data: TeacherEducationDetails;
}

const ViewEducationDetails: React.FC<Props> = ({ data }) => {
  const iconProps = { size: 16, className: "text-gray-500" };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 p-2">
      <DetailItem icon={<Award {...iconProps}/>} label="Highest Qualification" value={data.highestQualification || 'N/A'} />
      <DetailItem icon={<University {...iconProps}/>} label="University/Board" value={data.university || 'N/A'} />
      <DetailItem icon={<Calendar {...iconProps}/>} label="Year of Passing" value={data.yearOfPassing || 'N/A'} />
      <DetailItem icon={<Percent {...iconProps}/>} label="Percentage/Grade" value={data.percentage || 'N/A'} />
      <DetailItem icon={<Book {...iconProps}/>} label="Specialization" value={data.specialization || 'N/A'} />
      <DetailItem icon={<Star {...iconProps}/>} label="Additional Degrees" value={data.additionalDegrees || 'N/A'} />
      <DetailItem icon={<Briefcase {...iconProps}/>} label="Professional Qualifications" value={data.professionalQualifications || 'N/A'} />
      <DetailItem icon={<TestTube2 {...iconProps}/>} label="Research Qualifications" value={data.researchQualifications || 'N/A'} />
      <div className="lg:col-span-3">
        <DetailItem icon={<FileText {...iconProps}/>} label="Diploma/Certificates Status" value={data.certificateUrl ? "Submitted" : "Not Submitted"} />
      </div>
    </div>
  );
};

export default ViewEducationDetails;