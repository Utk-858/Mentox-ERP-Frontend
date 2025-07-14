import React,{lazy,Suspense} from "react";
import { Routes, Route } from "react-router-dom";

const StudentHelp = lazy(() => import("./student/page/Hero7.tsx"));
const TeacherHelp = lazy(() => import("./teacher/page/Hero8.tsx"));
const AdminHelp = lazy(() => import("./Admin/Hero9.tsx"));

const HelpRoutes = () => {
  return (
    <Suspense fallback={<div>Loading Help Section...</div>}>
      <Routes>
        <Route path="/student" element={<StudentHelp />} />
        <Route path="/teacher" element={<TeacherHelp />} />
        <Route path="/admin" element={<AdminHelp />} />
      </Routes>
    </Suspense>
  );
};
export default HelpRoutes;