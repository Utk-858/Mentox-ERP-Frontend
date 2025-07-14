import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import SidebarAdmin from '../../components/SidebarAdmin';
import { ScholarshipProvider } from './context/ScholarshipContext'; // 1. Import the provider

const ScholarshipsPage = lazy(() => import('./pages/ScholarshipsPage'));

const ScholarshipLayout: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside className="h-screen sticky top-0">
                <SidebarAdmin activeLabel = "Dashboard"/>
            </aside>
            <div className="flex-1 flex flex-col">
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

const ScholarshipRoutes: React.FC = () => {
  return (
    // 2. Wrap all routes for this feature in the ScholarshipProvider
    <ScholarshipProvider>
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <Routes>
          <Route element={<ScholarshipLayout />}>
            <Route index element={<ScholarshipsPage />} />
            <Route path="*" element={<Navigate to="/scholarships" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </ScholarshipProvider>
  );
};

export default ScholarshipRoutes;