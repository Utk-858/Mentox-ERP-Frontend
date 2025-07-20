
import { Route, Routes } from 'react-router-dom'
import Hero11 from './Hero11'
import Hero10 from './Hero10'


const Home = () => {
  return (
    <div>

     <Routes>
      <Route path="/*" element={<Hero10/>} />
      
         <Route path="/visitor" element={<Home/>} />
          <Route path="/dashboard" element={<Hero11/>} />
        
      </Routes>
    </div>
  )
}

export default Home