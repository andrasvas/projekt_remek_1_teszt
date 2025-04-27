import '../css/Bakelitek.css'
import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios'
import AdminBakelitek from './AdminBakelitek'

function Admin() {
    const [formData, setFormData] = useState({
        vinylAmount: "",
        vinylArtist: "",
        vinylColor: "",
        vinylName: "",
        vinylPrice: "",
        vinylInStockSum: "",
        vinylRpm: "",
        vinylWeight: "",
        vinylSize: "",
        vinylReleaseYear: "",
        vinylGenre: 0,
        vinylRecordLabel: 0,
        vinylDescription: "",
        vinylImagePath: "",
        spotifyLink: "",
    })

    // const [regEmail,SetEmail] = useState("")
    // const [regPassword,SetPassword] = useState("")
    // const [regPhoneNum,SetPhoneNum] = useState("")
    // const [regFirstname,SetFirstname] = useState("")
    // const [regLastname,SetLastname] = useState("")
    const [conPassword,SetConPassword] = useState("")

    const HandleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: (name === "vinylGenre" || name === "vinylRecordLabel") ? Number(value) : value
        });
    
        console.log(formData);
    }

    const UploadVinyl = (e) => {
        e.preventDefault()
        console.log("Új bakelit létrehozása...")

        axios.post("http://localhost:5000/upload_vinyl", {
            vinylAmount: formData.vinylAmount,
            vinylArtist: formData.vinylArtist,
            vinylColor: formData.vinylColor,
            vinylName: formData.vinylName,
            vinylPrice: formData.vinylPrice,
            vinylInStockSum: formData.vinylInStockSum,
            vinylRpm: formData.vinylRpm,
            vinylWeight: formData.vinylWeight,
            vinylSize: formData.vinylSize,
            vinylReleaseYear: formData.vinylReleaseYear,
            vinylGenre: formData.vinylGenre,
            vinylRecordLabel: formData.vinylRecordLabel,
            vinylDescription: formData.vinylDescription,
            spotifyLink: formData.spotifyLink,
            vinylImagePath: formData.vinylImagePath
        },
        {
            withCredentials: true
        })
        .then(response => {
            if(response){
                console.log(response)
                alert(response.data.message)
            }
        })
    }

    // const Register = (e) => {
    //     e.preventDefault()

    //     if(CheckPassword(formData.regPassword,conPassword) === true && CheckPhoneNumber(formData.regPhoneNum) === true){
    //         axios.post(`http://localhost:5000/register`, {
    //             user_email: formData.regEmail, 
    //             user_password: formData.regPassword, 
    //             user_firstname: formData.regFirstname, 
    //             user_lastname: formData.regLastname, 
    //             user_phonenum: formData.regPhoneNum
    //         })
    //         .then((response) => {
    //             if(response){
    //                 alert(response.data.message)
    //                 window.location.href = '/signin'  
    //             }
    //         })
    //         .catch((error) => {
    //             if(error){
    //                 console.log(error)
    //                 alert(error.response.data.error)
    //             }
    //         })
    //     }
    // } 

    return (
        <>
            <div className='d-flex justify-content-center all-container' id='signup-container'>
                <div className='card p-3 w-75 col justify-content-center align-items-center'>
                    <h1 className='main-brand'>Új lemez feltöltése</h1>
                    <form onSubmit={UploadVinyl}>
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
                        onChange={HandleChange}
                        name="spotifyLink"
                        placeholder='Spotify link'/>

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
                            <option value="1">Metalcore</option>
                            <option value="2">Post-Hardcore</option>
                            <option value="3">Alternative Rock</option>
                            <option value="4">Pop Punk</option>
                            <option value="5">Indie Rock</option>
                            <option value="6">Hard Rock</option>
                            <option value="7">Electronic Rock</option>
                            <option value="8">Progressive Metal</option>
                            <option value="9">Deathcore</option>
                            <option value="10">Synthwave</option>
                            <option value="11">Pop</option>
                            <option value="12">Rap</option>
                            <option value="13">Hip-Hop</option>
                            <option value="14">R&B</option>
                            <option value="15">Electronic</option>
                            <option value="16">Thrash Metal</option>
                        </select>

                        <select name="vinylRecordLabel" className='m-1 form-input' style={{ width: '175px', height: '24px' }} required onChange={HandleChange}>
                            <option value="1">Roadrunner Records</option>
                            <option value="2">Epitaph Records</option>
                            <option value="3">Fueled by Ramen</option>
                            <option value="4">Hopeless Records</option>
                            <option value="5">Rise Records</option>
                            <option value="6">Fearless Records</option>
                            <option value="7">Spinefarm Records</option>
                            <option value="8">Sumerian Records</option>
                            <option value="9">Nuclear Blast</option>
                            <option value="10">Pure Noise Records</option>
                            <option value="11">Republic Records</option>
                            <option value="12">Capitol Records</option>
                            <option value="13">Island Records</option>
                            <option value="14">Def Jam Recordings</option>
                            <option value="15">Atlantic Records</option>
                            <option value="16">Polydor</option>
                            <option value="17">Octone Records</option>
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
                    <div className='mt-5'>
                        <AdminBakelitek/>
                    </div>
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