import './Bakelitek.css'
import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios'

function SignUp() {
    function CheckPhoneNumber(phonenum){
        var regularExpression = /[a-z]/i

        if(phonenum.length > 15 || phonenum.length < 11) return alert("A telefon szám nem elég hosszú!")
        if(regularExpression.test(phonenum) === true) return alert("A telefonszám nem tartalmazhat betűt!")

        return true
    }

    function CheckPassword(password,confirmPassword){
        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*?])[a-zA-Z0-9!@#$%^&*?]{6,16}$/;
    
        if(password.length < 8) return alert("A jelszó nem elég hosszú, minimum 8 karakter kell hogy legyen!")
        if(password !== confirmPassword) return alert("A jelszavak nem egyeznek!")
        if(regularExpression.test(password) == false) return alert("Nincs benne minimum egy szám vagy egy speciális karakter!")
        
        return true
    }

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
                    alert(response.data)
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
            <div className='d-flex justify-content-center all-container'>
                <div className='card p-3 w-50 '>
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

                        <input type="password" 
                        className='m-1'
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

                        <input type="submit" className='m-4 purchaseBtn main-brand' value="Regisztráció"></input>
                    </form>

                </div>
            </div>

            <div>
                <a href="/signin">Van már fiókod?</a>
            </div>
        </>
    );
}

export default SignUp