import React from 'react'
import Sidebar from '@/components/SidebarStudent'
import SearchBar from '@/components/SearchBar'
import DashboardStats from '../components/DashboardStats'
import TaskForm from '../components/TaskForm'
import CalenderSchedule from '../components/CalenderSchedule'
import Notification from '../components/Notification'
import TasksComponent from '../components/TasksComponent'
import TaskStatus from '../components/TaskStatus'


const ToDoStudent:React.FC = () => {
  return (
    <div>
        <div className='flex lg:flex-row  h-auto min-h-screen max-w-screen'>
            <div ><Sidebar></Sidebar></div>
             <div className="flex-1 flex flex-col mt-4">
        <div className="relative flex w-full justify-center z-10 text-center mt-8 mb-2">
            <SearchBar />
          </div>
          
          <div className='w-full px-10'>
            {/* first row */}
            <div><DashboardStats></DashboardStats></div>

            {/* second row */}
            <div className='flex max-w-screen'>
              <div className='ml-7'><TaskForm></TaskForm></div>
              <div className='ml-[-15px]'><CalenderSchedule></CalenderSchedule></div>
            </div>
            {/* third row */}
            <div className='flex mt-[3rem] xl:ml-[-32rem] xl:mt-[-22rem]'>
             <TaskStatus></TaskStatus>
            </div>

            {/* fourth row */}
            <div className='flex mt-10 ml-10'>
              <Notification></Notification>
              <div className='ml-4'><TasksComponent></TasksComponent></div>
              </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default ToDoStudent