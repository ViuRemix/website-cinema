import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Header.css";
import logoPhim from "./logo-phim.jpg";

import { auth, signInWithGoogle, logOut } from "../firebase"; // Nhớ import hàm logOut từ firebase.js
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Đảm bảo style cho Toast

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
            Authorization: `Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTJlZjhlZmZmZWFkYmIyNDQ5ZDE1YmEwYWUwMTZmYSIsIm5iZiI6MTczMTg1MjMwMy45MTgwMDYyLCJzdWIiOiI2NzM1N2VlZTgwZmRhNmUzZTM3NDJkNzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.l8pM0QqjZVzqo5gg0Por5R1tqGWhQAzV1wrY7bOoolI`, /// api key movie
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

  // Đăng ký với Google
  const handleSignIn = async () => {
    setLoading(true); // Bắt đầu loading khi đăng nhập
    await signInWithGoogle(setUser, setLoading); // Truyền setUser và setLoading vào hàm signInWithGoogle
    setLoading(false); // Kết thúc loading khi đăng nhập xong
  };

  // Đăng xuất
  const handleLogout = () => {
    logOut(); // Đăng xuất
    setUser(null); // Đặt lại trạng thái user thành null
    toast.success("Đăng xuất thành công!"); // Hiển thị thông báo thành công
    navigate("/"); /// khi đăng xuất xong sẽ chuyển tới trang
    window.location.reload(); // Tải lại trang để cập nhật giao diện
  };

  // Chuyển đổi trạng thái của dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState); // Chuyển trạng thái dropdown
  };
  // END TRÁNG THÁI DROPDOWM

  // Hiện thị allow và mute
  const [isMuted, setIsMuted] = useState(false);
  const [isAllow, setIsAllow] = useState(false);

  // Hàm xử lý khi click vào nút
  const handleToggle = (toggleType) => {
    if (toggleType === "allow") {
      setIsAllow(!isAllow); // Đổi trạng thái Allow
      setIsMuted(false); // Reset Mute
    } else if (toggleType === "mute") {
      setIsMuted(!isMuted); // Đổi trạng thái Mute
      setIsAllow(false); // Reset Allow
    }
  };
  // END ALLOW AND MUTE

  return (
    <header className="header sticky-top">
      <div className="header-logo">
        <Link to="/">
          <img src={logoPhim} alt="Logo" className="logo-icon" />
        </Link>
        <span>Cinema</span>
      </div>

      <div className="input-group mb-3 header-search">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm phim hay..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          aria-label="Tìm kiếm phim hay..."
          aria-describedby="search-icon"
        />
        <button
          className="btn btn-search"
          type="button"
          onClick={handleSearchClick}
        >
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
      {/* user ?    kiểm tra xem user có tồn tại không người dùng có đang đăng nhập không */}
      <div className="header-buttons">
        {loading ? (
          <span>Đang đăng nhập...</span>
        ) : user && user.email ? (
          <div className="header-dropdown dropdown">
            <button
              className="btn dropdown-toggle"
              onClick={toggleDropdown}
              id="headerDropdownMenuButton"
              aria-expanded={isDropdownOpen}
            >
              <img
                src={
                  user.photoURL ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyOel_Kg6LSBouZjynF0WO9JxBmTQR1KOpRg&s"
                }
                alt="User Avatar"
                className="user-avatar"
              />
              Tài Khoản{" "}
              {/* <i
                class="bi bi-person-circle"
                style={{ width: 30, color: "white" }}
              ></i> */}
            </button>
            {isDropdownOpen && (
              <ul
                className="dropdown-menu profile-dropdown"
                aria-labelledby="headerDropdownMenuButton"
              >
                <li className="profile-header">
                  <img
                    src={
                      user.photoURL ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyOel_Kg6LSBouZjynF0WO9JxBmTQR1KOpRg&s"
                    }
                    alt="Avatar"
                    className="profile-avatar"
                  />
                  <span className="profile-name">
                    {user.displayName ||
                      (user.email ? user.email.split("@")[0] : "Tên của bạn")}
                  </span>
                  <div>
                    <span className="profile-email">Email: {user.email}</span>
                  </div>
                </li>
                <li className="dropdown-item">
                  <Link to="/profile">Hồ sơ của tôi</Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/settings">Cài đặt</Link>
                </li>
                <li className="dropdown-item">
                  Thông báo{" "}
                  <div className="btn-group notification-allow">
                    <button
                      type="button"
                      className="btn dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onClick={handleToggle} // Gọi hàm xử lý khi click sẽ hiện cho phép và mute
                    >
                      {isAllow ? "Allow" : isMuted ? "Mute" : "Allow"}{" "}
                      <i class="bi bi-caret-down-fill"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          className="dropdown-item dropdown-item-allow"
                          href="#"
                          onClick={() => handleToggle("allow")} // Gọi toggle cho Allow
                        >
                          {/* khi bấm allow thì hiện allow */}
                          {isAllow ? "Allow" : "Allow"}
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item dropdown-item-allow"
                          href="#"
                          onClick={() => handleToggle("mute")} // Gọi toggle cho Mute
                        >
                          {/* khi bấm mute thì hiện mute */}
                          {isMuted ? "Mute" : "Mute"}
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="dropdown-item logout" onClick={handleLogout}>
                  Đăng xuất{" "}
                  <i class="bx bx-log-out" style={{ paddingRight: "58%" }}></i>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="btn login">
              Đăng Nhập <i class="bi bi-person-square"></i>
            </Link>
          </>
        )}
      </div>
      <ToastContainer />
    </header>
  );
};

export default Header;
