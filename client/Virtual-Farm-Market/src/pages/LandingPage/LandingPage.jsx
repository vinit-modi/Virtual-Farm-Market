import React from "react";
import "./Css/LandingPageStyle.css";
import logoImage from "./images/VFM-Logo-NoBG.png";
import bannerImage from "./images/banner.jpg";
import fruit1Image from "./images/fruit1.jpg";
import fruit2Image from "./images/fruit2.jpg";
import fruit3Image from "./images/fruit3.jpg";
import fruit4Image from "./images/fruit4.jpg";
import fruit5Image from "./images/fruit5.jpg";
import fruit6Image from "./images/fruit6.jpg";
import fruit7Image from "./images/fruit7.jpg";
import fruit8Image from "./images/fruit8.jpg";
import veg1Image from "./images/veg01.jpg";
import veg2Image from "./images/veg02.jpg";
import veg3Image from "./images/veg03.jpg";
import veg4Image from "./images/veg04.jpg";
import veg5Image from "./images/veg05.jpg";
import veg6Image from "./images/veg06.jpg";
import veg7Image from "./images/veg07.jpg";
import veg8Image from "./images/veg08.jpg";

function LandingPage() {
  return (
    <div>
      <div className="container">
        <div className="logo">
          <img src={logoImage} alt="logo" width="200px" />
        </div>
        <div className="navbar">
          <ul>
            <li>signUp</li>
            <li>Login</li>
          </ul>
        </div>
      </div>
      <div className="banner">
        <img src={bannerImage} alt="banner" />
      </div>
      <div className="content">
        <div className="img1">
          <div className="slider-wrapper">
            <div className="slider slider-move">
              <img src={fruit1Image} alt="VFM" />
              <img src={fruit2Image} alt="VFM" />
              <img src={fruit3Image} alt="VFM" />
              <img src={fruit4Image} alt="VFM" />
              <img src={fruit5Image} alt="VFM" />
              <img src={fruit6Image} alt="VFM" />
              <img src={fruit7Image} alt="VFM" />
              <img src={fruit8Image} alt="VFM" />
              {/* Add other fruit images */}
            </div>
          </div>
        </div>
        <div className="p1">
          <p>
            Our goal is to provide fresh and organic fruits and vegetables to
            the customer. And we provide both the options like the customer
            wants to pick up the order or wants orders to be delivered at the
            door.
          </p>
        </div>
        <div className="p2">
          <p>
            Our main motto is to connect farmers to local individuals according
            to geolocation so customers can connect to the nearest local
            farmers' market.
          </p>
        </div>
        <div className="img2">
          <div className="slider-wrapper">
            <div className="slider slider-move1">
              <img src={veg1Image} alt="VFM" />
              <img src={veg2Image} alt="VFM" />
              <img src={veg3Image} alt="VFM" />
              <img src={veg4Image} alt="VFM" />
              <img src={veg5Image} alt="VFM" />
              <img src={veg6Image} alt="VFM" />
              <img src={veg7Image} alt="VFM" />
              <img src={veg8Image} alt="VFM" />
              {/* Add other vegetable images */}
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-footer-container">
          <div className="grid">
            <div className="footer-logo">
              <img src={logoImage} alt="VFM Logo" />
            </div>
            <div className="contact-info">
              <p>
                Support Office
                <br />
                1611 600 greenfield ave
                <br />
                Kitchener, Ontario
                <br />
                N2E 4H5
              </p>
              <a href="#">Contact Us</a>
              <a href="#">Career Opportunities Email</a>
            </div>
            <div className="additional-links">
              <a href="#">Contact Us</a>
              <a href="#">Career Opportunities Email</a>
            </div>
            <div className="additional-links">
              <a href="#">Website</a>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
          <div className="copyright-social">
            <p>© 2023 Virtual Farm Market</p>
            <div className="social-icons">
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
