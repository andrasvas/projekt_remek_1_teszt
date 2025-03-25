import './Navbar.css'
import { useEffect, useState} from "react"
import { useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {FaBars, FaTimes} from "react-icons/fa"
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import snpLogo from '../assets/a_logo.png'
import cartIcon from '../assets/shopping-cart-outline.svg'

function Navbar(){
    var isLoggedIn = window.localStorage.getItem("isLoggedIn")
    const navRef = useRef();

    const showNavbar = () =>{
        navRef.current.classList.toggle("responsive_nav");
    }

    return(
        <header>
            <a className="link white-70 no-underline flex items-center p-3" href="/">
                <img className='img-responsive p-0' style={{width: "80px"}} src={snpLogo} alt="" />
                <h3 className='main-brand main-brand-hover scratch-text'>Scratch N' Spin</h3>
            </a>

            <nav ref={navRef} className="main-nav-container flex w-100">
                <div className="flex nav-container">
                    <a className="link hover-black" href="/about">About</a>
                    {isLoggedIn?<a className='link hover-black' href='/cart'>Cart</a>:null}
                    {isLoggedIn?null:<a className="link hover-black" href="/signin">Sign In</a>}
                    {isLoggedIn?null:<a className="bg-animate hover-bg-white hover-black-pill no-underline pv2 ph4 br-pill" href="/signup">Sign Up</a>}
                    {isLoggedIn?<a className="f6 link dib hover-black mr3 mr4-ns text-nowrap" href="/profile">My Profile</a>:null}
                    <button className='nav-btn nav-close-btn' onClick={showNavbar}>
                        <FaTimes/>
                    </button>
                </div>
            </nav>
            <button className='nav-btn' onClick={showNavbar}>
                <FaBars/>
            </button>
        </header>
    )
}

export default Navbar