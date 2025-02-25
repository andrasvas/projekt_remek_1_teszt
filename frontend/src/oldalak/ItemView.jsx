import './Bakelitek.css'
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

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


    return (
        <>
            <div>
                <h1>Szziiiaaaa</h1>
            </div>
        </>
    );
};

export default Vinyls;
