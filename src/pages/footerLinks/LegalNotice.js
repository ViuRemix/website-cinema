import React from "react";
import "../../assets/styles/LegalNotice.css";

const LegalNotice = () => {
  return (
    <div className="container-legal-notice">
      <h1>Thông báo pháp lý</h1>
      <p>
        Thông báo pháp lý này cung cấp thông tin về quyền lợi và nghĩa vụ của bạn khi sử dụng dịch vụ của Vieflix. Vui lòng đọc kỹ để hiểu rõ các điều khoản và điều kiện áp dụng.
      </p>
      
      {/* Giới hạn trách nhiệm */}
      <h2>Giới hạn trách nhiệm</h2>
      <p>
        Chúng tôi không chịu trách nhiệm đối với các thiệt hại phát sinh từ việc sử dụng dịch vụ của chúng tôi, bao gồm nhưng không giới hạn ở việc gián đoạn dịch vụ, mất dữ liệu hoặc các vấn đề kỹ thuật khác.
      </p>

      {/* Quyền sở hữu trí tuệ */}
      <h2>Quyền sở hữu trí tuệ</h2>
      <p>
        Tất cả nội dung trên Vieflix, bao gồm văn bản, hình ảnh, video, và logo, đều thuộc quyền sở hữu của Vieflix hoặc các đối tác. Nghiêm cấm sao chép, phân phối hoặc sử dụng lại nội dung mà không có sự cho phép bằng văn bản.
      </p>

      {/* Điều khoản sử dụng */}
      <h2>Điều khoản sử dụng</h2>
      <p>
        Khi sử dụng dịch vụ của Vieflix, bạn đồng ý tuân thủ tất cả các điều khoản và điều kiện được quy định trong thông báo này. Vieflix có quyền thay đổi các điều khoản bất kỳ lúc nào mà không cần thông báo trước.
      </p>

      {/* Chính sách bảo mật */}
      <h2>Chính sách bảo mật</h2>
      <p>
        Vieflix cam kết bảo vệ thông tin cá nhân của người dùng. Để biết thêm chi tiết, vui lòng đọc <a href="/privacy-policy">Chính sách Bảo mật</a> của chúng tôi.
      </p>

      {/* Liên hệ pháp lý */}
      <h2>Liên hệ</h2>
      <p>
        Nếu bạn có câu hỏi hoặc cần hỗ trợ pháp lý, vui lòng liên hệ với chúng tôi qua email: 
        <a href="viu106018@donga.edu.vn"> viu106018@donga.edu.vn</a>
      </p>
    </div>
  );
};

export default LegalNotice;
