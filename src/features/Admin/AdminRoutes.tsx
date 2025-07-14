import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const AttendancePage = lazy(
  () => import("./pages/AttendancePage.tsx")
);


const AdminRoutes = () => {
  return (
    <Suspense fallback={<div>Loading Admin Section...</div>}>
      <Routes>
        <Route path="/attendance" element={<AttendancePage />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
