import React,{lazy,Suspense} from "react";
import { Routes, Route } from "react-router-dom";

const ToDoStudent=lazy(()=>import("./pages/ToDoStudent.tsx"))
const ToDoTeacher=lazy(()=>import("./pages/ToDoTeacher.tsx"))
const ExamManagementTeacher=lazy(()=>import("./pages/ExamManagementTeacher.tsx"))
const ExamManagementStudent=lazy(()=>import("./pages/ExamManagementStudent.tsx"))

const Todoroutes = () => {
  return (
    <Suspense fallback={<div>Loading To-Do Section...</div>}>
      <Routes>
        <Route path="/student" element={<ToDoStudent />} />
        <Route path="/teacher" element={<ToDoTeacher />} />
        <Route path="/exam-management-teacher" element={<ExamManagementTeacher />} />
        <Route path="/exam-management-student" element={<ExamManagementStudent />} />
      </Routes>
    </Suspense>
  );
};

export default Todoroutes;