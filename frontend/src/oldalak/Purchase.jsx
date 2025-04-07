import '../css/Bakelitek.css'
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {useParams} from 'react-router';

const Purchase = () => {

    const [data,setData] = useState({
        full_name:"",
        phone_number:"",
        type:"",
        city:"",
        zip_code:"",
        street_address:"",
        note:""
    })

    function HandleChange(e){
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        console.log("Adatok valtoztatasa...")
    }

    function OrderItems(e){
        e.preventDefault()

        console.log("Rendelés elküldése...")


    }

    return(
        <>
            <form onSubmit={OrderItems}>
                <input type="text" required name='full_name' value={data.full_name} placeholder='Teljes név' onChange={HandleChange} />
                <input type='number' required name='phone_number' value={data.phone_number} placeholder='Telefonszám' onChange={HandleChange}></input>
                <br />
                <input type="text" required name="city" value={data.city} placeholder='Város' onChange={HandleChange}/>
                <input type="number" required name='zip_code' value={data.zip_code} placeholder='Irányitószám' onChange={HandleChange}/>
                <input type="text" required name="street_address" value={data.street_address} placeholder='Utca, házszám' onChange={HandleChange}/>
                <br />
                <input type="text" name="note" value={data.note} placeholder='Megjegyzés a rendeléshez' onChange={HandleChange}/>
                <br />
                <p>Számlázási adatok:</p>
                <input defaultChecked type="checkbox" name="" id="" />
                <br />
                <input type="submit" value="Megrendelem" />
            </form> 
        </>
    )
    
}

export default Purchase
