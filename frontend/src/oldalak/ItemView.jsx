import './Bakelitek.css'
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {useParams} from 'react-router';

function ItemView(){
    const [data, setData] = useState([]);
    const [id, setId] = useState(1);
    useEffect(() => {
        const fetchData = async () =>{
            try{
                const response = await fetch(`http://127.0.0.1:5000/item/${id}`)
                const result = await response.json();
                setId(result);
            }
            catch(error) {console.error("Error adat fetchelésekor: ", error)}
            }
        };

        fetchData();
    },[id]);
    return (
        <>
            <div>
                <h1>Lemezbakelit</h1>
                <article>
                    {filteredData.map(item =>{
                        <div key={item.vin_id}>
                            <h1>{item.vin_name}</h1>
                        </div>
                    })}
                </article>
            </div>
        </>
    );
}
export default ItemView;
