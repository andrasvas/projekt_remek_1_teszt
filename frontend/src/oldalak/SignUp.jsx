import './Bakelitek.css'
import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios'

function SignUp() {  
    const [formData, setFormData] = useState({
        regEmail:"",
        regPhoneNum:"",
        regFirstname:"",
        regLastname:"",
        regPassword:""
    })

    // const [regEmail,SetEmail] = useState("")
    // const [regPassword,SetPassword] = useState("")
    // const [regPhoneNum,SetPhoneNum] = useState("")
    // const [regFirstname,SetFirstname] = useState("")
    // const [regLastname,SetLastname] = useState("")
    const [conPassword,SetConPassword] = useState("")

    const HandleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const Register = (e) => {
        e.preventDefault()

        if(formData.regPassword.length < 8){
            alert("A jelszó nem elég hosszú! Minimum 8 karakter legyen!")
        }
        else{
            if(conPassword !== formData.regPassword){
                alert("A jelszavak nem egyeznek meg!")
            }
            else{
                axios.post(`http://localhost:5000/register`, {
                    user_email: formData.regEmail, 
                    user_password: formData.regPassword, 
                    user_firstname: formData.regFirstname, 
                    user_lastname: formData.regLastname, 
                    user_phonenum: formData.regPhoneNum
                })
                .then((response) => console.log(response))

                console.log("Sikeres regisztráció!")
            }
        }

        
    } 

    return (
        <>
            <div>
                <form onSubmit={Register}>
                    <input type="text"
                    required
                    onChange={HandleChange}
                    placeholder='Keresztnév'
                    name="regFirstname"
                    value={formData.regFirstname} />

                    <input type="text"
                    required 
                    onChange={HandleChange} 
                    placeholder='Vezetéknév' 
                    name="regLastname"
                    value={formData.regLastname} />

                    <br />

                    <input type="email"
                    required 
                    onChange={HandleChange}
                    name="regEmail"
                    placeholder='E-mail'
                    value={formData.regEmail} />

                    <input type="tel"
                    required 
                    name="regPhoneNum" 
                    onChange={HandleChange} 
                    placeholder='Telefonszám' 
                    value={formData.regPhoneNum} />

                    <br />
                    <br />

                    <input type="password" 
                    required 
                    onChange={HandleChange} 
                    name="regPassword" 
                    placeholder='Jelszó'
                    value={formData.regPassword} />

                    <input type="password"
                    required
                    onChange={(e) => {SetConPassword(e.target.value)}} 
                    name="confirm_password" 
                    placeholder='Jelszó megerősitése' />

                    <br />
                    <br />

                    <input type="submit" value="Regisztráció"/>
                </form>
            </div>
        </>
    );
}

export default SignUp