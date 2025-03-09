import './Bakelitek.css'
import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios'

function SignUp() {  
    const [regEmail,SetEmail] = useState("")
    const [regPassword,SetPassword] = useState("")
    const [regPhoneNum,SetPhoneNum] = useState("")
    const [regFirstname,SetFirstname] = useState("")
    const [regLastname,SetLastname] = useState("")

    const Register = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:5000/register`, {user_email: regEmail, user_password: regPassword, user_firstname:regFirstname, user_lastname:regLastname, user_phonenum: regPhoneNum})
        .then((response) => console.log(response))
    } 

    return (
        <>
            <div>
                <form onSubmit={Register}>
                    <input type="text" onChange={(e) => {SetFirstname(e.target.value)}} placeholder='Keresztnév' name="fname" />
                    <input type="text" onChange={(e) => {SetLastname(e.target.value)}} placeholder='Vezetéknév' name="lname" />
                    <br />
                    <input type="email" onChange={(e) => {SetEmail(e.target.value)}} name="email" placeholder='E-mail' />
                    <input type="tel" name="phonenum" onChange={(e) => {SetPhoneNum(e.target.value)}} placeholder='Telefonszám' id="" />
                    <br />
                    <br />
                    <input type="password" onChange={(e) => {SetPassword(e.target.value)}} name="password" placeholder='Jelszó' />
                    <br />
                    <br />
                    <input type="submit" value="Regisztráció"/>
                </form>
            </div>
        </>
    );
}

export default SignUp