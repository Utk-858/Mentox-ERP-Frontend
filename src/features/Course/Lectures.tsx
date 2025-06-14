import React from "react";
import { ClipboardList, Clock, Calendar, MoreVertical } from "lucide-react";
import FreeCourses from "../Lectures/components/front/FreeCourses";
import Course from "../Lectures/components/front/Course";
import ContinueWatching from "../Lectures/components/front/ContinueWatching";

interface QuizCardProps {
  title: string;
  status: "Active" | "Upcoming" | "Completed";
  description: string;
  questions: number;
  duration: string;
  date: string;
  metaRight: string;
  buttonLabel: string;
  badgeColor: string;
  buttonColor: string;
}


const QuizList: React.FC = () => {
  return (
    < >
    <div className="max-w-6xl">
    <div className="p-3 space-y-4 border rounded-2xl max-w-6xl">
      {/* Announcement Box */}
      <div className="bg-white rounded-xl p-4 shadow flex items-center gap-3 text-gray-600 font-medium">
        <div className="bg-purple-200 text-purple-800 w-8 h-8 rounded-full flex items-center justify-center font-semibold">
          P
        </div>
        Announce something to your class
      </div>

      <Course/>
      
    </div>
     <ContinueWatching/>
     </div>
    </>
  );
};

export default QuizList;
