import React from "react";
import "../../assets/styles/TeamOfService.css";

const TermsOfService = () => {
  return (
    <div className="container-service">
      <h1>Điều khoản sử dụng</h1>
      <p>
        Chào mừng bạn đến với ứng dụng của chúng tôi! Khi sử dụng ứng dụng, bạn
        đồng ý với các điều khoản sau đây:
      </p>

      <h2>1. Chấp nhận điều khoản</h2>
      <p>
        Bằng cách truy cập và sử dụng ứng dụng, bạn đồng ý tuân thủ các điều
        khoản và điều kiện này. Nếu bạn không đồng ý, vui lòng ngừng sử dụng ứng
        dụng ngay lập tức.
      </p>

      <h2>2. Quyền và trách nhiệm của người dùng</h2>
      <p>Người dùng có trách nhiệm:</p>
      <ul>
        <li>
          Cung cấp thông tin chính xác, trung thực trong quá trình đăng ký và sử
          dụng.
        </li>
        <li>
          Không thực hiện các hành vi vi phạm pháp luật hoặc gây ảnh hưởng tiêu
          cực đến cộng đồng người dùng.
        </li>
        <li>
          Bảo vệ tài khoản cá nhân, không chia sẻ thông tin đăng nhập với người
          khác.
        </li>
      </ul>

      <h2>3. Sử dụng hợp pháp</h2>
      <p>Bạn không được sử dụng ứng dụng vào các mục đích như:</p>
      <ul>
        <li>
          Phát tán nội dung vi phạm pháp luật, độc hại hoặc không phù hợp.
        </li>
        <li>Thực hiện hành vi lừa đảo hoặc gây hại cho người khác.</li>
        <li>
          Xâm phạm quyền sở hữu trí tuệ hoặc quyền riêng tư của bên thứ ba.
        </li>
      </ul>

      <h2>4. Quyền sở hữu</h2>
      <p>
        Tất cả nội dung, mã nguồn, hình ảnh và tài liệu trên ứng dụng đều thuộc
        quyền sở hữu của chúng tôi và được bảo vệ bởi luật sở hữu trí tuệ. Bạn
        không được sao chép, sử dụng hoặc phát tán mà không có sự đồng ý bằng
        văn bản từ chúng tôi.
      </p>

      <h2>5. Thay đổi điều khoản</h2>
      <p>
        Chúng tôi có quyền thay đổi, cập nhật hoặc bổ sung các điều khoản này
        bất kỳ lúc nào mà không cần thông báo trước. Bạn nên kiểm tra thường
        xuyên để cập nhật các thay đổi mới nhất.
      </p>

      <h2>6. Liên hệ</h2>
      <p>
        Nếu bạn có bất kỳ câu hỏi, góp ý hoặc thắc mắc nào về điều khoản sử
        dụng, vui lòng liên hệ với chúng tôi qua email:{" "}
        <a href="mailto:viu106018@donga.edu.vn">viu106018@donga.edu.vn</a>.
      </p>
    </div>
  );
};

export default TermsOfService;
