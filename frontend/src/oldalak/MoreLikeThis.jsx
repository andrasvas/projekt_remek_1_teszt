import './Bakelitek.css'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {ReactSmartScroller} from "react-smart-scroller";
import { Link } from 'react-router-dom';

const MoreLikeThis = () => {
    const [data, setData] = useState([]);
    const [term, setTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/vinyls")
            .then(response => {
                setData(response.data);
                setFilteredData(response.data);
            })
            .catch(error => {
                console.error("Hiba:", error);
            });
    }, []);

    const searchChange = (x) => {
        const term = x.target.value.toLowerCase();
        setTerm(term);

        if (term === "") {
            setFilteredData(data);
        } else {
            const filtered = data.filter(vinyl => {
                return (
                    vinyl.vinyl_name.toLowerCase().includes(term) ||
                    vinyl.vinyl_artist.toLowerCase().includes(term)
                );
            });

            setFilteredData(filtered);
        }
    };

    return (
        <div>
                <ReactSmartScroller>
                    <article className='row justify-content-center'>
                        {filteredData.map(vinyl => (    
                            
                            <div key={vinyl.vinyl_id} className='card col-md-6 col-lg-3'>


                                <a href={`/item/${vinyl.vinyl_id}`}>
                                <div className='main-brand'>
                                    <img className='card-img-top border rounded border-black' src={`./src/album_covers/${vinyl.image_path}`} alt=""/>
                                    <hr />
                                    <h6>{vinyl.vinyl_artist}<br />-<br />{vinyl.vinyl_name}</h6>
                                    <p className='p-2'>{vinyl.genre_name}</p>
                                </div>

                                <div className='row'>
                                    <h4>Ár: ${vinyl.price}</h4>
                                
                                </div>
                                </a>
                            </div>

                            ))}
                    </article>
                </ReactSmartScroller>

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
