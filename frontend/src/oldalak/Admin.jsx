import '../css/Bakelitek.css'
import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios'
import AdminBakelitek from './AdminBakelitek'

function Admin() {


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
            <div className='d-flex justify-content-center all-container' id='signup-container'>
                <div className='card p-3 w-75 col justify-content-center align-items-center'>
                    <h1 className='main-brand'>Új lemez feltöltése</h1>
                    <form onSubmit={Register}>
                        <input type="number"
                        className='m-1'
                        required
                        onChange={HandleChange}
                        placeholder='Lemezek darabszáma'
                        name="vinylAmount"/>

                        <input type="text"
                        className='m-1 mb-3'
                        required 
                        onChange={HandleChange} 
                        placeholder='Művész' 
                        name="vinylArtist"/>

                        <input type="text"
                        className='m-1'
                        required 
                        onChange={HandleChange}
                        name="vinylColor"
                        placeholder='Lemez színe'/>

                        <input type="text"
                        className='m-1'
                        required 
                        name="vinylName" 
                        onChange={HandleChange} 
                        placeholder='Album neve'/>

                        <input type="number" 
                        className='m-1'
                        required 
                        onChange={HandleChange} 
                        name="vinylPrice" 
                        placeholder='Ár'/>

                        <input type="number"
                        className='m-1'
                        required
                        onChange={HandleChange} 
                        name="vinylInStockSum" 
                        placeholder='Raktár mennyiség' />
                                                
                        <input type="number"
                        className='m-1'
                        required
                        onChange={HandleChange} 
                        name="vinylRpm" 
                        placeholder='RPM (általában 33)' />

                        <input type="number"
                        className='m-1'
                        required
                        onChange={HandleChange} 
                        name="vinylWeight" 
                        placeholder='Súly (általában 180)' />

                        <input type="number"
                        className='m-1'
                        required
                        onChange={HandleChange} 
                        name="vinylSize" 
                        placeholder='Méret (általában 12)' />

                        
                        <input type="number"
                        className='m-1'
                        required
                        onChange={HandleChange} 
                        name="vinylReleaseYear" 
                        placeholder='Megjelenés éve' />

                        <select name="vinylGenre" className='m-1 text-placeholder form-input' style={{ width: '150px', height: '24px'}} required onChange={HandleChange}>
                            <option value="Metalcore">Metalcore</option>
                            <option value="Post-Hardcore">Post-Hardcore</option>
                            <option value="Alternative Rock">Alternative Rock</option>
                            <option value="Pop Punk">Pop Punk</option>
                            <option value="Indie Rock">Indie Rock</option>
                            <option value="Hard Rock">Hard Rock</option>
                            <option value="Electronic Rock">Electronic Rock</option>
                            <option value="Progressive Metal">Progressive Metal</option>
                            <option value="Deathcore">Deathcore</option>
                            <option value="Synthwave">Synthwave</option>
                            <option value="Pop">Pop</option>
                            <option value="Rap">Rap</option>
                            <option value="Hip-Hop">Hip-Hop</option>
                            <option value="R&B">R&B</option>
                            <option value="Electronic">Electronic</option>
                            <option value="Trash Metal">Trash Metal</option>
                        </select>

                        <select name="vinylRecordLabel" className='m-1 form-input' style={{ width: '175px', height: '24px' }} required onChange={HandleChange}>
                            <option value="Roadrunner Records">Roadrunner Records</option>
                            <option value="Epitaph Records">Epitaph Records</option>
                            <option value="Fueled by Ramen">Fueled by Ramen</option>
                            <option value="Hopeless Records">Hopeless Records</option>
                            <option value="Rise Records">Rise Records</option>
                            <option value="Fearless Records">Fearless Records</option>
                            <option value="Spinefarm Records">Spinefarm Records</option>
                            <option value="Sumerian Records">Sumerian Records</option>
                            <option value="Nuclear Blast">Nuclear Blast</option>
                            <option value="Pure Noise Records">Pure Noise Records</option>
                            <option value="Republic Records">Republic Records</option>
                            <option value="Capitol Records">Capitol Records</option>
                            <option value="Island Records">Island Records</option>
                            <option value="Def Jam Recordings">Def Jam Recordings</option>
                            <option value="Atlantic Records">Atlantic Records</option>
                            <option value="Polydor">Polydor</option>
                            <option value="Octone Records">Octone Records</option>
                        </select>

                        <br />

                        <textarea style={{width: "50%"}} name="vinylDescription" className='mt-3' required onChange={HandleChange} placeholder='Lemez leírása' />
                        <br />
                        <input type="submit" className='m-4 purchaseBtn main-brand' value="Új lemez feltöltése"></input>
                    
                    <div className="card-dragndrop">
                        <div className="top">
                            <p>Kép beszúrása</p>
                        </div>
                        <div className="drag-area">
                            <span className="select">
                                Ide húzz egy képet
                            </span>
                            Húzz ide egy képet vagy {" "}
                            <span className="select">
                                Böngéssz
                            </span>
                            <input type="file" name='file' className="file" />
                        </div>
                        <div className="container">
                            <div className="image">
                                <span className="delete">&times;</span>
                            </div>
                            <img src="" alt="" />
                        </div>
                    </div>
                    
                    </form>
                    <AdminBakelitek/>
                </div>
            </div>

            <div>
                <a href="/signin">Van már fiókod?</a>
                <br />
                <p></p>
            </div>
        </>
    );
}

export default Admin