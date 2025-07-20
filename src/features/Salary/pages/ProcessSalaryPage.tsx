import React from 'react';
import SalaryTable from '../components/SalaryTable';
// The useSalary hook is removed from this file as the table now fetches its own data.

const ProcessSalaryPage: React.FC = () => {
  return (
    <SalaryTable 
      title="Process Salary"
      description="Manage and process monthly salaries for all employees."
    />
  );
};

export default ProcessSalaryPage;