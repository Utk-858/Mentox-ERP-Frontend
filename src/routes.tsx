import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./features/Lectures/components/Home";
import Hero5 from "./features/Dashboard/page/Hero5.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import Libraryroutes from "./features/libraryms/Libroutes.tsx";
import Examroutes from "./features/Exam Management/Examroutes.tsx";
import Todoroutes from "./features/To-Do/Todoroutes.tsx";
import Qmsroutes from "./features/qms/Qmsroutes.tsx";
import Leaveroutes from "./features/Leave/Leaveroutes.tsx";
import ClassTeacher from "./features/Class Teacher/ClassTeacherroutes.tsx";
import EmployeeRoutes from "./features/Employee/EmployeeRoutes.tsx";
import Profileroutes from "./features/profile/Profileroutes.tsx";
import Login from "./features/Login/login.tsx";
import SalaryRoutes from "./features/Salary/SalaryRoutes.tsx";
import AdminRoutes from "./features/Admin/AdminRoutes.tsx";
import TimeTablePage from "./features/TimeTable/page/TimeTable.tsx";
import SchoolRoutes from "./features/School/Schoolroutes.tsx";
import TCRoutes from "./features/TC Generation/TCRoutes.tsx";
import QRRoutes from "./features/Student Section/StudentRoutes.tsx";
import ClassroomRoutes from "./features/Classroom/ClassroomRoutes.tsx";
import ScholarshipRoutes from "./features/Student-Fee/ScholarshipRoutes.tsx";
import HelpandSupportRoutes from "./features/HelpSupp/Help.support.routes.tsx";
import CourseRoutes from "./features/Course/CourseRoutes.tsx";

const AppRoutes: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/qms/*" element={<Qmsroutes />} />
          <Route path="/Lectures/*" element={<Home />} />
          <Route path="/Library/*" element={<Libraryroutes />} />
          <Route path="/Exam/*" element={<Examroutes />} />
          <Route path="/school/*" element={<SchoolRoutes />} />
          <Route path="/To-Do/*" element={<Todoroutes />} />
          <Route path="/Leave/*" element={<Leaveroutes />} />
          <Route path="/profile/*" element={<Profileroutes />} />
          <Route path="/salary/*" element={<SalaryRoutes />} />
          <Route path="/scholarships/*" element={<ScholarshipRoutes />} />
          <Route path="/classroom/*" element={<ClassroomRoutes />} />
          <Route path="/help-support/*" element={<HelpandSupportRoutes />} />
          <Route path="/Course/*" element={<CourseRoutes />} />
          <Route path="/Classteacher/*" element={<ClassTeacher />} />
          <Route path="/" element={<Hero5 />} />
          <Route path="*" element={<div>404 - Not Found</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/employee/*" element={<EmployeeRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/time" element={<TimeTablePage />} />
          <Route path="/TC/*" element={<TCRoutes />} />
          <Route path="/Student/*" element={<QRRoutes />} />
        </Routes>
      </Suspense>
    </>
  );
};
export default AppRoutes;
