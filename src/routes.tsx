import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./features/Lectures/components/Home";
import Hero5 from "./features/Dashboard/Hero5.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import Hero6 from "./features/Course/Hero6.tsx";
import Libraryroutes from "./features/libraryms/Libroutes.tsx";
import Examroutes from "./features/Exam Management/Examroutes.tsx";
import Todoroutes from "./features/To-Do/Todoroutes.tsx";
import Qmsroutes from "./features/qms/Qmsroutes.tsx";
import Leaveroutes from "./features/Leave/Leaveroutes.tsx";
import ClassTeacher from "./features/Class Teacher/ClassTeacherroutes.tsx";

import Profileroutes from "./features/profile/Profileroutes.tsx";

// const ClassroomDashboard = lazy(()=> import ("./features/classroom/pages/Dashboard"));
const Quizattempt=lazy(()=>import("./features/qms/pages/Quizattempt"))
const Quizreview=lazy(()=>import("./features/qms/pages/Quizreview"))
const Homepage=lazy(()=>import("./features/qms/pages/Homepage"))
const LibraryDashboard=lazy(()=>import("./features/libraryms/pages/library-dashboard.tsx"))
const IssuedBooks=lazy(()=>import("./features/libraryms/pages/issued-books.tsx"))
const ReservedBooks=lazy(()=>import("./features/libraryms/pages/reserved-books.tsx"))
const BookDetails=lazy(()=>import("./features/libraryms/pages/book-details.tsx"))
const Quizinfo=lazy(()=>import("./features/qms/pages/Quizinfo.tsx"))
const CreateQuiz=lazy(()=>import("./features/qms/pages/CreateQuiz.tsx"))
const Teacherdashboard=lazy(()=>import("./features/qms/pages/Teacherdashboard.tsx"))
const IssueBookStudent=lazy(()=>import("./features/libraryms/pages/issueBookStudent.tsx"))
const IssueBookEmployee=lazy(()=>import("./features/libraryms/pages/issueBookEmployee.tsx"))
const LibraryLibrarian=lazy(()=>import("./features/libraryms/pages/libraryLibrarian.tsx"))
const Studentleave=lazy(()=>import("./features/Leave/pages/Studentleave.tsx"))
const LibraryConfiguration = lazy(() => import("./features/libraryms/pages/libraryConfiguration.tsx"));
const LibraryPolicy = lazy(() => import("./features/libraryms/pages/LibraryPolicy.tsx"));
const ReturnBook = lazy(() => import("./features/libraryms/pages/returnBook.tsx"));
const UpdateBook = lazy(() => import("./features/libraryms/pages/UpdateBook.tsx"));
const EditDetails = lazy(() => import("./features/libraryms/pages/edit-details.tsx"));
const AddBook=lazy(()=>import("./features/libraryms/pages/addBook.tsx"))
const Teacherleave=lazy(()=>import("./features/Leave/pages/Teacherleave.tsx"))
const ToDoStudent=lazy(()=>import("./features/To-Do/pages/ToDoStudent.tsx"))
const ToDoTeacher=lazy(()=>import("./features/To-Do/pages/ToDoTeacher.tsx"))
const ExamManagementTeacher=lazy(()=>import("./features/To-Do/pages/ExamManagementTeacher.tsx"))
const ExamManagementStudent=lazy(()=>import("./features/To-Do/pages/ExamManagementStudent.tsx"))


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

const Submission= lazy(() => import("./features/Course/Submission.tsx"));
const Classroom = lazy(() => import("./features/Classroom/pages/Classroom.tsx"));
const Classroom2 = lazy(() => import("./features/Classroom/pages/Classroom2.tsx"));
const SettingsTeacher = lazy(() => import("./features/Classroom/pages/SettingsTeacher.tsx"));
const SettingsAdmin = lazy(() => import("./features/Classroom/pages/SettingAdmin.tsx"));
const Assignment = lazy(() => import("./features/Classroom/pages/Assignment.tsx"));
const Quiz = lazy(() => import("./features/Classroom/pages/quiz.tsx"));
const CreateAssignment = lazy(() => import("./features/Classroom/pages/CreateAssignment.tsx"));

const LateSubmission = lazy(() => import("./features/Classroom/pages/LateSubmission.tsx"));
const SubmissionView = lazy(() => import("./features/Classroom/pages/SubmissionView.tsx"));
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
          <Route path="/To-Do/*" element={<Todoroutes />} />
          <Route path="/Leave/*" element={<Leaveroutes />} />
          <Route path="/profile/*" element={<Profileroutes />} />
          <Route path="/attempt" element={<Quizattempt />} />
          <Route path="/review" element={<Quizreview />} />
          <Route path="/homepage" element={<Homepage/>}/>
          <Route path="/quizinfo" element={<Quizinfo/>}/>
          <Route path="/createquiz" element={<CreateQuiz/>}/>
          <Route path="/teacherdashboard" element={<Teacherdashboard/>}/>
          <Route path="/library" element={<LibraryDashboard/>} />
          <Route path="/library/issued-books" element={<IssuedBooks/>} />
          <Route path="/library/reserved-books" element={<ReservedBooks/>} />
          <Route path="/library/book-details/:isbn" element={<BookDetails/>} />
          <Route path="/library/librarian" element={<LibraryLibrarian/>} />
          <Route path="/library/librarian/issue-book-student" element={<IssueBookStudent/>} />
          <Route path="/library/librarian/issue-book-employee" element={<IssueBookEmployee/>} />
          <Route path="/leave" element={<Studentleave/>}/>
          <Route path="/teacherleave" element={<Teacherleave/>}/>
          <Route path="/library/librarian/add-book" element={<AddBook/>} />
          <Route path="/library/librarian/library-config" element={<LibraryConfiguration/>} />
          <Route path="/library/librarian/library-policy" element={<LibraryPolicy/>} />
          <Route path="/library/librarian/return-book" element={<ReturnBook/>} />
          <Route path="/library/librarian/update-book" element={<UpdateBook/>} />
          <Route path="/library/librarian/edit-details/:isbn" element={<EditDetails/>} />
          <Route path="/todo/student" element={<ToDoStudent/>} />
          <Route path="/todo/teacher" element={<ToDoTeacher/>} />
          <Route path="/todo/teacher/exam-management" element={<ExamManagementTeacher/>} />
          <Route path="/todo/student/exam-management" element={<ExamManagementStudent/>} />
          <Route path="/exam" element={<Exammanagement />} />
          <Route path="/exam/datesheet" element={<Datesheet />} />
          <Route path="/teacherexam" element={<TeacherExam />} />
          <Route path="/exam/analytics" element={<ExamAnalyticsPage />} />
          <Route path="/exam/teacherassign" element={<TeacherAssignedMarks />} />
          <Route path="/teacherexam/marks" element={<MarksUpload />} />
          <Route path="/result" element={<StudentResult />} />
          <Route path="/Courses/submission" element={<Submission/>} />
          <Route path="/classroom/stream" element={<Classroom/>} />
          <Route path="/classroom2" element={<Classroom2/>} />
          <Route path="/classroom/settings/teacher" element={<SettingsTeacher/>} />
          <Route path="/classroom/settings/admin" element={<SettingsAdmin/>} />
          <Route path="/classroom/assignment" element={<Assignment/>} />
          <Route path="/classroom/quizzes" element={<Quiz/>} />
          <Route path="/classroom/assignment/create" element={<CreateAssignment/>} />
          <Route path="/classroom/latesubmission" element={<LateSubmission/>} />
          <Route path="/classroom/submission/view" element={<SubmissionView/>} />
          <Route path="/Courses" element={<Hero6 />} />
          <Route path="/Classteacher/*" element={<ClassTeacher/>} />
          <Route path="/" element={<Hero5 />} />
          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
      </Suspense>
    </>
  );
};
export default AppRoutes;