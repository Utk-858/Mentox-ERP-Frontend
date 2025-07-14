import React,{lazy,Suspense} from "react";
import { Routes, Route } from "react-router-dom";

const Quizattempt=lazy(()=>import("./pages/Quizattempt"))
const Quizreview=lazy(()=>import("./pages/Quizreview"))
const Homepage=lazy(()=>import("./pages/Homepage"))

const Quizinfo=lazy(()=>import("./pages/Quizinfo.tsx"))
const CreateQuiz=lazy(()=>import("./pages/CreateQuiz.tsx"))
const Teacherdashboard=lazy(()=>import("./pages/Teacherdashboard.tsx"))

const Qmsroutes = () => {
  return (
    <Suspense fallback={<div>Loading QMS Section...</div>}>
      <Routes>
        <Route path="/attempt" element={<Quizattempt />} />
        <Route path="/review" element={<Quizreview />} />
        <Route path="/homepage" element={<Homepage/>}/>
        <Route path="/quizinfo" element={<Quizinfo/>}/>
        <Route path="/createquiz" element={<CreateQuiz/>}/>
        <Route path="/teacherdashboard" element={<Teacherdashboard/>}/>
      </Routes>
    </Suspense>
  );
};

export default Qmsroutes;