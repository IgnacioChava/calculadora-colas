import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Mm1 from './Pages/MM1/Mm1';
import Mmm from './Pages/MMM/mmm';
import MM1fin from './Pages/MM1Fin/MM1fin'
import MD1 from './Pages/MD1/MD1'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Mm1></Mm1>} />
                       <Route path="/MMM" element={<Mmm />} />
                      
                       <Route path="/MM1Fin" element={<MM1fin />} />
                       <Route path="/MD1" element={<MD1 />} />
                  <Route/>
              </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
