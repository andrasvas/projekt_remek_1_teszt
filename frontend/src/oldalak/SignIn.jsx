import './Bakelitek.css'
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

    const Login = () => {

    }


    return(
        <>
            <div>
                <form action={Login}>
                    <input type="text"
                    required
                    onChange={HandleChange}
                    placeholder='E-mail'
                    name="regFirstname"
                    value={formData.logEmail} />

                    
                </form>
            </div>

            <div>
                <a href="/signup">Még nincs fiókod?</a>
            </div>
        </>
    )
}

export default SignIn