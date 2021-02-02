import React from "react";
import "./pop.scss";

const Pop = ({ changeImg }) => {
  return (
    <div className="pop-container">
      <h3>select wallpaper</h3>
      <ul>
        <li onClick={() => changeImg(0)}>Mountain</li>
        <li onClick={() => changeImg(1)}>Robot</li>
        <li onClick={() => changeImg(2)}>Nature 1</li>
        <li onClick={() => changeImg(3)}>Nature 2</li>
        <li onClick={() => changeImg(4)}>Nature 3</li>
        <li onClick={() => changeImg(5)}>Ocean</li>
        <li onClick={() => changeImg(6)}>Car 1</li>
        <li onClick={() => changeImg(7)}>Car 2</li>
        <li onClick={() => changeImg(8)}>Bike</li>
        <li onClick={() => changeImg(9)}>Bicycle</li>
      </ul>
    </div>
  );
};

export default Pop;
