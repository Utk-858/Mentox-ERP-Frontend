import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { PaymentForm } from '../components/forms/PaymentForm';
import { useSalary } from '../context/SalaryContext';
import { salaryData as initialData } from '../data/mockData';

const PaySalaryPage: React.FC = () => {
  const { employeeId, month: monthFromUrl } = useParams<{ employeeId: string; month: string }>();
  const { salaryRecords, updateEmployeePayment } = useSalary();
  const navigate = useNavigate();

  if (!employeeId || !monthFromUrl) {
    return (
        <div className="p-8 text-center text-red-500">
            Error: Employee ID or month is missing from the URL.
        </div>
    );
  }

  const baseEmployeeDetails = initialData.find(e => e.employeeId === employeeId);

  if (!baseEmployeeDetails) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Employee not found.</h1>
        <p>No employee with the ID "{employeeId}" could be found.</p>
      </div>
    );
  }

  // --- THIS IS THE NEW, ROBUST LOGIC ---
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed (e.g., July is 6)
  
  // Manually parse the month and year from the URL string (e.g., "August-2025")
  const [monthName, yearString] = monthFromUrl.split('-');
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const paymentMonth = monthNames.indexOf(monthName);
  const paymentYear = parseInt(yearString, 10);

  // Compare year and month numbers for a foolproof result
  const isAdvance = paymentYear > currentYear || (paymentYear === currentYear && paymentMonth > currentMonth);

  const monthString = monthFromUrl.replace('-', ' ');
  const pageTitle = isAdvance ? "Advance Salary" : "Pay Salary";
  const pageSubtitle = `Process ${isAdvance ? 'advance' : ''} salary for ${baseEmployeeDetails.employeeName} (${baseEmployeeDetails.employeeId})`;
  const remarksPlaceholder = `${isAdvance ? 'Advance Salary' : 'Salary'} for ${monthString} for ${baseEmployeeDetails.employeeName}`;
  // --- END OF FIX ---

  const recordForMonth = salaryRecords.find(r => r.employeeId === employeeId && r.month === monthString);

  const handleFormSubmit = (paymentAmount: number) => {
    updateEmployeePayment(employeeId, monthString, paymentAmount);
    navigate('/salary');
  };

  return (
    <PaymentForm 
      pageTitle={pageTitle}
      pageSubtitle={pageSubtitle}
      totalAmount={baseEmployeeDetails.totalAmount}
      paidAmount={recordForMonth ? recordForMonth.paidAmount : 0}
      remarksPlaceholder={remarksPlaceholder}
      onFormSubmit={handleFormSubmit}
    />
  );
};

export default PaySalaryPage;