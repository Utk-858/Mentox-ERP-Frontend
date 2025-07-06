import React, { createContext, useState, useContext, type ReactNode } from 'react';
import { salaryData as initialData, type SalaryRecord } from '../data/mockData';

interface SalaryContextType {
  salaryRecords: SalaryRecord[];
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  updateEmployeeStatus: (employeeId: string, month: string, newStatus: SalaryRecord['status']) => void;
  updateEmployeePayment: (employeeId: string, month: string, paymentAmount: number) => void;
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
        // Reset paid amount if status is changed to Unpaid or On Hold
        paidAmount: newStatus === 'Unpaid' || newStatus === 'On Hold' ? 0 : (existingRecord?.paidAmount || 0),
        paidDate: ['Paid', 'Partially Paid'].includes(newStatus) ? new Date().toLocaleDateString('en-GB') : 'N/A',
      };
      
      const otherRecords = currentRecords.filter(r => !(r.employeeId === employeeId && r.month === month));
      return [...otherRecords, newOrUpdatedRecord];
    });
  };
  
  const updateEmployeePayment = (employeeId: string, month: string, paymentAmount: number) => {
    setSalaryRecords(currentRecords => {
      const employeeDetails = initialData.find(e => e.employeeId === employeeId);
      if (!employeeDetails) return currentRecords;

      const existingRecord = currentRecords.find(r => r.employeeId === employeeId && r.month === month);
      
      const oldPaidAmount = existingRecord ? existingRecord.paidAmount : 0;
      const newPaidAmount = oldPaidAmount + paymentAmount;
      const totalAmount = employeeDetails.totalAmount;
      
      let newStatus: SalaryRecord['status'] = 'Unpaid';
      if (newPaidAmount >= totalAmount) {
        newStatus = 'Paid';
      } else if (newPaidAmount > 0) {
        newStatus = 'Partially Paid';
      }

      const newPaymentRecord: SalaryRecord = {
        ...(existingRecord || employeeDetails),
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

  const value = { salaryRecords, selectedDate, setSelectedDate, updateEmployeeStatus, updateEmployeePayment };

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