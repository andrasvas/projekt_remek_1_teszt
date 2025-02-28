import './Bakelitek.css'
import { useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {useParams} from "react-router-dom"
import axios from "axios";

const ItemView = () => {
    const {itemId} = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/vinyls/${itemId}`)
            .then(response => {
                setListing(response.data); 
                setLoading(false);
            })
            .catch(error => {
                setError("Hiba történt adatszerzéskor");
                setLoading(false);
            })
    }, [itemId]);

    if (loading) return <p>Kérem várjon...</p>
    if (error) return <p style={{color : "red"}}>{error}</p>
    if (!listing) return <p>Nem találtuk amit keresel, nézz vissza később!</p>

    return (
        <div>
            <h1>{listing.vin_name}</h1>

            <div className='container-fluid'>
                <article className='row justify-content-center'>

                        <div key={listing.vin_id} className='row col-lg-8'>
                            <div className=''>
                                <img className='card-img-top' src="https://www.santarosaforward.com/img/managed/Image/111/file.jpg" alt="placeholder img" />
                                <h4>{listing.vin_name}</h4>
                                <h6>{listing.artist}</h6>
                                <p>{listing.genre}</p>
                            </div>
                        </div>
                </article>
            </div>

        </div>
    )
    
}
export default ItemView
