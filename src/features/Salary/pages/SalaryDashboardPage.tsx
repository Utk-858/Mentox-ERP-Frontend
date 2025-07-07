import React from 'react';
import { Users, IndianRupee } from 'lucide-react';
import StatCard from '../components/StatCard';
import PaymentStatusCard from '../components/PaymentStatusCard';
import ProcessSalaryCard from '../components/ProcessSalaryCard';
import SalaryTable from '../components/SalaryTable';

const SalaryDashboardPage: React.FC = () => {
  return (
    <div className="space-y-8 pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Users size={20} className="text-[#702DFF]" />} 
          label="Total Employees" 
          value="452" 
        />
        <StatCard 
          icon={<IndianRupee size={20} className="text-[#702DFF]" />} 
          label="Monthly Salaries Paid" 
          value="360,000" 
        />
        <StatCard 
          icon={<IndianRupee size={20} className="text-[#702DFF]" />} 
          label="Unpaid Salaries" 
          value="3,060,000" 
        />
        <StatCard 
          icon={<IndianRupee size={20} className="text-[#702DFF]" />} 
          label="Total Payroll Amount" 
          value="3,060,000" 
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2">
          <PaymentStatusCard />
        </div>
        <div className="lg:w-1/2">
          <ProcessSalaryCard />
        </div>
      </div>

      <div>
        <SalaryTable 
          title="Salary Payment Status Report"
          description="View and export salary payment status reports"
        />
      </div>
    </div>
  );
};

export default SalaryDashboardPage;