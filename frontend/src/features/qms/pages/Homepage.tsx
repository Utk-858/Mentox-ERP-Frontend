import { lazy } from "react"

const Quizlistsection=lazy(()=>import("../components/Homepage/Quizlistsection"))
const Quizdashboard=lazy(()=>import("../components/Homepage/Quizdashboard"))
const Quizcalendar=lazy(()=>import("../components/Homepage/Quizcalendar"))
const Homepage:React.FC=()=>{
    return(
        <div className="w-full h-full flex">
            <div className="w-[23.5rem] h-screen"></div>
            <div>
                <div className="text-[2rem] font-[600] mt-[6rem]">My Quizzes</div>
                <div>
                <Quizlistsection/>
                </div>
                <div>
                <Quizdashboard/>
                </div>
                <div>
                    <Quizcalendar/>
                </div>

            </div>




        </div>
    )

}
export default Homepage