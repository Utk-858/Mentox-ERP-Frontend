import React, { useRef } from "react";

interface CourseCardProps {
  title: string;
  tag: string;
  instructorName: string;
  instructorRole: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  tag,
  instructorName,
  instructorRole,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-3 w-64 shrink-0">
      <div className="w-full h-32 bg-gray-200 rounded-xl mb-3 relative" />
      <span className="text-xs bg-purple-100 text-purple-700 font-semibold px-2 py-0.5 rounded-md">
        {tag}
      </span>
      <h3 className="text-sm font-semibold text-gray-800 mt-2 leading-snug">
        {title}
      </h3>
      <div className="h-1 w-full bg-gray-200 mt-3 rounded-full">
        <div className="h-full bg-purple-500 rounded-full w-[65%]"></div>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <div className="w-7 h-7 bg-gray-300 rounded-full" />
        <div className="text-xs text-gray-600">
          <div className="font-medium">{instructorName}</div>
          <div>{instructorRole}</div>
        </div>
      </div>
    </div>
  );
};

const ContinueWatching: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const courses = Array(8).fill({
    title: "Beginner's Guide To Becoming A Professional Frontend Developer",
    tag: "Frontend",
    instructorName: "Prashant Kumar Singh",
    instructorRole: "Software Developer",
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Continue Watching
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-700"
          >
            &larr;
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-700"
          >
            &rarr;
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default ContinueWatching;
