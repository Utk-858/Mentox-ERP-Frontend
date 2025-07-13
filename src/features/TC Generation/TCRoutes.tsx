import React, { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";


const TCList = lazy(
  () => import("./pages/TCList")
);
const Certificate = lazy(
  () => import("./pages/CertificateDetails")
);
const EditTemplate = lazy(
  () => import("./pages/EditTemplate")
);


const TCRoutes = () => {
  return (
    <Suspense fallback={<div>Loading Employee Section...</div>}>

      <Routes>
        <Route path="/" element={<TCList />} />
        <Route path="/certificate-details" element={<Certificate />} />
        <Route path="/edit-template" element={<EditTemplate />} />
      </Routes>
    
    </Suspense>
  );
};

export default TCRoutes;
