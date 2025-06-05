import React from "react";
import { Star, Users, Video } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  rating: number;
  students: string;
  modules: number;
  lessons: number;
  instructor: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  rating,
  students,
  modules,
  lessons,
  instructor,
}) => (
  <div className="flex flex-col gap-6">
    <div className="flex gap-4 p-4 bg-white ">
      {/* Thumbnail */}
      <div className="w-28 h-20 bg-gray-200 rounded-md"></div>

      {/* Course Content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center text-sm text-gray-400 mt-2 gap-3">
          <span>By {instructor}</span>
          <span className="flex items-center gap-1">
            <Video className="w-4 h-4" /> {modules} Modules
          </span>
          <span className="flex items-center gap-1">
            <Video className="w-4 h-4" /> {lessons} Lessons
          </span>
        </div>
      </div>

      {/* Action Column */}
      <div className="flex flex-col justify-between items-end">
        <button className="bg-[#702DFF] hover:bg-[#5c22d0] text-white text-sm cursor-pointer font-semibold px-4 py-1.5 rounded-md transition">
          Start learning
        </button>
        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-gray-500" /> {rating}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4 text-gray-500" /> {students}
          </span>
        </div>
      </div>
    </div>
    <hr />
  </div>
);

const Course: React.FC = () => {
  const courses = Array(4).fill({
    title: "Python Course for Beginners with Certifications: Mastering Essentials",
    description:
      "Welcome to the free Python course with certificate for beginners, designed to help you kickstart your programming journey. This comprehensive Python course online offers a...",
    rating: 4.6,
    students: "166.1k",
    modules: 12,
    lessons: 95,
    instructor: "Rahul Janghu",
  });

  return (
    <div className="bg-white w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Explore all free programming courses
      </h2>
      <div className="space-y-6">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Course;
