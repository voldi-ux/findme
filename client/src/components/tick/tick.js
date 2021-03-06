import React from "react";
import { IconContext } from "react-icons";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import "./tick.scss";

const Tick = ({seen}) => {
  if (seen) {
    return (
      <IconContext.Provider value={{ size: "2rem", className: "green" }}>
        <BsCheckAll />
      </IconContext.Provider>
    );
  }

  return (
    <IconContext.Provider value={{ size: "2rem", className: "grey" }}>
      <BsCheckAll />
    </IconContext.Provider>
  );;
};

export default Tick;
