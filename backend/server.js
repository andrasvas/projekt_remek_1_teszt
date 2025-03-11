const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")
const bcrypt = require("bcryptjs")

const app = express()
app.use(express.json())
app.use(cors())

async function hashPassword(password) {
    try{
        const hashedRounds = 10
        const hashedPassword = await bcrypt.hash(password,hashedRounds);
        return hashedPassword
    }
    catch(err){
        console.log(`Hiba történt a jelszó titkositása közben: ${err}`)
        throw error
    }
}

//Adatbázis kapcsolat beállitása

const db = mysql.createConnection({
    host: "127.0.0.1",
    port: "3307",
    user: "root",
    password: "",
    database: "scratch_and_spin_db"
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
    db.query("SELECT vinyls.price, vinyls.vinyl_id, genres.genre_name, vinyls.vinyl_name, vinyls.image_path, vinyls.vinyl_artist FROM vinyls INNER JOIN genres ON vinyls.genre_id = genres.genre_id", (err,results) => {
        if(err) return response.status(500).json(err)
        response.json(results)
    })

})

app.get('/vinyls/:itemId', (req, res) => {
    const { itemId } = req.params;
    db.query('SELECT vinyls.vinyl_description, vinyls.vinyl_name, vinyls.vinyl_artist, vinyls.in_stock, vinyls.vinyl_color, genres.genre_name, vinyls.vinyl_size, vinyls.vinyl_release, vinyls.image_path FROM vinyls INNER JOIN genres ON genres.genre_id = vinyls.genre_id WHERE vinyls.vinyl_id = ?', [itemId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
});

app.post('/register',async function (req,res){
    const user_email = req.body.user_email
    const user_password = req.body.user_password
    const user_firstname = req.body.user_firstname
    const user_lastname = req.body.user_lastname
    const user_phonenum = req.body.user_phonenum

    db.query(`SELECT count(*) AS 'count' FROM users WHERE user_phone_number = ? OR user_email = ?`, [user_phonenum,user_email], async (err,result) => {
        console.log(err)
        if (result[0].count > 0){
            res.json("A felhasználó már regisztrált")
            console.log("Regisztrált már a felhasználó")
        }
        else{
            const hashedPassword = await hashPassword(user_password)

            db.query(`INSERT INTO users (user_last_name,user_first_name,user_phone_number,user_email,user_password) VALUES (?,?,?,?,?)`, [user_lastname,user_firstname,user_phonenum,user_email,hashedPassword], (err,result) => {
                console.log(err)
            })

            res.json("Sikeres regisztráció!")
            console.log("Sikeres regisztráció!")
        }
        
    })
})



// function getVinylId(callback){
//     const query = `SELECT * FROM vinyls WHERE vin_id = ?`
//     connection.query(query, [itemId], callback)
// }

// app.get('/vinyls/:itemId', (req, res) => {
//     db.query("SELECT * FROM vinyls WHERE vin_id = ?", [itemId])
// })





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