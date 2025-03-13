import './Bakelitek.css'
import axios from 'axios'
import { useState } from 'react'

function SignIn(){
    const [formData, setFormData] = useState({
        logEmail:"",
        logPassword:""
    })

    const HandleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function Login(e){
        e.preventDefault()

        axios.post("http://localhost:5000/login", {
            user_email: formData.logEmail,
            user_password: formData.logPassword
        })
        .then(response => {
            if(response){
                console.log("Sikeres bejelentkezés!")
                alert("Sikeres bejelentkezés!")
                window.localStorage.setItem("isLoggedIn", true)
                window.location.href = '/'
            }
        })
        .catch(error =>{
            if(error.response){
                console.log("Hiba: ", error.response.data)
            }
            else{
                console.log('Hiba: ', error.message)
            }
        })
        
    }


    return(
        <>
            <div>
                <form onSubmit={Login}>
                    <input type="text"
                    required
                    onChange={HandleChange}
                    placeholder='E-mail'
                    name="logEmail"
                    value={formData.logEmail} />

                    <br />
                    
                    <input type="password"
                    required
                    onChange={HandleChange}
                    placeholder='Jelszó'
                    name="logPassword"
                    value={formData.logPassword} />

                    <br />

                    <input type="submit" 
                    value="Bejelentkezés" />
                </form>
            </div>

            <div>
                <a href="/signup">Még nincs fiókod?</a>
            </div>
        </>
    )
}

export default SignIn