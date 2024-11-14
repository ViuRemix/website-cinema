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
            <a href="#">Câu hỏi thường gặp</a>
            <a href="#">Quan hệ với nhà đầu tư</a>
            <a href="#">Quyền riêng tư</a>
            <a href="#">Kiểm tra tốc độ</a>
          </div>
          <div className="footer-column">
            <a href="#">Trung tâm trợ giúp</a>
            <a href="#">Việc làm</a>
            <a href="#">Tùy chọn cookie</a>
            <a href="#">Thông báo pháp lý</a>
          </div>
          <div className="footer-column">
            <a href="#">Tài khoản</a>
            <a href="#">Các cách xem</a>
            <a href="#">Thông tin doanh nghiệp</a>
            <a href="#">Chỉ có trên Vieflix</a>
          </div>
          <div className="footer-column">
            <a href="#">Trung tâm đa phương tiện</a>
            <a href="#">Điều khoản sử dụng</a>
            <a href="#">Liên hệ với chúng tôi</a>
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
