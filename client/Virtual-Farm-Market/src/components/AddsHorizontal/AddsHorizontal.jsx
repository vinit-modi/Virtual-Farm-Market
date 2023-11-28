import React from "react";
import "./AddsHorizontal.css";
import img1 from "../../Assets/adds/10001.png";
import img2 from "../../Assets/adds/10002.png";
import img3 from "../../Assets/adds/10003.jpg";

function AddsHorizontal() {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div className="media-scroller snaps-inline">
        <div className="media-elementd">
          <a
            href="https://www.instacart.ca/store/shoppers-drug-mart/storefront"
            target="_blank"
          >
            <img src={img1} alt="img1" className="responsive-img" />
          </a>
        </div>
        <div className="media-elementd">
          <a href="https://www.costco.ca/" target="_blank">
            <img src={img2} alt="img2" className="responsive-img" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default AddsHorizontal;
