import React, { Suspense, lazy } from "react";
import { Routes, Route, } from "react-router-dom";
import Home from "./features/Lectures/components/Home";
import Hero5 from "./features/Dashboard/Hero5.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";


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
const AppRoutes: React.FC = () => {
  return (

    <>

    <ScrollToTop/>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/attempt" element={<Quizattempt />} />
        <Route path="/review" element={<Quizreview />} />
        <Route path="/homepage" element={<Homepage/>}/>
         <Route path="/quizinfo" element={<Quizinfo/>}/>
         <Route path="/createquiz" element={<CreateQuiz/>}/>
                  <Route path="/teacherdashboard" element={<Teacherdashboard/>}/>
        <Route path="/Lectures/*" element={<Home/>} />
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
       
        {/* Add more routes as needed */}
        {/* Example: */}
        {/* <Route path="/classroom" element={<ClassroomDashboard />} /> */}
        
        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<div>404 - Not Found</div>} />

         <Route path="/" element={<Hero5/>} />
        
      </Routes>
    </Suspense>
    </>
  );
};

export default AppRoutes;
