// SpeedTest.js
import React from "react";
import "../../assets/styles/SpeedTest.css";

const SpeedTest = () => {
  return (
    <div className="container">
      <h1>Kiểm tra tốc độ Internet</h1>
      <p>
        Kiểm tra tốc độ kết nối internet của bạn với công cụ này. Đảm bảo bạn có
        kết nối ổn định trước khi sử dụng để có kết quả chính xác nhất.
      </p>
      <a href="https://fast.com/" target="_blank" rel="noopener noreferrer">
        <button>Kiểm tra tốc độ</button>
      </a>
    </div>
  );
};

export default SpeedTest;