import React, { Suspense, lazy } from "react";
import { Routes, Route, } from "react-router-dom";


const ClassroomDashboard = lazy(()=> import ("./features/classroom/pages/Dashboard"));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<ClassroomDashboard />} />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
