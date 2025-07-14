import React,{lazy,Suspense} from "react";
import { Routes, Route } from "react-router-dom";
const ClassTeacher = lazy(
  () => import("./pages/ClassTeacher")
);
const Teacher = lazy(
  () => import("./pages/Teacher")
);
const StudentDetails = lazy(
  () => import("./pages/StudentDetails")
);
const ClassTeacherroutes = () => {
  return (
    <Suspense fallback={<div>Loading Exam Section...</div>}>
      <Routes>
        <Route path="/" element={<ClassTeacher />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/student" element={<StudentDetails />} />
      </Routes>
    </Suspense>
  );
};  

export default ClassTeacherroutes;
