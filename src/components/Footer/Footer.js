import React, { useState } from "react";
import "../../assets/styles/Footer.css";
import FooterLinks from "./FooterLinks";
import LanguageDropdown from "./LanguageDropdown";

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
        <FooterLinks />
        <LanguageDropdown
          showDropdown={showDropdown}
          toggleDropdown={toggleDropdown}
          language={language}
          handleLanguageChange={handleLanguageChange}
        />
        <p className="footer-country">Vieflix Việt Nam</p>
      </div>
    </footer>
  );
};

export default Footer;
