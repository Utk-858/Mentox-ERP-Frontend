import React from 'react'

const Review = () => {
  return (
    < >

    <div className='max-w-5xl w-full mt-6'>
    {/* Instructor & Reviews Section */}
<div className="flex justify-center mt-10 px-4">
  <div className="max-w-5xl w-full">
    {/* Instructor Info */}
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-4">Instructor</h2>
      <div className="flex items-start gap-6 p-4 rounded-lg ">
        <img
          src="https://via.placeholder.com/100"
          alt="Instructor"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-lg">Pensive–Tesla</h3>
          <p className="text-sm text-gray-500 mb-2">Lead DSML Instructor at Scaler</p>
          <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
            <li>Co-Founder & Principal Instructor, Applied AI & AppliedRoots</li>
            <li>Senior ML Scientist @ Amazon, Palo Alto 🌍 Bangalore</li>
            <li>Co-Founder, Mathetrix Labs</li>
            <li>Research Engineer, Yahoo! Labs</li>
            <li>Masters from IISc Bangalore, Gate 2007(AIR 2)</li>
            <li>13 years of experience in AI and Machine Learning</li>
          </ul>
          <div className="flex gap-2 mt-2">
            <span className="bg-gray-800 text-white px-3 py-1 text-xs rounded-full">2000+ Students Taught</span>
            <span className="bg-gray-800 text-white px-3 py-1 text-xs rounded-full">600+ Hours Taught</span>
            <span className="bg-gray-800 text-white px-3 py-1 text-xs rounded-full">600+ Hours Taught</span>
          </div>
        </div>
      </div>
    </div>

    {/* Reviews */}
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-4">Reviews</h2>

      {/* Rating Summary */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">5.0</div>
            <div className="text-sm text-gray-500">6 ratings</div>
          </div>
          <div className="flex-1 mx-6">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center text-sm text-gray-500 mb-1">
                <span className="w-6">{star}</span>
                <div className="bg-gray-200 w-full h-2 rounded mx-2 relative">
                  {star === 5 && (
                    <div className="bg-purple-600 h-2 rounded" style={{ width: "100%" }}></div>
                  )}
                </div>
                <span>{star === 5 ? 6 : 0}</span>
              </div>
            ))}
          </div>
          <button className="border px-4 py-2 rounded font-medium text-sm">Write A Review</button>
        </div>
      </div>

      {/* Individual Reviews */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Narendra</span>
            <span className="text-sm text-purple-600">★★★★★</span>
          </div>
          <h3 className="font-bold mb-1">Title in here</h3>
          <p className="text-sm text-gray-600 mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </p>
          <div className="flex justify-end gap-2 text-gray-400">
            <button className="hover:text-purple-600">👍</button>
            <button className="hover:text-purple-600">👎</button>
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-4">
        <button className="px-4 py-2 border rounded text-sm hover:bg-gray-100">Load More</button>
      </div>
    </div>
  </div>
</div>
</div>
</>
  )
}

export default Review