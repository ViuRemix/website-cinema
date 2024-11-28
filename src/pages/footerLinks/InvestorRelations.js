import React from "react";
import "../../assets/styles/InvestorRelations.css";

const InvestorRelations = () => {
  return (
    <div className="container-investor">
      <h1>Quan hệ với nhà đầu tư</h1>
      <p>
        Chào mừng đến với trang Quan hệ với nhà đầu tư. Tại đây, bạn sẽ tìm thấy các 
        báo cáo tài chính và các thông tin liên quan đến hoạt động kinh doanh của Vieflix.
      </p>
      
      {/* Phần về báo cáo tài chính */}
      <h2>Báo cáo tài chính</h2>
      <p>
        Chúng tôi cung cấp các báo cáo tài chính hàng quý và hàng năm, minh bạch và chi tiết. 
        Các nhà đầu tư có thể tải xuống báo cáo gần nhất dưới đây:
      </p>
      <ul>
        <li><a href="/reports/Q1-2024.pdf" download>Báo cáo tài chính Quý 1 - 2024</a></li>
        <li><a href="/reports/2023-Annual.pdf" download>Báo cáo tài chính năm 2023</a></li>
      </ul>
      
      {/* Phần về sự kiện nhà đầu tư */}
      <h2>Sự kiện nhà đầu tư</h2>
      <p>
        Tham gia các hội thảo và cuộc họp nhà đầu tư để cập nhật thông tin mới nhất về tình hình hoạt động và chiến lược của Vieflix.
      </p>
      <ul>
        <li><strong>Hội thảo trực tuyến:</strong> Ngày 15 tháng 7 năm 2024</li>
        <li><strong>Cuộc họp cổ đông thường niên:</strong> Ngày 10 tháng 8 năm 2024</li>
      </ul>
      
      {/* Phần về thông tin cổ phiếu */}
      <h2>Thông tin cổ phiếu</h2>
      <p>
        Cổ phiếu Vieflix được giao dịch trên sàn giao dịch chứng khoán TP.HCM (HOSE) với mã chứng khoán <strong>VFLX</strong>. 
        Cập nhật giá cổ phiếu và các thông tin giao dịch tại <a href="https://example.com/vflx-stock" target="_blank" rel="noopener noreferrer">đây</a>.
      </p>

      {/* Thông tin liên hệ */}
      <h2>Liên hệ với chúng tôi</h2>
      <p>
        Để biết thêm thông tin, vui lòng liên hệ đội ngũ Quan hệ Nhà đầu tư:
      </p>
      <p>Email: <a href="viu106018@donga.edu.vn">viu106018@donga.edu.vn.</a></p>
      <p>Điện thoại: +84 123 456 789</p>
    </div>
  );
};

export default InvestorRelations;
