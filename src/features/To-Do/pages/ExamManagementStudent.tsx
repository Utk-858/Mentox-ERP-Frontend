import React from 'react'
import Sidebar from '@/components/SidebarStudent'
import SearchBar from '@/components/SearchBar'
import ExamManagement2 from '../components/ExamManagement2'


const ExamManagementStudent:React.FC = () => {
  return (
    <div>
        <div className='flex lg:flex-row  h-auto min-h-screen max-w-screen'>
            <div ><Sidebar></Sidebar></div>
             <div className="flex-1 flex flex-col mt-4">
        <div className="relative flex w-full justify-center z-10 text-center mt-8 mb-2">
            <SearchBar />
          </div>
        <div className='w-full px-10 xl:px-20'>
            <ExamManagement2></ExamManagement2>
        </div>
        </div>
        </div>
    </div>
  )
}

export default ExamManagementStudent