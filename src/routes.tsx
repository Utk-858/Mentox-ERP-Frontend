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

          <Route path="*" element={<div>404 - Not Found</div>} />

          <Route path="/Courses" element={<Hero6 />} />
          <Route path="/" element={<Hero5 />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
