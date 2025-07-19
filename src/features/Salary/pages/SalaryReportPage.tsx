import React from 'react';
import SalaryTable from '../components/SalaryTable';
// The useSalary hook is removed from this file as the table now fetches its own data.

const SalaryReportPage: React.FC = () => {
  return (
    <SalaryTable 
      title="Salary Payment Status Report"
      description="View and export salary payment status reports"
    />
  );
};

export default SalaryReportPage;