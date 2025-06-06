
import { Route, Routes } from 'react-router-dom'
import Hero from './front/Hero'

import Hero1 from './Second/Hero1'
import Hero2 from './Third/Hero2'

const Home = () => {
  return (
    <div>

     <Routes>
      <Route path="*" element={<div>404 - Not Found</div>} />
       <Route path="/" element={<Hero/>} />
       <Route path="/side" element={<Hero1/>} />
       <Route path="/second" element={<Hero2/>} />
        <Route path="/third" element={<div>500- Not Found</div>} />

        <Route path="/fifth" element={<Hero2/>} />
      </Routes>
    </div>
  )
}

export default Home