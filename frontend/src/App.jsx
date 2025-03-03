import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css'
import Bakelitek from './oldalak/Bakelitek.jsx'
import ItemView from './oldalak/ItemView.jsx'
import Error from './oldalak/Error'
import Navbar from './oldalak/Navbar'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Bakelitek />}/>
          <Route path="/item/:itemId" element={<ItemView />}/>
          <Route Component={Error}></Route>
        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
