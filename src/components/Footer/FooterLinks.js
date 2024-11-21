import React from "react";
import { Link } from "react-router-dom";

const FooterLinks = () => {
  return (
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
  );
};

export default FooterLinks;
