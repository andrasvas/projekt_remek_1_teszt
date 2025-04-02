import './Bakelitek.css'
import React, {useEffect, useState, useRef, useCallback, useContext, useId} from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Link } from 'react-router-dom';

function Profile(){
    const [userData,setUserData] = useState({
        user_email:"",
        user_pfp_id:"",
        user_last_name:"",
        user_first_name:""
    })

    function LogOut(){
        axios.post("http://localhost:5000/logout", {}, { withCredentials: true })
    .then(response => {
        console.log(response.data.message);
        window.location.href = "/signin"
    })
    .catch(error => {
        console.error("Hiba történt:", error.response?.data || error);
    });
    }

    const navRef = useRef();

    function showPfps(){
        document.getElementById("pfps").classList = "dropdown-content justify-content-center display-flex"
    }

    function hidePfps(){
        document.getElementById("pfps").classList = "dropdown-content justify-content-center display-none"
    }

    useEffect(() =>{
        axios.get("http://localhost:5000/profile", {
            withCredentials: true  // Fontos! Engedélyezi a cookie küldését a kérésben
        })
        .then(response => {
            console.log("Profil adatok:", response.data);
            setUserData(response.data)
        })
        .catch(error => {
            console.error("Hiba történt:", error.response?.data || error);
        });
    },[])

    const ChangeProfilePicture = (profilePicId) => {
        axios.post('http://localhost:5000/change_pfp', 
    { imgId: profilePicId }, // Ez a request body
    { withCredentials: true } // Ez a konfiguráció
)
.then(response => {
    console.log(response.data);
    window.location.href = "/profile"
})
.catch(error => {
    console.error(error);
});
     }

    return(
        <div className='all-container'>
            <div className='card p-4'>
                <div className='m-0 p-0 row'>
                    <img className='droppic col-md-4 col-xs-1 p-1 img-thumbnail' onClick={showPfps} src={`../src/pfp_pics/${userData.user_pfp_id}.png`} alt="nincs profilkép" />
                    <div id='pfps' className="dropdown-content justify-content-center display-none">
                        <div>
                            <button className='pfp-button' onClick={() => {ChangeProfilePicture(1)}} to={`changepfp/${userData.user_id}/1`}><img className='pfp-images' src="../src/pfp_pics/1.png" alt="" /></button>
                            <button className='pfp-button' to={`changepfp/${userData.user_id}/2`}><img className='pfp-images' src="../src/pfp_pics/2.png" alt="" /></button>
                            <button className='pfp-button' to={`changepfp/${userData.user_id}/3`}><img className='pfp-images' src="../src/pfp_pics/3.png" alt="" /></button>
                            <button className='pfp-button' to={`changepfp/${userData.user_id}/4`}><img className='pfp-images' src="../src/pfp_pics/4.png" alt="" /></button>
                            <button className='pfp-button' to={`changepfp/${userData.user_id}/5`}><img className='pfp-images' src="../src/pfp_pics/5.png" alt="" /></button>
                            <button className='pfp-button' to={`changepfp/${userData.user_id}/6`}><img className='pfp-images' src="../src/pfp_pics/6.png" alt="" /></button>
                            <button className='pfp-button' to={`changepfp/${userData.user_id}/7`}><img className='pfp-images' src="../src/pfp_pics/7.png" alt="" /></button>
                            <button className='pfp-button' to={`changepfp/${userData.user_id}/8`}><img className='pfp-images' src="../src/pfp_pics/8.png" alt="" /></button>
                            <button className='pfp-button' to={`changepfp/${userData.user_id}/9`}><img className='pfp-images' src="../src/pfp_pics/9.png" alt="" /></button>
                            <button className='pfp-button' to={`changepfp/${userData.user_id}/10`}><img className='pfp-images' src="../src/pfp_pics/10.png" alt="" /></button>
                            <button className='pfp-button' to={`changepfp/${userData.user_id}/11`}><img className='pfp-images' src="../src/pfp_pics/11.png" alt="" /></button>
                            <button className='pfp-button' to={`changepfp/${userData.user_id}/12`}><img className='pfp-images' src="../src/pfp_pics/12.png" alt="" /></button>
                        </div>
                        <div>
                            <button className='main-brand purchaseBtn' onClick={hidePfps}>Mégsem</button>
                        </div>
                    </div>
                    <div className='col container'>
                        <div className='mb-4'>
                                <h2>Üdv, {userData.user_first_name}</h2>
                                <h3>Adatok:</h3>
                        </div>
                        <div className='mb-2'>
                            <h4>{userData.user_email}</h4>
                            <h4>{userData.user_first_name}</h4>
                            <h4>{userData.user_last_name}</h4>
                        </div>
                    </div>
                </div>
                <div>
                    <button className='main-brand purchaseBtn mx-3' onClick={LogOut}>Kijelentkezés</button>
                    <button className='main-brand purchaseBtn mx-3' onClick={LogOut}>Jelszó megváltoztatása</button>
                </div>

            </div>
        </div>
    )

}

export default Profile