import "./Bakelitek.css"
import {Link} from 'react-router-dom'
import fbIcon from '../assets/icons8-facebook.svg'
import instaIcon from '../assets/icons8-instagram.svg'
import tiktokIcon from '../assets/icons8-tiktok.svg'
import twitterIcon from '../assets/icons8-twitter-bird.svg'
import youtubeIcon from '../assets/icons8-youtube.svg'
import githubIcon from '../assets/icons8-github.svg'

function About(){

    return(
        <div className="mw-100">
            <h3>Made by:</h3>
            <div>
                <Link className="h2">Gombos Benedek Zsombor</Link>

                <div className="pa3 flex justify-content-center">
                    <div className='h-25 mb-4'>
                        <a target='_blank' rel='noopener noreferrer' href="https://www.youtube.com/@kocsonyaleves"><img className='w-75 black-icon' src={youtubeIcon} alt="" /></a>
                    </div>
                    <div className='h-25 mb-4'>
                        <a target='_blank' rel='noopener noreferrer' href="https://github.com/kiChi-420"><img className='w-75 black-icon' src={githubIcon} alt="" /></a>
                    </div>
                </div>
            </div>
            <div>
                <Link className="h2">Vasilescu András László</Link>

                <div className="flex pa3 justify-content-center">
                    <div className='h-25 mb-4'>
                        <a target='_blank' rel='noopener noreferrer' href="https://www.youtube.com/@FreestyleMaci"><img className='w-75 black-icon' src={youtubeIcon} alt="" /></a>
                    </div>
                    <div className='h-25 mb-4'>
                        <a target='_blank' rel='noopener noreferrer' href="https://github.com/andrasvas"><img className='w-75 black-icon' src={githubIcon} alt="" /></a>
                    </div>
                </div>
                
            </div>
            <div>
                <Link className="h2">Oláh Gergő</Link>

                <div className="flex pa3 flex justify-content-center">
                    <div className='h-25 mb-4'>
                        <a target='_blank' rel='noopener noreferrer' href="https://www.instagram.com/atreyoos?igsh=ang4NWs0Y2hiZzVl"><img className='w-75 black-icon' src={instaIcon} alt="" /></a>
                    </div>
                    <div className='h-25 mb-4'>
                        <a target='_blank' rel='noopener noreferrer' href="https://www.youtube.com/@FreestyleMaci"><img className='w-75 black-icon' src={youtubeIcon} alt="" /></a>
                    </div>
                    <div className='h-25 mb-4'>
                        <a target='_blank' rel='noopener noreferrer' href="https://github.com/andrasvas/projekt_remek_1_teszt"><img className='w-75 black-icon' src={githubIcon} alt="" /></a>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default About