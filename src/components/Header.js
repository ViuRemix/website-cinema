import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Header.css";
import logoPhim from "./logo-phim.jpg";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Lưu giá trị tìm kiếm
  const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng đến trang kết quả tìm kiếm

  // Xử lý khi người dùng nhấn Enter
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  // Xử lý khi người dùng click vào biểu tượng tìm kiếm
  const handleSearchClick = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
    }
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
        <Link to="/login" className="btn login">
          Login
        </Link>
        <Link to="/signup" className="btn signup">
          Signup
        </Link>
      </div>
    </header>
  );
};

export default Header;
