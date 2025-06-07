type QuizCardProps = {
  courseTitle: string;
  quizTitle: string;
  openTime: string;
  closeTime: string;
  duration: string;
  totalQuestions: number;
  marksPerQuestion: number;
  negativeMarking: string;
  attemptsAllowed: number;
  descriptionPoints: string[];
};
const Quizinfosubject:React.FC<QuizCardProps>=({
  courseTitle,
  quizTitle,
  openTime,
  closeTime,
  duration,
  totalQuestions,
  marksPerQuestion,
  negativeMarking,
  attemptsAllowed,
  descriptionPoints,
})=>{
    return (
        <div className="max-w-screen  mt-4  rounded-md p-6 ">
      <h1 className="text-[2rem] font-[600] mb-4 text-black">{courseTitle}</h1>

      <div className="bg-[#F5F5F7] p-4 rounded-[0.9rem] mb-4 w-full">
        <h2 className="text-[1.8rem] font-[600] mb-2 text-black">{quizTitle}</h2>
        <p className="text-[1.25rem] mb-1">
          <strong>Opens :</strong> {openTime}
        </p>
        <p className="text-[1.25rem] mb-1">
          <strong>Closes :</strong> {closeTime}
        </p>
        <p className="text-[1.25rem] mb-1">
          <strong>Quiz Duration :</strong> {duration}
        </p>
        <p className="text-[1.25rem] mb-1">
          <strong>Total Questions :</strong> {totalQuestions} Questions
        </p>
        <p className="text-[1.25rem] mb-1">
          <strong>Marks per Question :</strong> {marksPerQuestion} Marks
        </p>
        <p className="text-[1.25rem] mb-1">
          <strong>Negative Marking :</strong> {negativeMarking}
        </p>
        <p className="text-[1.25rem]">
          <strong>Attempts Allowed :</strong> {attemptsAllowed}
        </p>
      </div>

      {/* <div className="border-t my-4" /> */}

      <div className="w-full bg-[#F5F5F7] p-5">
        <h3 className="text-[1.75rem] font-[600] mb-2 text-black">Quiz Description :</h3>
        <ul className="list-decimal list-inside text-[1.25rem] font-[400] text-gray-800 space-y-1">
          {descriptionPoints.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>

      <p className="text-center text-[1.5rem] font-[400] text-gray-600 mt-8 ">
        To attempt this quiz you need to know the quiz password
      </p>

      <div className="mt-4 flex items-center gap-2 justify-center">
        <input
          type="password"
          placeholder="Enter Quiz Password"
          className="border border-[#B3B3B3] bg-[#F5F5F7] rounded-[0.63rem] px-3 py-2 text-[1.3rem] text-[#ADAAAA] font-[400] outline-none focus:ring-2 focus:ring-blue-300 w-[17rem] h-[3rem]"
        />
        <button className="bg-[#702DFF] text-white px-4 py-2 rounded-[0.63rem] hover:bg-purple-700 transition-all text-[1.3rem] font-[600] shadow-md w-[9rem] h-[3rem]">
          Attempt
        </button>
      </div>
    </div>
    )
}
export default Quizinfosubject