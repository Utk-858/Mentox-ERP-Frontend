import React, { Suspense, lazy } from "react";
import { Routes, Route, } from "react-router-dom";


// const ClassroomDashboard = lazy(()=> import ("./features/classroom/pages/Dashboard"));
const Quizattempt=lazy(()=>import("./features/qms/pages/Quizattempt"))
const Quizreview=lazy(()=>import("./features/qms/pages/Quizreview"))
const Homepage=lazy(()=>import("./features/qms/pages/Homepage"))

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Quizattempt />} />
        <Route path="/review" element={<Quizreview />} />
        <Route path="/homepage" element={<Homepage/>}/>
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
