import './Bakelitek.css'
import './MoreLikeThis.css'
import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

const MoreLikeThis = () => {
    const {genre_id} = useParams();
    const [vinyl, setVinyl] = useState([]);
    const [term, setTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/vinyls/${genre_id}`)
            .then(response => {
                setVinyl(response.data); 
                setLoading(false);
            })
            .catch(error => {
                setError("Hiba történt adatszerzéskor");
                setLoading(false);
            })
    }, [genre_id]);

    if (loading) return <p>Kérem várjon...</p>
    if (error) return <p style={{color : "red"}}>{error}</p>
    if (!vinyl) return <hr className='m-5'/>


    return (
        <div>
            <div className='horizontal-scroll'>

                <div className='border'>

                    <div key={vinyl.vinyl_id}>


                        <a href={`/item/${vinyl.vinyl_id}`}>
                        <div className='main-brand'>
                            <img className='card-img-top' src={`./src/album_covers/${vinyl.image_path}`} alt=""/>
                            <hr />
                            <h6>{vinyl.vinyl_artist}<br />-<br />{vinyl.vinyl_name}</h6>
                            <p className='p-2'>{vinyl.genre_name}</p>
                        </div>

                        <div className='row'>
                            <h4>Ár: ${vinyl.price}</h4>
                        
                        </div>
                        </a>
                    </div>

                </div>    
            </div>

            {/* <table>
                <thead>
                <tr>
                <th>Album neve</th>
                <th>Előadó</th>
                <th>Hossza</th>
                <th>Dalok</th>
                <th>Színe</th>
                <th>Műfaj</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map(vinyl => (
                        <tr key={vinyl.vin_id}>
                            <td>{vinyl.vin_name}</td>
                            <td>{vinyl.artist}</td>
                            <td>{vinyl.runtime} perc</td>
                            <td>{vinyl.tracks}</td>
                            <td>{vinyl.color}</td>
                            <td>{vinyl.genre}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    );
};

export default MoreLikeThis
