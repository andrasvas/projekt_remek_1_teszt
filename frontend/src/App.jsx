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
import Purchase from './oldalak/Purchase'
import Admin from './oldalak/Admin.jsx'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom'
import MoreLikeThis from './oldalak/MoreLikeThis'
import { useEffect, useState } from 'react'
import AdminBakelitek from './oldalak/AdminBakelitek'

function App() {
  // const isLogged = window.localStorage.getItem("userToken")
  const [user,setUser] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:5000/profile",{withCredentials: true})
            .then(res =>{
              if(res){
                setUser(res.data)
                console.log(res.data)
              }
            } )
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
            <Route path='/admin/vinyls' element={user ? (user.user_is_admin === 1 ? <AdminBakelitek /> : <Profile />) : <Signin />}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/profile" element={user?<Profile/>:<Signin/>}/>
            <Route path="/signin" element={user?<Profile/>:<Signin/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='/purchase' element={user?<Purchase/>:<Signin></Signin>}></Route>
            <Route path='/admin' element={user ? (user.user_is_admin === 1 ? <Admin /> : <Profile />) : <Signin />}></Route>
            <Route path='*' element={<Error/>}></Route>
          </Routes>
          <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
