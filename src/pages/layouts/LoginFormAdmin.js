import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginFormAdmin.css";
// Import thư viện ToastContainer nếu cần thông báo toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginFormAdmin({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading1, setLoading1] = useState(false); // Đổi tên state loading thành loading1
  const navigate = useNavigate();

  // Admin đăng nhập
  const users = [
    { username: "viu@12345", password: "viu123", role: "admin" },
    { username: "admin1@12345", password: "admin123", role: "admin" },
    { username: "admin2@12345", password: "admin456", role: "admin" },
  ];

  // Hàm đăng nhập
  const handleLogin = () => {
    if (!username || !password) {
      setErrorMessage("Vui lòng nhập email và mật khẩu.");
    } else {
      setLoading1(true); // Bắt đầu quá trình đăng nhập, hiển thị loading
      setErrorMessage(""); // Xóa thông báo lỗi khi người dùng bắt đầu nhập lại

      // Loại bỏ khoảng trắng thừa và chuyển tất cả về chữ thường
      const normalizedUsername = username.trim().toLowerCase();
      const normalizedPassword = password.trim();

      // Kiểm tra xem tài khoản có hợp lệ không
      const user = users.find(
        (user) =>
          user.username.toLowerCase() === normalizedUsername &&
          user.password === normalizedPassword
      );

      if (user) {
        // Chờ 2 giây trước khi điều hướng đến trang admin
        setTimeout(() => {
          const loggedInUser = {
            username: user.username,
            role: user.role,
          };
          console.log("Logged in user:", loggedInUser); // Kiểm tra trạng thái user

          setUser(loggedInUser); // Cập nhật state người dùng
          navigate("/admin"); // Điều hướng tới trang admin
        }, 2000); // Đợi 2 giây trước khi chuyển trang
      } else {
        setErrorMessage("Tài khoản hoặc mật khẩu không đúng."); // Set lỗi nếu đăng nhập sai
        toast.error("Tài khoản hoặc mật khẩu không đúng!"); // Thông báo lỗi bằng Toast
      }
    }
  };

  return (
    <div className="admin-group-login-form">
      <div className="admin-login-form">
        <h2>Đăng Nhập</h2>

        {/* Username Input */}
        <div
          className={`admin-form-floating mb-3 ${
            errorMessage ? "admin-error" : ""
          }`}
        >
          <label htmlFor="admin-floatingInput">Email</label>

          <input
            type="email"
            className="admin-form-control"
            id="admin-floatingInput"
            placeholder="name@example.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setErrorMessage("")} // Ẩn lỗi khi bắt đầu nhập
          />
          {errorMessage && (
            <p className="admin-error-text">
              <i
                className="bi bi-exclamation-circle"
                style={{ paddingRight: 3 }}
              ></i>
              {errorMessage}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div
          className={`admin-form-floating ${errorMessage ? "admin-error" : ""}`}
        >
          <label htmlFor="admin-floatingPassword">Mật khẩu</label>

          <input
            type="password"
            className="admin-form-control"
            id="admin-floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setErrorMessage("")} // Ẩn lỗi khi bắt đầu nhập
          />
          {errorMessage && (
            <p className="admin-error-text">
              <i
                className="bi bi-exclamation-circle"
                style={{ paddingRight: 3 }}
              ></i>
              {errorMessage}
            </p>
          )}
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading1} // Vô hiệu hóa nút khi đang loading
          className="admin-btn admin-btn-primary admin-btn-login"
        >
          {loading1 ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
              <span className="loading-text">Đang đăng nhập...</span>{" "}
              {/* Thêm phần văn bản hiển thị */}
            </>
          ) : (
            "Đăng Nhập"
          )}
        </button>

        {/* Thông báo Toast */}
        <ToastContainer />
      </div>
    </div>
  );
}

export default LoginFormAdmin;
