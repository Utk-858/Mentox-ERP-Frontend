import React from 'react'

const BlackBox = () => {
  return (
     <div className="flex flex-wrap bg-black text-white rounded-lg divide-x divide-gray-700 mb-6 max-w-5xl w-full mt-6">
            <div className="flex-1 px-4 py-2 text-center">
              <div className="font-semibold">Duration</div>
              <div className="text-sm">5hr 17m (16 Modules)</div>
            </div>
            <div className="flex-1 px-4 py-2 text-center">
              <div className="font-semibold">Challenges</div>
              <div className="text-sm">16 challenges</div>
            </div>
            <div className="flex-1 px-4 py-2 text-center">
              <div className="font-semibold">Course Level</div>
              <div className="text-sm">Beginner</div>
            </div>
            <div className="flex-1 px-4 py-2 text-center">
              <div className="font-semibold">Certificate</div>
              <div className="text-sm">Included</div>
            </div>
          </div>
  )
}

export default BlackBox