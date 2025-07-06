import React from 'react'

import SearchBar from '@/components/SearchBar'
import SidebarTeacher from '@/components/SidebarTeacher'
import SupportTicketsStudent from '../components/SupportTicketsStudent'


const Hero8 = () => {
  return (
    <div className="flex w-full overflow-hidden">
        <SidebarTeacher />
      <div className="flex w-full flex-col">
        <main className="w-full px-4 md:px-10 py-10 flex flex-col items-center justify-start space-y-3">
          <div className="relative flex w-full justify-center z-10 text-center">
            <SearchBar />
          </div>
          <SupportTicketsStudent/>
          </main>
        </div>

    </div>
  )
}

export default Hero8