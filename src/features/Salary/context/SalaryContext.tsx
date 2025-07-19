import React, { createContext, useState, useContext, type ReactNode } from 'react';
import { salaryData as initialData } from '../data/mockData';
import { type SalaryRecord, type SalarySlip } from '../types/salary';

// The interface now includes the new function
interface SalaryContextType {
  salaryRecords: SalaryRecord[];
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  updateEmployeeStatus: (employeeId: string, month: string, newStatus: SalaryRecord['status']) => void;
  updateEmployeePayment: (employeeId: string, month: string, paymentAmount: number) => void;
  updateSalarySlip: (employeeId: string, month: string, updatedSlip: SalarySlip) => void;
}

const SalaryContext = createContext<SalaryContextType | undefined>(undefined);

export const SalaryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [salaryRecords, setSalaryRecords] = useState<SalaryRecord[]>(initialData);
  const [selectedDate, setSelectedDate] = useState(new Date('2025-07-01'));

  const updateEmployeeStatus = (employeeId: string, month: string, newStatus: SalaryRecord['status']) => {
    setSalaryRecords(currentRecords => {
      const employeeDetails = initialData.find(e => e.employeeId === employeeId);
      if (!employeeDetails) return currentRecords;
      const existingRecord = currentRecords.find(r => r.employeeId === employeeId && r.month === month);
      const newOrUpdatedRecord: SalaryRecord = {
        ...(existingRecord || employeeDetails),
        month,
        status: newStatus,
        paidAmount: newStatus === 'Paid' ? employeeDetails.totalAmount : (newStatus === 'Unpaid' || newStatus === 'On Hold' ? 0 : (existingRecord?.paidAmount || 0)),
        paidDate: ['Paid', 'Partially Paid'].includes(newStatus) ? new Date().toLocaleDateString('en-GB') : 'N/A',
      };
      const otherRecords = currentRecords.filter(r => !(r.employeeId === employeeId && r.month === month));
      return [...otherRecords, newOrUpdatedRecord];
    });
  };
  
  const updateEmployeePayment = (employeeId: string, month: string, paymentAmount: number) => {
    setSalaryRecords(currentRecords => {
      const baseEmployeeDetails = initialData.find(e => e.employeeId === employeeId);
      if (!baseEmployeeDetails) return currentRecords;
      const existingRecord = currentRecords.find(r => r.employeeId === employeeId && r.month === month);
      const oldPaidAmount = existingRecord ? existingRecord.paidAmount : 0;
      const newPaidAmount = oldPaidAmount + paymentAmount;
      const totalAmount = baseEmployeeDetails.totalAmount;
      let newStatus: SalaryRecord['status'] = 'Unpaid';
      if (newPaidAmount >= totalAmount) {
        newStatus = 'Paid';
      } else if (newPaidAmount > 0) {
        newStatus = 'Partially Paid';
      }
      const newPaymentRecord: SalaryRecord = {
        ...baseEmployeeDetails,
        month,
        totalAmount,
        paidAmount: newPaidAmount,
        status: newStatus,
        paidDate: new Date().toLocaleDateString('en-GB'),
      };
      const otherRecords = currentRecords.filter(r => !(r.employeeId === employeeId && r.month === month));
      return [...otherRecords, newPaymentRecord];
    });
  };

  // --- NEW FUNCTION TO SAVE THE EDITED SLIP ---
  const updateSalarySlip = (employeeId: string, month: string, updatedSlip: SalarySlip) => {
    setSalaryRecords(currentRecords => {
      // Recalculate totals based on the edited slip
      const grossEarnings = updatedSlip.earnings.reduce((sum, item) => sum + item.value, 0);
      const totalDeductions = updatedSlip.deductions.reduce((sum, item) => sum + item.value, 0);
      const netSalary = grossEarnings - totalDeductions;

      return currentRecords.map(record => {
        if (record.employeeId === employeeId && record.month === month) {
          // Update the summary record in the table with the new totals
          return {
            ...record,
            totalAmount: grossEarnings,
            paidAmount: netSalary, // Assuming the edit reflects a payment
            status: 'Paid',
            paidDate: new Date().toLocaleDateString('en-GB'),
          };
        }
        return record;
      });
    });
    alert(`Salary slip for ${updatedSlip.employeeName} for ${month} has been updated!`);
  };

  const value = { salaryRecords, selectedDate, setSelectedDate, updateEmployeeStatus, updateEmployeePayment, updateSalarySlip };

  return (
    <SalaryContext.Provider value={value}>
      {children}
    </SalaryContext.Provider>
  );
};

export const useSalary = (): SalaryContextType => {
  const context = useContext(SalaryContext);
  if (context === undefined) {
    throw new Error('useSalary must be used within a SalaryProvider');
  }
  return context;
};