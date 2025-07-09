import React,{lazy,Suspense} from "react";
import { Routes, Route } from "react-router-dom";
const SchoolDetails = lazy(
  () => import("./pages/SchoolDetails")
);
const DepartmentandDesignation = lazy(
  () => import("./pages/DepartmentandDesignation")
);
const ClassandSection = lazy(
  () => import("./pages/ClassandSection")
);
const SubjectDatabase = lazy(
  () => import("./pages/SubjectDatabase")
);
const AssignTeacher = lazy(
  () => import("./pages/AssignTeacher")
);
const Schoolroutes = () => {
  return (
    <Suspense fallback={<div>Loading Exam Section...</div>}>
      <Routes>
        <Route path="/" element={<SchoolDetails/>} />
        <Route path="/department" element={<DepartmentandDesignation/>} />
        <Route path="/class" element={<ClassandSection/>} />
         <Route path="/database" element={<SubjectDatabase/>} />
          <Route path="/assign" element={<AssignTeacher/>} />
      </Routes>
    </Suspense>
  );
};  

export default Schoolroutes;
