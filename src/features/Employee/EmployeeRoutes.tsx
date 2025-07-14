import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const EmployeeManagement = lazy(
  () => import("./pages/EmployeeManagement.tsx")
);
const EmployeeDashboard = lazy(
  () => import("./pages/EmployeeDashboard.tsx")
);

const EmployeeRoutes = () => {
  return (
    <Suspense fallback={<div>Loading Employee Section...</div>}>
      <Routes>
        <Route path="/" element={<EmployeeManagement />} />
        <Route path="/dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </Suspense>
  );
};

export default EmployeeRoutes;
