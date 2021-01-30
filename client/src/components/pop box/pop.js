import React from "react";
import "./pop.scss";

const Pop = ({changeImg}) => {
    
  return (
    <div className="pop-container">
      <h3>select wallpaper</h3>
      <ul>
        <li onClick={() => changeImg(0)}>Robot</li>
        <li onClick={() => changeImg(1)}>Burger</li>
        <li onClick={() => changeImg(2)}>Computer</li>
      </ul>
    </div>
  );
};

export default Pop;
