import React from "react";
import "./pop.scss";

const Pop = ({ changeImg }) => {
  return (
    <div className="pop-container">
      <h3>select wallpaper</h3>
      <ul>
        <li onClick={() => changeImg(0)}>Robot</li>
        <li onClick={() => changeImg(1)}>Nature 1</li>
        <li onClick={() => changeImg(2)}>Nature 2</li>
        <li onClick={() => changeImg(3)}>Nature 3</li>
        <li onClick={() => changeImg(4)}>Ocean</li>
        <li onClick={() => changeImg(5)}>Car 1</li>
        <li onClick={() => changeImg(6)}>Car 2</li>
        <li onClick={() => changeImg(7)}>Bike</li>
        <li onClick={() => changeImg(8)}>Bicycle</li>
        <li onClick={() => changeImg(9)}>Mountain</li>
      </ul>
    </div>
  );
};

export default Pop;
