import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Download, Calendar as CalendarIcon, ChevronDown, Search, Eye, IndianRupee, Edit, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSalary } from '../context/SalaryContext';
import { type SalaryRecord } from '../types/salary';
import { salaryData as initialEmployeeList } from '../data/mockData';

export interface SalaryTableProps {
  title: string;
  description: string;
}

const getStatusClasses = (status: SalaryRecord['status']) => {
  switch (status) {
    case 'Paid': return 'bg-[#A8EAC2] text-[#43900C]';
    case 'Unpaid': return 'bg-[#FB6263] text-white';
    case 'Partially Paid': return 'bg-[#FFE493] text-[#E29A02]';
    case 'On Hold': return 'bg-[#DCDCDC] text-[#606060]';
    default: return 'bg-gray-200 text-gray-800';
  }
};

const SalaryTableRow = ({ record, onStatusChange }: { record: SalaryRecord; onStatusChange: (newStatus: SalaryRecord['status']) => void; }) => {
  // We no longer need the isStatusMenuOpen state
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleStatusClick = (newStatus: SalaryRecord['status']) => {
    onStatusChange(newStatus);
    setMenuOpen(false);
  };

  const renderPayLink = () => {
    if (record.status === 'Paid') return null;
    return (
      <>
        <div className="border-t border-white/20"></div>
        <Link to={`/salary/pay/${record.employeeId}/${record.month.replace(' ', '-')}`} className="w-full text-left px-4 py-2.5 hover:bg-white/10 transition-colors flex items-center gap-3 text-sm">
          <IndianRupee size={16} />
          <span>Pay Salary</span>
        </Link>
      </>
    );
  };

  return (
    <tr className="border-b last:border-none hover:bg-gray-50">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D9D9D9]"></div>
          <div>
            <p className="font-medium text-[#18181A]">{record.employeeName}</p>
            <p className="text-xs text-[#7A7A7B]">{record.employeeId}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <div>
          <p className="font-medium text-[#18181A] opacity-70">{record.department}</p>
          <p className="text-xs text-[#7A7A7B] opacity-50">{record.role}</p>
        </div>
      </td>
      <td className="py-4 px-4 font-medium text-[#18181A] opacity-70">
        ₹{record.totalAmount.toLocaleString('en-IN')}
      </td>
      <td className="py-4 px-4">
        <span className={`px-3 py-1.5 rounded-md text-xs font-semibold ${getStatusClasses(record.status)}`}>
          {record.status}
        </span>
      </td>
      <td className="py-4 px-4 font-medium text-[#18181A] opacity-70">{record.month}</td>
      <td className="py-4 px-4 font-medium text-[#18181A] opacity-70">{record.paidDate}</td>
      <td className="py-4 px-4 text-right">
        <div className="relative" ref={menuRef}>
          <button onClick={() => setMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-gray-800 p-2 hover:bg-gray-200 rounded-full transition-colors">
            <MoreHorizontal size={20} />
          </button>
          
          {isMenuOpen && (
            // --- THIS IS THE SIMPLIFIED AND FIXED MENU ---
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#18181A] text-white rounded-lg shadow-xl z-10 overflow-hidden font-poppins">
              <Link to={`/salary/slip/${record.employeeId}/${record.month.replace(' ', '-')}`} className="w-full text-left px-4 py-2.5 hover:bg-white/10 transition-colors flex items-center gap-3 text-sm">
                <Eye size={16} />
                <span>View Slip</span>
              </Link>
              
              {renderPayLink()}

              {/* Status change options are now directly in the main menu */}
              <div className="border-t border-white/20"></div>
              <button onClick={() => handleStatusClick('Unpaid')} className="w-full text-left px-4 py-2.5 hover:bg-white/10 transition-colors flex items-center gap-3 text-sm">
                 <Edit size={16} />
                 <span>Set as Unpaid</span>
              </button>
              <button onClick={() => handleStatusClick('On Hold')} className="w-full text-left px-4 py-2.5 hover:bg-white/10 transition-colors flex items-center gap-3 text-sm">
                 <Edit size={16} />
                 <span>Set as On Hold</span>
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

const SalaryTable: React.FC<SalaryTableProps> = ({ title, description }) => {
  const { salaryRecords, selectedDate, setSelectedDate, updateEmployeeStatus } = useSalary();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');

  const formattedDate = selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const displayData = useMemo(() => {
    const uniqueEmployees = [...new Map(initialEmployeeList.map(item => [item.employeeId, item])).values()];
    
    const monthData = uniqueEmployees.map(employee => {
      const recordForMonth = salaryRecords.find(r => r.employeeId === employee.employeeId && r.month === formattedDate);
      
      if (recordForMonth) {
        return recordForMonth;
      }
      
      const virtualRecord: SalaryRecord = {
        ...employee,
        month: formattedDate,
        status: 'Unpaid',
        paidAmount: 0,
        paidDate: 'N/A',
      };
      return virtualRecord;
    });

    return monthData.filter(record => {
      const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All Status' || record.status === statusFilter;
      const matchesDepartment = departmentFilter === 'All Departments' || record.department === departmentFilter;
      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [salaryRecords, searchTerm, statusFilter, departmentFilter, formattedDate]);

  const handleMonthChange = (increment: number) => {
    setSelectedDate(currentDate => {
      const newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() + increment);
      return newDate;
    });
  };

  return (
    <div className="bg-[#F5F5F7] p-4 sm:p-6 rounded-xl shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-semibold text-black">{title}</h3>
          <p className="text-sm text-[#7A7A7B] mt-1">{description}</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-[#702DFF] text-white font-medium py-2 px-3 rounded-md text-sm">
            <button onClick={() => handleMonthChange(-1)} className="p-1 rounded-full hover:bg-white/20"><ChevronLeft size={16} /></button>
            <CalendarIcon size={16} />
            <span className="w-24 text-center">{formattedDate}</span>
            <button onClick={() => handleMonthChange(1)} className="p-1 rounded-full hover:bg-white/20"><ChevronRight size={16} /></button>
          </div>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#18181A] text-white font-medium py-2 px-4 rounded-md text-sm">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
         <div className="relative w-full sm:w-auto">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search Employee..." 
            className="border rounded-lg pl-10 pr-4 py-2 text-sm w-full bg-[#18181A] text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative w-full sm:w-auto">
          <select 
            className="appearance-none border rounded-lg px-4 py-2 text-sm w-full bg-[#18181A] text-white pr-8"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Paid</option>
            <option>Unpaid</option>
            <option>Partially Paid</option>
            <option>On Hold</option>
          </select>
          <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <div className="relative w-full sm:w-auto">
          <select 
            className="appearance-none border rounded-lg px-4 py-2 text-sm w-full bg-[#18181A] text-white pr-8"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option>All Departments</option>
            <option>IT Department</option>
          </select>
          <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b text-[#606060] opacity-70">
              <th className="py-3 px-4 font-semibold">Employee</th>
              <th className="py-3 px-4 font-semibold">Department</th>
              <th className="py-3 px-4 font-semibold">Amount</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Month</th>
              <th className="py-3 px-4 font-semibold">Paid Date</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((record) => (
              <SalaryTableRow 
                key={`${record.employeeId}-${record.month}`} 
                record={record} 
                onStatusChange={(newStatus) => updateEmployeeStatus(record.employeeId, record.month, newStatus)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryTable;