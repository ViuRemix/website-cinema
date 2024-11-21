import React from "react";

const FormError = ({ error }) => {
  return error ? (
    <p className="text-danger">
      <i className="bi bi-exclamation-circle"></i>
      {error}
    </p>
  ) : null;
};

export default FormError;
