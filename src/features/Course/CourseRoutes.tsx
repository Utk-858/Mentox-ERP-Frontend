import React,{lazy,Suspense} from "react";
import { Routes, Route } from "react-router-dom";

const  CourseDashboard = lazy(
  () => import("./pages/Hero6.tsx")
);
const CourseSubmission = lazy(
  () => import("./pages/Submission.tsx")
);

const CourseRoutes = () => {
  return (
    <Suspense fallback={<div>Loading Course Section...</div>}>
      <Routes>
        <Route path="/" element={<CourseDashboard />} />
        <Route path="/submission" element={<CourseSubmission />} />
      </Routes>
    </Suspense>
  );
};
export default CourseRoutes;