import React from "react";

const InputField = ({
  type,
  value,
  onChange,
  error,
  setError,
  placeholder,
}) => {
  return (
    <div className={`form-floating ${error ? "error" : ""}`}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setError("")}
        placeholder={placeholder}
      />
      {error && (
        <p className="error-text">
          <i
            className="bi bi-exclamation-circle"
            style={{ paddingRight: 3 }}
          ></i>
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
