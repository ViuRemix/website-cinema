import React from "react";
import "../../assets/styles/Footer.css";
import FooterLinks from "./FooterLinks";

const Footer = () => {

  return (
    <footer className="footer">
      <div className="footer-container">
      <p className="footer-question">  
        Bạn có câu hỏi? <a href="/contact">Liên hệ với chúng tôi.</a>  
      </p>
        <FooterLinks />
        <p className="footer-country">Vieflix Việt Nam</p>
      </div>
    </footer>
  );
};

export default Footer;
