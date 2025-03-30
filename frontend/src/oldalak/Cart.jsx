import React from "react";
import './Bakelitek.css'
import './Cart.css'
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {FaPlus, FaMinus} from "react-icons/fa"

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
                    window.location.href = "/"
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
        return list.reduce((sum, item) => sum + (item.price * item.qty), 0)
    }    

    const ChangeQuantity = (e, vinylId) => {
        const newQty = parseInt(e.target.value, 10);
        
        if (newQty < 1) return; // Ne engedjünk 0 vagy negatív értéket
    
        const updatedData = data.map(item => 
            item.vinyl_id === vinylId ? { ...item, qty: newQty } : item
        );
    
        setData(updatedData);
    
        // Küldjük el a szervernek a frissített mennyiséget
        axios.put("http://localhost:5000/update_cart", {
            vinyl_id: vinylId,
            qty: newQty
        }, { headers: { Authorization: `Bearer ${userToken}` }})
        .then(response => {
            console.log(response.data.message);
        })
        .catch(err => {
            console.error(err);
        });
    };

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
                        console.log(data)
                    }
                    else{
                        console.log(response.data)
                        setData(response.data)
                    }
                }
            })
        }
        else{
            window.location.href = "/signin"
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
                    <div key={item.vinyl_id} className="card m-3 row">
                        <div>
                            
                        </div>
                            <img className="cart_img border rounded border-black" src={`./src/album_covers/${item.image_path}`} alt="" />
                        <div>
                            <h4>{item.vinyl_name}</h4>
                            <p>Ár: {item.price}$</p>
                            <button onClick={() => DeleteItem(item.vinyl_id)}>Törlés</button>
                        </div>
                        <div className="mx-5">
                            <input 
                            type="number" 
                            min="1"
                            onChange={(e) => ChangeQuantity(e, item.vinyl_id)} 
                            value={item.qty} 
                            name={item.vinyl_id}
                            />
                            {/* <button><FaPlus/></button>
                            <p>Mennyiség: {item.qty}</p>
                            <button><FaMinus/></button> */}
                        </div>
                    </div>
                ))
                
            ):(
                <div className="flex flex-column justify-content-center align-items-center">
                    <div className="flex flex-column justify-content-center align-items-center w-50" style={{height: "45vh"}}>
                        <img className="sad-cat" src="./src/assets/sad_cat_transparent.png" alt="" style={{width: "200px"}}/>
                        <p>A kosár üres.</p>                        
                    </div>
                </div>
            )}
            
            <div>
                {data.length > 0 ? (
                    <div>
                        <p>Teljes ár: {GetTotalPrice(data)}$</p>
                        <button className='purchaseBtn main-brand m-3' onClick={ClearCart}>Kosár törlése</button>
                        <button className='purchaseBtn main-brand m-3'>Megrendelés</button>
                    </div>
                ):(
                    null
                )}
            </div>
        </div>
    )
}

export default Cart