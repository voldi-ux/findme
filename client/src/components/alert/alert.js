import React from "react";

const Alert = ({ message, type }) => {
  return (
    <div style={{
      color:'#fff'
    }} className={`alert ${type} alert-dismissible fade show`} role="alert">
      <h3>{message}</h3>
    </div>
  );
};

export default Alert;
