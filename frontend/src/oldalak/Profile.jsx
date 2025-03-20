import './Bakelitek.css'
import React, {useEffect, useState, useCallback, useContext, useId} from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

function Profile(){
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

    const [userToken, setUserToken] = useState("")

    useEffect(() => {
        const token = window.localStorage.getItem("userToken")
        setUserToken(token)
        console.log(userToken)
    },[])

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
        <div>
            <h2>Üdv, {userData.user_first_name}</h2>
            <p>Adatok:</p>
            <br />
            <h4>{userData.user_email}</h4>
            <h4>{userData.user_first_name}</h4>
            <h4>{userData.user_last_name}</h4>
            <img src={`../src/pfp_pics/${userData.user_pfp_id}.png`} alt="nincs profilkép" />
            <br />

            <button onClick={LogOut}>Kijelentkezés</button>
        </div>
    )

}

export default Profile