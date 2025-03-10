import './Navbar.css'
import { useEffect, useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import snpLogo from '../assets/a_logo.png'

function Navbar(){

    return(
    <nav className="sticky-nav flex justify-between b--white-10" style={{backgroundColor: "#ddcfff", position: "sticky", paddingTop: "0px"}}>
        <a className="link white-70 no-underline flex items-center p-3" href="/">
            <img className='img-responsive' style={{width: "80px"}} src={snpLogo} alt="" />
            <h3 className='main-brand main-brand-hover'>Scratch N' Spin</h3>
        </a>
        <div className="flex-grow pa3 flex items-center">
            <a className="f6 link dib hover-black mr3 mr4-ns" href="#0">About</a>
            <a className="f6 link dib hover-black mr3 mr4-ns" href="/signin">Sign In</a>
            <a className="f6 dib black bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill    ba" href="/signup">Sign Up</a>
        </div>
    </nav>

    // <nav className='navbar navbar-form navbar-fixed-top container sticky-nav' role='navigation' aria-label='main navigation'>
    //     <div className='navbar-brand'>
    //     <Link to={"/"} id="homeScratch" className='navbar-item is-size-4'>
    //     <img className='img-responsive' style={{width: "60px"}} src={snpLogo} alt="" />
    //         Scratch 'N Spin
    //     </Link>
    //     <label role='button' class='navbar-burger burger' aria-label='menu' aria-expanded="false" data-target='navbarBasicExample' 
    //     onClick={e =>{
    //         e.preventDefault();
    //         this.setState({showMenu: !this.state.showMenu})
    //     }}>
    //         <span aria-hidden="true"></span>
    //         <span aria-hidden="true"></span>
    //         <span aria-hidden="true"></span>
    //     </label>
    //     </div>
    //     <div className={`navbar-menu`}>
    //     <Link to={"/"} className='navbar-item'>
    //         Termékeink
    //         <span
    //             className="tag is-primary"
    //             style={{ marginLeft: "5px" }}
    //             >
    //             </span>
    //     </Link>
    //     <Link to="/cart" className="navbar-item">
    //             Cart
    //             <span
    //             className="tag is-primary"
    //             style={{ marginLeft: "5px" }}
    //             >
    //             </span>
    //     </Link>
    //             <Link to="/login" className="navbar-item">
    //             Login
    //             </Link>
    //     </div>
    // </nav>
    )
}

export default Navbar