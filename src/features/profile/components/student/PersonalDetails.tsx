import React from 'react';
import DetailItem from '../../components/ui/DetailItem';
import type { UserProfileData } from '../../types/user';
import { User, Mail, Smartphone, Briefcase, Home } from 'lucide-react';
import { format } from 'date-fns';

interface PersonalDetailsProps {
  userData: UserProfileData;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ userData }) => {
  const iconProps = { size: 16, className: "text-dimgray-100" };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
        <DetailItem icon={<User {...iconProps}/>} label="Date of Birth" value={format(userData.dateOfBirth, 'PPP')} />
        <DetailItem icon={<User {...iconProps}/>} label="Gender" value={userData.gender} />
        <DetailItem icon={<User {...iconProps}/>} label="Blood Group" value={userData.bloodGroup} />
        <DetailItem icon={<User {...iconProps}/>} label="Nationality" value={userData.nationality} />
        <DetailItem icon={<Mail {...iconProps}/>} label="Email Address" value={userData.email} />
        <DetailItem icon={<Smartphone {...iconProps}/>} label="Mobile Number" value={userData.mobile} />
        <DetailItem icon={<Smartphone {...iconProps}/>} label="Alternate Mobile" value={userData.alternateMobile} />
        <DetailItem icon={<User {...iconProps}/>} label="Father’s Name" value={userData.fatherName} />
        <DetailItem icon={<Briefcase {...iconProps}/>} label="Father’s Occupation" value={userData.fatherOccupation} />
        <DetailItem icon={<User {...iconProps}/>} label="Mother’s Name" value={userData.motherName} />
        <DetailItem icon={<Briefcase {...iconProps}/>} label="Mother’s Occupation" value={userData.motherOccupation} />
        <DetailItem icon={<User {...iconProps}/>} label="Guardian’s Name" value={userData.guardianName} />
        <div className="lg:col-span-3">
          <DetailItem icon={<Home {...iconProps}/>} label="Full Address" value={userData.fullAddress} />
        </div>
    </div>
  );
}

export default PersonalDetails;