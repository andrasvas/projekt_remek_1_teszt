const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

//Adatbázis kapcsolat beállitása

const db = mysql.createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "",
    database: "scratch_n_spin_test"
})

db.connect((err) => {
    if(err){
        console.error("Hiba történt a MySQL szerverhez való kapcsolódáskor: ", err)
    }
    else{
        console.log("Sikeresen csatlakozott a MySQL szerverhez!")
    }
})

//API-k

app.get("/vinyls",(request,response) => {
    db.query("SELECT * FROM vinyls", (err,results) => {
        if(err) return response.status(500).json(err)
        response.json(results)
    })
})

function getVinylId(callback){
    const query = `SELECT * FROM vinyls WHERE vin_id = ?`
    connection.query(query, [itemId], callback)
}

app.get('/vinyls/:itemId', (req, res) => {
    db.query("SELECT * FROM vinyls WHERE vin_id = ?", [itemId])
})

// app.get("/vinyls/:itemId",(request, response)=>{
//     const {itemId} = request.query;

//     if(!itemId){
//         return response.status(400).json({error: "ID paraméter hiányzik"})
//     }

//     const query = "SELECT * FROM vinyls WHERE vin_id = ?"

//     db.execute(query, [itemId], (err,result)=>{
//         if(err){
//             return response.status(500).json({error: err.message})
//         }
//         response.json(result);
//     })
// })

app.listen(5000, () => {
    console.log("A szerver fut az 5000-es porton!")
})