import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Dùng useNavigate để chuyển hướng
import { signInWithEmailAndPassword } from "firebase/auth"; // Import từ Firebase Auth
import {
  auth,
  signInWithGoogle,
  signInWithFacebook,
  signInWithGithub,
} from "../firebase"; // Import các hàm từ firebase.js
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import stylesheet của react-toastify
import "../assets/styles/LoginForm.css"; // Import file CSS

const LoginForm = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Thêm trạng thái loading
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleLogin = async () => {
    try {
      setLoading(true); // Bắt đầu loading
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed in:", user);
      setUser(user); // Cập nhật user vào state
      toast.success("Đăng nhập thành công!"); // Hiển thị thông báo đăng nhập thành công
      navigate("/home"); // Chuyển hướng đến trang home nếu đăng nhập thành công
    } catch (error) {
      console.error("Error signing in:", error.message);
      toast.error("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin."); // Hiển thị thông báo thất bại
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true); // Bắt đầu loading
    await signInWithGoogle(setUser, setLoading); // Truyền setUser và setLoading vào signInWithGoogle
    setLoading(false); // Kết thúc loading khi xong
  };

  const handleFacebookLogin = async () => {
    setLoading(true); // Bắt đầu loading
    await signInWithFacebook(setUser, setLoading); // Truyền setUser và setLoading vào signInWithFacebook
    setLoading(false); // Kết thúc loading khi xong
  };

  const handleGithubLogin = async () => {
    setLoading(true); // Bắt đầu loading
    await signInWithGithub(setUser, setLoading); // Truyền setUser và setLoading vào signInWithGithub
    setLoading(false); // Kết thúc loading khi xong
  };

  return (
    <div className="login-form">
      <h2>Đăng Nhập</h2>
      <input
        type="email"
        placeholder="Nhập email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Nhập mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
      </button>
      <button onClick={handleGoogleLogin} disabled={loading}>
        {loading ? "Đang đăng nhập..." : "Đăng nhập với Google"}
      </button>
      <button onClick={handleFacebookLogin} disabled={loading}>
        {loading ? "Đang đăng nhập..." : "Đăng nhập với Facebook"}
      </button>
      <button onClick={handleGithubLogin} disabled={loading}>
        {loading ? "Đang đăng nhập..." : "Đăng nhập với GitHub"}
      </button>
      <ToastContainer /> {/* Hiển thị các thông báo */}
    </div>
  );
};

export default LoginForm;
