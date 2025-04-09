import '../css/Bakelitek.css'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Link, isRouteErrorResponse } from 'react-router-dom';

const AdminBakelitek = () => {
    const [data, setData] = useState([]);
    const [term, setTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const userToken = window.localStorage.getItem("userToken")
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

    const AddToCart = () => {
        try {
           axios
              .post(
                 "http://localhost:5000/addtocart",
                 {
                    vinyl_id: filteredData.vinyl_id,
                    vinyl_qty: 1,
                 },
                 {
                    withCredentials: true,
                 }
              )
              .then((response) => {
                 console.log("Körte");
                 if (response) {
                    console.log(response);
                    window.location.href = "/cart";
                 }
              })
              .catch((error) => {
                  window.location.href = "/signin";
                  console.error(error);
              });
        } catch (err) {
           console.log(err);
        }
     };
  

    if (!isRouteErrorResponse(error)){

        return (
            <div className='all-container mt-3-'>
            {/* <div className='row'>
                <div className='div-title container-fluid col-md-6'>
                    <h1>Scratch 'n Spin</h1>
                    <img className='img-responsive col-md-4' src={snpLogo} alt="" />
                </div>
            </div> */}
            <h3 className='default-text m-auto main-brand'>Lemezeink raktáron</h3>

            <input
                type="text"
                placeholder="Kereső"
                value={term}
                onChange={searchChange}
                className='m-4 search-bar main-brand border-3 p-1'
                id='search-field'
                />

            <div className='container-fluid'>
                <article className='d-flex flex-column'>
                    {filteredData.map(vinyl => (    
                        
                        <div key={vinyl.vinyl_id} className=''>
                            <div className='card'>
                            <div className='main-brand flex align-items-center justify-content-between'>
                                <img className='border rounded border-black' src={`./src/album_covers/${vinyl.image_path}`} alt=""/>
                                <h5 className='w-25'>{vinyl.vinyl_artist}<br />-<br />{vinyl.vinyl_name}</h5>
                                <p className='p-2'>{vinyl.genre_name}</p>
                                <h4 className='main-brand'>${vinyl.price}</h4>
                                <div>
                                    <Link className='purchaseBtn main-brand' to={`/item/${vinyl.vinyl_id}`}>Megnézem</Link>
                                    <Link className='purchaseBtn secondary-accent main-brand' onClick={AddToCart}>Kosárba</Link>
                                </div>
                            </div>

                            <div className='d-flex'>
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
} 
    else if (error instanceof Error){return <Error/>}
}

export default AdminBakelitek;
