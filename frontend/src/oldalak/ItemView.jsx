import './Bakelitek.css'
import { useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {useParams} from "react-router-dom"
import axios from "axios";

const ItemView = () => {
    const {itemId} = useParams();
    const [listing, setListing] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/vinyls/${itemId}`)
            .then(response => setListing(response.data))
            .catch(error => console.error("Hiba:", error));
    }, [itemId]);


    return (
        <>
            <div>
                <h1>Szziiiaaaa</h1>
                <pre>{JSON.stringify(listing, null, 2)}</pre>
            </div>
        </>
    );
}
export default ItemView
