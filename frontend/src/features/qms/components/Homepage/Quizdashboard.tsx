import React from "react";

interface Student {
  rank: number;
  name: string;
  subject: string;
  score: number;
  image: string;
}

const Quizdashboard: React.FC = () => {
  const topStudents: Student[] = [
    { rank: 1, name: "Alex John", subject: "Science", score: 950, image: "https://i.pravatar.cc/40?img=1" },
    { rank: 2, name: "Emma Watson", subject: "Mathematics", score: 920, image: "https://i.pravatar.cc/40?img=2" },
    { rank: 3, name: "Michael Clark", subject: "Physics", score: 980, image: "https://i.pravatar.cc/40?img=3" },
    { rank: 4, name: "Sophia Green", subject: "English", score: 890, image: "https://i.pravatar.cc/40?img=4" },
    { rank: 5, name: "Lucia Wilde", subject: "Science", score: 870, image: "https://i.pravatar.cc/40?img=5" },
    { rank: 17, name: "You", subject: "Science", score: 570, image: "https://i.pravatar.cc/40?img=6" },
  ];

  return (
    <div className="grid grid-cols-3 gap-10 p-6 w-[68rem] mt-4">
      <div className="bg-[#F5F5F7] rounded-[0.9rem] p-6 col-span-1 w-[22rem] ">
        <h2 className="text-[1.5rem] font-[600] ">Top Students</h2>
        <p className="text-[1rem] text-[#363636] font-[400] mb-4">Students with highest quiz scores</p>
        <ul className="space-y-3">
          {topStudents.map((student) => (
            <li key={student.rank} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-purple-200 text-black text-xs flex items-center justify-center rounded-full font-[400]">
                  {student.rank}
                </span>
                <img src={student.image} alt={student.name} className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-[600] text-[1rem]">{student.name}</p>
                  <p className="text-[0.75rem] text-[#4C4C4C] font-[400]">{student.subject}</p>
                </div>
              </div>
              <div className="text-[#702DFF] font-[700] text-[1.06rem] flex items-center gap-1">
                <span className="text-lg">🏅</span>
                {student.score}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4 col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <div className="bg-[#F5F5F7] rounded-[1rem] p-6 w-[20rem] ml-8">
            <h2 className="text-[1.5rem] font-[500] mb-4">My Badges</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              {/* <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="w-10 h-10 bg-black rounded-full"></div> */}
            </div>
            <button className="px-4 py-2 bg-black text-white rounded-[0.3rem] font-[600] text-[1rem]">View All badges</button>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-[1.25rem] p-5 flex flex-col  text-white ml-8">
            <h2 className="text-[1.5rem] font-[800] mb-2 text-left">Practice Quiz</h2>
            <p className="text-[1rem] font-[400] mb-4">
              Sharpen your skills by practicing topic-based questions designed to boost your understanding and accuracy.
            </p>
            <button className="bg-white text-[#702DFF] px-6 py-2 rounded font-[600] text-[1rem] mx-auto">Attempt</button>
          </div>
        </div>

        <div className="bg-[#F5F5F7] rounded-2xl mt-4 ml-8  p-6">
          <h2 className="text-[1.5rem] font-[600]">Access a Quiz</h2>
          <p className="text-[0.85rem] font-[400] text-[#363636] mb-4">Enter your quiz code to get started</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Quiz Code"
              className="flex-1 px-4 py-2 bg-white rounded"
            />
            <button className="bg-black text-white px-4 py-2 rounded">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quizdashboard;