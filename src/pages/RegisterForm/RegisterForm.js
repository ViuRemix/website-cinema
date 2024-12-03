import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/styles/RegisterForm.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/Firebase/firebase"; // Đảm bảo đã cấu hình firebase đúng
import InputField from "./InputField"; // Import component
import Checkbox from "./Checkbox"; // Import component
import FormError from "./FormError"; // Import component

const RegisterForm = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [birthdateError, setBirthdateError] = useState("");
  const [agreedError, setAgreedError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFullNameError("");
    setEmailError("");
    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setBirthdateError("");
    setAgreedError("");

    let isValid = true;

    if (!fullName) {
      setFullNameError("Vui lòng nhập họ và tên.");
      isValid = false;
    }
    if (!email) {
      setEmailError("Vui lòng nhập email.");
      isValid = false;
    }
    if (!username) {
      setUsernameError("Vui lòng nhập tên đăng nhập.");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Vui lòng nhập mật khẩu.");
      isValid = false;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Vui lòng xác nhận mật khẩu.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setPasswordError("Mật khẩu và Xác nhận mật khẩu không khớp.");
      isValid = false;
    }
    if (!birthdate) {
      setBirthdateError("Vui lòng chọn ngày sinh.");
      isValid = false;
    }
    if (!agreed) {
      setAgreedError("Bạn phải đồng ý với Điều khoản và Chính sách.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Đăng ký thành công!");
      navigate("/login");

      // Reset form
      setFullName("");
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setBirthdate("");
      setAgreed(false);
    } catch (error) {
      toast.error("Đăng ký thất bại: " + error.message);
    }
  };

  return (
    <div className="complete-register-form">
      <form onSubmit={handleSubmit} className="register-form">
        <h1>Đăng Ký Tài Khoản</h1>

        <InputField
          label="Họ và Tên"
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          onFocus={() => setFullNameError("")}
          error={fullNameError}
        />

        <InputField
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setEmailError("")}
          error={emailError}
        />

        <InputField
          label="Tên đăng nhập"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={() => setUsernameError("")}
          error={usernameError}
        />

        <InputField
          label="Mật khẩu"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setPasswordError("")}
          error={passwordError}
        />

        <InputField
          label="Xác nhận mật khẩu"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onFocus={() => setConfirmPasswordError("")}
          error={confirmPasswordError}
        />

        <div className="form-group">
          <label htmlFor="birthdate">Ngày tháng năm sinh</label>
          <div className="form-brithdate">
            <input
              type="date"
              id="birthdate"
              className="form-control"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              onFocus={() => setBirthdateError("")}
            />
            <FormError error={birthdateError} />
          </div>
        </div>

        <Checkbox
          label="Tôi đồng ý với"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          error={agreedError}
        />

        <div className="btn-actions">
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-box-arrow-right"></i> Đăng Ký
          </button>
        </div>
        <label className="form-login">
          Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>.
        </label>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
