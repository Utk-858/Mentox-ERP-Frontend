// src/pages/TeacherSalarySlipsPage.tsx
import React from 'react';
import SalarySlipsTable from '../components/SalarySlipsTable';

const TeacherSalarySlipsPage: React.FC = () => {
  return (
    // Use a light gray background for the page
    <div className="font-sans">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">View Salary Slips</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Here you can find and View salary slips
                </p>
            </div>
        </header>

        {/* The main content card */}
        <div className="bg-[#f5f5f7] p-4 sm:p-6 rounded-lg shadow-sm">
            <SalarySlipsTable />
        </div>
    </div>
  );
};

export default TeacherSalarySlipsPage;