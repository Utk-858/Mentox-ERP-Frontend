import SidebarGatePass from '@/components/SidebarGatePass'
import React from 'react'

import GatePassVisitorSystem from './components/ShowGatePass'
import SearchBar from '@/components/SearchBar'


const Hero11 = () => {
  return (
     <div className="flex w-full min-h-screen">
      {/* Sidebar */}
      <div className="h-screen sticky top-0 left-0 z-20">
        <SidebarGatePass />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        <main className="w-full py-10 space-y-3">
          <div className="relative flex w-full justify-center z-10 text-center">
            <SearchBar/>
          </div>
            <GatePassVisitorSystem/>
        </main>
      </div>
    </div>
  )
}

export default Hero11