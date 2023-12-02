import React, { useEffect, useState } from "react";
import fd1 from "../../Assets/Carousel/fd1.jpg";
import fd2 from "../../Assets/Carousel/fd2.jpg";
import fd3 from "../../Assets/Carousel/fd3.jpg";

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideTo = (index) => {
    setActiveIndex(index);
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const indicatorStyle = {
    background: "#ddd",
    border: "1px solid #888",
    borderRadius: "30%",
    width: "12px",
    height: "12px",
    margin: "0 5px",
    cursor: "pointer",
    opacity: "0.5",
    transition: "opacity 0.3s ease",
  };

  const activeIndicatorStyle = {
    ...indicatorStyle,
    opacity: "1",
  };
  return (
    <div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            onClick={() => handleSlideTo(0)}
            style={activeIndex === 0 ? activeIndicatorStyle : indicatorStyle}
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            onClick={() => handleSlideTo(1)}
            style={activeIndex === 1 ? activeIndicatorStyle : indicatorStyle}
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            onClick={() => handleSlideTo(2)}
            style={activeIndex === 2 ? activeIndicatorStyle : indicatorStyle}
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className={`carousel-item ${activeIndex === 0 ? "active" : ""}`}>
            <img
              src={fd1}
              className="d-block w-100"
              alt={fd1}
              style={{ borderRadius: 20 }}
            />
          </div>
          <div className={`carousel-item ${activeIndex === 1 ? "active" : ""}`}>
            <img
              src={fd2}
              className="d-block w-100"
              alt={fd2}
              style={{ borderRadius: 20 }}
            />
          </div>
          <div className={`carousel-item ${activeIndex === 2 ? "active" : ""}`}>
            <img
              src={fd3}
              className="d-block w-100"
              alt={fd3}
              style={{ borderRadius: 20 }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          onClick={() =>
            setActiveIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1))
          }
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          onClick={() =>
            setActiveIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1))
          }
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
