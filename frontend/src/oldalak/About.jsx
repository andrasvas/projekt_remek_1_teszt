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
                <h2 className="default-text">Gombos Benedek Zsombor</h2>

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
                <h2>Vasilescu András László</h2>

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
                <h2>Oláh Gergő</h2>

                <div className="flex pa3 flex justify-content-center">
                    <div className='h-25 mb-4'>
                        <a target='_blank' rel='noopener noreferrer' href="https://www.instagram.com/atreyoos?igsh=ang4NWs0Y2hiZzVl"><img className='w-75 black-icon' src={instaIcon} alt="" /></a>
                    </div>
                    <div className='h-25 mb-4'>
                        <a target='_blank' rel='noopener noreferrer' href="https://www.youtube.com/@FreestyleMaci"><img className='w-75 black-icon' src={youtubeIcon} alt="" /></a>
                    </div>
                    <div className='h-25 mb-4'>
                        <a target='_blank' rel='noopener noreferrer' href="https://github.com/OlaGergo"><img className='w-75 black-icon' src={githubIcon} alt="" /></a>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default About