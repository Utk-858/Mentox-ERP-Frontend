import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import SalaryLayout from './SalaryLayout';
import { SalaryProvider } from './context/SalaryContext';

const SalaryDashboardPage = lazy(() => import('./pages/SalaryDashboardPage'));
const ProcessSalaryPage = lazy(() => import('./pages/ProcessSalaryPage'));
const PaySalaryPage = lazy(() => import('./pages/PaySalaryPage'));
// We no longer import AdvanceSalaryPage
const SalaryReportPage = lazy(() => import('./pages/SalaryReportPage'));

const SalaryRoutes: React.FC = () => {
  return (
    <SalaryProvider>
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <Routes>
          <Route element={<SalaryLayout />}>
            <Route index element={<SalaryDashboardPage />} />
            <Route path="process" element={<ProcessSalaryPage />} /> 
            {/* This is now the ONLY route for all payments */}
            <Route path="pay/:employeeId" element={<PaySalaryPage />} />
            <Route path="report" element={<SalaryReportPage />} />
          </Route>
        </Routes>
      </Suspense>
    </SalaryProvider>
  );
};

export default SalaryRoutes;