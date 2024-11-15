import React, { useState } from "react";
import "../assets/styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [language, setLanguage] = useState("Tiếng Việt");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setShowDropdown(false);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-question">
          Bạn có câu hỏi? <a href="#">Liên hệ với chúng tôi.</a>
        </p>
        <div className="footer-links">
          <div className="footer-column">
            <Link to="/faq">Câu hỏi thường gặp</Link>
            <Link to="/investor-relations">Quan hệ với nhà đầu tư</Link>
            <Link to="/privacy-policy">Quyền riêng tư</Link>
            <Link to="/speed-test">Kiểm tra tốc độ</Link>
          </div>
          <div className="footer-column">
            <Link to="/help-center">Trung tâm trợ giúp</Link>
            <Link to="/jobs">Việc làm</Link>
            <Link to="/cookie-settings">Tùy chọn cookie</Link>
            <Link to="/legal-notice">Thông báo pháp lý</Link>
          </div>
          <div className="footer-column">
            <Link to="/account">Tài khoản</Link>
            <Link to="/viewing-options">Các cách xem</Link>
            <Link to="/company-info">Thông tin doanh nghiệp</Link>
            <Link to="/exclusives">Chỉ có trên Vieflix</Link>
          </div>
          <div className="footer-column">
            <Link to="/media-center">Trung tâm đa phương tiện</Link>
            <Link to="/terms">Điều khoản sử dụng</Link>
            <Link to="/contact">Liên hệ với chúng tôi</Link>
            <Link to="/privacy-policy" className="App-link">
              Chính Sách Quyền Riêng Tư
            </Link>
          </div>
        </div>
        <div className="footer-language">
          <button className="footer-language-button" onClick={toggleDropdown}>
            🌐 {language}{" "}
            <span className={`arrow ${showDropdown ? "open" : ""}`}>
              &#9660;
            </span>
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
        <p className="footer-country">Vieflix Việt Nam</p>
      </div>
    </footer>
  );
};

export default Footer;
