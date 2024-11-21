import React from "react";

const LanguageDropdown = ({
  showDropdown,
  toggleDropdown,
  language,
  handleLanguageChange,
}) => {
  return (
    <div className="footer-language">
      <button className="footer-language-button" onClick={toggleDropdown}>
        🌐 {language}{" "}
        <span className={`arrow ${showDropdown ? "open" : ""}`}>&#9660;</span>
      </button>
      {showDropdown && (
        <div className="dropdown-menu">
          <div
            className="dropdown-item"
            onClick={() => handleLanguageChange("Tiếng Việt")}
          >
            Tiếng Việt
          </div>
          <div
            className="dropdown-item"
            onClick={() => handleLanguageChange("Tiếng Anh")}
          >
            Tiếng Anh
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
