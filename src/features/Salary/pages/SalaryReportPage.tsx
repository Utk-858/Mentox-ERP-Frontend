import React from 'react';
import SalaryTable from '../components/SalaryTable';

const SalaryReportPage: React.FC = () => {
  // This page is very simple. It just renders our powerful SalaryTable
  // component with the specific title and description for this report view.
  return (
    <SalaryTable 
      title="Salary Payment Status Report"
      description="View and export salary payment status reports"
    />
  );
};

export default SalaryReportPage;