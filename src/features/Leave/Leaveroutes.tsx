import React,{lazy,Suspense} from "react";
import { Routes, Route } from "react-router-dom";
import { RoleProtectedRoute } from "@/lib/RoleProtectedRoute.tsx";
const Studentleave=lazy(()=>import("./pages/Studentleave.tsx"))
const Teacherleave=lazy(()=>import("./pages/Teacherleave.tsx"))

const Leaveroutes = () => {
  return (
    <Suspense fallback={<div>Loading Leave Section...</div>}>
      <Routes>
        <Route element={<RoleProtectedRoute allowedRoles={['Admin']} />}>
            <Route path="/student" element={<Studentleave />} />
          </Route>
        <Route element={<RoleProtectedRoute allowedRoles={['Faculty']} />}>
            <Route path="/teacher" element={<Teacherleave />} />
          </Route>
      </Routes>
    </Suspense>
  );
};
export default Leaveroutes;