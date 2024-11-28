import React from "react";
import "../../assets/styles/Jobs.css";

const Jobs = () => {
  return (
    <div className="container-jobs">
      <h1>Việc làm</h1>
      <p>
        Chúng tôi luôn tìm kiếm những nhân viên tài năng để gia nhập đội ngũ Vieflix. 
        Hãy khám phá các cơ hội nghề nghiệp và cùng chúng tôi tạo ra những trải nghiệm giải trí tuyệt vời.
      </p>

      {/* Danh sách vị trí tuyển dụng */}
      <h2>Các vị trí đang tuyển dụng</h2>
      <ul className="job-list">
        <li>
          <h3>Developer</h3>
          <p>Mô tả công việc: Phát triển và bảo trì các ứng dụng web của Vieflix.</p>
          <p>Yêu cầu: Kinh nghiệm với React, Node.js, và cơ sở dữ liệu SQL.</p>
          <p>Địa điểm: TP.HCM</p>
        </li>
        <li>
          <h3>Designer</h3>
          <p>Mô tả công việc: Thiết kế giao diện người dùng (UI/UX) cho các ứng dụng và website của Vieflix.</p>
          <p>Yêu cầu: Thành thạo các công cụ thiết kế như Figma, Adobe XD.</p>
          <p>Địa điểm: Hà Nội</p>
        </li>
        <li>
          <h3>Marketing Specialist</h3>
          <p>Mô tả công việc: Lên kế hoạch và triển khai các chiến dịch tiếp thị.</p>
          <p>Yêu cầu: Kinh nghiệm trong lĩnh vực marketing digital, SEO.</p>
          <p>Địa điểm: Làm việc từ xa</p>
        </li>
      </ul>

      {/* Thông tin ứng tuyển */}
      <h2>Cách thức ứng tuyển</h2>
      <p>
        Gửi CV và thư ứng tuyển của bạn đến địa chỉ email: <a href="viu106018@donga.edu.vn">jobs@vieflix.com</a>
      </p>
      <p>Chúng tôi sẽ liên hệ với các ứng viên phù hợp trong thời gian sớm nhất.</p>
    </div>
  );
};

export default Jobs;
