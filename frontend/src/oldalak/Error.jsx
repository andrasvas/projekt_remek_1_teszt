import './Bakelitek.css'
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {useParams} from 'react-router';
import QuestionCat from '../assets/cat_question.png'

const Error = () => {


    return (
        <>
        <div className="all-container row">
            <div className='align-items-center justify-content-center m-auto'>
                <img className='img-responsive m-auto' src="../src/assets/cat_question.png" alt=""/>
            </div>
            <h1 className='main-brand'>{error}</h1>
            <p>Nem találtuk amit keresel, nézz vissza később!</p>
        </div>
        </>
    );
};

export default Error;
