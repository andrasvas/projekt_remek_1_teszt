import './Bakelitek.css'
import React, {useEffect, useState, useCallback, useContext, useId} from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Link } from 'react-router-dom';


function Profile(){
    const userToken = window.localStorage.getItem("userToken")
    const [userData,setUserData] = useState({
        user_email:"",
        user_pfp_id:"",
        user_last_name:"",
        user_first_name:""
    })

    function LogOut(){
        window.localStorage.removeItem("isLoggedIn")
        window.localStorage.removeItem("userToken")

        window.location.href = "/"
    }

    useEffect(() => {
        if (userToken) {
          console.log("Token létezik:", userToken)
        } else {
          console.log("Nincs token, irány a bejelentkezés!")
          window.location.href = "/signin"
        }
      }, [])

    useEffect(() =>{
        if(userToken){
            axios.get("http://127.0.0.1:5000/profile",{
            headers: {
                Authorization: `Bearer ${userToken}`
            }
            })
            .then(response => {
                if(response){
                    console.log(response.data)
                    setUserData(response.data)
                }
            })
            .catch(error => {
                console.log(error)
            })
        }
    },[userToken])

    return(
        <div className='all-container'>
            <div className='card'>
                <div className='justify-content-center bg-success '>
                    <div className='dropdown img-thumbnail'>
                        <img className='droppic' src={`../src/pfp_pics/${userData.user_pfp_id}.png`} alt="nincs profilkép" />
                        {/* <div className='dropdown-content'>
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
                        </div> */}
                    </div>
                    <div className='bg-info'>
                        <h2>Üdv, {userData.user_first_name}</h2>
                        <h3>Adatok:</h3>
                        <h4>{userData.user_email}</h4>
                        <h4>{userData.user_first_name}</h4>
                        <h4>{userData.user_last_name}</h4>
                    </div>
                </div>

            <button onClick={LogOut}>Kijelentkezés</button>
            </div>
        </div>
    )

}

export default Profile