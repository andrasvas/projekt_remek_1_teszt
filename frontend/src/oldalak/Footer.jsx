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

function Footer(){

    return(
        <div className='footer-container'>
            <nav className="flex justify-content-center b--white-10">
                <div className='row justify-content-center'>
                    <div className='justify-content-center' style={{width: "auto"}}>
                        <a className='bg-success' href="/">
                            <img className='img-responsive justify-content-center' style={{width: "80px"}} src={snpLogo} alt="" />
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
                            <a target='_blank' rel='noopener noreferrer' href="https://vm.tiktok.com/ZNddPsL1x/"><img className='w-75 black-icon' src={tiktokIcon} alt="" /></a>
                        </div>
                        <div className='h-25 mb-4'>
                            <a target='_blank' rel='noopener noreferrer' href="https://x.com"><img className='w-75 black-icon' src={twitterIcon} alt="" /></a>
                        </div>
                        <div className='h-25 mb-4'>
                            <a target='_blank' rel='noopener noreferrer' href="https://www.youtube.com/@FreestyleMaci"><img className='w-75 black-icon' src={youtubeIcon} alt="" /></a>
                        </div>
                        <div className='h-25 mb-4'>
                            <a target='_blank' rel='noopener noreferrer' href="https://github.com/andrasvas/projekt_remek_1_teszt"><img className='w-75 black-icon' src={githubIcon} alt="" /></a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Footer