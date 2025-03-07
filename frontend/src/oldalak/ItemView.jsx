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
        <div className='w-100'>
            <div className="row w-100">

                <div className='col-md-4 row bg-secondary'>
                    <div className='col-2 row'>
                        <img className='img-thumbnail' src="https://th.bing.com/th/id/OIP.qACxVYcdDvLQy23Kl3pqOQHaEK?rs=1&pid=ImgDetMain" alt="" />
                        <img className='img-thumbnail' src="https://th.bing.com/th/id/OIP.qACxVYcdDvLQy23Kl3pqOQHaEK?rs=1&pid=ImgDetMain" alt="" />
                        <img className='img-thumbnail' src="https://th.bing.com/th/id/OIP.qACxVYcdDvLQy23Kl3pqOQHaEK?rs=1&pid=ImgDetMain" alt="" />
                        <img className='img-thumbnail' src="https://th.bing.com/th/id/OIP.qACxVYcdDvLQy23Kl3pqOQHaEK?rs=1&pid=ImgDetMain" alt="" />
                        <img className='img-thumbnail' src="https://th.bing.com/th/id/OIP.qACxVYcdDvLQy23Kl3pqOQHaEK?rs=1&pid=ImgDetMain" alt="" />
                    </div>
                    <div className='col'>
                        <img className='card-img-top img-thumbnail rounded' src={`../src/album_covers/${listing.image_path}`} alt="" />
                        <h2>{listing.vinyl_artist} - {listing.vinyl_name}</h2>
                    </div>
                </div>

                <div className='col-md-4 bg-success' style={{textAlign: 'left'}}>
                    <h4>{listing.vinyl_description}</h4>
                    <h6>{listing.vinyl_artist}</h6>
                    
                    {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta totam voluptatum minus suscipit soluta ipsum vero ab, architecto consequuntur, est ex ratione numquam temporibus harum facilis distinctio consectetur esse explicabo, nemo eveniet nostrum? Quas enim quos tenetur, praesentium temporibus quidem.</p> */}

                    <p>{listing.genre_name}</p>
                    
                    <p>Lemez színe: {listing.vinyl_color}</p>
                    <p>Lemez mérete: {listing.vinyl_size} ujj</p>
                    <p>Kiadási év: {listing.vinyl_release}</p>
                </div>

                <div className="col-md-2 bg-primary">
                    <div className="container-fluid col-md-6 mw-100 bg-danger">
                        <Link>Kosárba vele!</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ItemView
