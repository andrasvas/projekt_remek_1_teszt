import './Bakelitek.css'
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {useParams} from 'react-router';

function ItemView(){
    const [data, setData] = useState(null);
    const [id, setId] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
          try {
                const response = await fetch(`http://127.0.0.1:5000/vinyls/${id}`);
                const result = await response.json();
                setData(result);
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
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </div>
                </article>
            </div>
        </>
    );
}
export default ItemView
