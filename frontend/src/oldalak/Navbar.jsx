import '../css/Navbar.css'
import { useEffect, useState} from "react"
import { useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {FaBars, FaTimes} from "react-icons/fa"
import axios from 'axios'
import snpLogo from '../assets/a_logo.png'
import catShadow from '../assets/cat_shadow.png'

function Navbar(){
    const [user,setUser] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:5000/profile",{withCredentials: true})
            .then(res => setUser(res.data))
            .catch(() => setUser(null))
    },[])
    //var isLoggedIn = window.localStorage.getItem("userToken")
    const navRef = useRef();

    const showNavbar = () =>{
        navRef.current.classList.toggle("responsive_nav");
    }

    const userData = useState({
        user_email:"",
        user_pfp_id:"",
        user_last_name:"",
        user_first_name:""
    })

    return(
        <header>
            <a className="no-underline flex items-center p-3 cat-logo-scratch-container" href="/">
            <div>
                <img id='nav-logo' className='p-0' style={{width: "80px"}} src={snpLogo} alt="" />
                <img className='p-0' style={{width: "80px"}} src={catShadow} alt="" />
            </div>
                <h3 className='scratch-text'>Scratch N' Spin</h3>
            </a>

            <nav ref={navRef} className="main-nav-container flex w-100">
                <div className="flex nav-container">
                    <a className="hover-black" href="/">Főoldal</a>
                    <a className="hover-black" href="/about">Rólunk</a>
                    {user?<a className='hover-black' href='/cart'>Kosár</a>:null}
                    {user?null:<a className="hover-black" href="/signin">Bejelentkezés</a>}
                    {user?null:<a className="bg-animate hover-bg-white hover-black-pill no-underline pv2 ph4 br-pill" href="/signup">Regisztrálás</a>}
                    {user?<a className="profile-button" href="/profile"><img src={`../src/pfp_pics/${user.user_pfp_id}.png`} alt="" /></a>:null}
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