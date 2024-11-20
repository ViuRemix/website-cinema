import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  auth,
  signInWithGoogle,
  signInWithFacebook,
  signInWithGithub,
  signInWithTwitter,
} from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/LoginForm.css";

const LoginForm = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); // Trạng thái lỗi email
  const [passwordError, setPasswordError] = useState(""); // Trạng thái lỗi mật khẩu
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    let isValid = true;

    // Kiểm tra email
    if (!email) {
      setEmailError("Vui lòng nhập email hoặc số điện thoại hợp lệ.");
      isValid = false;
    } else {
      setEmailError(""); // Xóa lỗi nếu email hợp lệ
    }

    // Kiểm tra mật khẩu
    if (!password || password.length < 4 || password.length > 60) {
      setPasswordError("Mật khẩu của bạn phải chứa từ 4 đến 60 ký tự.");
      isValid = false;
    } else {
      setPasswordError(""); // Xóa lỗi nếu mật khẩu hợp lệ
    }

    if (!isValid) return;

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      navigate("/");
      toast.success("Đăng nhập thành công!");
    } catch (error) {
      toast.error("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  };
  // xử lí đăng nhập với gg
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle(setUser, setLoading);
      navigate("/"); /// chuyển trang home khi đăng nhập xong
    } catch (error) {
      console.error("Lỗi khi đăng nhập Google:", error);
    }
  };
  // xử lí đăng nhập với Fb
  const handleFacebookLogin = async () => {
    setLoading(true);
    try {
      await signInWithFacebook(setUser, setLoading);
      navigate("/"); /// chuyển trang home khi đăng nhập xong
    } catch (error) {
      console.error("Lỗi khi đăng nhập Facebook:", error);
    }
  };
  // xử lí đăng nhập với github
  const handleGithubLogin = async () => {
    setLoading(true);
    try {
      await signInWithGithub(setUser, setLoading);
      navigate("/"); /// chuyển trang home khi đăng nhập xong
    } catch (error) {
      console.error("Lỗi khi đăng nhập Github:", error);
    }
  };
  // xử lí đăng nhập với twitter
  const handleTwitterLogin = async () => {
    setLoading(true);
    try {
      await signInWithTwitter(setUser, setLoading);
      navigate("/"); /// chuyển trang home khi đăng nhập xong
    } catch (error) {
      console.error("Error during Twitter login:", error);
    }
  };

  return (
    <div className="group-login-form">
      <h1>CINEMA</h1>
      <div className="login-form">
        <h2>Đăng Nhập</h2>

        <label htmlFor="birthdate">Nhập Email</label>
        {/* Email Input */}
        <div className={`form-floating mb-3 ${emailError ? "error" : ""}`}>
          <input
            type="email"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailError("")} // Ẩn lỗi khi bắt đầu nhập
          />
          {emailError && (
            <p className="error-text">
              <i
                class="bi bi-exclamation-circle"
                style={{ paddingRight: 3 }}
              ></i>
              {emailError}
            </p>
          )}
        </div>
        <label htmlFor="birthdate">Nhập Mật khẩu</label>

        {/* Password Input */}
        <div className={`form-floating ${passwordError ? "error" : ""}`}>
          <input
            type="password"
            id="floatingPassword"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordError("")} // Ẩn lỗi khi bắt đầu nhập
          />
          {passwordError && (
            <p className="error-text">
              {/* icon lỗi */}
              <i
                class="bi bi-exclamation-circle"
                style={{ paddingRight: 3 }}
              ></i>
              {passwordError}
            </p>
          )}
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="btn btn-primary btn-login"
        >
          <i class="bi bi-box-arrow-in-right" style={{ paddingRight: 15 }}></i>
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
              <span className="sr-only"> Đang đăng nhập...</span>
            </>
          ) : (
            "Đăng Nhập"
          )}
        </button>

        <h3>Hoặc</h3>
        <div className="social-login">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="google-btn"
          >
            <i class="bi bi-google"></i>
          </button>
          <button
            onClick={handleFacebookLogin}
            disabled={loading}
            className="facebook-btn"
          >
            <i class="bi bi-facebook"></i>
          </button>
          <button
            onClick={handleGithubLogin}
            disabled={loading}
            className="github-btn"
          >
            <i class="bi bi-github"></i>
          </button>
          <button
            onClick={handleTwitterLogin}
            disabled={loading}
            className="Twitter-btn"
          >
            <i class="bi bi-twitter"></i>
          </button>
        </div>
        {/* Thêm phần dưới */}
        <div className="additional-links">
          <p>
            <Link to="/forgot-password">Bạn quên mật khẩu?</Link>
          </p>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />

            <label className="form-check-label" for="exampleCheck1">
              Ghi nhớ tôi
            </label>
          </div>
          <p>
            Bạn chưa có tài khoản?
            <a href="/sign-up"> Đăng ký ngay.</a>
          </p>
          <Link to="/loginAdmin" className="btn-admin-login">
            <i class="bi bi-shield"></i> Admin
          </Link>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginForm;
