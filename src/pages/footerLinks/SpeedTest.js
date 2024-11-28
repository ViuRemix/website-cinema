import React from "react";
import "../../assets/styles/SpeedTest.css";

const SpeedTest = () => {
  return (
    <div className="container-speedTest">
      <h1 className="heading-speedTest">Kiểm tra tốc độ Internet</h1>
      <p className="paragraph-speedTest">
        Kiểm tra tốc độ kết nối internet của bạn với công cụ này. Đảm bảo bạn có
        kết nối ổn định trước khi sử dụng để có kết quả chính xác nhất.
      </p>
      <a href="https://fast.com/" target="_blank" rel="noopener noreferrer">
        <button className="btn-speedTest">Kiểm tra tốc độ</button>
      </a>
    </div>
  );
};

export default SpeedTest;