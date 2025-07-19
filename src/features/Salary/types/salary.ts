export type SalaryRecord = {
  employeeName: string;
  employeeId: string;
  department: string;
  role: string;
  totalAmount: number;
  paidAmount: number;
  status: 'Paid' | 'Unpaid' | 'Partially Paid' | 'On Hold';
  month: string; 
  paidDate: string;
};

export type SalarySlipField = { 
  id: string; 
  label: string; 
  value: number; 
  isDefault: boolean; 
};

export type SalarySlip = {
    employeeName: string;
    employeeId: string;
    department: string;
    designation: string;
    joiningDate: string;
    payPeriod: string;
    paidDays: number;
    earnings: SalarySlipField[];
    deductions: SalarySlipField[];
};