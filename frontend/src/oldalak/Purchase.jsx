import './Bakelitek.css'
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {useParams} from 'react-router';

const Vinyls = () => {


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
                        <p className='m-auto'>A jelszónak rendelkeznie kell legalább 8 karakterrel, egy számmal és egy speciális karakterrel (&, @, #, %)</p>
                        <br />
                        
                        <input type="submit" className='m-4 purchaseBtn main-brand' value="Regisztráció"></input>
                    </form>

                </div>
            </div>
        </>
    );
};

export default Vinyls;
