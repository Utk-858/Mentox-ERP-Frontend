import React from 'react';
import type { TeacherBankingDetails } from '../../types/teacher';
import DetailItem from '../../components/ui/DetailItem';
import { Landmark, Hash, User, CreditCard } from 'lucide-react';

interface Props {
  data: TeacherBankingDetails;
}

const ViewBankingDetails: React.FC<Props> = ({ data }) => {
  const iconProps = { size: 16, className: "text-gray-500" };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 p-2">
      <DetailItem icon={<Landmark {...iconProps}/>} label="Bank Name" value={data.bankName || 'N/A'} />
      <DetailItem icon={<Landmark {...iconProps}/>} label="Bank Branch" value={data.bankBranch || 'N/A'} />
      <DetailItem icon={<Hash {...iconProps}/>} label="Account Number" value={data.accountNumber || 'N/A'} />
      <DetailItem icon={<User {...iconProps}/>} label="Account Holder Name" value={data.accountHolderName || 'N/A'} />
      <DetailItem icon={<Hash {...iconProps}/>} label="IFSC Code" value={data.ifscCode || 'N/A'} />
      <DetailItem icon={<CreditCard {...iconProps}/>} label="Account Type" value={data.accountType || 'N/A'} />
      <DetailItem icon={<Hash {...iconProps}/>} label="PF Number" value={data.pfNumber || 'N/A'} />
      <DetailItem icon={<Hash {...iconProps}/>} label="PF UAN Number" value={data.pfUanNumber || 'N/A'} />
    </div>
  );
};

export default ViewBankingDetails;