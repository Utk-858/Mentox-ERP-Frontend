import React from 'react';

// Card component for quizzes and assignments
interface CardProps {
  icon: React.ReactNode;
  title: string;
  status?: 'Active' | 'Pending';
  description: string;
  questions?: number;
  time?: string;
  startTime?: string;
  dueDate?: string;
  points?: number;
  buttonText: string;
  onButtonClick: () => void;
  showEllipsis?: boolean;
}

const Card: React.FC<CardProps> = ({
  icon,
  title,
  status,
  description,
  questions,
  time,
  startTime,
  dueDate,
  points,
  buttonText,
  onButtonClick,
  showEllipsis = true,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-start gap-4 flex-grow">
        <div className="text-gray-700 text-2xl">{icon}</div>
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            {status && (
              <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                  status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}
              >
                {status}
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm mb-3">{description}</p>
          <div className="flex flex-wrap items-center text-gray-500 text-xs gap-x-4 gap-y-2">
            {questions && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                {questions} Questions
              </div>
            )}
            {time && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {time}
              </div>
            )}
            {startTime && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Start Time - {startTime}
              </div>
            )}
            {dueDate && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Due {dueDate}
              </div>
            )}
            {points && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 3h4M5 3a2 2 0 002 2h2a2 2 0 002-2M9 19v-2m-2 2v-2m4 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H9a2 2 0 00-2 2v2a2 2 0 002 2zm-4 0h4"></path>
                </svg>
                {points} Points
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 flex items-center gap-2 mt-4 md:mt-0">
        <button
          onClick={onButtonClick}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out whitespace-nowrap"
        >
          {buttonText}
        </button>
        {showEllipsis && (
          <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

// Course Card Component
interface CourseCardProps {
  imagePlaceholder: string;
  title: string;
  description: string;
  rating: number;
  students: string;
  instructor: string;
  modules: number;
  lessons: number;
  onButtonClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  imagePlaceholder,
  title,
  description,
  rating,
  students,
  instructor,
  modules,
  lessons,
  onButtonClick,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 flex flex-col md:flex-row items-start gap-6">
      <div className="flex-shrink-0 w-full md:w-48 h-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
        <img src={imagePlaceholder} alt="Course Thumbnail" className="object-cover w-full h-full rounded-md" />
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{description}</p>
        <div className="flex flex-wrap items-center text-gray-500 text-xs gap-x-4 gap-y-2">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.532 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.777.565-1.832-.197-1.532-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
            </svg>
            {rating}
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a4 4 0 00-4 4h8a4 4 0 00-4-4z" clipRule="evenodd"></path>
            </svg>
            {students}
          </div>
          <div className="flex items-center">
            By {instructor}
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2m7 0v2m0-2h.01M7 11h.01M17 11h.01"></path>
            </svg>
            {modules} Modules
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"></path>
            </svg>
            {lessons} Lessons
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 mt-4 md:mt-0">
        <button
          onClick={onButtonClick}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out whitespace-nowrap"
        >
          Start learning
        </button>
      </div>
    </div>
  );
};

// Main App Component
const App2: React.FC = () => {
  const handleButtonClick = (buttonType: string) => {
    console.log(`${buttonType} button clicked!`);
    // In a real application, you'd navigate or perform an action here
    alert(`${buttonType} clicked!`);
  };

  return (
      <div className="w-full mx-auto ">
        {/* Science Mid-term Quiz Card */}
        <Card
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"></path>
            </svg>
          }
          title="Science Mid-term Quiz"
          status="Active"
          description="Assess your understanding of core Physics, Chemistry, and Biology concepts from the first half of the term through MCQs, short answers, and diagrams."
          questions={15}
          time="20 min"
          startTime="2:00 pm"
          buttonText="Attempt"
          onButtonClick={() => handleButtonClick('Attempt')}
        />

        {/* Python Course Card */}
        <CourseCard
          imagePlaceholder="https://placehold.co/192x128/e5e7eb/6b7280?text=Course+Image"
          title="Python Course for Beginners with Certifications: Mastering Essentials"
          description="Welcome to the free Python course with certificate for beginners, designed to help you kickstart your programming journey. This comprehensive Python course online offers a ..."
          rating={4.6}
          students="166.1k"
          instructor="Rahul Janghu"
          modules={12}
          lessons={95}
          onButtonClick={() => handleButtonClick('Start learning Python')}
        />

        {/* Science Assignment Card */}
        <Card
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2m7 0v2m0-2h.01M7 11h.01M17 11h.01"></path>
            </svg>
          }
          title="Science Assignment"
          status="Pending"
          description="Assess your understanding of core Physics, Chemistry, and Biology concepts from the first half of the term through MCQs, short answers, and diagrams."
          questions={15}
          dueDate="March 15"
          points={15}
          buttonText="Submit"
          onButtonClick={() => handleButtonClick('Submit Assignment')}
        />
      </div>
  );
};

export default App2;
