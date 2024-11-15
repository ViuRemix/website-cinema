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

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in:", userCredential.user);
      toast.success("Đăng nhập thành công!"); // Hiển thị thông báo đăng nhập thành công
      navigate("/home"); // Chuyển hướng đến trang home nếu đăng nhập thành công
    } catch (error) {
      console.error("Error signing in:", error.message);
      toast.error("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin."); // Hiển thị thông báo thất bại
    }
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
      <button onClick={handleLogin}>Đăng Nhập</button>
      <button onClick={signInWithGoogle}>Đăng nhập với Google</button>
      <button onClick={signInWithFacebook}>Đăng nhập với Facebook</button>
      <button onClick={signInWithGithub}>Đăng nhập với GitHub</button>
      <ToastContainer /> {/* Hiển thị các thông báo */}
    </div>
  );
};

export default LoginForm;
