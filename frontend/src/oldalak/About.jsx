import "./Bakelitek.css"
import {Link} from 'react-router-dom'
import fbIcon from '../assets/icons8-facebook.svg'
import instaIcon from '../assets/icons8-instagram.svg'
import tiktokIcon from '../assets/icons8-tiktok.svg'
import twitterIcon from '../assets/icons8-twitter-bird.svg'
import youtubeIcon from '../assets/icons8-youtube.svg'
import githubIcon from '../assets/icons8-github.svg'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

function About(){

    return(
        <div className='all-container'>
                <div>
                    <div className="container">
                        <div>
                            <h2 className="m-auto main-brand mb-3">Üdvözlünk az oldalon!</h2>
                            <p className="m-auto main-brand">A bakelitlemezek szerelmeseinek és zenebarátoknak szóló elsőszámú online célponton! Útunk egy egyszerű, 
                            mégis szenvedélyes célból indult: a ritkább, exotikus bakelit lemezeket szeretnénk eljuttatni mindenki számára, 
                            megőrizve az analóg hang élményét a digitális korban. </p>
                            <h2 className="m-auto main-brand mb-3 mt-5">Mi a küldetésünk?</h2>
                            <p className="m-auto main-brand"> Scratch 'N Spin Records-nál arra törekszünk, hogy egy sokszínű és magas minőségű bakelitlemez-kollekciót állítsunk össze, 
                            amely átível a zenei műfajokon és korokon. 
                            Célunk, hogy felülmúlhatatlan vásárlási élményt nyújtsunk vásárlóinknak, kényelmet és nosztalgiát egyaránt kínálva. </p>
                            <p className="m-auto main-brand">
                            Hittünk, hogy minden lemez lejátszása történetet mesél, 
                            és mi itt vagyunk, hogy segítsünk felfedezni és megőrizni ezeket a történeteket.
                            </p> 
                        </div>
                    <div>
                        <h2 className="m-auto main-brand mb-3 mt-5">Miért is hoztuk létre a Scratch 'N Spin Recordsot?</h2>
                        <p className="m-auto main-brand">Egy olyan korban, amikor a digitális streamelés uralkodik, felismertük a vinyllemezek tartós vonzerejét. 
                            A lemez megfogása, a lejátszóra helyezése és a meleg, gazdag hang, amit produkál, mind része egy egyedi és élvezetes hallgatási élménynek. 
                            A Scratch 'N Spin Records abból a vágyból született, hogy ezt a hagyományt életben tartsuk és mindenkinek hozzáférhetővé tegyük.</p>
                        <p className="m-auto main-brand">Minden támogatást és lelkesedőért nagyon hálásak vagyunk és, ha meg is fogtunk a bemutatkozásunkal akkor tarts velünk nyugodtan!</p>
                        <p className="m-auto secondary-brand">Kellemes lemezlejátszást!</p>
                        <div className="row">
                            <div className="col-3 col-md-4"></div>
                            <img className="col-6 col-md-4" src="./src/assets/cat_waving.png" alt="" />
                            <div className="col-3 col-md-4"></div>
                        </div>
                    </div>
                </div>
        </div>  
            <div className="container">
                <div className="row">
                        <div className="col-sm-4 p-3" >
                            <h2 className="default-text m-auto">Gombos Benedek Zsombor</h2>
                            <div className=" d-flex justify-content-center">
                                <div className='h-25 mb-4'>
                                    <a target='_blank' rel='noopener noreferrer' href="https://www.youtube.com/@kocsonyaleves"><img className='w-75 black-icon' src={youtubeIcon} alt="" /></a>
                                </div>
                                <div className='h-25 mb-4'>
                                    <a target='_blank' rel='noopener noreferrer' href="https://github.com/kiChi-420"><img className='w-75 black-icon' src={githubIcon} alt="" /></a>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-4 p-3">
                            <h2 className="m-auto">Vasilescu András László</h2>
                            <div className="d-flex justify-content-center  ">
                                <div className='h-25 mb-4'>
                                    <a target='_blank' rel='noopener noreferrer' href="https://www.youtube.com/@FreestyleMaci"><img className='w-75 black-icon' src={youtubeIcon} alt="" /></a>
                                </div>
                                <div className='h-25 mb-4'>
                                    <a target='_blank' rel='noopener noreferrer' href="https://github.com/andrasvas"><img className='w-75 black-icon' src={githubIcon} alt="" /></a>
                                </div>
                            </div>
                        </div>
                            
                        <div className="col-sm-4 p-3">
                            <h2 className="m-auto">Oláh Gergő</h2>
                            <div className="d-flex justify-content-center">
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
                    </div>
                    <div className="container">
                        <div className="row">
                            <h3 className="m-auto my-2">Social media ikonok: <a target="_blank" href="https://icons8.com/">Icons8</a></h3>
                            <h3 className="m-auto my-2">Fontok: <a target="_blank" href="https://www.dafont.com/">DaFont</a></h3>
                            <h3 className="m-auto my-2">Egyéb ikonok: <a target="_blank" href="https://fontawesome.com/">Font Awesome</a></h3>
                            <h5 className=" m-auto my-4">Minden album tartalma a mű készítőjének/készítőinek a tulajdonában van.</h5>
                        </div>
                    </div>
            </div>
    )

}

export default About