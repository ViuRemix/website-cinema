// CookieSettings.js
import React from "react";
import "../../assets/styles/CookieSettings.css";

const CookieSettings = () => {
  return (
    <div className="container-cookie">
      <h1>Tùy chọn cookie</h1>
      <p>
        Chúng tôi sử dụng cookie để cải thiện trải nghiệm của bạn trên trang web
        của chúng tôi. Bạn có thể điều chỉnh cài đặt cookie của mình.
      </p>
      <h2>Cài đặt cookie</h2>
        <button>Chấp nhận tất cả</button>
        <button>Tùy chỉnh</button>
    </div>
  );
};

export default CookieSettings;
