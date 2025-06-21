import { lazy, useState } from "react";
const Sidebar = lazy(() => import("../../../components/Sidebar"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
import { useLocation } from "react-router-dom";
const MarksAssignFilterBar = lazy(
  () => import("../components/MarksAssignFilterBar")
);
const MarksAssignTable = lazy(() => import("../components/MarksAssignTable"));
const TeacherAssignedMarks: React.FC = () => {
  const [startDate, setStartDate] = useState("2028-07-07");
  const [endDate, setEndDate] = useState("2028-07-17");
  const [showAverage, setShowAverage] = useState(false);
  const handleSave = () => {
    console.log({ startDate, endDate, showAverage });
  };
  const { state } = useLocation();
  const { session, examType } = state || {};
type AssignItem = {
  className: string;
  subjectCount: number;
  sections: number;
};
  const assignData = [
    { className: "5", subjectCount: 5, sections: 3 },
    { className: "6", subjectCount: 5, sections: 3 },
    { className: "7", subjectCount: 5, sections: 3 },
    { className: "8", subjectCount: 5, sections: 3 },
    { className: "9", subjectCount: 5, sections: 3 },
    { className: "10", subjectCount: 5, sections: 3 },
    { className: "11", subjectCount: 5, sections: 3 },
  ];
 const handleAssign = (item: AssignItem) => {
  console.log("Assign clicked for:", item);
};

  return (
    <div className="max-w-screen flex gap-8">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col w-full">
        <div className="relative flex w-full justify-center z-10 text-center mt-8">
          <Searchbar />
        </div>
        <div className="font-[600] text-[1.5rem] mt-4">
          Marks Assigning Portal
        </div>
        <div className="font-[400] text-[1.12rem] text-[#363636]">
          Assign Permission Add marks of the student
        </div>
        <div className="mt-4 mr-4">
          {" "}
          <MarksAssignFilterBar
            startDate={startDate}
            endDate={endDate}
            showAverage={showAverage}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onToggleAverage={() => setShowAverage((prev) => !prev)}
            onSave={handleSave}
          />
        </div>
        <div> <MarksAssignTable
      academicYear={session}
      examType={examType}
      rows={assignData}
      onAssign={handleAssign}
    /></div>
      </div>
    </div>
  );
};
export default TeacherAssignedMarks;
