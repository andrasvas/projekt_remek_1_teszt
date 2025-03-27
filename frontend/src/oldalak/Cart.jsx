import React from "react";
import './Bakelitek.css'
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function Cart(){
    const userToken = window.localStorage.getItem("userToken")
    const [data,setData] = useState([])

    const ClearCart = () => {
        const confirmClear = confirm("Biztosan törölni szeretnéd a kosarad teljes tartalmát?")

        if(confirmClear === true){
            axios.delete("http://localhost:5000/clearcart",{headers:{Authorization: `Bearer ${userToken}`}})
            .then(response => {
                if(response){
                    console.log(response)
                    alert(response.data.message)
                    window.location.href = "/cart"
                }
            })
            .catch(err => {
                if(err)
                console.log(err)
            })
        }
        else{
            console.log("Kosár törlés megszakitva")
        } 
    }

    const GetTotalPrice = (list) => {
        return list.reduce((sum, item) => sum + item.price, 0);
    }

    const OrderItems = () => {

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

    const DeleteItem = (vinylId) => {
        axios.delete(`http://localhost:5000/delete_cart_item`,{
        headers: {
            Authorization: `Bearer ${userToken}`
        },
        data: {
            vinyl_id: vinylId
        }})
        .then(response => {
            if(response){
                console.log(response)
                alert(response.data.message)
                window.location.href = "/cart"
            }
        })
        .catch(err => {
            if(err){
                console.log(err)
            }
        })
    }

    return(
        <div className='all-container'>
            {data.length > 0 ? (
                data.map((item) => (
                    <div id={item.vinyl_id} key={item.vinyl_id}>
                        <h4>{item.vinyl_name}</h4>
                        <p>Mennyiség: {item.qty}</p>
                        <p>Ár: {item.price}$</p>
                        <button onClick={() => DeleteItem(item.vinyl_id)}>Törlés</button>
                    </div>
                ))
                
            ):(
                <p>A kosár üres.</p>
            )}
            
            <div>
                {data.length > 0 ? (
                    <div>
                        <p>Teljes ár: {GetTotalPrice(data)}$</p>
                        <button onClick={ClearCart}>Kosár törlése</button>
                        <button>Megrendelés</button>
                    </div>
                ):(
                    null
                )}
            </div>
        </div>
    )
}

export default Cart