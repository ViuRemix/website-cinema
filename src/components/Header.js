import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Header.css";
import logoPhim from "./logo-phim.jpg";

import { auth, signInWithGoogle, logOut } from "../firebase"; // Nhớ import hàm logOut từ firebase.js
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const [user, setUser] = useState(null); // Trạng thái người dùng
  const [loading, setLoading] = useState(false); // Trạng thái loading khi đăng nhập
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Trạng thái của dropdown
  const [searchQuery, setSearchQuery] = useState(""); // Lưu giá trị tìm kiếm
  const [movies, setMovies] = useState([]); // Lưu kết quả tìm kiếm phim
  const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng đến trang kết quả tìm kiếm

  // Hàm gọi API tìm kiếm phim
  const searchMovies = async (query) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTJlZjhlZmZmZWFkYmIyNDQ5ZDE1YmEwYWUwMTZmYSIsIm5iZiI6MTczMTU5NzAyMS45NTQ3Nywic3ViIjoiNjczNTdlZWU4MGZkYTZlM2UzNzQyZDc0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.pzUNog-mTfhkP8V2u1hRrHvBw3_lM-upPfc198MXSoc`, /// api key movie
          },
        }
      );
      const data = await response.json();
      setMovies(data.results || []);
      navigate("/", { state: { movies: data.results || [] } }); // Chuyển đến trang Home với dữ liệu phim
    } catch (error) {
      console.error("Lỗi khi gọi API phim:", error);
    }
  };

  // Xử lý khi người dùng nhấn Enter
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      searchMovies(searchQuery); // Gọi API tìm kiếm phim
      navigate(`/search?query=${searchQuery}`);
    }
  };

  // Xử lý khi người dùng click vào biểu tượng tìm kiếm
  const handleSearchClick = () => {
    if (searchQuery.trim() !== "") {
      searchMovies(searchQuery); // Gọi API tìm kiếm phim
      navigate(`/search?query=${searchQuery}`);
    }
  };

  // Lắng nghe sự thay đổi trạng thái đăng nhập người dùng
  useEffect(() => {
    // Kiểm tra xem có thông tin người dùng đã lưu trong localStorage không
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Nếu có thì cập nhật lại state user
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Cập nhật trạng thái user
        localStorage.setItem("user", JSON.stringify(currentUser)); // Lưu thông tin người dùng vào localStorage
      } else {
        setUser(null); // Nếu không có người dùng, set lại user là null
        localStorage.removeItem("user"); // Xóa người dùng khỏi localStorage
      }

      setLoading(false); // Đã xong quá trình xác thực
    });

    return () => unsubscribe(); // Dọn dẹp khi component bị hủy
  }, []);

  // Đăng nhập với Google
  const handleSignIn = async () => {
    setLoading(true); // Bắt đầu loading khi đăng nhập
    await signInWithGoogle(setUser, setLoading); // Truyền setUser và setLoading vào hàm signInWithGoogle
    setLoading(false); // Kết thúc loading khi đăng nhập xong
  };

  // Đăng xuất
  const handleLogout = () => {
    logOut();
    setUser(null); // Đặt lại trạng thái user thành null
    window.location.reload(); // Tải lại trang để cập nhật giao diện
  };

  // Chuyển đổi trạng thái của dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState); // Chuyển trạng thái dropdown
  };

  return (
    <header className="header">
      <div className="header-logo">
        <img src={logoPhim} alt="Logo" className="logo-icon" />
        <span>Cinema</span>
      </div>

      <div className="header-search">
        <input
          type="text"
          placeholder="Tìm kiếm phim hay..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
        <button onClick={handleSearchClick}>
          <i className="bx bx-search"></i>
        </button>
      </div>

      <nav className="header-nav">
        <Link to="/">Trang chủ</Link>
        <div className="dropdown">
          <Link to="/movies">
            Phim
            <i className="bx bx-chevron-down"></i>
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/genres/action">
                Phim Hành động
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/genres/comedy">
                Phim Hài
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/genres/horror">
                Phim Kinh Dị
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/genres/romance">
                Phim Tình Cảm
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/genres/animation">
                Phim Hoạt Hình
              </Link>
            </li>
          </ul>
        </div>

        <div className="dropdown">
          <Link to="/genres">
            Thể loại
            <i className="bx bx-chevron-down"></i>
          </Link>

          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/genres/drama">
                Phim Tâm Lý
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/genres/scifi">
                Phim Khoa Học Viễn Tưởng
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/genres/hollywood">
                Phim Mỹ
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/genres/fantasy">
                Phim Huyền Bí
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/genres/documentary">
                Phim Tài Liệu
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/genres/musical">
                Phim Âm Nhạc
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/genres/family">
                Phim Gia Đình
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/genres/historical">
                Phim Lịch Sử
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/favorites">Yêu thích</Link>
        <Link to="/about">Giới thiệu</Link>
      </nav>

      <div className="header-buttons">
        {loading ? (
          <span>Đang đăng nhập...</span>
        ) : user ? (
          // Nếu đã đăng nhập
          <div className="header-dropdown dropdown">
            <Link
              // to="/"
              className="btn dropdown-toggle"
              id="headerDropdownMenuButton"
              aria-expanded="false"
            >
              Xin chào, {user.displayName || user.email}
            </Link>
            <ul
              className="dropdown-menu"
              aria-labelledby="headerDropdownMenuButton"
            >
              <li>
                {/* đăng xuất */}
                <button onClick={handleLogout} className="dropdown-item info">
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            {/* Hiển thị các nút Login và Signup nếu chưa đăng nhập */}
            <Link to="/login" className="btn login">
              Login
            </Link>
            <Link to="/signup" className="btn signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
