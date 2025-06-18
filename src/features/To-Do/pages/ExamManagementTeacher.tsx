import React from 'react'
import Sidebar from '@/components/Sidebar'
import SearchBar from '@/components/SearchBar'
import ExamManagement from '../components/ExamManagement'


const ExamManagementTeacher:React.FC = () => {
  return (
    <div>
        <div className='flex lg:flex-row  h-auto min-h-screen max-w-screen'>
            <div ><Sidebar></Sidebar></div>
             <div className="flex-1 flex flex-col mt-4">
        <div className="relative flex w-full justify-center z-10 text-center mt-8 mb-2">
            <SearchBar />
          </div>
        <div className='w-full px-10 xl:px-20'>
            <ExamManagement></ExamManagement>
        </div>
        </div>
        </div>
    </div>
  )
}

export default ExamManagementTeacher