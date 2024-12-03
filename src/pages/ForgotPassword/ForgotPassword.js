import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EmailForm from "./EmailForm";
import PasswordResetForm from "./PasswordResetForm";
import ConfirmationMessage from "./ConfirmationMessage";
import { sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";
import { auth } from "../../utils/Firebase/firebase"; // Đảm bảo đã cấu hình firebase đúng
import { toast } from "react-toastify";
import "../../assets/styles/ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1); // Bước 1: nhập email, Bước 2: nhập mật khẩu mới
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oobCode, setOobCode] = useState(""); // Mã xác nhận từ URL

  // Lấy mã xác nhận từ URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("oobCode");
    if (code) {
      setOobCode(code);
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
      await confirmPasswordReset(auth, oobCode, password);
      toast.success("Mật khẩu đã được thay đổi thành công.");
      setStep(1); // Quay lại bước đầu tiên sau khi thay đổi mật khẩu thành công
      navigate("/login");
    } catch (error) {
      toast.error("Đã xảy ra lỗi: " + error.message);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h2>Quên Mật Khẩu</h2>
        {step === 1 && (
          <EmailForm
            email={email}
            setEmail={setEmail}
            handleSendEmail={handleSendEmail}
          />
        )}
        {step === 3 && <ConfirmationMessage />}
        {step === 2 && oobCode && (
          <PasswordResetForm
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            handleResetPassword={handleResetPassword}
          />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
