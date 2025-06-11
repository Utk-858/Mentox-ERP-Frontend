import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Hero from './front/Hero'
import Sidebar from './front/Sidebar'
import Hero1 from './Second/Hero1'
import Hero2 from './Third/Hero2'
import Hero4 from './Fourth/Hero4'
import Hero5 from './Quiz/Hero5'
import Quiz from './Quiz/Quiz'

const Home = () => {
  return (
    <div>

     <Routes>
      <Route path="*" element={<div>404 - Not Found</div>} />
       <Route path="/" element={<Hero/>} />
       <Route path="/side" element={<Hero1/>} />
        <Route path="/third" element={<Hero2/>} />
        <Route path="/fourth" element={<Hero4/>} />
        <Route path="/quiz" element={<Hero5/>} />
        <Route path="/quiz/first" element={<Quiz/>} />

      </Routes>
    </div>
  )
}

export default Home