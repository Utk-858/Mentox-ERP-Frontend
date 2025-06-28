import React from 'react';
import { format } from 'date-fns';
import type { TeacherPersonalDetails } from '../../types/teacher';
import DetailItem from '../../components/ui/DetailItem';
import { User, Mail, Smartphone, Home, Briefcase, Heart, Flag } from 'lucide-react';

// A reusable component for section titles within the view components
export const ViewSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-lg font-semibold text-gray-800 lg:col-span-3 mt-4 mb-2 pt-4 border-t">
        {children}
    </h3>
);

interface Props {
  data: TeacherPersonalDetails;
}

const ViewPersonalDetails: React.FC<Props> = ({ data }) => {
  const iconProps = { size: 16, className: "text-gray-500" };

  // Helper to format the full address for display
  const formatAddress = (address: TeacherPersonalDetails['currentAddress']) => {
      return `${address.line1}, ${address.line2}, ${address.city}, ${address.state} - ${address.pincode}, ${address.country}`;
  };

  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
        <h3 className="text-lg font-semibold text-gray-800 lg:col-span-3 mb-2">Personal Details</h3>
        <DetailItem icon={<User {...iconProps}/>} label="Date of Birth" value={data.dateOfBirth ? format(new Date(data.dateOfBirth), 'PPP') : 'N/A'} />
        <DetailItem icon={<User {...iconProps}/>} label="Gender" value={data.gender || 'N/A'} />
        <DetailItem icon={<User {...iconProps}/>} label="Blood Group" value={data.bloodGroup || 'N/A'} />
        <DetailItem icon={<Flag {...iconProps}/>} label="Nationality" value={data.nationality || 'N/A'} />
        <DetailItem icon={<Mail {...iconProps}/>} label="Email Address" value={data.email || 'N/A'} />
        <DetailItem icon={<Smartphone {...iconProps}/>} label="Mobile Number" value={data.mobile || 'N/A'} />
        <DetailItem icon={<Smartphone {...iconProps}/>} label="Alternate Mobile" value={data.alternateMobile || 'N/A'} />
        <DetailItem icon={<Heart {...iconProps}/>} label="Marital Status" value={data.maritalStatus || 'N/A'} />
        <DetailItem icon={<User {...iconProps}/>} label="Religion" value={data.religion || 'N/A'} />

        <ViewSectionTitle>Family Details</ViewSectionTitle>
        <DetailItem icon={<User {...iconProps}/>} label="Father’s Name" value={data.fatherName || 'N/A'} />
        <DetailItem icon={<Briefcase {...iconProps}/>} label="Father’s Occupation" value={data.fatherOccupation || 'N/A'} />
        <DetailItem icon={<Smartphone {...iconProps}/>} label="Father’s Mobile" value={data.fatherMobile || 'N/A'} />
        <DetailItem icon={<User {...iconProps}/>} label="Mother’s Name" value={data.motherName || 'N/A'} />
        <DetailItem icon={<Briefcase {...iconProps}/>} label="Mother’s Occupation" value={data.motherOccupation || 'N/A'} />
        <DetailItem icon={<Smartphone {...iconProps}/>} label="Mother’s Mobile" value={data.motherMobile || 'N/A'} />
        <DetailItem icon={<User {...iconProps}/>} label="Spouse's Name" value={data.spouseName || 'N/A'} />
        <DetailItem icon={<Briefcase {...iconProps}/>} label="Spouse's Occupation" value={data.spouseOccupation || 'N/A'} />
        <DetailItem icon={<Smartphone {...iconProps}/>} label="Spouse's Mobile" value={data.spouseMobile || 'N/A'} />
        
        <ViewSectionTitle>Address Details</ViewSectionTitle>
        <div className="lg:col-span-3">
            <DetailItem icon={<Home {...iconProps}/>} label="Current Address" value={formatAddress(data.currentAddress)} />
        </div>
        <div className="lg:col-span-3">
            <DetailItem icon={<Home {...iconProps}/>} label="Permanent Address" value={data.isPermanentSameAsCurrent ? formatAddress(data.currentAddress) : formatAddress(data.permanentAddress)} />
        </div>
      </div>
    </div>
  );
};

export default ViewPersonalDetails;