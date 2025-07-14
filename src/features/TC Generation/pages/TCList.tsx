"use client";
import { useNavigate } from "react-router-dom";

import { useState, useEffect, type SetStateAction } from "react";
import Sidebar from "@/components/SidebarTeacher";
import SearchBar from "@/components/SearchBar";
import { ChevronDownIcon, FilterIcon, Search } from "lucide-react";
import TCListComp from "../components/TCListComp";


export default function TCList() {
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchType, setSearchType] = useState(null);

  const mockStudents = [
    {
      name: "Hemish Jain",
      class: "6th",
      section: "A",
      rollNo: "2",
      admissionNo: "145675",
      parentName: "Ram Prasad Yadav",
      parentPhone: "+91 4884846515",
      photoUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
      name: "Ananya Khan",
      class: "9th",
      section: "A",
      rollNo: "9",
      admissionNo: "2025",
      parentName: "Sohail Khan",
      parentPhone: "+91 9988776655",
      photoUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (admissionNumber.trim()) {
        const student = mockStudents.find(
          (s) => s.admissionNo === admissionNumber
        );
        setSelectedStudent(student as unknown as typeof selectedStudent);
        setSearchType("admission" as unknown as SetStateAction<null>);
        setStudentName("");
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [admissionNumber]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (studentName.trim()) {
        const student = mockStudents.find((s) =>
          s.name.toLowerCase().includes(studentName.toLowerCase())
        );
        setSelectedStudent(student as unknown as typeof selectedStudent);
        setSearchType("name" as unknown as SetStateAction<null>);
        setAdmissionNumber("");
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [studentName]);

  return (
    <div className="flex w-full max-w-screen relative p-4 md:p-10">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Hero background */}        <div className="relative flex w-full justify-center z-10 text-center mt-2">
          <SearchBar />
        </div>


        <div className="relative w-full">
          <img
            src="/sparkles.png"
            alt="sparkles"
            className="w-full px-6 md:px-20"
          />
          <div className="absolute inset-0 flex flex-col mt-20 xl:mt-[-10rem] items-center justify-center px-4 md:px-10 py-10 z-10 pointer-events-none">
            <div className="text-center">
              <h1 className="text-4xl mt-[-10rem] xl:mt-10 xl:text-6xl leading-tight font-bold text-gray-900">
                Transfer Certificate
                <span className="flex flex-col">Generation</span>
              </h1>
              <p className="mt-4 text-gray-600 text-sm xl:text-lg max-w-2xl mx-auto">
                Search for a student to generate their Transfer Certificate
              </p>
            </div>
          </div>
        </div>

    {/* Absolute search box on top */}
<div className="absolute xl:top-20 left-1/2 -translate-x-1/2 w-full max-w-[600px] z-50 px-4">
  <div className="flex items-center gap-3">
    <div className="flex w-full mt-[250px]">
      <input
        type="text"
        placeholder="Search the student for transfer"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        className="flex-grow border border-[#606060] rounded-l-md px-4 py-3 text-sm bg-white placeholder-gray-500 "
      />
      <button
        className="bg-black text-white text-sm px-5 py-3 rounded-r-md hover:bg-gray-800 w-[100px]"
       
      >
        Search
      </button>
      
      <div className="bg-black  flex py-2 px-5 text-white ml-[20px] rounded-md">
         <FilterIcon className="w-4 mt-1.5 h-4 mr-2 " />
<div className="mt-0.5" >All Classes</div>
<ChevronDownIcon className="w-4 h-4 ml-2 mt-2" />
      </div>
      
    </div>
    
  </div>

  {selectedStudent && searchType === "name" && (
    <StudentCard student={selectedStudent} />
  )}
</div>
        <div className="mt-[-150px] px-10 relative z-10">
          <TCListComp />
        </div>
      </div>
    </div>
  );
}

function StudentCard({ student }: { student: { 
  photoUrl: string;
  name: string;
  class: string;
  section: string;
  rollNo: string;
  admissionNo: string;
  parentName: string;
  parentPhone: string;
} }) {
    const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate("/TC/certificate-details", { state: { student } });
  };
  return (
    <div onClick={handleViewDetails} className="absolute top-full mt-2 left-0 bg-[#fcf8f877] border border-gray-300 rounded-md shadow-xl p-4 md:p-6 flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-[445px] z-50">
      <img
        src={student.photoUrl}
        alt={student.name}
        className="w-24 h-28 md:w-28 md:h-36 object-cover rounded-md border border-gray-200 mx-auto md:mx-0"
      />
      <div className="text-xs md:text-sm text-gray-800 leading-5">
        <div>
          <strong className="font-semibold text-gray-700">
            Student Name:
          </strong>{" "}
          <span className="ml-1 text-sm md:text-base text-gray-500 font-normal">
            {student.name}
          </span>
        </div>
        <div>
          <strong className="font-semibold text-gray-700">Class:</strong>{" "}
          <span className="ml-1 text-sm md:text-base text-gray-500 font-normal">
            {student.class}
          </span>{" "}
          <strong className="font-semibold text-gray-700">Section:</strong>{" "}
          <span className="ml-1 text-sm md:text-base text-gray-500 font-normal">
            {student.section}
          </span>
        </div>
        <div>
          <strong className="font-semibold text-gray-700">
            Roll Number:
          </strong>{" "}
          <span className="ml-1 text-sm md:text-base text-gray-500 font-normal">
            {student.rollNo}
          </span>
        </div>
        <div>
          <strong className="font-semibold text-gray-700">
            Admission No.:
          </strong>{" "}
          <span className="ml-1 text-sm md:text-base text-gray-500 font-normal">
            {student.admissionNo}
          </span>
        </div>
        <div>
          <strong className="font-semibold text-gray-700">
            Parents Name:
          </strong>{" "}
          <span className="ml-1 text-sm md:text-base text-gray-500 font-normal">
            {student.parentName}
          </span>
        </div>
        <div>
          <strong className="font-semibold text-gray-700">
            Parents Phone Number:
          </strong>{" "}
          <span className="ml-1 text-sm md:text-base text-gray-500 font-normal">
            {student.parentPhone}
          </span>
        </div>
      </div>
    </div>
  );
}
