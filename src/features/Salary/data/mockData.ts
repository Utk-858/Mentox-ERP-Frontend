// Defines the data structure for a salary record.
export type SalaryRecord = {
  employeeName: string;
  employeeId: string;
  department: string;
  role: string;
  totalAmount: number; // The full salary for the month
  paidAmount: number;  // How much has been paid so far
  status: 'Paid' | 'Unpaid' | 'Partially Paid' | 'On Hold';
  month: string; 
  paidDate: string;
};

// Amounts are now numbers for easier calculation
export const salaryData: SalaryRecord[] = [
  { employeeName: 'Keshav Green', employeeId: '234421', department: 'IT Department', role: 'System Coordinator', totalAmount: 120000, paidAmount: 120000, status: 'Paid', month: 'July 2025', paidDate: '01-07-2025' },
  { employeeName: 'Shulin Gill', employeeId: '234422', department: 'IT Department', role: 'System Coordinator', totalAmount: 110000, paidAmount: 0, status: 'Unpaid', month: 'July 2025', paidDate: 'N/A' },
  { employeeName: 'Hemish Morgan', employeeId: '234423', department: 'IT Department', role: 'System Coordinator', totalAmount: 110000, paidAmount: 50000, status: 'Partially Paid', month: 'July 2025', paidDate: '01-07-2025' },
  { employeeName: 'Himanshu Stark', employeeId: '234424', department: 'IT Department', role: 'System Coordinator', totalAmount: 110000, paidAmount: 0, status: 'On Hold', month: 'July 2025', paidDate: 'N/A' },
  { employeeName: 'Utkarsh Zuckerberg', employeeId: '234425', department: 'IT Department', role: 'System Coordinator', totalAmount: 110000, paidAmount: 110000, status: 'Paid', month: 'July 2025', paidDate: '01-07-2025' },
];