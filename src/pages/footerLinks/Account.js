// Account.js
import React from "react";
import "../../assets/styles/Account.css";

const Account = () => {
  return (
    <div className="container-account">
      <h1>Tài khoản</h1>
      <p>
        Quản lý thông tin tài khoản của bạn. Bạn có thể thay đổi mật khẩu, cập
        nhật thông tin cá nhân hoặc hủy tài khoản.
      </p>
      <button>Chỉnh sửa tài khoản</button>
      <button>Đổi mật khẩu</button>
      <button>Hủy tài khoản</button>
    </div>
  );
};

export default Account;
