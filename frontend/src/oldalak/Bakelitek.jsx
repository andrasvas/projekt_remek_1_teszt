import './Bakelitek.css'
import React, { useEffect, useState } from "react";
import snpLogo from '../assets/a_logo.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Link } from 'react-router-dom';

const Vinyls = () => {
    const [data, setData] = useState([]);
    const [term, setTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/vinyls")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Nem helyes a válasz a hálózattól");
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setFilteredData(data);
            })
            .catch(error => console.error("Hiba:", error));
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
            {/* <div className='row'>
                <div className='div-title container-fluid col-md-6'>
                    <h1>Scratch 'n Spin</h1>
                    <img className='img-responsive col-md-4' src={snpLogo} alt="" />
                </div>
            </div> */}
            <h1>Lemezeink raktáron</h1>

            <input
                type="text"
                placeholder="Kereső"
                value={term}
                onChange={searchChange}
            />

            <div className='container-fluid'>
                <article className='row justify-content-center'>
                    {filteredData.map(vinyl => (    

                        <div key={vinyl.vinyl_id} className='card col-md-6 col-lg-3 g-4 p-4'>
                            <div className='main-brand'>
                                <img className='card-img-top' src={`./src/album_covers/${vinyl.image_path}`} alt="placeholder img" />
                                <p>{vinyl.vinyl_name}</p>
                                <h6>{vinyl.vinyl_artist}</h6>
                                <p>{vinyl.genre_name}</p>
                                <div className='row'>
                                    <h4>Ár: ${vinyl.price}</h4>
                                    <Link className='purchaseBtn' to={`/item/${vinyl.vinyl_id}`}>Megveszem</Link>
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
