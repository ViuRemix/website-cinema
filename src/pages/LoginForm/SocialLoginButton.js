import React from "react";

// Component SocialLoginButton nhận vào các props: icon, onClick, disabled
const SocialLoginButton = ({ icon, onClick, disabled }) => {
  return (
    // Nút button, khi nhấn sẽ gọi hàm onClick và có thể bị vô hiệu hóa nếu disabled = true
    <button onClick={onClick} disabled={disabled} className={`${icon}-btn`}>
      <i className={`bi ${icon}`}></i>
    </button>
  );
};

export default SocialLoginButton;
