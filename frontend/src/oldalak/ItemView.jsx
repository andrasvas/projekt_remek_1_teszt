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
        axios.get(`http://localhost:3001/vinyls/${itemId}`)
        .then(response => setData(response.data))
        .catch(error => console.error("Hiba történt a szobák lekérésekor:", error));
        }, [itemId]);
    
        fetchData();
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
