import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import snpLogo from '../assets/a_logo.png'
import fbIcon from '../assets/icons8-facebook.svg'
import instaIcon from '../assets/icons8-instagram.svg'
import tiktokIcon from '../assets/icons8-tiktok.svg'
import twitterIcon from '../assets/icons8-twitter-bird.svg'
import youtubeIcon from '../assets/icons8-youtube.svg'
import githubIcon from '../assets/icons8-github.svg'
import {FaTwitter, FaFacebook, FaYoutube, FaInstagram, FaTiktok, FaGithub} from 'react-icons/fa'

function Footer(){

    return(
            <nav className='w-100 m-auto' style={{height: "200px"}}>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <div className='justify-content-center m-0' style={{width: "auto"}}>
                        <a className='m-0' href="/">
                            <img className='img-responsive justify-content-center' style={{width: "80px"}} src={snpLogo} alt="" />
                        </a>
                    </div>
                    
                    <div className="pa3 flex items-center justify-between w-md-50 mt-0 pt-0">
                        <div className='mb-4 col-md-2 col-sm-4'>
                            <a target='_blank' rel='noopener noreferrer' href="https://facebook.com"><FaFacebook className='black-icon-footer'/></a>
                        </div>
                        <div className='mb-4 col-md-2 col-sm-4'>
                            <a target='_blank' rel='noopener noreferrer' href="https://instagram.com"><FaInstagram className='black-icon-footer'/></a>
                        </div>
                        <div className='mb-4 col-md-2 col-sm-4'>
                            <a target='_blank' rel='noopener noreferrer' href="https://vm.tiktok.com/ZNddPsL1x/"><FaTiktok className='black-icon-footer'/></a>
                        </div>
                        <div className='mb-4 col-md-2 col-sm-4'>
                            <a target='_blank' rel='noopener noreferrer' href="https://x.com"><FaTwitter className='black-icon-footer'/></a>
                        </div>
                        <div className='mb-4 col-md-2 col-sm-4'>
                            <a target='_blank' rel='noopener noreferrer' href="https://www.youtube.com/@FreestyleMaci"><FaYoutube className='black-icon-footer'/></a>
                        </div>
                        <div className='mb-4 col-md-2 col-sm-4'>
                            <a target='_blank' rel='noopener noreferrer' href="https://github.com/andrasvas/projekt_remek_1_teszt"><FaGithub className='black-icon-footer'/></a>
                        </div>
                    </div>
                </div>
            </nav>
    )
}

export default Footer