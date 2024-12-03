import React from "react";

const InputField = ({ label, type, id, value, onChange, onFocus, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="form-floating mb-3">
        <input
          type={type}
          id={id}
          placeholder={label}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
        />
        {error && (
          <p className="text-danger">
            <i className="bi bi-exclamation-circle"></i>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default InputField;
