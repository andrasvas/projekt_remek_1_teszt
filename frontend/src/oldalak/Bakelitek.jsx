import '../css/Bakelitek.css'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Spinner from 'react-bootstrap/Spinner'
import { Link, isRouteErrorResponse } from 'react-router-dom';
import { FaImage } from 'react-icons/fa';

const Vinyls = () => {
    const [data, setData] = useState([]);
    const [term, setTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const userToken = window.localStorage.getItem("userToken")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:5000/vinyls")
            .then(response => {
                setData(response.data);
                setFilteredData(response.data);
            })
            .catch(error => {
                console.error("Hiba:", error);
            });
        setTimeout(() => {
            setLoading(false);
        }, 1000)
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
    if (!isRouteErrorResponse(error)) {
        if (!loading) {
        return (
            <div className='all-container'>
                    <h1 className='default-text m-auto main-brand'>Lemezeink raktáron</h1>
                    <input
                        type="text"
                        placeholder="Kereső"
                        value={term}
                        onChange={searchChange}
                        className='m-4 search-bar main-brand border-3 p-1'
                        id='search-field'
                        />
                    <div className='container-fluid'>
                        <article className='row justify-content-center'>
                            {filteredData.map(vinyl => (

                                <div key={vinyl.vinyl_id} className='bakelit-lemez col-xs-6 col-sm-6 col-md-4 col-lg-3 p-1'>
                                    <div className='card pb-2'>
                                        <div className='main-brand'>
                                            <img className='card-img-top border rounded border-black' src={`./src/album_covers/${vinyl.image_path}`} alt="" />
                                            <hr />
                                            <h5>{vinyl.vinyl_artist}<br />-<br />{vinyl.vinyl_name}</h5>
                                            <p className='p-2'>{vinyl.genre_name}</p>
                                        </div>

                                        <div className='row mt-auto'>
                                            <h4 className='main-brand'>${vinyl.price}</h4>
                                            <Link className='purchaseBtn main-brand mb-3' to={`/item/${vinyl.vinyl_id}`}>Megnézem</Link>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </article>
                    </div>
                </div>
            );
        }
        else {
        return(
            <div className='h-50 d-flex justify-content-center align-items-center'>
                <Spinner/>
            </div>
            )
        }
    }
    else if (error instanceof Error) { return <Error /> }
}

export default Vinyls;
