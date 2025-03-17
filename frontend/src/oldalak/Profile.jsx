import './Bakelitek.css'
import React, {useEffect, useState, useCallback, useContext, useId} from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

function Profile(){
    const fetchUserData = async () =>{
        try{
            const res = await axios.get('http://127.0.0.1:5000/vinyls/${userId}')
        }
        catch{}
    }
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/vinyls/${userId}`)
            .then(response => {
                setListing(response.data); 
                setLoading(false);
            })
            .catch(error => {
                setError("Hiba történt adatszerzéskor");
                setLoading(false);
            })
    }, [userId]);

    return(
        <div>
            <h2>Ez a TE profilod!!!</h2>
            <p>kys</p>

            <button style={{borderRadius:'100vw'}}>Kys</button>
        </div>
    )

}

export default Profile