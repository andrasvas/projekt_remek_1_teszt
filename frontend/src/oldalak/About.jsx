import '../css/Bakelitek.css'
import {Link} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { FaGitAlt, FaGithub, FaInstagram, FaYoutube, FaYoutubeSquare } from "react-icons/fa"

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
                        <div className="d-flex justify-content-center my-5">
                              <img className='mx-md-5 mx-sm-2' src="./src/assets/cat_guitar.png" alt="" />
                              <img className='mx-md-5 mx-sm-2' src="./src/assets/cat_waving.png" alt="" />
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
                                    <a target='_blank' rel='noopener noreferrer' href="https://www.youtube.com/@kocsonyaleves"><FaYoutube className='black-icon'/></a>
                                </div>
                                <div className='h-25 mb-4'>
                                    <a target='_blank' rel='noopener noreferrer' href="https://github.com/kiChi-420"><FaGithub className='black-icon' /></a>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-4 p-3">
                            <h2 className="m-auto">Vasilescu András László</h2>
                            <div className="d-flex justify-content-center  ">
                                <div className='h-25 mb-4'>
                                    <a target='_blank' rel='noopener noreferrer' href="https://www.youtube.com/@FreestyleMaci"><FaYoutube className='black-icon'/></a>
                                </div>
                                <div className='h-25 mb-4'>
                                    <a target='_blank' rel='noopener noreferrer' href="https://github.com/andrasvas"><FaGithub className='black-icon' /></a>
                                </div>
                            </div>
                        </div>
                            
                        <div className="col-sm-4 p-3">
                            <h2 className="m-auto">Oláh Gergő</h2>
                            <div className="d-flex justify-content-center">
                                <div className='h-25 mb-4'>
                                    <a target='_blank' rel='noopener noreferrer' href="https://www.instagram.com/atreyoos?igsh=ang4NWs0Y2hiZzVl"><FaInstagram className='black-icon'/></a>
                                </div>
                                <div className='h-25 mb-4'>
                                    <a target='_blank' rel='noopener noreferrer' href="https://www.youtube.com/@FreestyleMaci"><FaYoutube className='black-icon'/></a>
                                </div>
                                <div className='h-25 mb-4'>
                                    <a target='_blank' rel='noopener noreferrer' href="https://github.com/OlaGergo"><FaGithub className='black-icon' /></a>
                                </div>
                            </div>
                        </div>
                </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <h3 className="m-auto my-2">Fontok: <a target="_blank" href="https://www.dafont.com/">DaFont</a></h3>
                            <h3 className="m-auto my-2">Ikonok: <a target="_blank" href="https://fontawesome.com/">Font Awesome</a> / <a href="https://react-icons.github.io/react-icons/" target="_blank">React Icons</a></h3>
                            <h5 className=" m-auto my-4">Minden album tartalma a mű készítőjének/készítőinek a tulajdonában van.</h5>
                        </div>
                    </div>
            </div>
    )

}

export default About