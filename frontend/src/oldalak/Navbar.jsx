import './Navbar.css'
import { useEffect, useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import snpLogo from '../assets/a_logo.png'
import cartIcon from '../assets/shopping-cart-outline.svg'

function Navbar(){
    var isLoggedIn = window.localStorage.getItem("isLoggedIn")

    return(
    <nav className="main-nav-container flex justify-between w-100" style={{paddingTop: "0px"}}>
        <a className="link white-70 no-underline flex items-center p-3" href="/">
            <img className='img-responsive' style={{width: "80px"}} src={snpLogo} alt="" />
            <h3 className='main-brand main-brand-hover'>Scratch N' Spin</h3>
        </a>
        <div className="flex-grow pa3 flex items-center">
            <a className="f6 link dib hover-black mr3 mr4-ns text-nowrap" href="/about">About</a>
            <a className='f6 link dib hover-black mr3 mr4-ns text-nowrap' href=''>Cart</a>
            {isLoggedIn?null:<a className="f6 link dib hover-black mr3 mr4-ns text-nowrap" href="/signin">Sign In</a>}
            {isLoggedIn?null:<a className="f6 dib black bg-animate hover-bg-white hover-black-pill no-underline pv2 ph4 br-pill text-nowrap ba" href="/signup">Sign Up</a>}
            {isLoggedIn?<a className="f6 link dib hover-black mr3 mr4-ns text-nowrap" href="/profile">My Profile</a>:null}
        </div>
    </nav>
    )
}

export default Navbar