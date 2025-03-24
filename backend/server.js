const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const app = express()
const router = express.Router();
app.use(express.json())
app.use(cors())

const SecretKey = "let_me_break_it_down_for_you_mark"

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

app.get("/vinyls",(req,res) => {
    db.query(`
        SELECT vinyls.price, vinyls.vinyl_id, genres.genre_name, 
            vinyls.vinyl_name, vinyls.image_path, vinyls.vinyl_artist 
        FROM vinyls 
        INNER JOIN genres ON vinyls.genre_id = genres.genre_id
        `, (err,results) => {
        if(err) return res.status(500).json(err)
        res.json(results)
    })

})

app.get('/vinyls/:itemId', (req, res) => {
    const { itemId } = req.params;
    db.query(`
            SELECT vinyls.vinyl_description, vinyls.vinyl_id, vinyls.vinyl_name, vinyls.vinyl_artist, 
                    vinyls.in_stock, vinyls.vinyl_color, genres.genre_name, 
                    labels.label_name, labels.label_link, vinyls.vinyl_size, 
                    vinyls.vinyl_release, vinyls.image_path, vinyls.price,
                    vinyls.spotify_link
            FROM vinyls 
                INNER JOIN genres ON genres.genre_id = vinyls.genre_id
                INNER JOIN labels ON labels.label_id = vinyls.label_id
            WHERE vinyls.vinyl_id = ?
            `, 
                [itemId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
});

app.get('/vinyls/:genre', (req, res) => {
    const { genre } = req.params;
    db.query(`
            SELECT vinyls.vinyl_description, vinyls.vinyl_id, vinyls.vinyl_name, vinyls.vinyl_artist, 
                    vinyls.in_stock, vinyls.vinyl_color, genres.genre_name, 
                    labels.label_name, labels.label_link, vinyls.vinyl_size, 
                    vinyls.vinyl_release, vinyls.image_path, vinyls.price,
                    vinyls.spotify_link
            FROM vinyls 
                INNER JOIN genres ON genres.genre_id = vinyls.genre_id
                INNER JOIN labels ON labels.label_id = vinyls.label_id
            WHERE vinyls.genre_id = ?
            `, 
                [genre], (err, results) => {
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
    const user_pfp_id = (Math.random()*10+2)+1

    db.query(`SELECT count(*) AS 'count' FROM users WHERE user_phone_number = ? OR user_email = ?`, [user_phonenum,user_email], async (err,result) => {
        if (result[0].count > 0){
            console.log("A felhasználó már regisztrált")
            return res.status(409).json({error: "A felhasználó már regisztrált"})
        }
        else{
            try{
                const hashedPassword = await hashPassword(user_password)

                db.query(`INSERT INTO users (user_last_name,user_first_name,user_phone_number,user_email,user_password,user_pfp_id) VALUES (?,?,?,?,?,?)`, [user_lastname,user_firstname,user_phonenum,user_email,hashedPassword,user_pfp_id], (err,result) => {
                    if(err){
                        console.error("Hiba:", err)
                        return res.status(500).json({error: "Nem sikerült a regisztráció"})
                    }

                    const user_id = result.insertId
                    console.log(user_id)

                    db.query(`INSERT INTO cart (user_id) VALUES (?)`,[user_id],(err) => {
                        if(err){
                            console.error("Hiba a kosár létrehozásakor")
                            return res.status(500).json({error: "Hiba a kosár létrahozásakor"})
                        }

                        console.log("Sikeres regisztráció és kosár létrehozása")
                        return res.status(201).json({message: "Sikeres regisztráció!"})
                    })

                })

                console.log("Sikeres regisztráció!")
                return res.json("Sikeres regisztráció!")
            }
            catch(error){
                console.error(error)
            }
        }
        
        
    })
})


app.post('/login', async function (req, res){
    console.log("Bejelentkezés próba...")

    const user_email = req.body.user_email;
    const user_password = req.body.user_password;

    if(!user_email || !user_password){
        console.log("Felhasználó vagy jelszó szükséges")
        return res.status(400).json({error: 'Felhasználó vagy jelszó szükséges'}); // Helyes hívás
    }

    db.query(`SELECT user_id, user_email, user_password FROM users WHERE user_email = ?`, [user_email], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Adatbázis hiba történt!" });
        }
    
        if (results.length === 0) {
            return res.status(404).json({ error: "A felhasználó nem található!" });
        }
    
        console.log("Felhasználó létezik...");
        const user = results[0];
        const isMatch = await bcrypt.compare(user_password, user.user_password);
    
        if (!isMatch) {
            return res.status(400).json({ error: "Helytelen jelszó!" });
        }
    
        console.log("Felhasználó bejelentkezett.");
        const token = jwt.sign({ user_email }, SecretKey, { expiresIn: "1h" });
        return res.json({ token });
    });
});

app.get('/profile', async function(req,res){
    const authHeader = req.headers['authorization']
    
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({error: "Token nem lett megadva!"})
    }

    const token = authHeader.split(" ")[1]
    console.log("Kapott token:",token)

    try{
        const decodedToken = jwt.verify(token,SecretKey)
        const userEmail = decodedToken.user_email

        db.query(`SELECT user_id, user_last_name, user_first_name, user_email, user_pfp_id FROM users WHERE user_email = ?`,[userEmail], async (err,result) => {
            if(err){
                console.log("Adatbázis hiba:", err)
                return res.status(500).json({error: "A felhasználó nem található!"})
            }
            
            if (result.length === 0) {
                console.log("A felhasználó nem található!")
                return res.status(404).json({error: "A felhasználó nem található!"})
            }
            else{
                const user = result[0]
                return res.json(user)
            }
        })
    }
    catch(err){
        console.log(err)
    }
})

app.post('/addtocart', async function(req,result){
    console.log("Hozzáadás a kosárhoz...")

    const vinyl_id = req.body.vinyl_id
    const user_id = req.body.user_id
})

router.get('/userProfile', async function (req, res){
    console.log('Felhasználói adatok lekérése...')
    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token nem található' });
    }

    jwt.verify(token, SecretKey, (err, decoded) =>{
        if(err){
            return res.status(403).json({message: 'Érvénytelen token'});
        }
        const userId = decoded.id;
        const user = getUserDataById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Felhasználó nem található' });
        }
            return res.json(user);
    })
})
module.exports = router;

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