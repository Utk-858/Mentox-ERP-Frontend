import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';

// Lazily import the profile pages
const StudentProfilePage = lazy(() => import('./pages/ProfilePage'));
const TeacherProfilePage = lazy(() => import('./pages/TeacherProfilePage'));

const ProfileRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* This parent route renders your MainLayout component */}
        <Route path="/" element={<MainLayout />}>

          <Route index element={<Navigate to="student" replace />} />
          
          <Route path="student" element={<StudentProfilePage />} />
          <Route path="teacher" element={<TeacherProfilePage />} />

          {/* A fallback for any other sub-routes like /profile/settings that don't exist */}
          <Route path="*" element={<div>Profile Section Not Found</div>} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default ProfileRoutes;