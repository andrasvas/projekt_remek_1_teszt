const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

const app = express();
const router = express.Router();
app.use(cookieParser());
app.use(express.json());
app.use(
   cors({
      origin: "http://localhost:5173", //EZ EGYEZZEN MEG AMI A WEBEN VAN, KULONBEN NEM FOG MENNI A PROGRAM!!!!
      credentials: true,
   })
);

const SecretKey = "let_me_break_it_down_for_you_mark";

async function hashPassword(password) {
   try {
      const hashedRounds = 10;
      const hashedPassword = await bcrypt.hash(password, hashedRounds);
      return hashedPassword;
   } catch (err) {
      console.log(`Hiba történt a jelszó titkositása közben: ${err}`);
      throw error;
   }
}

//Adatbázis kapcsolat beállitása

const db = mysql.createConnection({
   host: "127.0.0.1",
   port: "3306",
   user: "root",
   password: "",
   database: "scratch_and_spin_db",
});

db.connect((err) => {
   if (err) {
      console.error(
         "Hiba történt a MySQL szerverhez való kapcsolódáskor: ",
         err
      );
   } else {
      console.log("Sikeresen csatlakozott a MySQL szerverhez!");
   }
});

//API-k

app.get("/vinyls", (req, res) => {
   db.query(
      `
        SELECT vinyls.price, vinyls.vinyl_id, genres.genre_name, 
            vinyls.vinyl_name, vinyls.image_path, vinyls.vinyl_artist 
        FROM vinyls 
        INNER JOIN genres ON vinyls.genre_id = genres.genre_id
        `,
      (err, results) => {
         if (err) return res.status(500).json(err);
         return res.json(results);
      }
   );
});

app.get("/vinyls/:itemId", (req, res) => {
   const { itemId } = req.params;
   db.query(
      `
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
      [itemId],
      (err, results) => {
         if (err) return res.status(500).json({ error: err.message });
         res.json(results[0]);
      }
   );
});

app.get("/genre/:genreId", (req, res) => {
   const { genreId } = req.params;
   db.query(
      `
            SELECT vinyls.vinyl_id, vinyls.vinyl_name, vinyls.vinyl_artist, 
			vinyls.image_path, vinyls.price
            FROM vinyls 
                INNER JOIN genres ON genres.genre_id = vinyls.genre_id
                INNER JOIN labels ON labels.label_id = vinyls.label_id
            WHERE vinyls.genre_id = ?
            `,
      [genreId],
      (err, results) => {
         if (err) return res.status(500).json({ error: err.message });
         res.json(results[0]);
      }
   );
});

app.post("/register", async function (req, res) {
   const user_email = req.body.user_email;
   const user_password = req.body.user_password;
   const user_firstname = req.body.user_firstname;
   const user_lastname = req.body.user_lastname;
   const user_phonenum = req.body.user_phonenum;
   const user_pfp_id = Math.random() * 10 + 1 + 1;

   db.query(
      `SELECT count(*) AS 'count' FROM users WHERE user_phone_number = ? OR user_email = ?`,
      [user_phonenum, user_email],
      async (err, result) => {
         if (result[0].count > 0) {
            console.log("A felhasználó már regisztrált");
            return res
               .status(409)
               .json({ error: "A felhasználó már regisztrált" });
         } else {
            try {
               const hashedPassword = await hashPassword(user_password);

               db.query(
                  `INSERT INTO users (user_last_name,user_first_name,user_phone_number,user_email,user_password,user_pfp_id) VALUES (?,?,?,?,?,?)`,
                  [
                     user_lastname,
                     user_firstname,
                     user_phonenum,
                     user_email,
                     hashedPassword,
                     user_pfp_id,
                  ],
                  (err, result) => {
                     if (err) {
                        console.error("Hiba:", err);
                        return res
                           .status(500)
                           .json({ error: "Nem sikerült a regisztráció" });
                     }

                     const user_id = result.insertId;
                     console.log(user_id);

                     db.query(
                        `INSERT INTO cart (user_id) VALUES (?)`,
                        [user_id],
                        (err) => {
                           if (err) {
                              console.error("Hiba a kosár létrehozásakor");
                              return res.status(500).json({
                                 error: "Hiba a kosár létrahozásakor",
                              });
                           }

                           console.log(
                              "Sikeres regisztráció és kosár létrehozása"
                           );
                           return res
                              .status(201)
                              .json({ message: "Sikeres regisztráció!" });
                        }
                     );
                  }
               );
            } catch (error) {
               console.error(error);
            }
         }
      }
   );
});

app.post("/login", async function (req, res) {
   console.log("Bejelentkezés próba...");

   const user_email = req.body.user_email;
   const user_password = req.body.user_password;

   if (!user_email || !user_password) {
      console.log("Felhasználó vagy jelszó szükséges");
      return res
         .status(400)
         .json({ error: "Felhasználó vagy jelszó szükséges" }); // Helyes hívás
   }

   db.query(
      `SELECT user_id, user_email, user_password FROM users WHERE user_email = ?`,
      [user_email],
      async (err, results) => {
         if (err) {
            return res.status(500).json({ error: "Adatbázis hiba történt!" });
         }

         if (results.length === 0) {
            return res
               .status(404)
               .json({ error: "A felhasználó nem található!" });
         }

         console.log("Felhasználó létezik...");
         const user = results[0];
         const isMatch = await bcrypt.compare(
            user_password,
            user.user_password
         );

         if (!isMatch) {
            return res.status(400).json({ error: "Helytelen jelszó!" });
         }

         console.log("Felhasználó bejelentkezett.");
         const token = jwt.sign({ user_email }, SecretKey, { expiresIn: "1h" });

         res.cookie("authToken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 3600000,
         });

         return res.json({ message: "Sikeres bejelentkezés" });
      }
   );
});

app.post("/logout", (req, res) => {
   console.log("Kijelentkezés...");
   res.clearCookie("authToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
   });
   return res.status(200).json({ message: "Sikeresen kijelentkeztél!" });
});

app.get("/profile", async function (req, res) {
   console.log("Kapott sütik:", req.cookies);
   const token = req.cookies.authToken;

   if (!token) {
      return res.status(403).json({ error: "Token nem lett megadva!" });
   }

   console.log("Kapott token:", token);

   try {
      const decodedToken = jwt.verify(token, SecretKey);
      const userEmail = decodedToken.user_email;

      db.query(
         `SELECT user_id, user_last_name, user_first_name, user_email, user_pfp_id, user_is_admin FROM users WHERE user_email = ?`,
         [userEmail],
         async (err, result) => {
            if (err) {
               console.log("Adatbázis hiba:", err);
               return res
                  .status(500)
                  .json({ error: "A felhasználó nem található!" });
            }

            if (result.length === 0) {
               console.log("A felhasználó nem található!");
               return res
                  .status(404)
                  .json({ error: "A felhasználó nem található!" });
            } else {
               const user = result[0];
               console.log(user);
               return res.json(user);
            }
         }
      );
   } catch (err) {
      console.log(err);
   }
});

app.post("/addtocart", async function (req, res) {
   console.log("Hozzáadás a kosárhoz...");
   const vinyl_id = req.body.vinyl_id;
   const vinyl_qty = req.body.vinyl_qty;
   const token = req.cookies.authToken;
   // const authHeader = req.headers['authorization']

   // if(!authHeader || !authHeader.startsWith("Bearer ")){
   //     console.error("Sikertelen hozzáadás.")
   //     return res.status(401).json({error: "Token nem lett megadva!"})
   // }

   // const token = authHeader.split(" ")[1]
   console.log(`Kapott token: ${token}`);

   if (!token || !vinyl_id) {
      console.log("Token vagy vinyl_id nem található!");
      return res.status(404).json({ message: "Token/Bakelit nem található!" });
   }

   try {
      const decodedToken = jwt.verify(token, SecretKey);
      const userEmail = decodedToken.user_email;

      /* db.query(`SELECT vinyls.vinyl_name,
        users.user_email,
        cart.cart_id
        FROM users
        INNER JOIN cart
        ON cart.user_id = users.user_id
        INNER JOIN cart_item
        ON cart.cart_id = cart_item.cart_id
        INNER JOIN vinyls
        ON cart_item.vinyl_id = vinyls.vinyl_id
        WHERE user_email = ?`,[userEmail],async (err,result) => {

        }) */

      db.query(
         `SELECT cart_id 
        FROM cart 
        INNER JOIN users 
        ON users.user_id = cart.user_id 
        WHERE users.user_email = ?`,
         [userEmail],
         (err, result) => {
            if (err) {
               console.log(err);
               return res.status(401).json({ message: "Kosár nem található!" });
            }

            const cartId = result[0].cart_id;

            if (!cartId) {
               console.log("Kosár nem található!");
               return res.json(401).json({ error: "Kosár nem található!" });
            }

            db.query(
               `SELECT cart_id,vinyl_id,qty FROM cart_item WHERE cart_id = ? AND vinyl_id = ?`,
               [cartId, vinyl_id],
               (err, results) => {
                  if (results.length == 0) {
                     console.log("Nincs még benne, kosárhoz adás");
                     db.query(
                        `INSERT INTO cart_item (cart_id,vinyl_id,qty) VALUES (?,?,?)`,
                        [cartId, vinyl_id, vinyl_qty],
                        (err, result) => {
                           if (err) {
                              console.log(err);
                              return res.status(500).json({
                                 error: "Nem sikerült hozzáadni a kosárhoz.",
                              });
                           }

                           console.log("Kosárhoz sikeresen hozzáadva");
                           return res.status(201).json({
                              message: "Kosárhoz sikeresen hozzáadva.",
                           });
                        }
                     );
                  } else {
                     db.query(
                        `UPDATE cart_item
                    SET qty = (qty+?)
                    WHERE cart_id = ? AND vinyl_id = ?`,
                        [vinyl_qty, cartId, vinyl_id],
                        (err, result) => {
                           if (err) {
                              console.log(err);
                              return res.status(500).json({
                                 error: "Nem sikerült hozzáadni a kosárhoz.",
                              });
                           }

                           console.log("Kosár frissítve!");
                           return res
                              .status(200)
                              .json({ message: "Kosár sikeresen frissítve." });
                        }
                     );
                  }
               }
            );
         }
      );
   } catch (error) {
      console.error(error);
   }
});

app.delete("/delete_cart_item", async function (req, res) {
   const vinyl_id = req.body.vinyl_id;
   const token = req.cookies.authToken;
   // const authHeader = req.headers['authorization']

   // console.log(vinyl_id, "vinyl id-je")

   // if(!authHeader || !authHeader.startsWith("Bearer ")){
   //     console.error("Sikertelen meghivás.")
   //     return res.status(401).json({error: "Token nem lett megadva!"})
   // }

   // const token = authHeader.split(" ")[1]
   console.log(`Kapott token: ${token}`);

   if (!token) {
      console.log("Token vagy vinyl_id nem található!");
      return res.status(401).json({ message: "Token nem található!" });
   }

   try {
      const decodedToken = jwt.verify(token, SecretKey);
      const userEmail = decodedToken.user_email;

      db.query(
         `SELECT cart_item.cart_id
        FROM cart_item
        INNER JOIN cart
        ON cart.cart_id = cart_item.cart_id
        INNER JOIN users
        ON users.user_id = cart.user_id
        WHERE users.user_email = ?`,
         [userEmail],
         (err, result) => {
            if (err) {
               console.log(err);
               return res
                  .status(500)
                  .json({ error: "Nem sikerült törölni a kosárból." });
            }

            if (result.length == 0) {
               console.log("Kosár nem található!");
               return res.status(404).json({ error: "Kosár nem található!" });
            }

            const cartId = result[0].cart_id;
            console.log(cartId);

            db.query(
               `DELETE FROM cart_item
            WHERE cart_item.vinyl_id = ?
            AND cart_item.cart_id = ?`,
               [vinyl_id, cartId],
               (err, result) => {
                  if (err) {
                     console.log(err);
                     return res
                        .status(500)
                        .json({ error: "Nem sikerült kitörölni a kosárból!" });
                  }
                  return res
                     .status(200)
                     .json({ message: "Kosár elem kitörölve!" });
               }
            );
         }
      );
   } catch {}
});

app.put("/update_cart", async function (req, res) {
   // const authHeader = req.headers["authorization"];
   const vinylId = req.body.vinyl_id;
   const newQty = req.body.qty;
   const token = req.cookies.authToken
   // if (!authHeader || !authHeader.startsWith("Bearer ")) {
   //    console.error("Sikertelen törlés.");
   //    return res.status(401).json({ error: "Token nem lett megadva!" });
   // }

   // const token = authHeader.split(" ")[1];
   console.log(`Kapott token: ${token}`);

   if (!token) {
      console.log("Token nem található!");
      return res.status(401).json({ message: "Token nem található!" });
   }

   try {
      const decodedToken = jwt.verify(token, SecretKey);
      const userEmail = decodedToken.user_email;

      db.query(
         `SELECT cart_item.cart_id
            FROM cart_item
            INNER JOIN cart
            ON cart.cart_id = cart_item.cart_id
            INNER JOIN users
            ON users.user_id = cart.user_id
            WHERE users.user_email = ?`,
         [userEmail],
         (err, result) => {
            if (err) {
               console.log(err);
               return res
                  .status(500)
                  .json({ error: "Nem sikerült törölni a kosárból." });
            }

            if (result.length == 0) {
               console.log("Kosár nem található!");
               return res.status(404).json({ error: "Kosár nem található!" });
            }

            const cartId = result[0].cart_id;
            console.log(`Kosár azonosito:${cartId}`);

            db.query(
               `UPDATE cart_item
                    SET qty = ?
                    WHERE cart_id = ? AND vinyl_id = ?`,
               [newQty, cartId, vinylId],
               (err, result) => {
                  if (err) {
                     console.log(err);
                     return res
                        .status(500)
                        .json({ error: "Nem sikerült frissiteni a kosarat." });
                  }

                  console.log("Kosár frissítve!");
                  return res
                     .status(200)
                     .json({ message: "Kosár sikeresen frissítve." });
               }
            );
         }
      );
   } catch (err) {}
});

app.delete("/clearcart", async function (req, res) {
   const token = req.cookies.authToken;

   // const authHeader = req.headers['authorization']

   // if(!authHeader || !authHeader.startsWith("Bearer ")){
   //     console.error("Sikertelen törlés.")
   //     return res.status(401).json({error: "Token nem lett megadva!"})
   // }

   // const token = authHeader.split(" ")[1]
   console.log(`Kapott token: ${token}`);

   if (!token) {
      console.log("Token nem található!");
      return res.status(401).json({ message: "Token nem található!" });
   }

   try {
      const decodedToken = jwt.verify(token, SecretKey);
      const userEmail = decodedToken.user_email;

      db.query(
         `SELECT cart_item.cart_id
        FROM cart_item
        INNER JOIN cart
        ON cart.cart_id = cart_item.cart_id
        INNER JOIN users
        ON users.user_id = cart.user_id
        WHERE users.user_email = ?`,
         [userEmail],
         (err, result) => {
            if (err) {
               console.log(err);
               return res
                  .status(500)
                  .json({ error: "Nem sikerült törölni a kosárból." });
            }

            if (result.length == 0) {
               console.log("Kosár nem található!");
               return res.status(404).json({ error: "Kosár nem található!" });
            }

            const cartId = result[0].cart_id;

            db.query(
               `DELETE FROM cart_item WHERE cart_id = ?`,
               [cartId],
               (err, results) => {
                  if (err) {
                     console.log(err);
                     return res
                        .status(500)
                        .json({ error: "Nem sikerült kitörölni a kosarat!" });
                  }

                  return res.status(200).json({ message: "Kosár kitörölve!" });
               }
            );
         }
      );
   } catch (err) {
      console.log(err);
   }

   /*db.query(`DELETE FROM cart_item
    WHERE cart_id = ?
    `,[])*/
});

app.get("/cart", async function (req, res) {
   console.log("Kosár megjelenitése...");

   const token = req.cookies.authToken;
   // const authHeader = req.headers['authorization']

   // if(!authHeader || !authHeader.startsWith("Bearer ")){
   //     console.error("Sikertelen meghivás.")
   //     return res.status(401).json({error: "Token nem lett megadva!"})
   // }

   // const token = authHeader.split(" ")[1]
   // console.log(`Kapott token: ${token}`)

   if (!token) {
      console.log("Token vagy vinyl_id nem található!");
      return res.status(401).json({ message: "Token nem található!" });
   }

   try {
      const decodedToken = jwt.verify(token, SecretKey);
      const userEmail = decodedToken.user_email;

      db.query(
         `SELECT vinyls.vinyl_id, vinyls.vinyl_name, vinyls.image_path,cart_item.qty,vinyls.price,users.user_email 
        FROM cart_item
        INNER JOIN vinyls
        ON vinyls.vinyl_id = cart_item.vinyl_id
        INNER JOIN cart
        ON cart.cart_id = cart_item.cart_id
        INNER JOIN users
        ON users.user_id = cart.user_id
        WHERE user_email = ?`,
         [userEmail],
         (err, results) => {
            if (err) {
               console.log(err);
               return res.status(401).json("Kosár nem található!");
            }

            if (results.length < 0) {
               console.log("A kosár üres");
               return res.status(204).json({ message: "A kosár üres" });
            }

            console.log(results);

            return res.status(200).json(results);
         }
      );
   } catch (err) {
      console.log(err);
   }
});

app.post('/change_pfp', async function(req,res){
   console.log("Profil kép megváltoztatása")
   const imgId = req.body.imgId
   const token = req.cookies.authToken

   if (!token) {
      console.log("Token nem található!");
      return res.status(401).json({ message: "Token nem található!" });
   }

   try{
      const decodedToken = jwt.verify(token, SecretKey);
      const userEmail = decodedToken.user_email;

      db.query("UPDATE users SET user_pfp_id = ? WHERE users.user_email = ?",[imgId,userEmail],(err,result) => {
         if(err){
            return res.status(400).json({error: "Rossz keres"})
         }
         return res.status(200).json({message: "Sikeres profilkép csere!"})
      })

   }
   catch(err){
      console.log(err)
   }
})

app.post("/order_items", async function (req,res){
   console.log("Rendelés leadása...")
   // const fullName = req.body.full_name
   // const phoneNumber = req.body.phone_number
   // const city = req.body.city
   // const zipCode = req.body.zip_code
   // const streetAddress = req.body.street_address
   // const note = req.body.note
   const deliveryMethod = req.body.delivery_method 
   const token = req.cookies.authToken

   if (!token) {
      console.log("Token nem található!");
      return res.status(401).json({ message: "Token nem található!" });
   }

   if(deliveryMethod == "store_pickup"){
      const fullName = req.body.full_name
      const phoneNumber = req.body.phone_number

      try{
         const decodedToken = jwt.verify(token, SecretKey)
         const userEmail = decodedToken.user_email

         console.log("Elso lekerdezes")
   
         db.query(`INSERT INTO address (full_name,phone,note) VALUES (?,?,?)`,[fullName,phoneNumber,"bolti atvetel"],(err,results) => {
            if(err){
               console.log(err)
               return res.status(400).json({error: "Rossz kérés!"})
            }

            const addressId = results.insertId
            console.log("Siker, masodik jon")

            db.query(`SELECT users.user_id FROM users WHERE users.user_email = ?`,[userEmail],(err,results_users) => {
               if(err){
                  console.log(err)
                  return res.status(400).json({error: "Rossz kérés!"})
               }

               const userId = results_users[0].user_id

               console.log("Siker, harmadik")

               db.query(`INSERT INTO orders (user_id,address_id,status) VALUES (?,?,?)`,[userId,addressId,"pending"],(err,results_orders) => {
                  if(err){
                     console.log(err)
                     return res.status(400).json({error: "Rossz kérés!"})
                  }

                  const orderId = results_orders.insertId
                  console.log("Siker, negyedik")

                  db.query(`SELECT cart_item.vinyl_id, cart_item.qty, (vinyls.price * cart_item.qty) AS "price"
                  FROM cart_item
                  INNER JOIN vinyls
                  ON vinyls.vinyl_id = cart_item.vinyl_id 
                  INNER JOIN cart 
                  ON cart.cart_id = cart_item.cart_id
                  INNER JOIN users
                  ON cart.user_id = users.user_id
                  WHERE users.user_email = ?`,[userEmail],(err,results_cart_item) => {
                     if(results_cart_item.length == 0){
                        console.log("A kosár üres.")
                        return res.status(404).json({error: "A kosár üres"})
                     }
                     else{
                        for(item of results_cart_item){
                           console.log(item)
                           db.query(`INSERT INTO order_item (order_id,vinyl_id,amount,price) VALUES(?,?,?,?)`,[orderId,item.vinyl_id,item.qty,item.price],(err,results) => {
                              if(err){
                                 console.log(err)
                                 return res.status(404).json({error: "A kosár üres"})
                              }
                           })
                        }
                        console.log("Sikeres rendelés leadás")
                        return res.status(200).json({message: "A rendelés leadásra került."})
                     }
                  })
               })
            })
         })
      }
   
      catch(err){
         console.log(err)
      }
   }
})

router.get("/userProfile", async function (req, res) {
   console.log("Felhasználói adatok lekérése...");
   const token = req.headers["authorization"].split(" ")[1];

   if (!token) {
      return res.status(401).json({ message: "Token nem található" });
   }

   jwt.verify(token, SecretKey, (err, decoded) => {
      if (err) {
         return res.status(403).json({ message: "Érvénytelen token" });
      }
      const userId = decoded.id;
      const user = getUserDataById(userId);

      if (!user) {
         return res.status(404).json({ message: "Felhasználó nem található" });
      }
      return res.json(user);
   });
});
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
   console.log("A szerver fut az 5000-es porton!");
});
