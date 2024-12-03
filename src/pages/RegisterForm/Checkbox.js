import React from "react";
import { Link } from "react-router-dom";

const Checkbox = ({ label, checked, onChange, error }) => {
  return (
    <div className="form-check">
      <div>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          checked={checked}
          onChange={onChange}
        />
      </div>
      <div>
        <label
          htmlFor="flexCheckDefault"
          className="form-check-label"
          style={{ color: "white" }}
        >
          {label}
          <Link to="/terms" style={{ paddingLeft: 10 }}>
            Điều khoản và Chính sách
          </Link>
          .
        </label>
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
};

export default Checkbox;
