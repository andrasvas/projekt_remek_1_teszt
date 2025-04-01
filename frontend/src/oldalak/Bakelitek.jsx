import './Bakelitek.css'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Link } from 'react-router-dom';

const Vinyls = () => {
    const [data, setData] = useState([]);
    const [term, setTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const userToken = window.localStorage.getItem("userToken")

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

    const AddToCart = () =>{
        try{
            if(userToken){
                axios.post("http://localhost:5000/addtocart", {
                    vinyl_id: listing.vinyl_id,
                    vinyl_qty: qty
                }, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                })
                .then(response => {
                    console.log("Körte")
                    if(response){
                        console.log(response)
                        window.location.href = "/cart"
                    }
                    else{
                        console.log(response)
                        window.location.href = "/signin"
                    }
                })
                .catch(error => {
                    console.error(error)
                })
            }
            else{
                window.location.href = "/signin"
            }
            }
        catch(err){
            console.log(err)
        }
            
    }


    return (
        <div className='all-container'>
            {/* <div className='row'>
                <div className='div-title container-fluid col-md-6'>
                    <h1>Scratch 'n Spin</h1>
                    <img className='img-responsive col-md-4' src={snpLogo} alt="" />
                </div>
            </div> */}
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

                        <div key={vinyl.vinyl_id} className='col-xs-6 col-sm-6 col-md-4 col-lg-3 p-1'>
                            <div className='card'>


                            <div className='main-brand'>
                                <img className='card-img-top border rounded border-black' src={`./src/album_covers/${vinyl.image_path}`} alt=""/>
                                <hr />
                                <h5>{vinyl.vinyl_artist}<br />-<br />{vinyl.vinyl_name}</h5>
                                <p className='p-2'>{vinyl.genre_name}</p>
                            </div>

                            <div className='row'>
                                <h4 className='main-brand'>${vinyl.price}</h4>
                                    <Link className='purchaseBtn main-brand mb-3' to={`/item/${vinyl.vinyl_id}`}>Megnézem</Link>
                                    <Link className='purchaseBtn secondary-accent main-brand' onClick={AddToCart}>Kosárba</Link>
                            </div>
                            </div>
                        </div>

                    ))}
                </article>
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

export default Vinyls;
