// HelpCenter.js
import React from "react";
import "../../assets/styles/HelpCenter.css";

const HelpCenter = () => {
  return (
    <div className="container-help-center">
      <header className="help-center-header">
        <h1>Trung tâm trợ giúp</h1>
        <p>
          Chào mừng bạn đến với Trung tâm trợ giúp! Chúng tôi ở đây để giải đáp mọi thắc mắc của bạn.
        </p>
      </header>

      <nav className="help-center-navigation">
        <ul>
          <li><a href="#service-guides">Hướng dẫn sử dụng dịch vụ</a></li>
          <li><a href="#account-info">Thông tin tài khoản</a></li>
          <li><a href="#payment-issues">Vấn đề thanh toán</a></li>
          <li><a href="#contact-support">Liên hệ hỗ trợ</a></li>
        </ul>
      </nav>

      <section id="service-guides" className="help-section">
        <h2>Hướng dẫn sử dụng dịch vụ</h2>
        <p>
          Tìm hiểu cách sử dụng dịch vụ của chúng tôi, bao gồm cách xem phim, tải ứng dụng và nhiều thông tin khác.
        </p>
      </section>

      <section id="account-info" className="help-section">
        <h2>Thông tin tài khoản</h2>
        <p>
          Cách quản lý tài khoản của bạn, đặt lại mật khẩu hoặc thay đổi thông tin cá nhân.
        </p>
      </section>

      <section id="payment-issues" className="help-section">
        <h2>Vấn đề thanh toán</h2>
        <p>
          Giải đáp các vấn đề liên quan đến thanh toán, hoàn tiền và hóa đơn.
        </p>
      </section>

      <section id="contact-support" className="help-section">
        <h2>Liên hệ hỗ trợ</h2>
        <p>
          Nếu bạn không tìm thấy câu trả lời, hãy <a href="/contact">liên hệ với chúng tôi</a>.
        </p>
      </section>

      <footer className="help-center-footer">
        <p>&copy; 2024 MovieStream. Mọi quyền được bảo lưu.</p>
      </footer>
    </div>
  );
};

export default HelpCenter;

