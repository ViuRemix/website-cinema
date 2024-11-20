import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/RegisterForm.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Import từ file cấu hình Firebase

const RegisterForm = () => {
  const navigate = useNavigate(); ///chuyển đến trang login khi đăng ký thành công
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

    // Kiểm tra tính hợp lệ của form
    let isValid = true;

    if (!fullName) {
      setFullNameError("Vui lòng nhập họ và tên.");
      isValid = false;
    } else {
      setFullNameError("");
    }

    if (!email) {
      setEmailError("Vui lòng nhập email.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!username) {
      setUsernameError("Vui lòng nhập tên đăng nhập.");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Vui lòng nhập mật khẩu.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Vui lòng xác nhận mật khẩu.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setPasswordError("Mật khẩu và Xác nhận mật khẩu không khớp.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
      setPasswordError("");
    }

    if (!birthdate) {
      setBirthdateError("Vui lòng chọn ngày sinh.");
      isValid = false;
    } else {
      setBirthdateError("");
    }

    if (!agreed) {
      setAgreedError("Bạn phải đồng ý với Điều khoản và Chính sách.");
      isValid = false;
    } else {
      setAgreedError("");
    }

    if (!isValid) {
      return;
    }

    // Tích hợp Firebase
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Đăng ký thành công!");
      navigate("/"); /// chuyển trang login khi đăng nhập xong

      // Xóa dữ liệu form sau khi đăng ký thành công
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

        {/* Họ và Tên */}
        <div className="form-group">
          <label htmlFor="fullName">Họ và Tên</label>
          <div className="form-floating mb-3">
            <input
              type="text"
              id="floatingInput fullName"
              placeholder="Nhập họ và tên"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onFocus={() => setFullNameError("")} // Ẩn l
            />

            {fullNameError && (
              <p className="text-danger">
                <i class="bi bi-exclamation-circle"></i>
                {fullNameError}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="form-floating mb-3">
            <input
              type="email"
              id="floatingInput email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailError("")} // Ẩn l
            />

            {emailError && (
              <p className="text-danger">
                <i class="bi bi-exclamation-circle"></i>
                {emailError}
              </p>
            )}
          </div>
        </div>

        {/* Tên đăng nhập */}
        <div className="form-group">
          <label htmlFor="username">Tên đăng nhập</label>
          <div className="form-floating mb-3">
            <input
              id="floatingInput username"
              type="text"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setUsernameError("")} // Ẩn l
            />

            {usernameError && (
              <p className="text-danger">
                <i class="bi bi-exclamation-circle"></i>
                {usernameError}
              </p>
            )}
          </div>
        </div>

        {/* Mật khẩu */}
        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <div className="form-floating">
            <input
              type="password"
              id="floatingPassword password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordError("")} // Ẩn l
            />

            {passwordError && (
              <p className="text-danger">
                <i class="bi bi-exclamation-circle"></i>
                {passwordError}
              </p>
            )}
          </div>
        </div>

        {/* Xác nhận mật khẩu */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
          <div className="form-floating">
            <input
              type="password"
              id="confirmPassword floatingPassword"
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setConfirmPasswordError("")} // Ẩn l
            />

            {confirmPasswordError && (
              <p className="text-danger">
                <i class="bi bi-exclamation-circle"></i>
                {confirmPasswordError}
              </p>
            )}
          </div>
        </div>

        {/* Ngày tháng sinh */}
        <div className="form-group">
          <label htmlFor="birthdate">Ngày tháng năm sinh</label>
          <div className="form-brithdate">
            <input
              type="date"
              id="birthdate"
              className="form-control"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              onFocus={() => setBirthdateError("")} // Ẩn l
            />

            {birthdateError && (
              <p className="text-danger">
                <i class="bi bi-exclamation-circle"></i>
                {birthdateError}
              </p>
            )}
          </div>
        </div>

        {/* Điều khoản và Chính sách và form check cho nó */}
        <div className="form-check">
          <div>
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              onFocus={() => setAgreedError("")} // Ẩn l
            />
          </div>
          <div>
            <label
              htmlFor="flexCheckDefault"
              className="form-check-label"
              style={{ color: "white" }}
            >
              Tôi đồng ý với{" "}
              <Link to="/terms" style={{ paddingLeft: 10 }}>
                Điều khoản và Chính sách
              </Link>
              .
            </label>
            {agreedError && <p className="text-danger">{agreedError}</p>}
          </div>
        </div>

        {/* Nút gửi form */}
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
