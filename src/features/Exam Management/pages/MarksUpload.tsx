import React, { lazy } from "react";
import type { StudentMarks } from "../components/MarksEntryComponent";

const Sidebar = lazy(() => import("../../../components/Sidebar"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
const MarksEntryComponent = lazy(() => import("../components/MarksEntryComponent"));

const MarksUpload: React.FC = () => {
  const students: StudentMarks[] = Array.from({ length: 10 }, (_, i) => ({
    rollNumber: i + 1,
    name: ["John Doe", "Alex", "Brian", "Manny", "Bob"][i % 5],
    marks: NaN,
    grade: "",
    remarks: "",
  }));

  return (
    <div className="max-w-screen flex gap-8">
      <div><Sidebar /></div>
      <div className="flex flex-col w-full">
        <div className="relative flex w-full justify-center z-10 text-center mt-8">
          <Searchbar />
        </div>
        <div>
          <MarksEntryComponent
            
            showAverage={true}
            students={students}
            onCsvUpload={() => alert("CSV Upload")}
            onSaveDraft={(data) => console.log("Draft Saved", data)}
            onSubmit={(data) => console.log("Submitted", data)}
          />
        </div>
      </div>
    </div>
  );
};

export default MarksUpload;
