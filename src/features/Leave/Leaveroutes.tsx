import React,{lazy,Suspense} from "react";
import {Routes,  Route } from "react-router-dom";
// import { RoleProtectedRoute } from "@/lib/RoleProtectedRoute.tsx"  ;
const Studentleave=lazy(()=>import("./pages/Studentleave.tsx"))
const Teacherleave=lazy(()=>import("./pages/Teacherleave.tsx"))
const Adminleave=lazy(()=>import("./pages/Adminleave.tsx"))
const Holiday=lazy(()=>import("./pages/Holiday.tsx"))
const LeaveCategory=lazy(()=>import("./pages/LeaveCategory.tsx"))
const Leaveroutes = () => {
  return (
    <Suspense fallback={<div>Loading Leave Section...</div>}>
      <Routes>
       
            <Route path="/student" element={<Studentleave />} />
            <Route path="/admin" element={<Adminleave />} />
            <Route path="/admin/holiday" element={<Holiday/>}/>
            <Route path="/admin/leavecategory" element={<LeaveCategory/>}/>
            <Route path="/teacher" element={<Teacherleave />} />
        </Routes>
          
      
    </Suspense>
  );
};
export default Leaveroutes;