import './Bakelitek.css'
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {useParams} from 'react-router';

const Purchase = () => {

    const [formData, setFormData] = useState({
        regEmail:"",
        regPhoneNum:"",
        regFirstname:"",
        regLastname:"",
        regPassword:""
    })

    const HandleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const Register = (e) => {
        e.preventDefault()

        if(CheckPassword(formData.regPassword,conPassword) === true && CheckPhoneNumber(formData.regPhoneNum) === true){
            axios.post(`http://localhost:5000/register`, {
                user_email: formData.regEmail, 
                user_password: formData.regPassword, 
                user_firstname: formData.regFirstname, 
                user_lastname: formData.regLastname, 
                user_phonenum: formData.regPhoneNum
            })
            .then((response) => {
                if(response){
                    alert(response.data.message)
                    window.location.href = '/signin'  
                }
            })
            .catch((error) => {
                if(error){
                    console.log(error)
                    alert(error.response.data.error)
                }
            })
        }
    } 
    

    return (
        <>
            <div className='all-container'>
                <div className='card p-3 w-75 col'>
                    <form onSubmit={Register}>
                        <input type="text"
                        className='m-1'
                        required
                        onChange={HandleChange}
                        placeholder='Keresztnév'
                        name="regFirstname"
                        value={formData.regFirstname} />

                        <input type="text"
                        className='m-1 mb-3'
                        required 
                        onChange={HandleChange} 
                        placeholder='Vezetéknév' 
                        name="regLastname"
                        value={formData.regLastname} />

                        <br />

                        <input type="email"
                        className='m-1'
                        required 
                        onChange={HandleChange}
                        name="regEmail"
                        placeholder='E-mail'
                        value={formData.regEmail} />

                        <input type="tel"
                        className='m-1'
                        required 
                        name="regPhoneNum" 
                        onChange={HandleChange} 
                        placeholder='Telefonszám' 
                        value={formData.regPhoneNum} />

                        <br />
                        <br />
                        <input type="submit" className='m-4 purchaseBtn main-brand' value="Regisztráció"></input>
                    </form>

                </div>
            </div>
        </>
    );
};

export default Purchase;
