import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import SalaryLayout from './SalaryLayout';
import { SalaryProvider } from './context/SalaryContext';

// Lazily import all the pages for this feature
const SalaryDashboardPage = lazy(() => import('./pages/SalaryDashboardPage'));
const ProcessSalaryPage = lazy(() => import('./pages/ProcessSalaryPage'));
const SalaryReportPage = lazy(() => import('./pages/SalaryReportPage'));
const PaySalaryPage = lazy(() => import('./pages/PaySalaryPage'));
const EditableSalarySlipPage = lazy(() => import('./pages/EditableSalarySlipPage'));

const SalaryRoutes: React.FC = () => {
  return (
    <SalaryProvider>
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <Routes>
          <Route element={<SalaryLayout />}>
            <Route index element={<SalaryDashboardPage />} />
            <Route path="process" element={<ProcessSalaryPage />} /> 
            <Route path="report" element={<SalaryReportPage />} />
            <Route path="pay/:employeeId/:month" element={<PaySalaryPage />} />
            <Route path="slip/:employeeId/:month" element={<EditableSalarySlipPage />} />
          </Route>
        </Routes>
      </Suspense>
    </SalaryProvider>
  );
};

export default SalaryRoutes;