import React from "react";
import '../css/Bakelitek.css'
import '../css/Cart.css'
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FaPlus, FaMinus, FaBold, FaDollarSign } from "react-icons/fa";

function Cart() {
   //const userToken = window.localStorage.getItem("userToken")
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      axios.get("http://localhost:5000/cart", {
            withCredentials: true,
         })
      .then((response) => {
         console.log("Kosár adatok:", response.data);
         setData(response.data);
      })
      .catch((error) => {
         console.error("Hiba történt:", error.response?.data || error);
      });

      

      // if(userToken){
      //     axios.get("http://localhost:5000/cart",{headers:{
      //         Authorization:`Bearer ${userToken}`
      //     }})
      //     .then(response => {
      //         if(response){
      //             if(response.data.length == 0){
      //                 console.log("A kosár üres")
      //                 setData(response.data)
      //                 console.log(data)
      //             }
      //             else{
      //                 console.log(response.data)
      //                 setData(response.data)
      //             }
      //         }
      //     })
      // }
      // else{
      //     window.location.href = "/signin"
      // }
   }, []);

   const ClearCart = () => {
      const confirmClear = confirm(
         "Biztosan törölni szeretnéd a kosarad teljes tartalmát?"
      );

      if (confirmClear === true) {
         axios.delete("http://localhost:5000/clearcart", {
            withCredentials: true,
         })
         .then((response) => {
            if (response) {
               console.log(response);
               alert(response.data.message);
               window.location.href = "/cart";
            }
         })
         .catch((err) => {
            if (err) {
               console.log(err); // Hibakezelés
            }
         });
      } else {
         console.log("Kosár törlés megszakitva");
      }
   };

   const DeleteItem = (vinylId) => {
      axios.delete("http://localhost:5000/delete_cart_item", {
         data: { vinyl_id: vinylId }, // A törlendő elem adatait a `data` kulcs alá kell rakni
         withCredentials: true,
     })
     .then((response) => {
         console.log("Körte");
         if (response) {
             console.log(response)
             window.location.href = "/cart"
         }
     })
     .catch((error) => {
         console.error(error);
     });
   };

   const GetTotalPrice = (list) => {
      return list.reduce(
         (sum, item) => sum + item.price * Number(item.qty || 1),
         0
      );
   };

   const ChangeQuantity = (vinylId, delta) => {
      const item = data.find((item) => item.vinyl_id === vinylId);
      if (!item) return;
   
      const newQty = item.qty + delta;
      if (newQty < 1) return;
   
      const updatedData = data.map((item) =>
         item.vinyl_id === vinylId ? { ...item, qty: newQty } : item
      );
   
      setData(updatedData);
   
      axios.put("http://localhost:5000/update_cart", {
         vinyl_id: vinylId,
         qty: newQty,
      }, {
         withCredentials: true,
      })
      .then((response) => {
         console.log(response.data.message);
         console.log("Körte")
      })
      .catch((err) => {
         console.error(err);
      });
   };

   const OrderItems = () => {};

   return (
      <div className="all-container container">
         {data.length > 0 ? (
            data.map((item) => (
               <div key={item.vinyl_id} className="card container my-3 w-auto mx-5">
                  <div className="row">
                     <img
                        className="cart_img border rounded border-black col-md-3 col-sm-12 p-0"
                        src={`./src/album_covers/${item.image_path}`}
                        alt=""
                        style={{maxWidth: "200px"}}
                     />
                     <div className="container col justify-content-center align-items-center main-brand">
                        <div className="row justify-content-center align-items-center">
                           <div className="col-md-9 d-flex flex-column justify-content-center align-items-center">
                              <h3>{item.vinyl_name}</h3>
                              <hr />
                              <h4>Ár: ${item.price}</h4>
                           </div>
                           <div className="col-md-3">
                              {/* <input
                                 type="number"
                                 min="1"
                                 onChange={(e) =>
                                    ChangeQuantity(e, item.vinyl_id)
                                 }
                                 value={item.qty}
                                 name={item.vinyl_id}
                              /> */}
                              <div className="flex-column align-items-center">
                                 <button onClick={() => ChangeQuantity(item.vinyl_id, 1)}><FaPlus/></button>
                                 <p className="p-0 m-1 main-brand">Mennyiség: {item.qty}</p>
                                 <button onClick={() => ChangeQuantity(item.vinyl_id, -1)}><FaMinus/></button>
                              </div>
                              <button
                                 className="main-brand purchaseBtn mx-0"
                                 onClick={() => DeleteItem(item.vinyl_id)}
                              >
                                 Törlés
                              </button>
                           </div>

                        </div>
                     </div>
                  </div>
               </div>
            ))
         ) : (
            <div className="flex flex-column justify-content-center align-items-center mb-5">
               <div
                  className="flex flex-column justify-content-center align-items-center w-50"
                  style={{ height: "45vh" }}
               >
                  <img
                     className="sad-cat mt-5"
                     src="./src/assets/cat_crying.png"
                     alt=""
                     style={{ width: "200px" }}
                  />
                  <h4 className="main-brand mt-5">A kosarad üres.</h4>
                  <button
                     className="main-brand purchaseBtn m-3"
                     onClick={() => (window.location.href = "/")}
                  >
                     Bakelitek
                  </button>
               </div>
            </div>
         )}

         <div className="justify-content-center align-items-center d-flex">
            {data.length > 0 ? (
               <div className="align-items-center justify-content-center d-flex flex-column mt-5 w-50">
                  <div className="d-flex align-items-center">
                     <h5 className="main-brand">Teljes ár: </h5>
                     <div className="d-flex align-items-center">
                        <div></div>
                        <h3 className="main-brand">${GetTotalPrice(data)}</h3>
                     </div>
                  </div>
                  <div>
                     <button
                        className="purchaseBtn main-brand m-3"
                        onClick={ClearCart}
                        >
                        Kosár törlése
                     </button>
                     <button className="purchaseBtn main-brand m-3" onClick={() => {window.location.href = "/purchase"}}>
                        Megrendelés
                     </button>
                  </div>
               </div>
            ) : null}
         </div>
      </div>
   );
}

export default Cart;
