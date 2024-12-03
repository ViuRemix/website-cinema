import React from "react";
import "./About.css"; // Import CSS tương ứng
import Person1 from "../../assets/images/person1.jpg";
import Person2 from "../../assets/images/person2.jpg";
import Person3 from "../../assets/images/person3.jpg";

const About = () => {
  return (
    <div className="about-container">
      <h1>Về Chúng Tôi</h1>
      <p>
        Chào mừng bạn đến với Cinema - nơi cung cấp những bộ phim chất lượng cao và cập nhật mới nhất.
        Chúng tôi cam kết mang đến cho bạn trải nghiệm giải trí tốt nhất với nhiều thể loại phim đa dạng.
      </p>
      <h2>Sứ mệnh của chúng tôi</h2>
      <p>
        Cinema không chỉ đơn thuần là một trang web xem phim, mà còn là nơi kết nối cộng đồng yêu phim.
        Chúng tôi không ngừng nỗ lực để cập nhật những bộ phim hot nhất, đa dạng nhất để phục vụ khán giả.
      </p>
      <h2>Nhóm phát triển</h2>
      <div className="team-container">
        {/* Thành viên 1 */}
        <div className="team-member">
          <a href="https://www.facebook.com/profile.php?id=61550775620347&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
            <img src={Person2} alt="Rmah Viu"/>
          </a>
          <h3>Rmah Viu</h3>
          <p>Member</p>
          <p>"Luôn tìm kiếm giải pháp tối ưu cho hệ thống backend hiệu quả."</p>
        </div>
        {/* Thành viên 2 */}
        <div className="team-member">
          <a href="https://www.facebook.com/NguyenPhuocHaya" target="_blank" rel="noopener noreferrer">
            <img src={Person1} alt="Nguyễn Thanh Phước" />
          </a>
          <h3>Nguyễn Thanh Phước</h3>
          <p>Leader</p>
          <p>"Đam mê xây dựng giao diện người dùng trực quan và mượt mà."</p>
        </div>
        {/* Thành viên 3 */}
        <div className="team-member">
          <a href="https://www.facebook.com/profile.php?id=100053351203767" target="_blank" rel="noopener noreferrer">
            <img src={Person3} alt="Phan Thanh Huy" />
          </a>
          <h3>Phan Thanh Huy</h3>
          <p>Member</p>
          <p>"Tạo nên những trải nghiệm người dùng độc đáo và thân thiện."</p>
        </div>
      </div>
      <h2>Liên hệ</h2>
      <p>Email: support@cinema.com</p>
      <p>Hotline: 1900-123-456</p>
    </div>
  );
};

export default About;

