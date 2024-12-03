// Contact.js
import React from "react";
import "../../assets/styles/Contact.css";

const Contact = () => {
  return (
    <div className="container-contact">
      <h1 className="title">Liên hệ với chúng tôi</h1>
      <p>
        Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, vui lòng liên hệ với
        chúng tôi qua các kênh dưới đây.
      </p>
      <h2>Email</h2>
      <p>viu106018@donga.edu.vn</p>
      <p>phuoc106020@donga.edu.vn(Hỗ trợ thanh toán)</p>
      <h2>Điện thoại</h2>
      <p>+84 123 456 789 (Hỗ trợ chung)</p>
      <p>+84 987 654 321 (Hỗ trợ kỹ thuật)</p>
      <h2>Địa chỉ</h2>
      <p>Tầng 10, Trường Đại học Đông Á, 33 Xô Viết Nghệ Tĩnh, Quận Hải Châu, Phường Hoà Cường Nam, TP. Đà Nẵng</p>
      <h2>Giờ làm việc</h2>
      <p>Thứ 2 - Thứ 6: 8:00 - 18:00</p>
      <p>Thứ 7: 8:00 - 12:00</p>
      <p>Chủ nhật và ngày lễ: Nghỉ</p>
    </div>
  );
};

export default Contact;

