import './Bakelitek.css'
import { useEffect, useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {useParams} from "react-router-dom"
import axios from "axios"
import {Link} from 'react-router-dom'
import MoreLikeThis from './MoreLikeThis.jsx'
import {Spotify} from 'react-spotify-embed'

const ItemView = () => {
    const {itemId} = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const userToken = window.localStorage.getItem("userToken")

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/vinyls/${itemId}`)
            .then(response => {
                setListing(response.data); 
                setLoading(false);
            })
            .catch(error => {
                setError(error.response.data.error);
                setLoading(false);
            })
    }, [itemId]);

    const AddToCart = () =>{
        try{
            axios.post("http://localhost:5000/addtocart", {
                vinyl_id: listing.vinyl_id
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then(response => {
                if(response){
                    console.log(response)
                }
            })
            .catch(error => {
                console.error(error)
            })
        }
        catch(err){
            console.log(err)
        }
    }

    if (loading) return <p>Kérem várjon...</p>
    if (error) return <p style={{color : "red"}}>{error}</p>
    if (!listing) return <p>Nem találtuk amit keresel, nézz vissza később!</p>

    return (
        
        <div className="row all-container">

            <div className='col-md-4 col-lg-3 '>
                <div className='row p-0'>
                <div key={listing.vinyl_id} className='card m-0 p-md-3'>

                    <div className='main-brand'>
                        <img className='card-img-top border rounded border-black' src={`../src/album_covers/${listing.image_path}`} alt=""/>
                        <hr />
                        <h5>{listing.vinyl_artist}<br />-<br />{listing.vinyl_name}</h5>
                        <p className='p-2'>{listing.genre_name}</p>
                    </div>

                    <div className='row'>
                        <h4>Ár: ${listing.price}</h4>
                        <button className='purchaseBtn main-brand' onClick={AddToCart}>Kosárba vele!</button>
                    </div>
                </div>
                </div>
            </div>

            <div className='col-md-8 col-lg-9' style={{textAlign: 'left'}}>
                <div className='card m-0 p-md-3 h-100'>

                    <p className='default-text h5'>{listing.vinyl_description}</p>
                    <Link target='_blank' className='h4 mt-3' to={listing.label_link}>{listing.label_name}</Link>
                    
                    <p className='h4'>{listing.genre_name}</p>
                    <p className='m-0 mt-3 h4'>Lemez színe: {listing.vinyl_color}</p>
                    <p className='m-0 h4'>Lemez mérete: {listing.vinyl_size} ujj</p>
                    <p className='m-0 mb-2 h4'>Kiadási év: {listing.vinyl_release}</p>
                    
                    <Spotify height={"152px"} wide link={`${listing.spotify_link}`} />


                </div>
            </div>
                    <MoreLikeThis to={`/vinyls/${listing.genre_id}`}/>
        </div>
    )
}
export default ItemView
