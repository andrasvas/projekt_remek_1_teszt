import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css'

import Bakelitek from './oldalak/Bakelitek.jsx'
import axios from 'axios'
import ItemView from './oldalak/ItemView.jsx'
import Error from './oldalak/Error'
import Navbar from './oldalak/Navbar'
import Signup from './oldalak/SignUp.jsx'
import Signin from './oldalak/SignIn.jsx'
import About from './oldalak/About.jsx'
import Profile from './oldalak/Profile'
import Footer from './oldalak/Footer'
import Cart from './oldalak/Cart'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom'
import MoreLikeThis from './oldalak/MoreLikeThis'
import { useEffect, useState } from 'react'

function App() {
  // const isLogged = window.localStorage.getItem("userToken")
  const [user,setUser] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:5000/profile",{withCredentials: true})
            .then(res => setUser(res.data))
            .catch(() => setUser(null))
    },[])


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
            {/* <Route path="/item/:genre" element={<MoreLikeThis />}/> */}
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/signin" element={user?<Profile/>:<Signin/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
          </Routes>
          <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
