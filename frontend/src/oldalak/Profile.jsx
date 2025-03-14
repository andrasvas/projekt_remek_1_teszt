import './Bakelitek.css'
import React, {useEffect, useState} from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

function Profile(){
    const [data, setData] = useState();
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/vinyls")
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("Hiba:", error);
            });
    }, []);

    return(
        <div>
            <h2>Ez a TE profilod!!!</h2>
            <p>kys</p>

            <button style={{borderRadius:'100vw'}}>Kys</button>
        </div>
    )

}

export default Profile