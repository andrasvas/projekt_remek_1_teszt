import './Navbar.css'
import { useEffect, useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import snpLogo from '../assets/a_logo.png'
import fbIcon from '../assets/icons8-facebook.svg'
import instaIcon from '../assets/icons8-instagram.svg'
import tiktokIcon from '../assets/icons8-tiktok.svg'
import twitterIcon from '../assets/icons8-twitter-bird.svg'
import youtubeIcon from '../assets/icons8-youtube.svg'

function Footer(){

    return(
    <nav className="flex justify-content-center b--white-10 w-100" style={{backgroundColor: "--background", position: "sticky", paddingTop: "0px"}}>
        <div className='row'>
            <div className='mt-5'>
                <a href="/">
                    <img className='img-responsive' style={{width: "80px"}} src={snpLogo} alt="" />
                </a>
            </div>
            
            <div className="flex pa3 flex items-center justify-between mt-0 pt-0">
                <div className='h-25 mb-4'>
                    <a target='_blank' rel='noopener noreferrer' href="https://facebook.com"><img className='w-75 black-icon' src={fbIcon} alt="" /></a>
                </div>
                <div className='h-25 mb-4'>
                    <a target='_blank' rel='noopener noreferrer' href="https://instagram.com"><img className='w-75 black-icon' src={instaIcon} alt="" /></a>
                </div>
                <div className='h-25 mb-4'>
                    <a target='_blank' rel='noopener noreferrer' href="https://tiktok.com"><img className='w-75 black-icon' src={tiktokIcon} alt="" /></a>
                </div>
                <div className='h-25 mb-4'>
                    <a target='_blank' rel='noopener noreferrer' href="https://x.com"><img className='w-75 black-icon' src={twitterIcon} alt="" /></a>
                </div>
                <div className='h-25 mb-4'>
                    <a target='_blank' rel='noopener noreferrer' href="https://www.youtube.com/@FreestyleMaci"><img className='w-75 black-icon' src={youtubeIcon} alt="" /></a>
                </div>
            </div>
        </div>
    </nav>
    )
}

export default Footer