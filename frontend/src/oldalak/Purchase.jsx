import '../css/Bakelitek.css'
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios';
import cat_construction from '../assets/cat_construction.png'
import {useParams} from 'react-router';

const Purchase = () => {
    const [deliveryMethod, setDeliveryMethod] = useState("")

    const [data,setData] = useState({
        full_name:"",
        phone_number:"",
        delivery_method:"",
        zip_code:"",
        street_address:"",
        note:"",
    })

    function HandleChange(e){
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        console.log("Adatok valtoztatasa...")
        console.log(deliveryMethod)
    }

    function OrderItems(e){
        if(deliveryMethod === "store_pickup"){
            e.preventDefault()

            console.log("Rendelés elküldése...")

            const pickupData = {
                full_name: data.full_name,
                phone_number: data.phone_number,
                street_address: "bolt",
                zip_code: "1221",
                note: "boltos rendelés",
                delivery_method: "store_pickup"
            }

            // setData({
            //     ...data,
            //     street_address:"bolt",
            //     zip_code:1221,
            //     note:"boltos rendeles",
            //     delivery_method:"store_pickup"
            // })

            axios.post("http://localhost:5000/order_items",pickupData,
            //     {
            //     full_name: data.full_name,
            //     phone_number: data.phone_number,
            //     delivery_method: data.delivery_method
            //  },
             {
                withCredentials: true,
             })
            .then(response => {
                if(response){
                    alert(response.data.message)
                    window.location.href = "/"
                }
            })
            
            console.log(data)
        }
        
        if(deliveryMethod === "courier"){
            e.preventDefault()

            console.log("Rendelés elküldése...")

            const pickupData = {
                full_name: data.full_name,
                phone_number: data.phone_number,
                street_address: data.street_address,
                zip_code: data.zip_code,
                note: data.note,
                delivery_method: "courier"
            }

            axios.post("http://localhost:5000/order_items", pickupData, {withCredentials: true})
            .then(response => {
                if(response){
                    alert(response.data.message)
                    window.location.href = "/"
                }
            })
        }

    }

    return(
        <>  
        
        <div className='d-flex justify-content-center all-container' id='signup-container'>
                <div className='card p-3 w-75 col justify-content-center align-items-center'>

            <h3 className='main-brand'>Hogyan szeretnéd megkapni a csomagot?</h3>

            <div>
                <button onClick={() => {setDeliveryMethod("courier") }}>Futár</button>
                <button onClick={() => {setDeliveryMethod("store_pickup")}}>Boltos átvétel</button>
            </div>
            
            {deliveryMethod === "courier" && (
                // <div className='d-flex flex-column justify-content-center align-items-center'>
                //     <img className='justify-content-center' src={cat_construction} alt="" />
                //     <h4>Sajnáljuk, nem szállítunk futárszolgálatokkal ebben az időben</h4>
                // </div>

                <form onSubmit={OrderItems}>
                    <input 
                    type="text" 
                    name="full_name"
                    value={data.full_name}
                    onChange={HandleChange} 
                    required 
                    placeholder='Teljes név' 
                    id="" />
                    <input type="text"
                    required 
                    value={data.phone_number} 
                    onChange={HandleChange} 
                    placeholder='Telefonszám' 
                    name="phone_number" 
                    id="" />
                    <br />
                    <input type="text" 
                    value={data.zip_code}
                    placeholder='Irányitószám' 
                    name="zip_code"
                    onChange={HandleChange} 
                    id="" />
                    <input type="text" 
                    name="street_address"
                    placeholder='Utca,Házszám'
                    required
                    value={data.street_address}
                    onChange={HandleChange} 
                    id="" />
                    <br />
                    <input type="text"
                    placeholder='Megjegyzés' 
                    value={data.note}
                    onChange={HandleChange}
                    name="note" 
                    id="" />
                    <br />
                    <input type="submit" value="Rendelés leadása" />
                </form>
            )}

            {deliveryMethod === "store_pickup" && (
                <div>
                    <form onSubmit={OrderItems}>
                        <input 
                        type="text" 
                        name="full_name"
                        value={data.full_name}
                        onChange={HandleChange} 
                        required 
                        placeholder='Teljes név' 
                        id="" />
                        <br />
                        <input type="text"
                        required 
                        value={data.phone_number} 
                        onChange={HandleChange} 
                        placeholder='Telefonszám' 
                        name="phone_number" 
                        id="" />
                        <br />
                        <input 
                        type="submit" 
                        value="Rendelés leadása" />
                    </form>
                </div>
            )}


            {/* <form onSubmit={OrderItems}>
                <input type="text" required name='full_name' value={data.full_name} placeholder='Teljes név' onChange={HandleChange} />
                <input type='number' required name='phone_number' value={data.phone_number} placeholder='Telefonszám' onChange={HandleChange}></input>
                <br />
                <input type="number" required name='zip_code' value={data.zip_code} placeholder='Irányitószám' onChange={HandleChange}/>
                <input type="text" required name="street_address" value={data.street_address} placeholder='Város, utca, házszám' onChange={HandleChange}/>
                <br />
                <input type="text" name="note" value={data.note} placeholder='Megjegyzés a rendeléshez' onChange={HandleChange}/>
                <br />
                <br />
                <input type="submit" value="Megrendelem" />
                </form>
                
                <p>Vagy vedd át üzletünkbe!</p> */}

            </div>
            </div>
        </>
    )
    
}

export default Purchase
