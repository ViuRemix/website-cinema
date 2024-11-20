import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

import { db } from "../../firebase";
// Import cấu hình Firebase
import { addDoc, getDocs, collection } from "firebase/firestore";

// hiện thị thông báo
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Dashboard = () => {
  // Hiện thị thông báo thành công khi thêm người dùng
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  //   hàm check

  // Hàm handleLogout để thực hiện đăng xuất
  const handleLogout = () => {
    // Thực hiện các thao tác cần thiết khi đăng xuất
    // Ví dụ: Xóa thông tin đăng nhập khỏi localStorage hoặc context

    // Điều hướng về trang đăng nhập
    navigate("/login");
  };
  const [selectedItem, setSelectedItem] = useState("Bảng điều khiển"); // Quản lý mục đang chọn (Ví dụ: "Thêm người dùng", "Người dùng")
  const [movies, setMovies] = useState([
    {
      name: "Game Of Thrones",
      description:
        "Một bộ phim hành động, giả tưởng với những cuộc chiến tranh quyền lực.",
      poster:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfz7f7nusorkYc3reuVpoWgMs1VxFODSpajA&s",
      trailer: "https://via.placeholder.com/150",
      category: "Hành động",
      actors: "Emilia Clarke, Kit Harington",
      director: "David Benioff, D.B. Weiss",
      year: 2011,
      duration: "60 phút",
      quality: "HD",
      language: "Tiếng Anh",
    },
    {
      name: "The Beast",
      description: "Một bộ phim kinh dị về những sự kiện kỳ bí trong rừng rậm.",
      poster:
        "https://vnptmedia.vn/file/8a10a0d36ccebc89016cf4ff8bd72177/8a10a0d36e16e5b3016e261985ed51fc/012021/n5e8y5v61920x1080carouselwebchuyentausinhtu19201080_202101209529.jpg",
      trailer: "https://via.placeholder.com/150",
      category: "Kinh dị",
      actors: "Tom Hardy, Idris Elba",
      director: "Ridley Scott",
      year: 2027,
      duration: "90 phút",
      quality: "Full HD",
      language: "Tiếng Anh",
    },
    {
      name: "The School for Good and Evil",
      description:
        "Một câu chuyện kỳ diệu về một trường học nơi các học sinh được huấn luyện thành các anh hùng hoặc ác quái.",
      poster:
        "https://bazaarvietnam.vn/wp-content/uploads/2021/10/nhat-moi-thoi-dai-cuoi-be-bung-7-e1633333823834.jpg",
      trailer: "https://via.placeholder.com/150",
      category: "Chính kịch",
      actors: "Charlize Theron, Kerry Washington",
      director: "Paul Feig",
      year: 2022,
      duration: "120 phút",
      quality: "4K",
      language: "Tiếng Pháp",
    },
    {
      name: "Black Panther",
      description:
        "Phim siêu anh hùng với cuộc chiến bảo vệ Wakanda khỏi những thế lực đen tối.",
      poster:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4T-uvnlvQd_aChUktiYmWQriIdCPPYtvMeQ&s",
      trailer: "https://via.placeholder.com/150",
      category: "Khoa học viễn tưởng",
      actors: "Chadwick Boseman, Michael B. Jordan",
      director: "Ryan Coogler",
      year: 2022,
      duration: "135 phút",
      quality: "Full HD",
      language: "Tiếng Anh",
    },
    {
      name: "365 Days",
      description:
        "Một câu chuyện tình lãng mạn, với những cảm xúc mãnh liệt giữa hai con người đến từ hai thế giới khác nhau.",
      poster:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEagqizTOMNb1pYiww1GozjSxGyX3hDD5OsQ&ss",
      trailer: "https://via.placeholder.com/150",
      category: "Lãng mạn",
      actors: "Michele Morrone, Anna Maria Sieklucka",
      director: "Barbara Białowąs",
      year: 2020,
      duration: "100 phút",
      quality: "HD",
      language: "Tiếng Ả Rập",
    },
  ]);

  const [categories, setCategories] = useState([
    "Hành động",
    "Hài hước",
    "Kinh dị",
    "Chính kịch",
    "Phim hoạt hình",
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editMovie, setEditMovie] = useState(null);
  const [newMovie, setNewMovie] = useState({
    name: "",
    description: "",
    poster: "",
    trailer: "",
    category: "",
    actors: "",
    director: "",
    year: "",
    duration: "",
    quality: "",
    language: "",
  });

  // Lấy danh sách phim từ localStorage khi component được mount
  useEffect(() => {
    // Lấy danh sách phim từ localStorage
    const storedMovies = localStorage.getItem("movies");

    if (storedMovies) {
      // Nếu có dữ liệu trong localStorage, chuyển thành mảng và lưu vào state
      setMovies(JSON.parse(storedMovies));
    }
  }, []);
  // Lưu danh sách phim vào localStorage mỗi khi danh sách phim thay đổi
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);
  // Thêm phần trạng thái cho thể loại mới
  const [newCategory, setNewCategory] = useState("");
  // Hàm handleClick sẽ thay đổi item được chọn

  const handleClick = (item) => {
    setSelectedItem(item);

    // Nếu chọn Đăng xuất, gọi hàm đăng xuất
    if (item === "Đăng xuất") {
      handleLogout();
    }
  };

  const handleEditMovie = (index) => {
    setEditIndex(index);
    setEditMovie({ ...movies[index] });
    setSelectedItem("Sửa phim");
  };

  const handleUpdateMovie = (e) => {
    e.preventDefault();
    const updatedMovies = [...movies];
    updatedMovies[editIndex] = editMovie;
    setMovies(updatedMovies);
    setEditIndex(null);
    setEditMovie(null);
    setSelectedItem("Danh sách phim");
  };

  const handleDeleteMovie = (index) => {
    const updatedMovies = movies.filter((_, i) => i !== index);
    setMovies(updatedMovies);
  };

  const handleAddMovie = (e) => {
    e.preventDefault();

    // Cập nhật danh sách phim trong state
    const newMoviesList = [...movies, { ...newMovie, category: newCategory }];
    setMovies(newMoviesList);

    // Lưu lại danh sách phim vào localStorage
    localStorage.setItem("movies", JSON.stringify(newMoviesList));

    // Reset lại các giá trị nhập (phim mới và thể loại)
    setNewMovie({
      name: "",
      description: "",
      poster: "",
      trailer: "",
      category: "",
      actors: "",
      director: "",
      year: "",
      duration: "",
      quality: "",
      language: "",
    });
    setNewCategory(""); // Xóa thể loại mới đã nhập
    // Thêm phim vào state
    const updatedMovies = [...movies, { ...newMovie, category: newCategory }];
    setMovies(updatedMovies);
    // Chuyển lại về danh sách phim sau khi thêm phim mới
    setSelectedItem("Danh sách phim");

    toast.success("Phim đã được thêm!");
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  //   thêm người dùng
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "Người dùng", // Vai trò mặc định
  });

  // Xử lý khi người dùng thay đổi giá trị trong form
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value, // Cập nhật giá trị tương ứng với input
    }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    // Kiểm tra xem các trường có đầy đủ không
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    } // Thêm thể loại mới vào danh sách thể loại hiện tại
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    // Lưu lại danh sách thể loại vào localStorage
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    // Reset giá trị input thể loại
    setNewCategory("");
    toast.success("Thêm người dùng thành công!");

    try {
      // Gửi yêu cầu tạo tài khoản vào Firebase Authentication
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyADU7EwmE6oMz-hLHk4HN1CgqvuYMI4zrQ`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            displayName: formData.username,
            returnSecureToken: true,
          }),
        }
      );

      const authData = await response.json();

      if (!response.ok) {
        toast.error(`Lỗi khi tạo tài khoản: ${authData.error.message}`);
        return;
      }

      // Thêm thông tin người dùng vào Firestore
      const userId = authData.localId; // Lấy ID người dùng từ Firebase Authentication

      // Giả sử bạn thêm người dùng vào danh sách users
      const newUser = {
        id: users.length + 1, // Tạo id cho người dùng mới
        username: formData.username,
        email: formData.email,
        role: formData.role,
      };
      // Cập nhật danh sách người dùng ngay lập tức
      const updatedUsers = [...users, newUser];

      // Cập nhật danh sách người dùng trong state
      setUsers(updatedUsers);

      // Lưu vào Firestore
      await addDoc(collection(db, "users"), newUser);

      // Lưu vào localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Reset lại form
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "Người dùng",
      });
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error);
      toast.error("Đã xảy ra lỗi khi thêm người dùng.");
    }
  };

  // Hàm xử lý xóa người dùng
  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers)); // Cập nhật lại localStorage
    toast.success("Xóa người dùng thành công!");
  };

  const handleDeleteAll = () => {
    if (users.length === 0) {
      toast.warning("Danh sách người dùng rỗng!");
      return;
    }

    setUsers([]);
    localStorage.removeItem("users"); // Xóa dữ liệu người dùng khỏi localStorage
    toast.success("Xóa tất cả người dùng thành công!");
  };

  //   hiện thị danh sách người dùng
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Cập nhật state và lưu vào localStorage
        setUsers(userList);

        localStorage.setItem("users", JSON.stringify(userList));
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
      }
    };

    // Kiểm tra localStorage trước khi gọi Firebase
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers)); // Dùng dữ liệu đã lưu
    } else {
      fetchUsers(); // Không có thì tải từ Firebase
    }
  }, []);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul>
          <li
            className={selectedItem === "Bảng điều khiển" ? "active" : ""}
            onClick={() => handleClick("Bảng điều khiển")}
          >
            Bảng điều khiển
          </li>
          <li
            className={selectedItem === "Danh sách phim" ? "active" : ""}
            onClick={() => handleClick("Danh sách phim")}
          >
            Danh sách phim
          </li>
          <li
            className={selectedItem === "Thêm phim" ? "active" : ""}
            onClick={() => handleClick("Thêm phim")}
          >
            Thêm phim
          </li>
          <li
            className={selectedItem === "Thể loại" ? "active" : ""}
            onClick={() => handleClick("Thể loại")}
          >
            Thể loại
          </li>
          <li
            className={selectedItem === "Người dùng" ? "active" : ""}
            onClick={() => handleClick("Người dùng")}
          >
            Người dùng
          </li>
          <li
            className={selectedItem === "Thêm người dùng" ? "active" : ""}
            onClick={() => handleClick("Thêm người dùng")}
          >
            Thêm người dùng
          </li>
          <li
            className={selectedItem === "Cập nhật hồ sơ" ? "active" : ""}
            onClick={() => handleClick("Cập nhật hồ sơ")}
          >
            Cập nhật hồ sơ
          </li>
          <li
            className={selectedItem === "Phim yêu thích" ? "active" : ""}
            onClick={() => handleClick("Phim yêu thích")}
          >
            Phim yêu thích
          </li>
          <li
            className={selectedItem === "Đổi mật khẩu" ? "active" : ""}
            onClick={() => handleClick("Đổi mật khẩu")}
          >
            Đổi mật khẩu
          </li>
          <li
            className={selectedItem === "Đăng xuất" ? "active" : ""}
            onClick={() => handleClick("Đăng xuất")}
          >
            <i class="bi bi-box-arrow-left"></i> Đăng xuất
          </li>
        </ul>
      </div>
      <div className="content">
        {selectedItem === "Bảng điều khiển" && (
          <div className="stats">
            <div className="stat-item">
              <i class="bi bi-list-ul"></i> Tổng số phim{" "}
              <span>{movies.length}</span>
            </div>
            <div className="stat-item">
              <i class="bi bi-grid-fill"></i> Tổng số thể loại{" "}
              <span>{categories.length}</span>
            </div>
            <div className="stat-item">
              <i className="bi bi-person-circle"></i>
              Tổng số người dùng <span>{users.length}</span>
            </div>
          </div>
        )}

        {selectedItem === "Danh sách phim" && (
          <div className="star-movies-table">
            <table className="movies-table">
              <thead>
                <tr>
                  <th>Hình ảnh</th>
                  <th>Tên phim</th>
                  <th>Thể loại</th>
                  <th>Ngôn ngữ</th>
                  <th>Năm</th>
                  <th>Thời lượng</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={movie.poster}
                        alt={movie.name}
                        style={{ width: "50px", height: "auto" }}
                      />
                    </td>
                    <td>{movie.name}</td>
                    <td>{movie.category}</td>
                    <td>{movie.language}</td>
                    <td>{movie.year}</td>
                    <td>{movie.duration}</td>
                    <td>
                      <button onClick={() => handleEditMovie(index)}>
                        Sửa
                      </button>
                      <button onClick={() => handleDeleteMovie(index)}>
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedItem === "Thêm phim" && (
          <div className="add-movie-form">
            <h2>Thêm phim mới</h2>
            <form onSubmit={handleAddMovie}>
              <div className="form-group">
                <label>Tên phim:</label>
                <input
                  type="text"
                  value={newMovie.name}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Mô tả:</label>
                <textarea
                  value={newMovie.description}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, description: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Hình ảnh bìa:</label>
                <input
                  type="url" // Để người dùng nhập URL
                  placeholder="Nhập URL hình ảnh"
                  onChange={
                    (e) => setNewMovie({ ...newMovie, poster: e.target.value }) // Lưu URL vào state
                  }
                />
              </div>

              <div className="form-group">
                <label>Trailer:</label>
                <input
                  type="url"
                  value={newMovie.trailer}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, trailer: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Thể loại:</label>
                <input
                  type="text"
                  value={newMovie.category}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, category: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Diễn viên:</label>
                <input
                  type="text"
                  value={newMovie.actors}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, actors: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Đạo diễn:</label>
                <input
                  type="text"
                  value={newMovie.director}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, director: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Năm:</label>
                <input
                  type="number"
                  value={newMovie.year}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, year: e.target.value })
                  }
                  min="1900"
                  max="2026"
                />
              </div>
              <div className="form-group">
                <label>Thời lượng:</label>
                <input
                  type="text"
                  value={newMovie.duration}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, duration: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Chất lượng:</label>
                <input
                  type="text"
                  value={newMovie.quality}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, quality: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Ngôn ngữ:</label>
                <input
                  type="text"
                  value={newMovie.language}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, language: e.target.value })
                  }
                />
              </div>
              <button type="submit">Thêm phim</button>
            </form>
          </div>
        )}

        {selectedItem === "Thể loại" && (
          <div className="category-section">
            <h2>Thể loại phim</h2>
            <ul>
              {categories.map((category, index) => (
                <li key={index}>{category}</li>
              ))}
            </ul>
            <form onSubmit={handleAddCategory}>
              <div className="form-group">
                <label>Thêm thể loại mới:</label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>
              <button type="submit">Thêm thể loại</button>
            </form>
          </div>
        )}

        {/* Danh sách người dùng */}
        {selectedItem === "Người dùng" && (
          <div class="overflow-y-auto-group">
            <h2>Thông tin người dùng</h2>
            <div className="user-info overflow-y-auto ">
              <ul>
                {users.length > 0 ? (
                  <div>
                    <ul>
                      {users.map((user, index) => (
                        <li key={user.id}>
                          <p
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                              color: "#4CAF50",
                              marginBottom: "10px",
                              padding: "5px",
                              borderRadius: "5px",
                              display: "inline-block",
                            }}
                          >
                            Số thứ tự: {index + 1}
                          </p>

                          {/* Hiển thị số thứ tự */}
                          <p>
                            Tên người dùng: <b>{user.username}</b>
                          </p>
                          <p>
                            Email: <b>{user.email}</b>
                          </p>
                          <p>
                            Vai trò: <b>{user.role}</b>
                          </p>
                          <p
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: "bold",
                              borderRadius: "5px",
                              margin: "10px 0",
                            }}
                          >
                            Ngày tham gia:{" "}
                            {new Date().toLocaleDateString("vi-VN")}
                          </p>

                          <button onClick={() => handleDeleteUser(user.id)}>
                            <i class="bi bi-x-square-fill"></i>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>Không có người dùng nào.</p>
                )}
              </ul>
            </div>
            <button onClick={handleDeleteAll}>
              <i class="bi bi-trash3-fill" style={{ paddingRight: 10 }}></i> Xóa
              tất cả
            </button>{" "}
            {/* Xóa tất cả người dùng */}
          </div>
        )}
        {/* Thêm phần người dùng */}
        {selectedItem === "Thêm người dùng" && (
          <div className="add-user">
            <h2>Thêm Người Dùng</h2>
            <form onSubmit={handleAddUser}>
              <div className="form-group">
                <label htmlFor="username">Tên người dùng:</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Nhập tên người dùng"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Nhập email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mật khẩu:</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group form-group-role">
                <label htmlFor="role">Vai trò:</label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  required
                >
                  <option value="Quản trị viên">Quản trị viên</option>
                  <option value="Người dùng">Người dùng</option>
                </select>
              </div>
              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}
              <button type="submit" className="btn-submit">
                Thêm người dùng
              </button>
            </form>
          </div>
        )}

        {selectedItem === "Cập nhật hồ sơ" && (
          <div className="update-profile">
            <h2>Cập nhật hồ sơ</h2>
            <form>
              <label>Tên người dùng</label>
              <input type="text" placeholder="Nhập tên mới" />
              <label>Email</label>
              <input type="email" placeholder="Nhập email mới" />
              <label>Địa chỉ</label>
              <input type="text" placeholder="Nhập địa chỉ mới" />
              <button type="submit">Cập nhật hồ sơ</button>
            </form>
          </div>
        )}

        {selectedItem === "Phim yêu thích" && (
          <div className="favorite-movies">
            <h2>Phim yêu thích của bạn</h2>
            <ul>
              <li>Game Of Thrones</li>
              <li>The Beast</li>
              <li>The School for Good and Evil</li>
              {/* Thêm các phim yêu thích */}
            </ul>
          </div>
        )}

        {selectedItem === "Đổi mật khẩu" && (
          <div className="change-password">
            <h2>Đổi mật khẩu</h2>
            <form>
              <label>Mật khẩu cũ</label>
              <input type="password" placeholder="Nhập mật khẩu cũ" />
              <label>Mật khẩu mới</label>
              <input type="password" placeholder="Nhập mật khẩu mới" />
              <label>Xác nhận mật khẩu mới</label>
              <input type="password" placeholder="Nhập lại mật khẩu mới" />
              <button type="submit">Đổi mật khẩu</button>
            </form>
          </div>
        )}

        {selectedItem === "Đăng xuất" && (
          <div className="logout">
            <h2>Đăng xuất thành công</h2>
            <p>Chúc bạn một ngày tốt lành!</p>
          </div>
        )}
      </div>
      <ToastContainer /> {/* Đảm bảo ToastContainer được thêm vào */}
    </div>
  );
};

export default Dashboard;
