import '../css/Bakelitek.css'
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useParams } from "react-router";
import QuestionCat from "../assets/cat_question.png";

const Error = () => {
   return (
      <>
         <div className="all-container row">
            <div className="d-flex align-items-center justify-content-center m-auto">
               <img src="../src/assets/cat_construction.png" className="img-responsive m-auto" alt="" />
            </div>
            <h1 className="main-brand">404</h1>
            <h4>Sajnáljuk, ez az oldal nem létezik</h4>
            <button className='mb-5 purchaseBtn main-brand'>Főoldal</button>
         </div>
      </>
   );
};

export default Error;
