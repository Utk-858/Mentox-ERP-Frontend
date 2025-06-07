import { lazy } from "react"
const Sidebar = lazy(() => import("../../../components/Sidebar"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
const Quizlistsection=lazy(()=>import("../components/Homepage/Quizlistsection"))
const Quizdashboard=lazy(()=>import("../components/Homepage/Quizdashboard"))
const Quizcalendar=lazy(()=>import("../components/Homepage/Quizcalendar"))
const Homepage:React.FC=()=>{
    return(
        <div className="w-full h-full flex">
            <div className=" h-screen"><Sidebar/></div>
            <div className="ml-[6.5rem]">
                <div className="mt-4"><Searchbar/></div>
                <div className="text-[2rem] font-[600] ">My Quizzes</div>
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