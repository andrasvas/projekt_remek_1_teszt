import '../css/Navbar.css'
import '../css/Bakelitek.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import snpLogo from "../assets/cat_sleeping.png";
import {
   FaTwitter,
   FaFacebook,
   FaYoutube,
   FaInstagram,
   FaTiktok,
   FaGithub,
} from "react-icons/fa";

function Footer() {
   return (
      <nav className="w-100 m-auto mt-5" style={{ height: "150px" }}>
         <div className="d-flex flex-column justify-content-center align-items-center ">
            <div
               className="justify-content-center m-0"
               style={{ width: "auto" }}
            >
               <a className="m-0" href="/">
                  <img
                     className="cat-sleeping justify-content-center"
                     style={{ width: "80px" }}
                     src={snpLogo}
                     alt=""
                  />
               </a>
            </div>

            <div className="pa3 flex items-center justify-between w-md-50 mt-0 pt-0">
               <div className="mb-4 col-md-2 col-sm-4">
                  <a
                     target="_blank"
                     rel="noopener noreferrer"
                     href="https://facebook.com"
                  >
                     <FaFacebook className="black-icon" />
                  </a>
               </div>
               <div className="mb-4 col-md-2 col-sm-4">
                  <a
                     target="_blank"
                     rel="noopener noreferrer"
                     href="https://instagram.com"
                  >
                     <FaInstagram className="black-icon" />
                  </a>
               </div>
               <div className="mb-4 col-md-2 col-sm-4">
                  <a
                     target="_blank"
                     rel="noopener noreferrer"
                     href="https://vm.tiktok.com/ZNddPsL1x/"
                  >
                     <FaTiktok className="black-icon" />
                  </a>
               </div>
               <div className="mb-4 col-md-2 col-sm-4">
                  <a
                     target="_blank"
                     rel="noopener noreferrer"
                     href="https://x.com"
                  >
                     <FaTwitter className="black-icon" />
                  </a>
               </div>
               <div className="mb-4 col-md-2 col-sm-4">
                  <a
                     target="_blank"
                     rel="noopener noreferrer"
                     href="https://www.youtube.com/@FreestyleMaci"
                  >
                     <FaYoutube className="black-icon" />
                  </a>
               </div>
               <div className="mb-4 col-md-2 col-sm-4">
                  <a
                     target="_blank"
                     rel="noopener noreferrer"
                     href="https://github.com/andrasvas/projekt_remek_1_teszt"
                  >
                     <FaGithub className="black-icon" />
                  </a>
               </div>
            </div>
         </div>
      </nav>
   );
}

export default Footer;
