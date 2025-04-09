import '../css/Bakelitek.css'
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios';
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
        

    }

    return(
        <>  
            <h3>Hogyan szeretnéd megkapni a csomagot?</h3>

            <div>
                <button onClick={() => {setDeliveryMethod("courier") }}>Futár</button>
                <button onClick={() => {setDeliveryMethod("store_pickup")}}>Boltos átvétel</button>
            </div>
            
            {deliveryMethod === "courier" && (
                <div>
                    <p>work in progress</p>
                </div>
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

        </>
    )
    
}

export default Purchase
