import React from "react";
import "./AddsHorizontal.css";
import img1 from "../../Assets/adds/10001.png";
import img3 from "../../Assets/adds/uber.jpg";

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
          <a href="https://www.ubereats.com/ca" target="_blank">
            <img
              src={img3}
              alt="img3"
              className="responsive-img"
              style={{ marginLeft: 20, borderRadius: 10, width: "90%" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default AddsHorizontal;
