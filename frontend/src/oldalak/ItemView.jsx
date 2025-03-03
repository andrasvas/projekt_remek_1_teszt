import './Bakelitek.css'
import { useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {useParams} from "react-router-dom"
import axios from "axios";
import {Link} from 'react-router-dom'

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
        <div style={{backgroundColor: 'grey'}}>
            <div className="row">
                <div style={{backgroundColor: 'darkgrey'}} className='col-md-4 h-300 flex-column'>
                    <img className='card-img-top' src="https://www.santarosaforward.com/img/managed/Image/111/file.jpg" alt="placeholder img" />
                    <h2>{listing.artist} - {listing.vin_name}</h2>
                </div>
                    <div className='col-md-4 h-300 flex-column' style={{textAlign: 'left'}}>
                        <h4>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, assumenda consequuntur est quibusdam ab saepe culpa aperiam ipsum officiis voluptas nam excepturi itaque incidunt numquam eveniet distinctio! Maiores rerum sunt suscipit itaque, molestiae aspernatur consequatur? Quo ad hic aliquam minus.</h4>
                        <h6>{listing.artist}</h6>
                        <p>{listing.genre}</p>
                        <p>
                            Lemez színe: {listing.color} <br />
                            {listing.runtime} perc
                        </p>
                        <p></p>
                        <p></p>
                    </div>
                <div className="col-md-4 bg-secondary">
                    <div className="container-fluid h-100 flex-column">
                        <div className="container-fluid col-md-6 mw-100 bg-danger">
                            <Link>Kosárba vele!</Link>
                        </div>
                        <div className="container-fluid col-md-6 mw-100 bg-success">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ItemView
