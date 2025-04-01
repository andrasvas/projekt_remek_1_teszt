import './Bakelitek.css'
import React, {useEffect, useState, useCallback, useContext, useId} from "react";
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
        axios.post("http://localhost:5000/logout",{withCredentials: true})
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

    return(
        <div className='all-container'>
            <div className='card p-4'>
                <div className='m-0 p-0 row'>
                    <img className='droppic col-md-4 col-xs-1 p-1 img-thumbnail' src={`../src/pfp_pics/${userData.user_pfp_id}.png`} alt="nincs profilkép" />
                    <div className='dropdown-content'>
                            <Link to={`changepfp/${userData.user_id}/1`}><img src="../src/pfp_pics/1.png" alt="" /></Link>
                            <Link to={`changepfp/${userData.user_id}/2`}><img src="../src/pfp_pics/2.png" alt="" /></Link>
                            <Link to={`changepfp/${userData.user_id}/3`}><img src="../src/pfp_pics/3.png" alt="" /></Link>
                            <Link to={`changepfp/${userData.user_id}/4`}><img src="../src/pfp_pics/4.png" alt="" /></Link>
                            <Link to={`changepfp/${userData.user_id}/5`}><img src="../src/pfp_pics/5.png" alt="" /></Link>
                            <Link to={`changepfp/${userData.user_id}/6`}><img src="../src/pfp_pics/6.png" alt="" /></Link>
                            <Link to={`changepfp/${userData.user_id}/7`}><img src="../src/pfp_pics/7.png" alt="" /></Link>
                            <Link to={`changepfp/${userData.user_id}/8`}><img src="../src/pfp_pics/8.png" alt="" /></Link>
                            <Link to={`changepfp/${userData.user_id}/9`}><img src="../src/pfp_pics/9.png" alt="" /></Link>
                            <Link to={`changepfp/${userData.user_id}/10`}><img src="../src/pfp_pics/10.png" alt="" /></Link>
                            <Link to={`changepfp/${userData.user_id}/11`}><img src="../src/pfp_pics/11.png" alt="" /></Link>
                            <Link to={`changepfp/${userData.user_id}/12`}><img src="../src/pfp_pics/12.png" alt="" /></Link>
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