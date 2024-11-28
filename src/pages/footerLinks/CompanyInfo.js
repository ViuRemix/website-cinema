import React from "react";
import "../../assets/styles/CompanyInfo.css";

const CompanyInfo = () => {
  return (
    <div className="container-company-info">
      <h1>Thông tin doanh nghiệp</h1>
      <p>
        Vieflix là dịch vụ phát trực tuyến hàng đầu, cung cấp các bộ phim, chương
        trình truyền hình và nội dung độc quyền, phục vụ hàng triệu khán giả trên toàn thế giới.
      </p>
      
      {/* Phần về sứ mệnh */}
      <h2>Sứ mệnh của chúng tôi</h2>
      <p>
        Vieflix cam kết mang đến trải nghiệm giải trí tốt nhất, với nội dung đa dạng và chất lượng cao, 
        đáp ứng nhu cầu của mọi đối tượng khán giả.
      </p>

      {/* Phần lịch sử phát triển */}
      <h2>Lịch sử phát triển</h2>
      <p>
        Vieflix được thành lập vào năm 2020 với mục tiêu cung cấp dịch vụ giải trí vượt trội cho người dùng Việt Nam và quốc tế. 
        Từ những ngày đầu, chúng tôi không ngừng mở rộng thư viện nội dung, hợp tác với các nhà sản xuất trong nước và quốc tế.
      </p>

      {/* Phần dịch vụ nổi bật */}
      <h2>Các dịch vụ nổi bật</h2>
      <ul>
        <li>Phát trực tuyến phim và chương trình truyền hình chất lượng cao</li>
        <li>Nội dung độc quyền chỉ có trên Vieflix</li>
        <li>Hỗ trợ phụ đề và lồng tiếng đa ngôn ngữ</li>
        <li>Khả năng xem ngoại tuyến với tính năng tải xuống</li>
      </ul>

      {/* Phần đối tác */}
      <h2>Đối tác của chúng tôi</h2>
      <p>
        Vieflix tự hào hợp tác với các nhà sản xuất nội dung hàng đầu như XYZ Studios, ABC Productions, 
        mang đến cho khán giả những tác phẩm điện ảnh đặc sắc và hấp dẫn.
      </p>

      {/* Phần cam kết */}
      <h2>Cam kết với khách hàng</h2>
      <p>
        Chúng tôi luôn đặt khách hàng làm trung tâm, không ngừng cải tiến công nghệ và dịch vụ để đáp ứng kỳ vọng ngày càng cao của người xem.
      </p>
    </div>
  );
};

export default CompanyInfo;

