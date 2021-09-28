import React from "react";

const Error = ({ message }) => {
  return (
    <div className="todos-error">
      <h2>{message}</h2>
    </div>
  );
};

export default Error;
