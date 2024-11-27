import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  auth,
  signInWithGoogle,
  signInWithFacebook,
  signInWithGithub,
  signInWithTwitter,
} from "../../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/styles/LoginForm.css";
import InputField from "./InputField"; // Import InputField component
import SocialLoginButton from "./SocialLoginButton"; // Import SocialLoginButton component

const LoginForm = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    let isValid = true;

    if (!email) {
      setEmailError("Vui lòng nhập email hoặc số điện thoại hợp lệ.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password || password.length < 4 || password.length > 60) {
      setPasswordError("Mật khẩu của bạn phải chứa từ 4 đến 60 ký tự.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) return;

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      navigate("/");
      toast.success("Đăng nhập thành công!");
    } catch (error) {
      toast.error("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group-login-form">
      <h1>CINEMA</h1>
      <div className="login-form">
        <h2>Đăng Nhập</h2>
        <label htmlFor="email">Nhập email</label>
        <InputField
          type="email"
          id="email"
          name="email"
          value={email}
          placeholder="Vui lòng nhập email"
          onChange={setEmail}
          error={emailError}
          setError={setEmailError}
        />
        <label htmlFor="password">Nhập mật khẩu</label>
        <InputField
          type="password"
          id="password"
          name="password"
          placeholder="Nhập tên đăng nhập"
          value={password}
          onChange={setPassword}
          error={passwordError}
          setError={setPasswordError}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="btn btn-primary btn-login"
        >
          <i
            className="bi bi-box-arrow-in-right"
            style={{ paddingRight: 15 }}
          ></i>
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
          <SocialLoginButton
            icon="bi-google"
            onClick={() => signInWithGoogle(setUser, navigate)} // Truyền navigate vào hàm đăng nhập
            disabled={loading}
          />
          <SocialLoginButton
            icon="bi-facebook"
            onClick={() => signInWithFacebook(setUser, navigate)}
            disabled={loading}
          />
          <SocialLoginButton
            icon="bi-github"
            onClick={() => signInWithGithub(setUser, navigate)}
            disabled={loading}
          />
          <SocialLoginButton
            icon="bi-twitter"
            onClick={() => signInWithTwitter(setUser, navigate)}
            disabled={loading}
          />
        </div>

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
            <label className="form-check-label" htmlFor="exampleCheck1">
              Ghi nhớ tôi
            </label>
          </div>
          <p>
            Bạn chưa có tài khoản?
            <a href="/sign-up"> Đăng ký ngay.</a>
          </p>
          <Link to="/loginAdmin" className="btn-admin-login">
            <i className="bi bi-shield"></i> Admin
          </Link>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginForm;
