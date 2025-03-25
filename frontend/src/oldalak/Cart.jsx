import React from "react";
import './Bakelitek.css'
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function Cart(){
    const userToken = window.localStorage.getItem("userToken")
    const [data,setData] = useState([])

    const ClearCart = () => {
        
    }

    useEffect(() => {
        if(userToken){
            axios.get("http://localhost:5000/cart",{headers:{
                Authorization:`Bearer ${userToken}`
            }})
            .then(response => {
                if(response){
                    if(response.data.length == 0){
                        console.log("A kosár üres")
                        setData(response.data)
                    }
                    else{
                        console.log(response.data)
                        setData(response.data)
                    }
                }
            })
        }
        else{
            alert("Jelentkezz be!")
        }
        
    },[userToken])

    return(
        <div className='all-container'>
            {data.length > 0 ? (
                data.map((item) => (
                    <div key={item.vinyl_id} id={item.vinyl_id}>
                        <h4>{item.vinyl_name}</h4>
                        <p>Ár: {item.price}$</p>
                        <p>Mennyiség: {item.qty}</p>
                    </div>
                ))
            ):(
                <p>A kosár üres.</p>
            )}
            
            <div>
                {data.length > 0 ? (
                    <button>Kosár törlése</button>
                ):(
                    null
                )}
            </div>
        </div>
    )
}

export default Cart