import './Bakelitek.css'
import { useEffect, useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {useParams} from "react-router-dom"
import axios from "axios";
import {Link} from 'react-router-dom'
// import {MoreLikeThis} from './MoreLikeThis.jsx'

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
        <div className="row">

            <div className='col-md-3'>
                <div className='row p-0'>
                <div key={listing.vinyl_id} className='card m-0'>

                    <div className='main-brand'>
                        <img className='card-img-top border rounded border-black' src={`../src/album_covers/${listing.image_path}`} alt=""/>
                        <hr />
                        <h5>{listing.vinyl_artist}<br />-<br />{listing.vinyl_name}</h5>
                        <p className='p-2'>{listing.genre_name}</p>
                    </div>

                    <div className='row'>
                        <h4>Ár: ${listing.price}</h4>
                        <Link className='purchaseBtn main-brand' to={`/item/${listing.vinyl_id}`}>Kosárba vele</Link>
                    </div>
                </div>
                </div>
            </div>

            <div className='col-md-9' style={{textAlign: 'left'}}>
                <h5>{listing.label_id}</h5>
                <p className='default-text'>{listing.vinyl_description}</p>
                <p>{listing.genre_name}</p>
                
                <p className='m-0'>Lemez színe: {listing.vinyl_color}</p>
                <p className='m-0'>Lemez mérete: {listing.vinyl_size} ujj</p>
                <p className='m-0'>Kiadási év: {listing.vinyl_release}</p>
                {/* <MoreLikeThis /> */}
            </div>
        </div>
    )
}
export default ItemView
