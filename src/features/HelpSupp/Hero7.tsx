import React from 'react'
import Sidebar from '../Lectures/components/front/Sidebar'
import SearchTop from '../Dashboard/components/SearchTop'
import SupportTickets from './SupportTickets'
import SupportTicketsStudent from './SupportTicketsStudent'

const Hero7 = () => {
  return (
    <div className="flex w-full overflow-hidden">
        <Sidebar />
      <div className="flex w-full flex-col">
        <main className="w-full px-4 md:px-10 py-10 flex flex-col items-center justify-start space-y-3">
          <div className="relative flex w-full justify-center z-10 text-center">
            <SearchTop />
          </div>
          <SupportTicketsStudent/>
          </main>
        </div>

    </div>
  )
}

export default Hero7