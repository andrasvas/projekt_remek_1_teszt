import './Bakelitek.css'
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {useParams} from 'react-router';
import 'axios';


function ItemView(){
    const [data, setData] = useState(null)
    const [id, setId] = useState(1);
    const itemId = useParams();

    useEffect(() => {
        const fetchData = async () => {
          try {
                const response = await fetch(`http://127.0.0.1:5000/vinyls`);
                const result = await response.json();
                setId(result);
          } 
          catch (error) { console.error("Error fetching data:", error) }
        };
    
        fetchData();
      },[id]);
    return (
        <>
            <div>
                <h1>Lemezbakelit</h1>
                <article>
                    <div>
                        <pre>{JSON.stringify(id, null, 2)}</pre>
                    </div>
                </article>
            </div>
        </>
    );
}
export default ItemView
