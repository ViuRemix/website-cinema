import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Header.css";
import logoPhim from "./logo-phim.jpg";

import { signInWithGoogle, signInWithFacebook } from "../firebase";

const Header = ({ user, setUser }) => {
  const [searchQuery, setSearchQuery] = useState(""); // Lưu giá trị tìm kiếm
  const [movies, setMovies] = useState([]); // Lưu kết quả tìm kiếm phim
  const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng đến trang kết quả tìm kiếm

  const [loading, setLoading] = useState(false); // Trạng thái loading

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Trạng thái của dropdown
  // Hàm gọi API tìm kiếm phim
  const searchMovies = async (query) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTJlZjhlZmZmZWFkYmIyNDQ5ZDE1YmEwYWUwMTZmYSIsIm5iZiI6MTczMTU5NzAyMS45NTQ3Nywic3ViIjoiNjczNTdlZWU4MGZkYTZlM2UzNzQyZDc0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.pzUNog-mTfhkP8V2u1hRrHvBw3_lM-upPfc198MXSoc`,
          },
        }
      );
      const data = await response.json();
      setMovies(data.results || []);
      // Chuyển đến trang Home với dữ liệu phim
      navigate("/", { state: { movies: data.results || [] } });
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

  // Sử dụng useEffect để kiểm tra đăng nhập
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, [setUser]); // chỉ chạy một lần khi component render

  const handleSignIn = async () => {
    setLoading(true); // Bắt đầu loading khi đăng nhập
    await signInWithGoogle(setUser, setLoading); // Truyền setUser và setLoading vào hàm signInWithGoogle
    setLoading(false); // Kết thúc loading khi đăng nhập xong
  };

  // CHO ĐĂNG XUẤT
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); // Đặt lại trạng thái user thành null
    window.location.reload(); // Tải lại trang để cập nhật giao diện
  };

  // cho Dropdown
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
            <i class="bx bx-chevron-down"></i>
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
            <i class="bx bx-chevron-down"></i>
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
        ) : user ? ( // Nếu đã đăng nhập
          <div className="header-dropdown dropdown">
            <Link
              to="/movies"
              className="btn dropdown-toggle"
              id="headerDropdownMenuButton"
              onClick={toggleDropdown} // Gọi hàm toggleDropdown khi click
              aria-expanded={isDropdownOpen ? "true" : "false"}
            >
              Xin chào, {user.displayName || user.email}
            </Link>
            <ul
              className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`} // Thêm class show khi dropdown mở
              aria-labelledby="headerDropdownMenuButton"
            >
              <li>
                <button onClick={handleLogout} className="dropdown-item info">
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
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
