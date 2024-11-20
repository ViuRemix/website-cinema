import React, { useState, useEffect } from "react";
import { sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";
import { auth } from "../firebase"; // Đảm bảo đã cấu hình firebase đúng
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom"; // Sử dụng useLocation và useNavigate
import "../assets/styles/ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate(); // Điều hướng sau khi thay đổi mật khẩu
  const location = useLocation(); // Lấy tham số từ URL
  const [step, setStep] = useState(1); // Bước 1: nhập email, Bước 2: nhập mật khẩu mới
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oobCode, setOobCode] = useState(""); // Mã xác nhận nhận từ URL

  // Lấy mã xác nhận (oobCode) từ URL khi trang được tải
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("oobCode");
    console.log("oobCode từ URL:", code); // Kiểm tra mã xác nhận từ URL
    if (code) {
      setOobCode(code); // Cập nhật mã xác nhận từ URL
      setStep(2); // Chuyển sang bước nhập mật khẩu mới
    }
  }, [location]);

  // Gửi mã xác nhận tới email
  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Vui lòng nhập email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Mã xác nhận đã được gửi đến email của bạn.");
      setStep(3); // Chuyển sang bước thông báo
    } catch (error) {
      toast.error("Đã xảy ra lỗi: " + error.message);
    }
  };

  // Xác nhận mã xác nhận và thay đổi mật khẩu
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password); // Dùng mã xác nhận (oobCode) từ URL để thay đổi mật khẩu
      toast.success("Mật khẩu đã được thay đổi thành công.");
      console.log("Chuyển hướng đến login...");
      setStep(1); // Quay lại bước đầu tiên sau khi thay đổi mật khẩu thành công
      navigate("/login"); // Điều hướng đến trang đăng nhập
    } catch (error) {
      toast.error("Đã xảy ra lỗi: " + error.message);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h2>Quên Mật Khẩu</h2>

        {step === 1 && (
          <form onSubmit={handleSendEmail}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                required
              />
            </div>
            <button className="btn-submit" type="submit">
              Gửi Mã Xác Nhận
            </button>
          </form>
        )}

        {step === 3 && (
          <p>
            Đã gửi mã xác nhận! <br />
            Vui lòng kiểm tra email của bạn để xác nhận thay đổi mật khẩu.
          </p>
        )}

        {step === 2 && oobCode && (
          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label>Mật khẩu mới:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới"
                required
              />
            </div>
            <div className="form-group">
              <label>Xác nhận mật khẩu:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Xác nhận mật khẩu"
                required
              />
            </div>
            <button className="btn-submit" type="submit">
              Đặt Lại Mật Khẩu
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
