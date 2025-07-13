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
import Hero6 from "./features/Course/pages/Hero6.tsx";
import Submission from "./features/Course/pages/Submission.tsx";
import SalaryRoutes from "./features/Salary/SalaryRoutes.tsx";
import Hero8 from "./features/HelpSupp/teacher/page/Hero8.tsx";
import Hero9 from "./features/HelpSupp/Admin/Hero9.tsx";
import Hero7 from "./features/HelpSupp/student/page/Hero7.tsx";
import AdminRoutes from "./features/Admin/AdminRoutes.tsx";
import TimeTablePage from "./features/TimeTable/page/TimeTable.tsx";
import SchoolRoutes from "./features/School/Schoolroutes.tsx";
import TCRoutes from "./features/TC Generation/TCRoutes.tsx";
import QRRoutes from "./features/Student Section/StudentRoutes.tsx";

// const ClassroomDashboard = lazy(()=> import ("./features/classroom/pages/Dashboard"));
const Quizattempt = lazy(() => import("./features/qms/pages/Quizattempt"));
const Quizreview = lazy(() => import("./features/qms/pages/Quizreview"));
const Homepage = lazy(() => import("./features/qms/pages/Homepage"));
const LibraryDashboard = lazy(
  () => import("./features/libraryms/pages/library-dashboard.tsx")
);
const ScholarshipRoutes = lazy(() => import("./features/Student Fee/ScholarshipRoutes.tsx"));
const Quizinfo = lazy(() => import("./features/qms/pages/Quizinfo.tsx"));
const CreateQuiz = lazy(() => import("./features/qms/pages/CreateQuiz.tsx"));
const Teacherdashboard = lazy(
  () => import("./features/qms/pages/Teacherdashboard.tsx")
);

const Studentleave = lazy(
  () => import("./features/Leave/pages/Studentleave.tsx")
);

const Teacherleave = lazy(
  () => import("./features/Leave/pages/Teacherleave.tsx")
);
const ToDoStudent = lazy(
  () => import("./features/To-Do/pages/ToDoStudent.tsx")
);
const ToDoTeacher = lazy(
  () => import("./features/To-Do/pages/ToDoTeacher.tsx")
);
const ExamManagementTeacher = lazy(
  () => import("./features/To-Do/pages/ExamManagementTeacher.tsx")
);
const ExamManagementStudent = lazy(
  () => import("./features/To-Do/pages/ExamManagementStudent.tsx")
);

const Exammanagement = lazy(
  () => import("./features/Exam Management/pages/Exammanagement.tsx")
);
const Datesheet = lazy(
  () => import("./features/Exam Management/pages/Datesheet.tsx")
);
const ExamAnalyticsPage = lazy(
  () => import("./features/Exam Management/pages/ExamAnalyticsPage.tsx")
);
const TeacherExam = lazy(
  () => import("./features/Exam Management/pages/TeacherExam.tsx")
);
const MarksUpload = lazy(
  () => import("./features/Exam Management/pages/MarksUpload.tsx")
);
const TeacherAssignedMarks = lazy(
  () => import("./features/Exam Management/pages/TeacherAssignedMarks.tsx")
);
const StudentResult = lazy(
  () => import("./features/Exam Management/pages/StudentResult.tsx")
);

const Classroom = lazy(
  () => import("./features/Classroom/pages/Classroom.tsx")
);
const Classroom2 = lazy(
  () => import("./features/Classroom/pages/Classroom2.tsx")
);
const SettingsTeacher = lazy(
  () => import("./features/Classroom/pages/SettingsTeacher.tsx")
);
const SettingsAdmin = lazy(
  () => import("./features/Classroom/pages/SettingAdmin.tsx")
);
const Assignment = lazy(
  () => import("./features/Classroom/pages/Assignment.tsx")
);
const Quiz = lazy(() => import("./features/Classroom/pages/quiz.tsx"));
const CreateAssignment = lazy(
  () => import("./features/Classroom/pages/CreateAssignment.tsx")
);

const LateSubmission = lazy(
  () => import("./features/Classroom/pages/LateSubmission.tsx")
);
const SubmissionView = lazy(
  () => import("./features/Classroom/pages/SubmissionView.tsx")
);
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
          <Route path="/attempt" element={<Quizattempt />} />
          <Route path="/review" element={<Quizreview />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/quizinfo" element={<Quizinfo />} />
          <Route path="/createquiz" element={<CreateQuiz />} />
          <Route path="/teacherdashboard" element={<Teacherdashboard />} />
          <Route path="/library/*" element={<LibraryDashboard />} />

          <Route path="/leave" element={<Studentleave />} />
          <Route path="/teacherleave" element={<Teacherleave />} />

          <Route path="/todo/student" element={<ToDoStudent />} />
          <Route path="/todo/teacher" element={<ToDoTeacher />} />
          <Route
            path="/todo/teacher/exam-management"
            element={<ExamManagementTeacher />}
          />
          <Route
            path="/todo/student/exam-management"
            element={<ExamManagementStudent />}
          />
          <Route path="/exam" element={<Exammanagement />} />
          <Route path="/exam/datesheet" element={<Datesheet />} />
          <Route path="/teacherexam" element={<TeacherExam />} />
          <Route path="/exam/analytics" element={<ExamAnalyticsPage />} />
          <Route
            path="/exam/teacherassign"
            element={<TeacherAssignedMarks />}
          />
          <Route path="/teacherexam/marks" element={<MarksUpload />} />
          <Route path="/result" element={<StudentResult />} />
          <Route path="/Courses/submission" element={<Submission />} />
          <Route path="/classroom/stream" element={<Classroom />} />
          <Route path="/classroom2" element={<Classroom2 />} />
          <Route
            path="/classroom/settings/teacher"
            element={<SettingsTeacher />}
          />
          <Route path="/classroom/settings/admin" element={<SettingsAdmin />} />
          <Route path="/classroom/assignment" element={<Assignment />} />
          <Route path="/classroom/quizzes" element={<Quiz />} />
          <Route
            path="/classroom/assignment/create"
            element={<CreateAssignment />}
          />
          <Route
            path="/classroom/latesubmission"
            element={<LateSubmission />}
          />
          <Route
            path="/classroom/submission/view"
            element={<SubmissionView />}
          />
          <Route path="/Courses" element={<Hero6 />} />
          <Route path="/Classteacher/*" element={<ClassTeacher />} />
          <Route path="/" element={<Hero5 />} />
          <Route path="*" element={<div>404 - Not Found</div>} />
          <Route path="/Help/student" element={<Hero7 />} />
          <Route path="/Help/teacher" element={<Hero8 />} />
          <Route path="/Help/admin" element={<Hero9 />} />
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
