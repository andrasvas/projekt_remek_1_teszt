import React from "react";
import "./Bakelitek.css";
import "./Cart.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

function Cart() {
   //const userToken = window.localStorage.getItem("userToken")
   const [data, setData] = useState([]);

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

   const ChangeQuantity = (e, vinylId) => {
      const newQty = parseInt(e.target.value, 10);

      if (newQty < 1) return; // Ne engedjünk 0 vagy negatív értéket

      const updatedData = data.map((item) =>
         item.vinyl_id === vinylId ? { ...item, qty: newQty } : item
      );

      setData(updatedData);

      // Küldjük el a szervernek a frissített mennyiséget
      axios.put("http://localhost:5000/update_cart", {
         vinyl_id: vinylId,
         qty: newQty,
     }, {
         withCredentials: true,
     })
     .then((response) => {
         console.log(response.data.message);
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
               <div key={item.vinyl_id} className="card m-3 container">
                  <div className="row">
                     <img
                        className="cart_img border rounded border-black col-3"
                        src={`./src/album_covers/${item.image_path}`}
                        alt=""
                     />
                     <div className="container col bg-info">
                        <div className="row bg-warning justify-content-center align-items-center">
                           <div className="col-8 bg-danger">
                              <h4>{item.vinyl_name}</h4>
                              <p>Ár: {item.price}$</p>
                           </div>
                           <div className="col-4">
                              <input
                                 type="number"
                                 min="1"
                                 onChange={(e) =>
                                    ChangeQuantity(e, item.vinyl_id)
                                 }
                                 value={item.qty}
                                 name={item.vinyl_id}
                              />
                              <button
                                 className="main-brand purchaseBtn mx-2"
                                 onClick={() => DeleteItem(item.vinyl_id)}
                              >
                                 Törlés
                              </button>
                           </div>

                           {/* <div>
                                        <button><FaPlus/></button>
                                        <p>Mennyiség: {item.qty}</p>
                                        <button><FaMinus/></button>
                                    </div> */}
                        </div>
                     </div>
                  </div>
               </div>
            ))
         ) : (
            <div className="flex flex-column justify-content-center align-items-center">
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
                  <h4 className="main-brand mt-5">A kosár üres.</h4>
                  <button
                     className="main-brand purchaseBtn m-3"
                     onClick={() => (window.location.href = "/")}
                  >
                     Bakelitek
                  </button>
               </div>
            </div>
         )}

         <div>
            {data.length > 0 ? (
               <div>
                  <p>Teljes ár: {GetTotalPrice(data)}$</p>
                  <button
                     className="purchaseBtn main-brand m-3"
                     onClick={ClearCart}
                  >
                     Kosár törlése
                  </button>
                  <button className="purchaseBtn main-brand m-3" onClick={() => (window.location.href = "/purchase")}>
                     Megrendelés
                  </button>
               </div>
            ) : null}
         </div>
      </div>
   );
}

export default Cart;
