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
        <div className="row">

            <div className='col-md-4 bg-secondary'>
                <div className='row'>
                    <div className='col'>
                        <img className='card-img-top img-thumbnail rounded' src={`../src/album_covers/${listing.image_path}`} alt="" />
                        <h2 className=''>{listing.vinyl_artist} - {listing.vinyl_name}</h2>
                    </div>
                </div>
            </div>

            <div className='col-md-4 bg-success' style={{textAlign: 'left'}}>
                <h3>{listing.vinyl_description}</h3>
                
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima dicta dolorem odio, aperiam similique aut, eos ducimus quisquam porro ea debitis quidem. Hic sunt, quia quas neque nulla pariatur ab! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta totam voluptatum minus suscipit soluta ipsum vero ab, architecto consequuntur, est ex ratione numquam temporibus harum facilis distinctio consectetur esse explicabo, nemo eveniet nostrum? Quas enim quos tenetur, praesentium temporibus quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, delectus quo totam repellendus ipsum dolor? Natus, cumque earum. Eos ducimus molestiae saepe veritatis dolorem! Perferendis facere, soluta earum molestiae beatae at consectetur sapiente! Illo qui, enim beatae voluptate earum voluptatem aspernatur voluptatibus quam hic aliquam. Aperiam natus qui odio. Ipsa maxime aliquam optio, earum possimus, sint minima laborum eum ipsam amet impedit, perferendis nulla eaque. Odio deserunt eum at reiciendis, delectus adipisci? Obcaecati ad rem deserunt est asperiores velit cum sunt aperiam. Placeat saepe voluptatum obcaecati possimus, consectetur aspernatur odit. Ullam ipsum numquam quidem maxime culpa eum sed! Temporibus, ut.</p> */}

                <p>{listing.genre_name}</p>
                
                <p className='m-0'>Lemez színe: {listing.vinyl_color}</p>
                <p className='m-0'>Lemez mérete: {listing.vinyl_size} ujj</p>
                <p className='m-0'>Kiadási év: {listing.vinyl_release}</p>
            </div>

            <div className="col-md-4 bg-primary">
                <div className="container-fluid col-md-6 mw-100 bg-danger">
                    <Link>Kosárba vele!</Link>
                </div>
            </div>
        </div>
    )
}
export default ItemView
