import './Bakelitek.css'
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {useParams} from 'react-router';
import {QuestionCat} from '../assets/cat_question.png'

const Error = () => {


    return (
        <>
            <div className='all-container'>

                <h1>Ez az oldal nem létezik: 404</h1>
            </div>
        </>
    );
};

export default Error;
