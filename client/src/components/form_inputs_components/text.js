import React, { Fragment } from "react";
import "./inputs_componenents.scss";

const TextInputComponent = ({ type, handleChange, label, ...props }) => (
  <div className="w-100">
    {label ? (
      <label className="label form-label" htmlFor={{ type }}>
        {label}
      </label>
    ) : null}
    <input
      {...props}
      id={`${label ? label : ""}`}
      type={type}
      onChange={handleChange}
      className="text__input form-control"
    />
  </div>
);

export default TextInputComponent;
