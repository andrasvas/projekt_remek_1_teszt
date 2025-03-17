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

    const [userToken, setUserToken] = useState("")

    console.log(userToken)

    useEffect(() => {
        const token = window.localStorage.getItem("userToken")
        setUserToken(token)
    })

    useEffect(() =>{
        if(userToken){
            axios.get("http://127.0.0.1:5000/profile",{
            token: userToken
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
    })

    return(
        <div>
            <h2>Ez a TE profilod!!!</h2>
            <p>kys</p>

            <button style={{borderRadius:'100vw'}}>Kys</button>
        </div>
    )

}

export default Profile