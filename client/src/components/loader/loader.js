import React from "react";
import "./loader.scss";

const Loader = () => {
  return (
    <div className="preloader-container">
    <div className="preloader js-preloader flex-center">
      <div className="dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  </div>
  );
};

export default Loader;
