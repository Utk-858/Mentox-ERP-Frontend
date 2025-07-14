import React,{lazy,Suspense} from "react";
import { Routes, Route } from "react-router-dom";

const ClassroomDashboard = lazy(
  () => import("./pages/Classroom.tsx")
);
const Classroom2 = lazy(
  () => import("./pages/Classroom2.tsx")
);
const SettingsTeacher = lazy(
    () => import("./pages/SettingsTeacher.tsx")
);
const SettingsAdmin = lazy(
    () => import("./pages/SettingAdmin.tsx")
);
const Assignment = lazy(
  () => import("./pages/Assignment.tsx")
);  
const Quiz = lazy(() => import("./pages/quiz.tsx"));
const CreateAssignment = lazy(
  () => import("./pages/CreateAssignment.tsx")
);
const LateSubmission = lazy(
  () => import("./pages/LateSubmission.tsx")
);
const SubmissionView = lazy(
  () => import("./pages/SubmissionView.tsx")
);


const ClassroomRoutes = () => {
    return (
        <Suspense fallback={<div>Loading Classroom Section...</div>}>
        <Routes>
            <Route path="/" element={<ClassroomDashboard />} />
            <Route path="/settings-teacher" element={<SettingsTeacher />} />
            <Route path="/settings-admin" element={<SettingsAdmin />} />
            <Route path="/assignment" element={<Assignment />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/create-assignment" element={<CreateAssignment />} />
            <Route path="/late-submission" element={<LateSubmission />} />
            <Route path="/submission-view" element={<SubmissionView />} />
        </Routes>
        </Suspense>
    );
};
export default ClassroomRoutes;