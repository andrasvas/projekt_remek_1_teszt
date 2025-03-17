import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css'

import Bakelitek from './oldalak/Bakelitek.jsx'
import ItemView from './oldalak/ItemView.jsx'
import Error from './oldalak/Error'
import Navbar from './oldalak/Navbar'
import Signup from './oldalak/SignUp.jsx'
import Signin from './oldalak/SignIn.jsx'
import About from './oldalak/About.jsx'
import Profile from './oldalak/Profile'
import Footer from './oldalak/Footer'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  const [isHovered, setIsHovered] = useState(false);
  const isLogged = window.localStorage.getItem("isLoggedIn")
  // const [isDarkMode, setDarkMode] = useState(false)
  
  // function toggleDarkMode(isDarkMode){
  //   if(true){
  //     setDarkMode(false)
  //   }
  //   else {
  //     setDarkMode(true)
  //   }
  // }

  return (
    <>
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route index element={<Bakelitek />}/>
            <Route path="/item/:itemId" element={<ItemView />}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/profile" element={isLogged?<Profile/>:null}/>
            <Route path="/signin" element={<Signin/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route Component={Error}></Route>
          </Routes>
          <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
