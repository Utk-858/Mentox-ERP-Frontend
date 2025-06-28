import React from 'react';
import type { TeacherDocumentDetails } from '../../types/teacher';
import DetailItem from '../../components/ui/DetailItem';
import { Fingerprint, Landmark } from 'lucide-react';

interface Props {
  data: TeacherDocumentDetails;
}

const ViewDocumentsDetails: React.FC<Props> = ({ data }) => {
  const iconProps = { size: 16, className: "text-gray-500" };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 p-2">
      <DetailItem icon={<Fingerprint {...iconProps}/>} label="Aadhaar Number" value={data.aadhaarNumber || 'N/A'} />
      <DetailItem icon={<Landmark {...iconProps}/>} label="PAN Number" value={data.panNumber || 'N/A'} />
    </div>
  );
};

export default ViewDocumentsDetails;