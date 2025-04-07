import './Bakelitek.css'
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {useParams} from 'react-router';

const Purchase = () => {

    return(
        <>
            <form action="">
                <input type="text" placeholder="*Település"/>
                <br />
                <input type="text" placeholder='*Utca, házszám' />
                <br />
                <input type="text" placeholder='Emelet,ajtó' />
                <br />
                <input type="submit" value="Rendelés" />
            </form>
        </>
    )
    
}

export default Purchase
