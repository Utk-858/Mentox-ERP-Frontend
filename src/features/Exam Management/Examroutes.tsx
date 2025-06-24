import React,{lazy,Suspense} from "react";
import { Routes, Route } from "react-router-dom";

const Exammanagement = lazy(
  () => import("./pages/Exammanagement.tsx")
);
const Datesheet = lazy(
  () => import("./pages/Datesheet.tsx")
);
const ExamAnalyticsPage = lazy(
  () => import("./pages/ExamAnalyticsPage.tsx")
);
const TeacherExam = lazy(
  () => import("./pages/TeacherExam.tsx")
);
const MarksUpload = lazy(
  () => import("./pages/MarksUpload.tsx")
);  
const TeacherAssignedMarks = lazy(
  () => import("./pages/TeacherAssignedMarks.tsx")
);
const StudentResult = lazy(
  () => import("./pages/StudentResult.tsx")
);
const Examroutes = () => {
  return (
    <Suspense fallback={<div>Loading Exam Section...</div>}>
      <Routes>
        <Route path="/" element={<Exammanagement />} />
        <Route path="/datesheet" element={<Datesheet />} />
        <Route path="/exam-analytics" element={<ExamAnalyticsPage />} />
        <Route path="/teacher-exam" element={<TeacherExam />} />
        <Route path="/marks-upload" element={<MarksUpload />} />
        <Route path="/teacher-assigned-marks" element={<TeacherAssignedMarks />} />
        <Route path="/student-result" element={<StudentResult />} />
      </Routes>
    </Suspense>
  );
};  

export default Examroutes;
