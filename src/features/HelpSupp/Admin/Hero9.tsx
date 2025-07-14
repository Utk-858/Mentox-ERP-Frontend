import React from 'react'

import SearchBar from '@/components/SearchBar'
import SidebarStudent from '@/components/SidebarStudent'
import SupportTicketsStudent from '../student/components/SupportTicketsStudent'
import SupportTickets from './SupportTickets'
import SidebarAdmin from '@/components/SidebarAdmin'


const Hero9 = () => {
  return (
    <div className="flex w-full overflow-hidden">
        <SidebarAdmin/>
      <div className="flex w-full flex-col">
        <main className="w-full px-4 md:px-10 py-10 flex flex-col items-center justify-start space-y-3">
          <div className="relative flex w-full justify-center z-10 text-center">
            <SearchBar />
          </div>
          <SupportTickets/>
          </main>
        </div>

    </div>
  )
}

export default Hero9