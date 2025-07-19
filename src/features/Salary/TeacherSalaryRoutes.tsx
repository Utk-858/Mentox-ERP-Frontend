import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import TeacherSalaryLayout from './TeacherSalaryLayout';
import { SalaryProvider } from './context/SalaryContext';

// Lazily import the pages for the teacher's view
const TeacherSalarySlipsPage = lazy(() => import('./pages/TeacherSalarySlipsPage'));
const TeacherSalarySlipPage = lazy(() => import('./pages/TeacherSalarySlipPage'));

const TeacherSalaryRoutes: React.FC = () => {
  return (
    // We can reuse the same SalaryProvider
    <SalaryProvider>
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <Routes>
          <Route element={<TeacherSalaryLayout />}>
            {/* 'index' makes the list of slips the default page */}
            <Route index element={<TeacherSalarySlipsPage />} />
            
            {/* Route to view a specific, detailed slip */}
            <Route path="slip/:slipId" element={<TeacherSalarySlipPage />} />
          </Route>
        </Routes>
      </Suspense>
    </SalaryProvider>
  );
};

export default TeacherSalaryRoutes;