// src/PrivacyPolicy.js
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div>
      <h1>Chính Sách Quyền Riêng Tư</h1>
      <p>Đây là chính sách quyền riêng tư của chúng tôi...</p>
      <p>
        Thông tin chi tiết về cách chúng tôi thu thập và sử dụng dữ liệu người
        dùng...
      </p>

      {/* Thêm phần Chính sách xóa dữ liệu */}
      <p>
        <strong>Chính sách xóa dữ liệu:</strong>
      </p>
      <p>
        Người dùng có quyền yêu cầu xóa dữ liệu cá nhân của họ khỏi hệ thống của
        chúng tôi. Để yêu cầu xóa dữ liệu, vui lòng liên hệ với chúng tôi qua
        email:
        <a href="mailto:viu106018@donga.edu.vn">viu106018@donga.edu.vn</a>
        Chúng tôi cam kết xử lý yêu cầu xóa dữ liệu trong thời gian 30 ngày làm
        việc.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
