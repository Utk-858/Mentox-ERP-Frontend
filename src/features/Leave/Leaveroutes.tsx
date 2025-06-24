import React,{lazy,Suspense} from "react";
import { Routes, Route } from "react-router-dom";

const Studentleave=lazy(()=>import("./pages/Studentleave.tsx"))
const Teacherleave=lazy(()=>import("./pages/Teacherleave.tsx"))

const Leaveroutes = () => {
  return (
    <Suspense fallback={<div>Loading Leave Section...</div>}>
      <Routes>
        <Route path="/student" element={<Studentleave />} />
        <Route path="/teacher" element={<Teacherleave />} />
      </Routes>
    </Suspense>
  );
};
export default Leaveroutes;