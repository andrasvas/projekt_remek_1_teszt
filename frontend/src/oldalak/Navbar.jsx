import './Navbar.css'
import { useEffect, useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import snpLogo from '../assets/a_logo.png'

function Navbar(){

    return(
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
    )
}

export default Navbar