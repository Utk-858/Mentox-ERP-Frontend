import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { PaymentForm } from '../components/forms/PaymentForm';
import { useSalary } from '../context/SalaryContext';
import { salaryData as initialEmployeeList } from '../data/mockData';

const PaySalaryPage: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const { salaryRecords, selectedDate, updateEmployeePayment } = useSalary();
  const navigate = useNavigate();

  const monthString = selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  const employeeDetails = initialEmployeeList.find(r => r.employeeId === employeeId);
  const recordForMonth = salaryRecords.find(r => r.employeeId === employeeId && r.month === monthString);

  if (!employeeDetails) {
    return <div className="p-8 text-center">Employee not found.</div>;
  }

  // --- Smart Logic for Title and Month ---
  const now = new Date();
  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfSelectedMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  
  const isAdvancePayment = startOfSelectedMonth > startOfCurrentMonth;
  const pageTitle = isAdvancePayment ? "Advance Salary" : "Pay Salary";
  const remarksPlaceholder = `${pageTitle} for ${monthString} for ${employeeDetails.employeeName}`;
  // --- End of Smart Logic ---

  const handleFormSubmit = (paymentAmount: number) => {
    if (employeeId) {
      updateEmployeePayment(employeeId, monthString, paymentAmount);
      navigate('/salary');
    }
  };

  return (
    <PaymentForm 
      pageTitle={pageTitle}
      pageSubtitle={`Process payment for ${employeeDetails.employeeName} (${employeeDetails.employeeId})`}
      totalAmount={employeeDetails.totalAmount}
      paidAmount={recordForMonth ? recordForMonth.paidAmount : 0}
      remarksPlaceholder={remarksPlaceholder}
      onFormSubmit={handleFormSubmit}
    />
  );
};

export default PaySalaryPage;