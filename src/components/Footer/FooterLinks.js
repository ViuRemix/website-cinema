import React from "react";
import { Link } from "react-router-dom";

const FooterLinks = () => {
  return (
    <div className="footer-links">
      <div className="footer-column">
        <Link to="/faq">Câu hỏi thường gặp</Link>
        <Link to="/investor-relations">Quan hệ với nhà đầu tư</Link>
        <Link to="/privacy-policy">Chính Sách quyền riêng tư</Link>
      </div>
      <div className="footer-column">
        <Link to="/jobs">Việc làm</Link>
        <Link to="/cookie-settings">Tùy chọn cookie</Link>
        <Link to="/legal-notice">Thông báo pháp lý</Link>
      </div>
      <div className="footer-column">
        <Link to="/viewing-options">Các cách xem</Link>
        <Link to="/company-info">Thông tin doanh nghiệp</Link>
        <Link to="/speed-test">Kiểm tra tốc độ</Link>
      </div>
      <div className="footer-column">
        <Link to="/help-center">Trung tâm trợ giúp</Link>
        <Link to="/terms">Điều khoản sử dụng</Link>
        <Link to="/contact">Liên hệ với chúng tôi</Link>
      </div>
    </div>
  );
};

export default FooterLinks;
