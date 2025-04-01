import './Bakelitek.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios'
import {useState} from 'react'

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
        }, {
            withCredentials: true
        })
        .then(response => {
            if(response){
                console.log("Sikeres bejelentkezés!")
                console.log(document.cookie)
                alert("Sikeres bejelentkezés!")
                window.location.href = '/'
            }
        })
        .catch(error =>{
            if(error.response){
                console.log("Hiba: ", error.response.data)
                alert(error.response.data.error)
            }
            else{
                console.log('Hiba: ', error.message)
                alert(error.response.data.error)
            }
        })
        
    }


    return(
        <>
        <div className='d-flex justify-content-center all-container'>
            <div className='card p-5'>
                <form onSubmit={Login}>
                    <input type="email"
                    className='m-1 w-100'
                    required
                    onChange={HandleChange}
                    placeholder='E-mail'
                    name="logEmail"
                    value={formData.logEmail} />

                    <br />
                    
                    <input type="password"
                    className='m-1 w-100'
                    required
                    onChange={HandleChange}
                    placeholder='Jelszó'
                    name="logPassword"
                    value={formData.logPassword} />

                    <br />

                    <input type="submit" 
                    className='m-1 mt-4 purchaseBtn main-brand w-100'
                    value="Bejelentkezem" />
                </form>
            </div>
        </div>

            <div>
                <a href="/signup">Még nincs fiókod?</a>
            </div>
        </>
    )
}

export default SignIn