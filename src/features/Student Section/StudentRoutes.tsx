import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const PersonalDetails = lazy(
  () => import("./pages/Registration/PersonalDetails")
);
const AcademicInfo = lazy(() => import("./pages/Registration/AcademicInfo"));
const AdditionalInfo = lazy(
  () => import("./pages/Registration/AdditionalInfo")
);
const Request = lazy(
  () => import("./pages/Admission/Request")
);
const RequestForm = lazy(
  () => import("./pages/Admission/RequestForm")
);
const QR = lazy(
  () => import("./pages/Admission/QR")
);
const AdmissionForm = lazy(
  () => import("./pages/Admission/AdmissionForm")
);
const StudentPromotion = lazy(
  () => import("./pages/Class Assignment/StudentPromotion")
);
const Upgrade = lazy(
  () => import("./pages/Class Assignment/Upgrade")
);
const ClassShift = lazy(
  () => import("./pages/Class Assignment/ClassShift")
);
const HouseAssigning = lazy(
  () => import("./pages/House Assignment/HouseAssigning")
);
const HouseConfig = lazy(
  () => import("./pages/House Assignment/HouseConfig")
);
const Offline = lazy(
  () => import("./pages/Payment/Offline")
);
const Refund = lazy(
  () => import("./pages/Payment/Refund")
);
const PaymentHistory = lazy(
  () => import("./pages/Payment/PaymentHistory")
);

const QRRoutes = () => {
  return (
    <Suspense fallback={<div>Loading Employee Section...</div>}>
      <Routes>
        <Route path="/personal-details" element={<PersonalDetails />} />
        <Route path="/academic-info" element={<AcademicInfo />} />
        <Route path="/additional-info" element={<AdditionalInfo />} />
        <Route path="/admission/request" element={<Request />} />
        <Route path="/admission/request/:applicationNo" element={<RequestForm />} />
        <Route path="/admission/request/QR" element={<QR />} />
        <Route path="/admission/request/admission-form" element={<AdmissionForm />} />
        <Route path="/admission/request/class-assignment/promotion" element={<StudentPromotion />} />
        <Route path="/admission/request/class-assignment/upgrade" element={<Upgrade />} />
        <Route path="/admission/request/class-assignment/class-shift" element={<ClassShift />} />
        <Route path="/admission/house" element={<HouseAssigning />} />
        <Route path="/admission/house-config" element={<HouseConfig />} />
        <Route path="/admission/payment/offline" element={<Offline />} />
        <Route path="/admission/payment/refund" element={<Refund />} />
        <Route path="/admission/payment/history" element={<PaymentHistory />} />
      </Routes>
    </Suspense>
  );
};

export default QRRoutes;
