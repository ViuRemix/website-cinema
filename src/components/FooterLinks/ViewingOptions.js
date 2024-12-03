import React from "react";
import "../../assets/styles/ViewingOptions.css";

const ViewingOptions = () => {
  return (
    <div className="container-viewing">
      <h1>Các cách xem</h1>
      <p>
        Tìm hiểu về các lựa chọn xem nội dung trên nền tảng Vieflix, bao gồm
        chất lượng video, phụ đề và các tùy chọn khác.
      </p>
      
      {/* Phần về chất lượng video */}
      <h2>Chất lượng video</h2>
      <p>
        Chúng tôi hỗ trợ các độ phân giải từ 720p đến 4K tùy theo thiết bị và
        kết nối internet của bạn. Bạn có thể điều chỉnh chất lượng video thủ công 
        hoặc để chế độ tự động điều chỉnh dựa trên tốc độ mạng.
      </p>
      
      {/* Phần về phụ đề */}
      <h2>Phụ đề và ngôn ngữ</h2>
      <p>
        Vieflix cung cấp phụ đề và lồng tiếng cho nhiều ngôn ngữ khác nhau, 
        bao gồm tiếng Việt, tiếng Anh và nhiều ngôn ngữ quốc tế khác. Bạn có thể 
        thay đổi phụ đề hoặc ngôn ngữ âm thanh trong phần cài đặt video.
      </p>
      
      {/* Phần về tùy chọn phát video */}
      <h2>Tùy chọn phát video</h2>
      <p>
        Nền tảng hỗ trợ tính năng xem ngoại tuyến. Bạn có thể tải xuống các bộ phim 
        yêu thích để xem khi không có kết nối internet. Ngoài ra, Vieflix cho phép bạn 
        điều chỉnh tốc độ phát video, tạm dừng hoặc tua nhanh chỉ với một cú nhấp chuột.
      </p>

      {/* Phần về kiểm soát của phụ huynh */}
      <h2>Kiểm soát của phụ huynh</h2>
      <p>
        Để đảm bảo an toàn cho trẻ em, Vieflix cung cấp chế độ kiểm soát phụ huynh, 
        giúp bạn giới hạn nội dung không phù hợp và quản lý thời gian xem của trẻ nhỏ.
      </p>
    </div>
  );
};

export default ViewingOptions;

