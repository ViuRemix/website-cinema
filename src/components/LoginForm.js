import React, { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  useEffect(() => {
    // Kiểm tra nếu có người dùng thì chuyển hướng đến trang home
    if (auth.currentUser) {
      navigate("/"); // Chuyển hướng đến trang home khi đã đăng nhập
    }
  }, [navigate]); // Chỉ lắng nghe sự thay đổi của navigate, không cần lắng nghe setUser

  const handleLogin = async () => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user); // Cập nhật user vào state của parent component
      toast.success("Đăng nhập thành công!");

      // Sau khi đăng nhập thành công, chuyển hướng đến trang home
      navigate("/");
    } catch (error) {
      toast.error("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  };
  // xử lý đăng nhập với gg
  const handleGoogleLogin = async () => {
    setLoading(true); // Bắt đầu loading
    await signInWithGoogle(setUser, setLoading); // Truyền setUser và setLoading vào signInWithGoogle
    setLoading(false); // Kết thúc loading khi xong
  };
  // xử lý đăng nhập với Fb
  const handleFacebookLogin = async () => {
    setLoading(true); // Bắt đầu loading
    await signInWithFacebook(setUser, setLoading); // Truyền setUser và setLoading vào signInWithFacebook
    setLoading(false); // Kết thúc loading khi xong
  };
  // xử lý đăng nhập với github
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
