import { lazy } from "react"
const Sidebar=lazy(()=>import("../../../components/Sidebar"))
const Searchbar=lazy(()=>import("../../../components/SearchBar"))
const Quizinfosubject=lazy(()=>import("../components/Quizinfosubject"))
const Quizinfo:React.FC=()=>{
    return (
        <div className="w-full h-screen flex">
            <div><Sidebar/></div>
            <div className="w-full mt-4 flex flex-col">
                <div className="relative flex w-full justify-center z-10 text-center mt-8 mb-4">
            <Searchbar />
          </div>
                <div> <Quizinfosubject
      courseTitle="Computer Communication Networks"
      quizTitle="Computer Communication Quiz 2"
      openTime="Thursday, 17 April 2025, 12:45 PM"
      closeTime="Thursday, 17 April 2025, 1:05 PM"
      duration="20 min"
      totalQuestions={10}
      marksPerQuestion={2}
      negativeMarking="-0.25 per wrong answer"
      attemptsAllowed={1}
      descriptionPoints={[
        "You are required to bring 1 blank sheet of paper and a pen for rough work.",
        "Calculators are allowed.",
        "Cheating in any form will result in complete debarred from the CCN course (e.g., using ChatGPT, accessing the quiz from another place, etc.).",
        "Please keep your mobile phone outside the lab.",
        "The quiz follows a sequential order, meaning you cannot go back once you proceed to the next question.",
      ]}
    /></div>
            </div>



        </div>
    )
}
export default Quizinfo