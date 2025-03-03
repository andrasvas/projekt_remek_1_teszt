import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css'
import Bakelitek from './oldalak/Bakelitek.jsx'
import ItemView from './oldalak/ItemView.jsx'
import Error from './oldalak/Error'
import Navbar from './oldalak/Navbar'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom'
import snpLogo from './assets/a_logo.png'

function App() {
  const [count, setCount] = useState(0)
  const [isHovered, setIsHovered] = useState(false);
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
      <div className='App'>
        <nav className='navbar container sticky-nav' role='navigation' aria-label='main navigation'>
          <div className='navbar-brand'>
            <Link to={"/"} id="homeScratch" className='navbar-item is-size-4'>
            <img className='img-responsive' style={{width: "60px"}} src={snpLogo} alt="" />
                Scratch 'N Spin
            </Link>
            <label role='button' class='navbar-burger burger' aria-label='menu' aria-expanded="false" data-target='navbarBasicExample' 
            onClick={e =>{
              e.preventDefault();
              this.setState({showMenu: !this.state.showMenu})
            }}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </label>
          </div>
          <div className={`navbar-menu`}>
            <Link to={"/"} className='navbar-item'>
              Termékeink
                <span
                    className="tag is-primary"
                    style={{ marginLeft: "5px" }}
                  >
                    </span>
            </Link>
            <Link to="/cart" className="navbar-item">
                  Cart
                  <span
                    className="tag is-primary"
                    style={{ marginLeft: "5px" }}
                  >
                  </span>
            </Link>
                  <Link to="/login" className="navbar-item">
                    Login
                  </Link>
          </div>
        </nav>
      </div>
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
