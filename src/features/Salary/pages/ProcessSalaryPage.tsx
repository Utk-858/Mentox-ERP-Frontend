import React from 'react';
import SalaryTable from '../components/SalaryTable';

const ProcessSalaryPage: React.FC = () => {
  return (
    <SalaryTable 
      title="Process Salary"
      description="Manage and process monthly salaries for all employees."
    />
  );
};

export default ProcessSalaryPage;