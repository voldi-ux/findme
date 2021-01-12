import React, { Fragment } from "react";
import "./inputs_componenents.scss";

const TextInputComponent = ({ type, handleChange, label,err, ...props }) => (
  <div className="w-100">
    {label ? (
      <label className="label form-label" htmlFor={type}>
        {label}
      </label>
    ) : null}
    <input
    autoComplete='off'
      {...props}
      // id={`${label ? label : ""}`}
      type={type}
      onChange={handleChange}
      className={`text__input form-control ${err? 'error': null}`}
    />
  </div>
);

export default TextInputComponent;
